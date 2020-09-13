import React from "react";
import {Formik, Form} from 'formik'
import {Box, Button} from "@chakra-ui/core/dist";
import Wrapper from "../components/Wrapper";
import {InputField} from "../components/InputField";
import {useLoginMutation} from "../generated/graphql";
import {toErrorMap} from "../utils/toErrorMap";
import {useRouter} from "next/router";

interface loginProps {
}

const Login: React.FC<loginProps> = ({}) => {
    const router = useRouter();
    const [, login] = useLoginMutation();
    return (
        <Wrapper variant={"small"}>
            <Formik initialValues={{username: "", password: ""}}
                    onSubmit={async (values, {setErrors}) => {
                        const response = await login({options: values});
                        if (response.data?.login.errors) {
                            setErrors(toErrorMap(response.data.login.errors));
                        } else if(response.data?.login.user) {
                            // worked
                            await router.push("/");
                        }
                    }}>{({isSubmitting}) => (
                <Form>
                    <InputField name={"username"} label={"Username"} placeholder={"username"}/>
                    <Box mt={4}>
                        <InputField name={"password"} label={"Password"} placeholder={"password"} type={"password"}/>
                    </Box>
                    <Button
                        mt={4}
                        variantColor="teal"
                        type="submit"
                        isLoading={isSubmitting}
                    >
                        Submit
                    </Button>
                </Form>
            )}
            </Formik>
        </Wrapper>
    )
}
export default Login;