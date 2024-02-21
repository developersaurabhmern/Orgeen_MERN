import { apis, request } from "../request";

const MakeToken = (token) => {
  const config = {
    headers: { authorization: token },
  };

  return config;
};

export const getTags = async (token) => {
  return await request(apis.get_getTags, null, MakeToken(token));
};

export const saveTag = async (body, token) => {
  return await request(apis.post_saveTag, body, MakeToken(token));
};

export const deleteTag = async (body, token) => {
  return await request(apis.post_deleteTag, body, MakeToken(token));
};

export const getSingleTag = async (body, token) => {
  const response = await request(apis.post_singleTag, body, MakeToken(token));
  return response.data.data[0];
};

export const updateTag = async (body, token) => {
  return await request(apis.post_updateTag, body, MakeToken(token));
};
