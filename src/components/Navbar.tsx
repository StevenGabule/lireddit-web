import React, {FC} from "react";
import {Box, Button, Flex, Link} from "@chakra-ui/core/dist";
import NextLink from 'next/link'
import {useLogoutMutation, useMeQuery} from "../generated/graphql";
import {isServer} from "../utils/isServer";

interface NavbarProps {}

export const Navbar: FC<NavbarProps> = ({}) => {
    const [{fetching: logoutFetching}, logout] = useLogoutMutation();
    const [{data, fetching}] = useMeQuery({
        pause: isServer()
    });
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
                <Button variant={"link"} isLoading={logoutFetching} onClick={() => logout()}>Logout</Button>
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