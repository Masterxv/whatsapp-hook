import { ChatLayout } from '@/components/chat-layout';
import { getConversations } from '@/lib/pocket';
import { Suspense } from 'react';


export default async function Home({
  searchParams
}: { searchParams: { [key: string]: string } }) {
  const convoId = searchParams.convo; // Add type assertion
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <ChatLayoutPage convoId={convoId} />
    </Suspense>
  );
}


const ChatLayoutPage = async ({ convoId }: { convoId: string }) => {
  const { resultList, conversationList } = await getConversations();
  return (
    <ChatLayout convoId={convoId} resultList={resultList} conversationList={conversationList} />
  );
}