// utils/jwt.ts
import jwt, { JwtPayload } from "jsonwebtoken";

const accessTokenSecret = process.env.ACCESS_TOKEN_SECRET as string;
const refreshTokenSecret = process.env.REFRESH_TOKEN_SECRET as string;
const accessTokenExpiry = "1m"; // Adjust the expiry as needed
const refreshTokenExpiry = "7d"; // Adjust the expiry as needed

export interface UserTokenPayload {
  id: number;
  email: string;
}

export const createAccessToken = (user: UserTokenPayload): string => {
  return jwt.sign({ id: user.id, email: user.email }, accessTokenSecret, {
    expiresIn: accessTokenExpiry,
  });
};

export const createRefreshToken = (user: UserTokenPayload): string => {
  return jwt.sign({ id: user.id, email: user.email }, refreshTokenSecret, {
    expiresIn: refreshTokenExpiry,
  });
};

export const verifyAccessToken = (token: string): UserTokenPayload => {
  return jwt.verify(token, accessTokenSecret) as UserTokenPayload;
};

export const verifyRefreshToken = (token: string): UserTokenPayload => {
  return jwt.verify(token, refreshTokenSecret) as UserTokenPayload;
};
