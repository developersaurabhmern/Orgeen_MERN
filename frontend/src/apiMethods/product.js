import { apis, request } from "../request";

const MakeToken = (token) => {
  const config = {
    headers: { authorization: token },
  };

  return config;
};

export const saveProduct = async (body, token) => {
  return await request(apis.post_addProduct, body, MakeToken(token));
};

export const getProducts = async (token) => {
  return await request(apis.get_getProducts, null, MakeToken(token));
};

export const deleteProduct = async (body, token) => {
  return await request(apis.post_deleteProduct, body, token);
};

export const getSingleProduct = async (body, token) => {
  return await request(apis.post_getSingleProduct, body, MakeToken(token));
};

export const updateProduct = async (body, token) => {
  return await request(apis.post_updateProduct, body, MakeToken(token));
};
