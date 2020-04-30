import { v4 as uuid } from "uuid";
export default (_root, variables, { cache, getCacheKey }) => {
  const id = uuid();
  const key = getCacheKey({ __typename: "Player", id });
  const { name, color } = variables;
  cache.writeData({ id: key, data: { name, color, score: 0, id } });
  return null;
};
