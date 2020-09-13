import React from "react";
import {createClient, Provider, dedupExchange, fetchExchange} from "urql";
import {cacheExchange, Cache, QueryInput} from '@urql/exchange-graphcache'
import {ThemeProvider, CSSReset} from '@chakra-ui/core'
import theme from '../theme'
import {LoginMutation, MeDocument, MeQuery, RegisterMutation} from "../generated/graphql";

function betterUpdateQuery<Result, Query>(
    cache: Cache,
    qi: QueryInput,
    result: any,
    fn: (r: Result, q: Query) => Query) {
    return cache.updateQuery(qi, data => fn(result, data as any) as any);
}

const client = createClient({
    url: "http://localhost:4000/graphql",
    exchanges: [dedupExchange, cacheExchange({
        updates: {
            Mutation: {
                login: (_result, args, cache, info) => {
                    betterUpdateQuery<LoginMutation, MeQuery>(
                        cache,
                        {query: MeDocument},
                        _result,
                        (result, query) => {
                            if(result.login.errors) {
                                return query;
                            } else {
                                return {
                                    me: result.login.user
                                }
                            }
                        }
                    )
                },
                register: (_result, args, cache, info) => {
                    betterUpdateQuery<RegisterMutation, MeQuery>(
                        cache,
                        {query: MeDocument},
                        _result,
                        (result, query) => {
                            if(result.register.errors) {
                                return query;
                            } else {
                                return {
                                    me: result.register.user
                                }
                            }
                        }
                    )
                }
            }
        }
    }), fetchExchange],
    fetchOptions: {
        credentials: "include"
    }
});

function MyApp({Component, pageProps} : any) {
    return (
        <Provider value={client}>
            <ThemeProvider theme={theme}>
                    <CSSReset/>
                    <Component {...pageProps} />
            </ThemeProvider>
        </Provider>
    )
}

export default MyApp
