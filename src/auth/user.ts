import {makeVar} from "@apollo/client";

interface User {
  token: string
  id: number
  displayName: string
  firstName: string
  lastName: string
  affiliation: string
  mailAddress: string
  role: string
}

const parseJwt = (token: string) => {
  const base64Url = token.split('.')[1];
  if (!base64Url) return null;
  const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
  const jsonPayload = decodeURIComponent(window.atob(base64).split('').map(function(c) {
    return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
  }).join(''));

  return JSON.parse(jsonPayload);
}


const getUserInfo = (token: string | null): User | null => {
  if (!token) return null;
  const jwt = parseJwt(token);
  if (!jwt) return null;
  return {
    id: +jwt.UserId,
    displayName: jwt.unique_name,
    role: jwt.role as string,
    mailAddress: jwt.email,
    firstName: jwt.given_name,
    lastName: jwt.family_name,
    affiliation: jwt.Affiliation,
    token: token
  }
}

const token = window.localStorage.getItem("token");
export const userVar = makeVar<User | null>(getUserInfo(token));

export const setToken = (token: string) => {
  window.localStorage.setItem("token", token);
  window.localStorage.setItem("tokenExpiry", parseJwt(token).exp);
  userVar(getUserInfo(token));
}

export const clearToken = () => {
  const hasToken = !!window.localStorage.getItem("token");
  window.localStorage.removeItem("token");
  userVar(null);
  if (hasToken) window.location.reload();
}