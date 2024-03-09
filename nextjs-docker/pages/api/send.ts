// nextjs post api route to send message

import { NextApiRequest, NextApiResponse } from 'next';
import { addMessage } from '@/lib/pocket';
import { send_message } from '@/lib/wa';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'POST') {
    const { convoId, phoneNo, message, from } = req.body;
    const record = await addMessage(convoId, message, from);
    const wmessage = await send_message(phoneNo, message);
    res.status(200).json(record);
  } else {
    res.status(405).json({ message: 'Method Not Allowed' });
  }
}