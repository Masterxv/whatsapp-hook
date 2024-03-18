import { NextApiRequest, NextApiResponse } from "next";
import { inngest } from "../inngest/route";

import axios from "axios";

export const dynamic = 'force-dynamic'

const GRAPH_API_TOKEN = 'EAAI5Hdm2fCsBOwo1gwKgrAUmGidJvJXOSp12ZCNLOAz9ZBtBed8ECiZB0Gz2JtFZBt7rYVdCyIirjS3FnVouiJZBH72ofGrrpZCIgRZBRR7hphAOZBJ8B7bJDv0zpVWjAi7XIoCI3KlJg8Wd55q6neOk88ZAM9gb1ZBQXh84SZBweoRmba9vymBNGlOLNhXINjeCBRxZCpfD8gpUnwq63iGFUiXc4ZCFqM8BnqQeZA';

// Create a simple async Next.js API route handler
export async function POST(req: Request, res: Response) {
  // const { method } = req;
  // if (method !== "POST") {
  //   const mode = req.query["hub.mode"];
  //   const token = req.query["hub.verify_token"];
  //   const challenge = req.query["hub.challenge"];

  //   // check the mode and token sent are correct
  //   if (mode === "subscribe" && token === 'HAPPY') {
  //     // respond with 200 OK and challenge token from the request
  //     res.status(200).send(challenge);
  //   } else {
  //     // respond with '403 Forbidden' if verify tokens do not match
  //     res.status(403);
  //   }
  // }
  try {
    const body = await req.json();
    // POST call
    const message = body.entry?.[0]?.changes[0]?.value?.messages?.[0];
    // check if the incoming message contains text
    if (message?.type === "text") {
      // extract the business number to send the reply from it
      const business_phone_number_id =
        body.entry?.[0].changes?.[0].value?.metadata?.phone_number_id;

      await inngest.send({
        name: "text-message/recieve",
        data: {
          ...message,
          business_phone_number_id
        }
      });
    }
    return new Response(null, {
      status: 200,
      headers: { "Content-Type": "text/plain" },
    })
  } catch (e) {
    console.log(e);
    return new Response('error', {
      status: 500,
      headers: { "Content-Type": "text/plain" },
    })
  }
}
