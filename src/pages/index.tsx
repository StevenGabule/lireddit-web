import React, {useState} from "react";
import {withUrqlClient} from "next-urql";
import {createUrqlClient} from "../utils/createUrqlClient";
import {usePostsQuery} from "../generated/graphql";
import {Layout} from "../components/Layout";
import {Box, Link, Text, Stack, Heading} from "@chakra-ui/core/dist";
import NextLink from "next/link";
import Flex from "@chakra-ui/core/dist/Flex";
import Button from "@chakra-ui/core/dist/Button";

const Index = () => {
    const [variables, setVariables] = useState({limit: 10, cursor: null as null | string})
    const [{data, fetching}] = usePostsQuery({
        variables
    });

    if (!fetching && !data) {
        return <div>No info right now.</div>
    }

    return (
        <Layout>
            <Flex align={"center"}>
                <Heading>Lireddit</Heading>
                <NextLink href={"/posts/create"}>
                    <Link ml={"auto"}>Create Post</Link>
                </NextLink>
            </Flex>
            <br/>

            {!data && fetching ? (
                <div>loading...</div>
            ) : (
                <Stack>
                    {data!.posts.posts.map((p) => (
                        <Box key={p.id} p={5} shadow={'md'} borderWidth={'1px'}>
                            <Heading fontSize={'xl'}>{p.title}</Heading>
                            <Text mt={4}>{p.body.slice(0, 50)}</Text>
                        </Box>
                    ))}
                </Stack>
            )}
            {data ? (<Flex>
                <Button onClick={() => {
                    setVariables({
                        limit: variables.limit,
                        cursor: data.posts[data.posts.length - 1].createdAt,
                    })
                }} m={"auto"} my={"auto"} mt={8} mb={8} isLoading={fetching}>
                    Load more
                </Button>
            </Flex>) : null}
        </Layout>
    );
};

export default withUrqlClient(createUrqlClient, {ssr: true})(Index);
