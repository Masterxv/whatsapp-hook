import { NextApiRequest, NextApiResponse } from "next";
import { inngest } from "./inngest";
import axios from "axios";

const GRAPH_API_TOKEN = 'EAAI5Hdm2fCsBOwo1gwKgrAUmGidJvJXOSp12ZCNLOAz9ZBtBed8ECiZB0Gz2JtFZBt7rYVdCyIirjS3FnVouiJZBH72ofGrrpZCIgRZBRR7hphAOZBJ8B7bJDv0zpVWjAi7XIoCI3KlJg8Wd55q6neOk88ZAM9gb1ZBQXh84SZBweoRmba9vymBNGlOLNhXINjeCBRxZCpfD8gpUnwq63iGFUiXc4ZCFqM8BnqQeZA';

// Create a simple async Next.js API route handler
export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  const { method } = req;
  const mode = req.query["hub.mode"];
  const token = req.query["hub.verify_token"];
  const challenge = req.query["hub.challenge"];

  // check the mode and token sent are correct
  if (method === 'GET' && mode === "subscribe" && token === 'EAAI5Hdm2fCsBO0SPvGlJio5N7ofeqoQKnDpjCZBZAOq8uyc70TaDIbyViN5VU0qktEyCieaFLU8mD5ujAxCFeoYtA9RZAOl4XG7VB4AOFallWhi045xYF1M4oVi7OYvtvNH2jvPEinQS3dC5BFrGCREZAPSGnJcwvxxS1xi8n53jNpAVqrt8SzbaZCLVZAuxunZBKpmmBVU3VkSYvLH1zFcJ8KZBnP7YY4tw') {
    // respond with 200 OK and challenge token from the request
    res.status(200).send(challenge);
    console.log("Webhook verified successfully!");
    return;
  }

  // POST call
  const message = req.body.entry?.[0]?.changes[0]?.value?.messages?.[0];

  // check if the incoming message contains text
  if (message?.type === "text") {
    // extract the business number to send the reply from it
    const business_phone_number_id =
      req.body.entry?.[0].changes?.[0].value?.metadata?.phone_number_id;

    // send a reply message as per the docs here https://developers.facebook.com/docs/whatsapp/cloud-api/reference/messages
    await axios({
      method: "POST",
      url: `https://graph.facebook.com/v18.0/${business_phone_number_id}/messages`,
      headers: {
        Authorization: `Bearer ${GRAPH_API_TOKEN}`,
      },
      data: {
        messaging_product: "whatsapp",
        to: message.from,
        text: { body: "Echo: " + message.text.body },
        context: {
          message_id: message.id, // shows the message as a reply to the original user message
        },
      },
    });

    // mark incoming message as read
    await axios({
      method: "POST",
      url: `https://graph.facebook.com/v18.0/${business_phone_number_id}/messages`,
      headers: {
        Authorization: `Bearer ${GRAPH_API_TOKEN}`,
      },
      data: {
        messaging_product: "whatsapp",
        status: "read",
        message_id: message.id,
      },
    });
  }

  res.status(200);
}
