import React from "react";
import {Formik, Form} from 'formik'
import { Box, Button} from "@chakra-ui/core/dist";
import Wrapper from "../components/Wrapper";
import {InputField} from "../components/InputField";


interface registerProps {

}

const Register: React.FC<registerProps> = ({}) => {
    return (
        <Wrapper variant={"small"}>
            <Formik initialValues={{username: "", password: ""}} onSubmit={(values) => {
                console.log(values)
            }}>{({isSubmitting}) => (
                <Form>
                    <InputField name={"username"} label={"Username"} placeholder={"username"} />
                    <Box mt={4}>
                        <InputField name={"password"} label={"Password"} placeholder={"password"} type={"password"} />
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
export default Register;