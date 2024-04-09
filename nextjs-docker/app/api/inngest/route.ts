import { serve } from "inngest/next";
import { addMessage, getConversation, isNewUser, updateRecord, upsertNumber } from "../../../lib/pocket";
import { readMessage, send_list, send_message } from "../../../lib/wa";
import { inngest } from "@/lib/utils";

const NAME_MSG = "May I know your name?";

const recieveTextMessage = inngest.createFunction(
  { id: "text-message" },
  { event: "text-message/recieve" },
  async ({ event, step }) => {
      console.log(event);
    // Check if this is a first time user, if yes start a new conversation and save him
    // else continue the conversation
    const { business_phone_number_id, from, body } = event.data;
    await readMessage(event.data.id);
    if (await isNewUser(from)) {
      // Start a new conversation
      await step.sendEvent("user-onboard", {
        name: "user/onboard",
        data: event.data,
      });
      return { event, body: "User Onboard Start" };
    } else {
      // Continue the conversation
      await step.sendEvent("user-continue", {
        name: "user/continue",
        data: event.data,
      });
      return { event, body: "User Continue" };
    }
  },
);

const onBoardUser = inngest.createFunction(
  { id: "user-onboard" },
  { event: "user/onboard" },
  async ({ event, step }) => {
      console.log(event);
    // Save the user
    const user = await upsertNumber(event.data.from);
    const userId = user.id;
    // const message = await addMessage(userId, event.data.text.body, 'user');
    await send_message(event.data.from, NAME_MSG);
    const message2 = await addMessage(userId, NAME_MSG, 'agent');
    

    return { event, body: "User Onboarded" };
  },
);

const continueConversation = inngest.createFunction(
  { id: "user-continue" },
  { event: "user/continue" },
  async ({ event, step }) => {
      console.log(event);
    // Continue the conversation
    // console.log(event);
    // get the existing conversation
    const user = await upsertNumber(event.data.from);
    // const message = await addMessage(user.id, event.data.text.body, 'user');
    
    const conversation = await getConversation(event.data.from);
    const messages = conversation?.items.map((item) => item.message) || [];
    // console.log(messages);

    const secondLastMessage = messages[messages.length - 2];
    const lastMessage = messages[messages.length - 1];

    // console.log(secondLastMessage, lastMessage);
    // await send_list(event.data.from);
    // understand the flow - if my question was of name update the name
    if (secondLastMessage === NAME_MSG) {
      // Update the user name
      await updateRecord(event.data.from, { name: lastMessage });
      await send_list(event.data.from);
      await addMessage(user.id, 'rate list sent', 'agent')
    } else {
      // await send_message(event.data.from, 'Thank you, we will get back to you soon');
      // await addMessage(user.id, 'Thank you, we will get back to you soon', 'agent')
    }

    return { event, body: "User Continued" };
  }
);

// Create an API that serves zero functions
export const { GET, POST, PUT } = serve({
  client: inngest,
  functions: [
    recieveTextMessage,
    onBoardUser,
    continueConversation
    /* your functions will be passed here later! */
  ],
});