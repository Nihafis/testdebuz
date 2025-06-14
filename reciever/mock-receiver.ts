import Fastify from "fastify";
import jwt from "jsonwebtoken";

const fastify = Fastify();
const subscriberSecrets: Record<number, string> = {
  // sub_id : secret
  2: "3966844df64a681dfbaf2a6f62f215c9e68f438eef5e2a4504f1f95a55879828", 
};

fastify.post("/receive", async (request, reply) => {
  const { token } = request.body as { token: string };

  for (const [subId, secret] of Object.entries(subscriberSecrets)) {
    try {
      const decoded = jwt.verify(token, secret);
      if (!decoded) {
        console.log(`❌ Failed to verify JWT with subscriber ${subId}`);
        continue;
      }

      console.log(
        `✅ Received message from subscriber ${subId}:`,
        decoded.message
      );
      return reply.send({ status: "received", sub_id: subId });
    } catch (err) {
      console.log(`❌ Failed to verify JWT with subscriber ${subId}:`, err);
    }
  }

  console.log("❌ Failed to verify JWT with any known subscriber secret.");
  return reply.status(401).send({ status: "unauthorized" });
});

fastify.listen({ port: 8000 }, () => {
  console.log(
    "🛰 Mock Webhook Receiver listening on http://localhost:8000/receive"
  );
});
