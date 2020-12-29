import { cacheExchange, QueryInput, Cache } from "@urql/exchange-graphcache"
import { dedupExchange, fetchExchange, ssrExchange } from "urql"
import { CurrentUserDocument, CurrentUserQuery, LoginMutation, LogoutMutation, RegisterMutation } from "../generated/graphql"


function helperUpdateQuery<Result, Query>(
  cache: Cache, 
  queryInput: QueryInput, 
  result: any, 
  onUpdate: (res: Result, query: Query) => Query) {
  return cache.updateQuery(queryInput, (data) => onUpdate(result, data as any) as any)
}

export const createUrqlClient = (ssrExchange: any) => ({
    url: 'http://localhost:4400/graphql',
    fetchOptions: {
        credentials: "include" as const
    },
    exchanges: [dedupExchange, cacheExchange({
        updates: {
            Mutation: {
                logoutUser: (resultData, args, cache, info) => {
                    helperUpdateQuery<LogoutMutation, CurrentUserQuery>(
                        cache,
                        {query: CurrentUserDocument},
                        resultData,
                        () => ({ currentUser: null })
                    )
                },
                loginUser: (resultData, args, cache, info) => {
                    helperUpdateQuery<LoginMutation, CurrentUserQuery>(
                        cache, 
                        { query: CurrentUserDocument }, 
                        resultData,
                        (result, query) => {
                            if(result.loginUser.errors) {
                                return query
                            }else {
                                return {
                                    currentUser: result.loginUser.user
                                }
                            }
                        }
                    )
                },
                registerUser: (resultData, args, cache, info) => {
                    helperUpdateQuery<RegisterMutation, CurrentUserQuery>(
                        cache,
                        { query: CurrentUserDocument },
                        resultData,
                        (result, query) => {
                            if(result.registerUser.errors) {
                                return query
                            }else {
                                return {
                                currentUser: result.registerUser.user
                                }
                            }
                        }
                    )
                }
            }
        }
  }), 
  ssrExchange,
  fetchExchange]
})