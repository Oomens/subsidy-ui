import {setContext} from "@apollo/client/link/context";
import dayjs from "dayjs";
import {clearToken} from "auth/user.ts";


export const tokenAuthLink = setContext((_, {headers}) => {
  const expiry = localStorage.getItem('tokenExpiry');
  if (expiry && dayjs.unix(+expiry) < dayjs()) clearToken();
  const token = localStorage.getItem('token');
  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : "",
      "GraphQL-preflight": "1",
    }
  }
});