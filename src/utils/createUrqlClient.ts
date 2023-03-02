import { dedupExchange, fetchExchange, Exchange, stringifyVariables } from "urql";
import { gql } from '@urql/core';
import {
  LogoutMutation,
  MeQuery,
  MeDocument,
  LoginMutation,
  RegisterMutation,
  DeletePostMutationVariables,
} from "../generated/graphql";
import { betterUpdateQuery } from "./betterUpdateQuery";
import { cacheExchange, Resolver } from "@urql/exchange-graphcache";
import { pipe, tap } from "wonka";
import Router from "next/router";
import { isServer } from "./isServer";
import { invalidatePosts } from "./invalidatePosts";

const errorExchange: Exchange =
  ({ forward }) =>
  (ops$) => {
    return pipe(
      forward(ops$),
      tap(({ error }) => {
        if (error) {
          if (error?.message.includes("not authenticated")) {
            Router.replace("/login");
          }
        }
      })
    );
  };

const simplePagination = (): Resolver => {
  return (_parent, fieldArgs, cache, info) => {
    const { parentKey: entityKey, fieldName } = info;
    const allFields = cache.inspectFields(entityKey);
    const fieldInfos = allFields.filter((info) => info.fieldName === fieldName);
    const size = fieldInfos.length;
    if (size === 0) {
      return undefined;
    }
    const fieldKey = `${fieldName}(${stringifyVariables(fieldArgs)})`
    const isItinCache = cache.resolve(cache.resolve(entityKey, fieldKey) as string, 'posts');
    info.partial = !isItinCache;
    let hasMore = true;
    const result: string[] = [];
    fieldInfos.forEach((fi) => {
      const key = cache.resolve(entityKey, fi.fieldKey) as string;

      const data = cache.resolve(key, 'posts') as string[];

      const _hasMore = cache.resolve(key, 'hasMore');
      if(!_hasMore) {
        hasMore = _hasMore as boolean;
      }
      result.push(...data);
    })

    return {
      __typename: "PaginatedPosts",
      hasMore,
      posts: result
    };
  };
};

export const createUrqlClient = (ssrExchange: any, ctx: any) => {
  let cookie = '';
  if(isServer()) {
    cookie = ctx?.req?.headers?.cookie;
  }

  return ({
  url: process.env.NEXT_PUBLIC_API_URL,
  fetchOptions: {
    credentials: "include" as const,
    headers : cookie ? { cookie } : undefined
  },
  exchanges: [
    dedupExchange,
    cacheExchange({
      keys: {
        PaginatedPosts: () => null,
      },
      resolvers: {
        Query: {
          posts: simplePagination(),
          myPosts: simplePagination(),
        } 
      },
      updates: {
        Mutation: {
          deletePost: (_result, args, cache, info) =>{
            cache.invalidate({__typename: "Post", id: (args as DeletePostMutationVariables).id});
          },
          vote :(_result, args, cache, info) => {
            const { postId, value } = args as any;
            const data = cache.readFragment(gql`
              fragment _ on Post {
                id
                points
                voteState
              }
            `, {id: postId});
            if(data) {
              //if vote state is same as the value passing, just return
              if(data.voteState === value){
                return;
              }
              const newPoints = data.points + value * (!data.voteState ? 1 : 2)
              cache.writeFragment(
                gql`
                fragment __ on Post {
                  points
                  voteState
                }` ,
                {id: postId, points: newPoints, voteState: value}
              )
            }
          },
          createPost: (_result, args, cache, info) => {
            invalidatePosts(cache); 
          },
          logout: (_result, args, cache, info) => {
            betterUpdateQuery<LogoutMutation, MeQuery>(
              cache,
              { query: MeDocument },
              _result,
              () => ({ me: null })
            );
          },
          login: (_result, args, cache, info) => {
            betterUpdateQuery<LoginMutation, MeQuery>(
              cache,
              { query: MeDocument },
              _result,
              (result, query) => {
                if (result.login.errors) {
                  return query;
                } else {
                  return {
                    me: result.login.user,
                  };
                }
              }
            );
            invalidatePosts(cache);
          },
          register: (_result, args, cache, info) => {
            betterUpdateQuery<RegisterMutation, MeQuery>(
              cache,
              { query: MeDocument },
              _result,
              (result, query) => {
                if (result.register.errors) {
                  return query;
                } else {
                  return {
                    me: result.register.user,
                  };
                }
              }
            );
          },
        },
      },
    }),
    errorExchange,
    ssrExchange,
    fetchExchange,
  ],
});
}