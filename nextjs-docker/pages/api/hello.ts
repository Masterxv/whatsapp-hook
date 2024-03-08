import { NextApiRequest, NextApiResponse } from "next";
import PocketBase from 'pocketbase'
import { inngest } from "./inngest";

// Opt out of caching; every request should send a new event
export const dynamic = "force-dynamic";

const pb = new PocketBase('https://node.taskmate.ae/');

// Create a simple async Next.js API route handler
export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  // Send your event payload to Inngest
  try {
    const authData = await pb.admins.authWithPassword('icemelt7@gmail.com', 'Jojo.33443344');
    console.log(pb.authStore.isValid);
    console.log(pb.authStore.token);
    console.log(pb.authStore.model.id);
    const resultList = await pb.collection('leads').getList(1, 50, {
      filter: 'phone_number = "971555555555"',
    });
  
    return res.status(200).json(resultList);
  } catch (e) {
    console.log(e);
    return res.status(400).json(e);
  }
  
}
