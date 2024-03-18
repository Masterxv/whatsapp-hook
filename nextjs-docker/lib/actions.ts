'use server'

import { revalidatePath } from "next/cache";
import { addMessage } from "./pocket";
import { send_message } from "./wa";

export const handleSubmit = async ({ convoId, phoneNo, from }: Record<string, string>, formData: FormData) => {
  
  const formDataObj = Object.fromEntries(formData.entries()) as unknown as Record<string, string>;
  const { message } = formDataObj;
  console.log({ convoId, phoneNo, message, from });
  const record = await addMessage(convoId, message, from);
  const wmessage = await send_message(Number(phoneNo), message);
  revalidatePath('/')
};