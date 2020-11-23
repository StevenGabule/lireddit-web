import {Box, Button} from "@chakra-ui/core";
import {Formik, Form} from "formik";
import React, {FC} from "react";
import {InputField} from "../../components/InputField";
import {useCreatePostMutation} from "../../generated/graphql";
import {useRouter} from "next/router";
import {withUrqlClient} from "next-urql";
import {createUrqlClient} from "../../utils/createUrqlClient";
import {Layout} from "../../components/Layout";
import {useIsAuth} from "../../utils/useIsAuth";

const CreatePost: FC<{}> = ({}) => {
    const router = useRouter();
    useIsAuth()
    const [, CreatePost] = useCreatePostMutation();

    return (
        <Layout variant="small">
            <Formik
                initialValues={{title: "", text: ""}}
                onSubmit={async (values) => {
                    const {error} = await CreatePost({input: values});
                    if (!error) {
                        await router.push("/");
                    }
                }}
            >

                {({isSubmitting}) => (
                    <Form>
                        <InputField
                            name={"title"}
                            label={"Enter title"}
                            placeholder={"Title"}
                        />
                        <Box mt={4}>
                            <InputField
                                textarea
                                name={"body"}
                                label={"Description"}
                                placeholder={"leave your message here..."}
                            />
                        </Box>
                        <Button
                            mt={4}
                            variantColor="teal"
                            type="submit"
                            isLoading={isSubmitting}
                        >
                            Create
                        </Button>
                    </Form>
                )}
            </Formik>
        </Layout>
    );
};
export default withUrqlClient(createUrqlClient)(CreatePost);
