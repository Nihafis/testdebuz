import { FastifyInstance } from "fastify";
import {
  subScribeController,
  unsubScribeController,
} from "../controllers/subScribeController";
import { jwtAuthMiddleware } from "../middleware/auth";

const subScribeRoute = async (fastify: FastifyInstance) => {
  fastify.post("/subScribe", {
  }, subScribeController);
  fastify.post("/unsubScribe", {
    // preHandler: jwtAuthMiddleware,
  }, unsubScribeController);
};

export default subScribeRoute;
