import redisClient, { getRedisEx, setRedisEx } from "@/config/redis";
import dataModel from "@/models/dataModel";
import subScribeModel from "@/models/subScribeModel";
import { FastifyRequest, FastifyReply } from "fastify";
import jwt from "jsonwebtoken";
import { ResultSetHeader, RowDataPacket } from "mysql2";

interface SubscriberRow extends RowDataPacket {
  id: number;
  url: string;
  secret: string;
  created_at: Date;
}

interface CreateResult extends ResultSetHeader {
  insertId: number;
  affectedRows: number;
}

export const provideData = async (
  request: FastifyRequest,
  reply: FastifyReply
) => {
  const { message } = request.body as { message: string };

  if (!message) {
    return reply.status(400).send({
      status: "error",
      message: "Message is required",
    });
  }
  try {
    const rs: CreateResult = await dataModel.create(message);
    if (rs.affectedRows === 0) {
      return reply.status(500).send({
        status: "error",
        message: "Failed to create message",
      });
    }
    const tx_id = rs.insertId;
    await setRedisEx(`tx_id:${tx_id}`, message, 1);

    return reply.status(200).send({
      status: "ok",
      tx_id,
    });
  } catch (error) {
    console.log(error);
    return reply.status(500).send({
      status: "error",
      message: "Failed to create message",
    });
  }
};

export const askData = async (request: FastifyRequest, reply: FastifyReply) => {
  const { tx_id } = request.body as { tx_id: number };
  if (!tx_id) {
    return reply.status(400).send({
      status: "error",
      message: "Tx_id is required",
    });
  }

  let message = await getRedisEx(`tx_id:${tx_id}`);
  if (!message) {
    message = await dataModel.get(tx_id);
    if (!message) {
      return reply.status(400).send({
        status: "error",
        message: "Message not found",
      });
    }
    await setRedisEx(`tx_id:${tx_id}`, message, 1);
  }

  try {
    const subscribers: SubscriberRow[] =
      (await subScribeModel.getSubscribers()) as SubscriberRow[];
    for (const sub of subscribers) {
      const token = jwt.sign({ message }, sub.secret);
      const res = await fetch(sub.url, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ token }),
      }).catch((err) => {
        console.log(err.message);
      });
    }

    return reply.status(200).send({
      status: "ok",
      data: message,
    });
  } catch (error) {
    console.log(error);
    return reply.status(500).send({
      status: "error",
      message: "Failed to send message to subscribers",
    });
  }
};
