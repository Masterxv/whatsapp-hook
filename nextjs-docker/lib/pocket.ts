import { NextRequest, NextResponse } from 'next/server';
import PocketBase from 'pocketbase'
const pb = new PocketBase('https://node.taskmate.ae/');

export const isNewUser = async (phoneNumber: string) => {
  const authData = await pb.admins.authWithPassword('icemelt7@gmail.com', 'Jojo.33443344');
  const resultList = await pb.collection('leads').getList(1, 50, {
    filter: `phone_number = "${phoneNumber}"`,
  });
  return (resultList.items.length === 0);
}

export const addMessage = async(userId: string, message: string, from: string) => {
  const authData = await pb.admins.authWithPassword('icemelt7@gmail.com', 'Jojo.33443344');
  const data = {
    "user": `${userId}`,
    "message": `${message}`,
    "from": from,
  };
  console.log('adding', data);
  const record = await pb.collection('messages').create(data);
  return record;
}

// get all conversations
export const getConversations = async () => {
  const authData = await pb.admins.authWithPassword('icemelt7@gmail.com', 'Jojo.33443344');
  const resultList = await pb.collection('leads').getList(1, 50, {
    sort: '-created',
  });
  // get all messages
  const conversationList = [];
  for (let i = 0; i < resultList.items.length; i++) {
    const conversation = await pb.collection('messages').getList(1, 50, {
      filter: `user = "${resultList.items[i].id}"`,
    });
    conversationList.push({ id: resultList.items[i].id, messages: conversation.items });
  }
  return {
    resultList,
    conversationList 
  };
}

export const getConversation = async (phoneNumber: string) => {
  const authData = await pb.admins.authWithPassword('icemelt7@gmail.com', 'Jojo.33443344');
  const resultList = await pb.collection('leads').getList(1, 50, {
    filter: `phone_number = "${phoneNumber}"`,
    sort: '-created',
  });
  if (resultList.items.length === 0) {
    return null;
  } else {
    const conversation = await pb.collection('messages').getList(1, 50, {
      filter: `user = "${resultList.items[0].id}"`,
    });
    return conversation;
  }
}

export const updateRecord = async (phoneNumber: string, data: any) => {
  const authData = await pb.admins.authWithPassword('icemelt7@gmail.com', 'Jojo.33443344');
  const resultList = await pb.collection('leads').getList(1, 50, {
    filter: `phone_number = "${phoneNumber}"`,
  });
  if (resultList.items.length === 0) {
    return null;
  } else {
    const record = await pb.collection('leads').update(resultList.items[0].id, data);
    return record;
  }
}

export const upsertNumber = async (phoneNumber: string) => {
  const authData = await pb.admins.authWithPassword('icemelt7@gmail.com', 'Jojo.33443344');
  const resultList = await pb.collection('leads').getList(1, 50, {
    filter: `phone_number = "${phoneNumber}"`,
  });
  if (resultList.items.length === 0) {
    const data = {
      "phone_number": `${phoneNumber}`,
    };

    const record = await pb.collection('leads').create(data);
    return record;
  } else {
    return resultList.items[0];
  }
}

// you can place this helper in a separate file so that it can be reused
async function initPocketBase(req: NextRequest, res: NextResponse) {
  // load the store data from the request cookie string
  pb.authStore.loadFromCookie(req?.cookies.toString() || '');

  // send back the default 'pb_auth' cookie to the client with the latest store state
  pb.authStore.onChange(() => {
    res?.headers.set('set-cookie', pb.authStore.exportToCookie());
  });

  try {
      // get an up-to-date auth store state by verifying and refreshing the loaded auth model (if any)
      pb.authStore.isValid && await pb.collection('users').authRefresh();
  } catch (_) {
      // clear the auth store on failed refresh
      pb.authStore.clear();
  }

  return pb
}