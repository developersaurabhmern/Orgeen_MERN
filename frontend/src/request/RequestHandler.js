import axios from "axios";
import { baseUrl } from "./urls";
import { apis } from "./urls";

function findKeyByValue(value) {
  const key = Object.keys(apis).filter((key) => apis[key] === value)[0];
  return key.split("_")[0];
}

export const request = async (api, body = null, headers = null) => {
  const method = findKeyByValue(api);

  try {
    if (method === "get") {
      const res = await axios[method](
        baseUrl + api,
        headers !== null ? headers : ""
      );
      return { data: res.data, error: null };
    } else {
      const res = await axios[method](
        baseUrl + api,
        body,
        headers !== null ? headers : ""
      );
      return { data: res.data, error: null };
    }
  } catch (err) {
    return { data: null, error: err };
  }
};
