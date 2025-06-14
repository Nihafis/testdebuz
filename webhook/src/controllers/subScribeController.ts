import { FastifyReply, FastifyRequest } from "fastify";
import subScribeModel from "../models/subScribeModel";
import crypto from "crypto";

const generateSecret = () => {
  return crypto.randomBytes(32).toString("hex");
};

export const subScribeController = async (
  request: FastifyRequest,
  reply: FastifyReply
) => {
  const { url } = request.body as { url: string };
  if (!url) {
    return reply.status(400).send({
      message: "URL is required",
    });
  }
  const secret: string = generateSecret();
  try {
    const subScribe : any = await subScribeModel.create(url, secret);
    if (subScribe.affectedRows === 0) {
      return reply.status(500).send({
        message: "Failed to subscribe",
      });
    }

    const subScriber = {
      sub_id: subScribe.insertId,
      secret: secret,
    };

    return reply.status(200).send({
      status: "ok",
      data: subScriber,
    });
  } catch (error) {
    console.log(error);
    return reply.status(500).send({
      message: "Internal server error",
    });
  }
};


export const unsubScribeController = async (
  request: FastifyRequest,
  reply: FastifyReply
) => {
  const { sub_id } = request.body as { sub_id: string };
  if (!sub_id) {
    return reply.status(400).send({
      message: "Sub_id is required",
    });
  }
  try {
    const unsubScribe : any = await subScribeModel.delete(sub_id);
    if (unsubScribe.affectedRows === 0) {
      return reply.status(500).send({
        message: "Failed to unsubscribe",
      });
    }
    return reply.status(200).send({
      status: "ok",
    });
  } catch (error) {
    console.log(error);
    return reply.status(500).send({
      message: "Internal server error",
    });
  }
};

