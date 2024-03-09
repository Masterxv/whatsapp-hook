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