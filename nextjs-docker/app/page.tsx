import { ChatLayout } from '@/components/chat-layout';
import { lucia, validateRequest } from '@/lib/auth';
import { ActionResult, Form } from '@/lib/form';
import { getConversations } from '@/lib/pocket';
import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import { Suspense } from 'react';


export default async function Home({
  searchParams
}: { searchParams: { [key: string]: string } }) {
  const convoId = searchParams.convo; // Add type assertion
  const { user } = await validateRequest();
	if (!user) {
		return redirect("/next/login");
	}
  return (<>
			<div className='flex px-4 items-center border-b-2'>
				<h1>Hi, {user.username}!</h1>
				<div className='ml-auto'>
					<Form action={logout}>
						<button className='btn my-2'>Sign out</button>
					</Form>
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

async function logout(): Promise<ActionResult> {
	"use server";
	const { session } = await validateRequest();
	if (!session) {
		return {
			error: "Unauthorized"
		};
	}

	await lucia.invalidateSession(session.id);

	const sessionCookie = lucia.createBlankSessionCookie();
	cookies().set(sessionCookie.name, sessionCookie.value, sessionCookie.attributes);
	return redirect("/next/login");
}