import React from "react";
import {Formik, Form} from "formik";
import {Box, Button, Link} from "@chakra-ui/core/dist";
import Wrapper from "../components/Wrapper";
import {InputField} from "../components/InputField";
import {useLoginMutation} from "../generated/graphql";
import {toErrorMap} from "../utils/toErrorMap";
import {useRouter} from "next/router";
import {withUrqlClient} from "next-urql";
import {createUrqlClient} from "../utils/createUrqlClient";
import NextLink from "next/link";

interface loginProps {
}

const Login: React.FC<loginProps> = ({}) => {
    const router = useRouter();
    const [, login] = useLoginMutation();
    return (
        <Wrapper variant={"small"}>
            <Formik
                initialValues={{usernameOrEmail: "", password: ""}}
                onSubmit={async (values, {setErrors}) => {
                    const response = await login(values);
                    if (response.data?.login.errors) {
                        setErrors(toErrorMap(response.data.login.errors));
                    } else if (response.data?.login.user) {
                        await router.push(typeof router.query.next === "string" ? router.query.next : "/");
                    }
                }}
            >
                {({isSubmitting}) => (
                    <Form>
                        <InputField
                            name={"usernameOrEmail"}
                            label={"Username or email"}
                            placeholder={"Username or email"}
                        />
                        <Box mt={4}>
                            <InputField
                                name={"password"}
                                label={"Password"}
                                placeholder={"password"}
                                type={"password"}
                            />
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

            <NextLink href="/forgot-password">
                <Link>forgot password?</Link>
            </NextLink>
        </Wrapper>
    );
};
export default withUrqlClient(createUrqlClient)(Login);
