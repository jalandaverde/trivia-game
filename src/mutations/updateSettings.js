export default (_root, variables, { cache, getCacheKey }) => {
  const id = getCacheKey({ __typename: "Setting", id: variables.id });
  const { label, value } = variables;
  cache.writeData({ id, data: { label, value } });
  return null;
};
