import { Cache } from "@urql/exchange-graphcache";

export const invalidatePosts = (cache: Cache) => {
  const key = 'Query';
  cache.inspectFields(key)
  .filter(field => (field.fieldName === 'posts' || field.fieldName === 'myPosts'))
  .forEach(field => cache.invalidate(key, field.fieldName, field.arguments))
}