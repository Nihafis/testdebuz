import { FastifyRequest, FastifyReply } from "fastify";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();

interface JWTPayload {
  message: string;
  iat?: number;
  exp?: number;
}

interface CustomRequest extends FastifyRequest {
  user?: JWTPayload;
}

export async function jwtAuthMiddleware(
  request: CustomRequest,
  reply: FastifyReply
) {
  try {
    const authHeader = request.headers.authorization;
    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return reply.status(401).send({ error: "No token provided" });
    }

    const token = authHeader.split(" ")[1];
    const secret = process.env.JWT_SECRET;
    if (!secret) {
      throw new Error("JWT_SECRET is not set in environment variables");
    }

    const decoded = jwt.verify(token, secret) as JWTPayload;
    request.user = decoded;
  } catch (err) {
    return reply.status(401).send({ error: "Invalid or expired token" });
  }
}

