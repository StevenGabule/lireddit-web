import React, {FC} from "react";
import {Box, Button, Flex, Link} from "@chakra-ui/core/dist";
import NextLink from 'next/link'
import {useMeQuery} from "../generated/graphql";

interface NavbarProps {

}

export const Navbar: FC<NavbarProps> = ({}) => {
    const [{data, fetching}] = useMeQuery();
    let body = null;

    if(fetching){

    } else if(!data?.me) {
        body = (
            <>
                <NextLink href={"/login"}>
                    <Link mr={2}>Login</Link>
                </NextLink>
                <NextLink href={"/register"}>
                    <Link>Register</Link>
                </NextLink>
            </>
        )
    } else {
        body = (
            <Flex>
                <Box mr={2}>{data.me.username}</Box>
                <Button variant={"link"}>Logout</Button>
            </Flex>
        )
    }

    return (
        <Flex bg={"tomato"} p={4}>
            <Box ml={"auto"}>
                <Box m={"auto"}>
                    {body}
                </Box>
            </Box>
        </Flex>
    )
}