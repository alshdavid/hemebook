// Universal server that can run under lambda and node:http

import * as handlers from "./handlers/index.ts";
import { type Request, type Response } from "./platform/http.ts";
import { CognitoJwtVerifier } from "aws-jwt-verify";
import { COGNITO_CLIENT_ID, COGNITO_USER_POOL_ID } from "./platform/config.ts";

const cognitoJwtVerifier = CognitoJwtVerifier.create({
  userPoolId: COGNITO_USER_POOL_ID,
  tokenUse: "id",
  clientId: COGNITO_CLIENT_ID,
});

export const server = async (req: Request, res: Response): Promise<any> => {
  if (!req.url) {
    res.statusCode = 200;
    res.end();
    return;
  }

  const url = new URL("http://0.0.0.0" + req.url);

  // Redirects client to the Cognito login page
  if (url.pathname === "/api/auth/login") {
    return handlers.api_auth_login_get(url, req, res);
  }

  // Cognito navigates here after login
  if (url.pathname === "/api/auth/login/callback") {
    return handlers.api_auth_login_callback_get(url, req, res);
  }

  // Redirects client to the Cognito logout page
  if (url.pathname === "/api/auth/logout") {
    return handlers.api_auth_logout_get(url, req, res);
  }

  // Cognito navigates here after logout
  if (url.pathname === "/api/auth/logout/callback") {
    return handlers.api_auth_logout_callback_get(url, req, res);
  }
  // Endpoint to renew the auth token
  if (url.pathname === "/api/auth/refresh") {
    return handlers.api_auth_refresh_get(url, req, res);
  }

  if (url.pathname === "/api/auth/validate") {
    return handlers.api_auth_validate(url, req, res, cognitoJwtVerifier);
  }

  if (url.pathname === "/api/health-check") {
    return handlers.api_health_check(url, req, res);
  }

  // Fallback
  await handlers.client_get(url, req, res);
};
