import type { InferGetServerSidePropsType, GetServerSideProps } from 'next'
import { ChatLayout } from '@/components/chat-layout';
import { getConversations } from '@/lib/pocket';
import { useRouter } from 'next/router';
export default function Home({
  resultList, conversationList,
}: InferGetServerSidePropsType<typeof getServerSideProps>) {
  const route = useRouter();
  const convoId = route.query.convo;
  return (
    <ChatLayout convoId={convoId} resultList={resultList} conversationList={conversationList} />
  );
}


 
type Repo = {
  name: string
  stargazers_count: number
}
 
export const getServerSideProps = (async () => {
  // Fetch data from external API
  const { resultList, conversationList } = await getConversations();
  // Pass data to the page via props
  return { props: { resultList, conversationList } }
})
