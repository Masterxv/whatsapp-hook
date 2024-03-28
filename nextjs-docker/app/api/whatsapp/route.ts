import { inngest } from "../inngest/route";

import { NextRequest, NextResponse } from "next/server";

export const dynamic = 'force-dynamic'

export async function GET(req: NextRequest) {
  const mode = req.nextUrl.searchParams.get("hub.mode");
  const token = req.nextUrl.searchParams.get("hub.verify_token");
  const challenge = req.nextUrl.searchParams.get("hub.challenge");

  // check the mode and token sent are correct
  if (mode === "subscribe" && token === 'HAPPY') {
    // respond with 200 OK and challenge token from the request
    return NextResponse.json({ challenge });
  } else {
    // respond with '403 Forbidden' if verify tokens do not match
    return NextResponse.json({ error: 'Forbidden' }, { status: 403 });
  }
}
// Create a simple async Next.js API route handler
export async function POST(req: Request, res: Response) {
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
