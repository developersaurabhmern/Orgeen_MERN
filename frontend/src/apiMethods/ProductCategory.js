import { apis, request } from "../request";

const MakeToken = (token) => {
  const config = {
    headers: { authorization: token },
  };

  return config;
};

export const saveCategory = async (body, token) => {
  const response = await request(
    apis.post_saveCategory,
    body,
    MakeToken(token)
  );
  return response;
};

export const getCategory = async (token) => {
  const response = await request(apis.get_category, null, MakeToken(token));
  return response;
};

export const deleteCategory = async (body, token) => {
  return await request(apis.post_deleteCategory, body, MakeToken(token));
};

export const updateCategory = async (body, token) => {
  console.log("request token", token);
  return await request(apis.post_updateCategory, body, MakeToken(token));
};

export const getSingleCategory = async (body, token) => {
  const response = await request(
    apis.post_singleCategory,
    body,
    MakeToken(token)
  );
  return response.data.data[0];
};
