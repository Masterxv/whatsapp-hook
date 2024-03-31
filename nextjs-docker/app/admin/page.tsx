import { ChatLayout } from '@/components/chat-layout';
import { server_component_pb } from "@/state/pb/server_component_pb";
import { ActionResult, Form } from '@/lib/form';
import { getConversations } from '@/lib/pocket';
import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import { Suspense } from 'react';
import { Logout } from '@/components/Logout';


export default async function Home({
  searchParams
}: { searchParams: { [key: string]: string } }) {
  const convoId = searchParams.convo; // Add type assertion
  const { pb, cookies } = await server_component_pb();
  return (<>
			<div className='flex px-4 items-center border-b-2'>
				<h1>Hi, {pb.authStore.model?.username}!</h1>
				<div className='ml-auto'>
					<Logout />
				</div>
			</div>
			
    <Suspense fallback={<div>Loading...</div>}>
      <ChatLayoutPage convoId={convoId} />
    </Suspense>
    </>
  );
}


const ChatLayoutPage = async ({ convoId }: { convoId: string }) => {
  const { resultList, conversationList } = await getConversations();
  return (
    <ChatLayout convoId={convoId} resultList={resultList} conversationList={conversationList} />
  );
}