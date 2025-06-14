import Fastify from "fastify";
import { TypeBoxTypeProvider } from "@fastify/type-provider-typebox";

import dotenv from "dotenv";

import subScribeRoute from "./routes/subScribeRoute";
import dataRoute from "./routes/dataRoute";

dotenv.config();

const app = Fastify().withTypeProvider<TypeBoxTypeProvider>();

app.register(subScribeRoute, { prefix: "/api/v1/subScribe" });
app.register(dataRoute, { prefix: "/api/v1/data" });

const start = async () => {
  try {
    await app.listen({
      port: parseInt(process.env.PORT || "3000"),
      host: process.env.HOST || "localhost",
    });
    console.log(
      `Server is running on ${process.env.HOST || "localhost"}:${
        process.env.PORT || "3000"
      }`
    );
  } catch (err) {
    app.log.error(err);
    process.exit(1);
  }
};

start();
 