
import { FastifyInstance } from "fastify";
import { provideData, askData } from "../controllers/dataController";

const dataRoute = async (fastify: FastifyInstance) => {
  fastify.post("/provideData", provideData);
  fastify.post("/askData", askData);
};

export default dataRoute;

