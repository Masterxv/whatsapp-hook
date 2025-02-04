/**
 * This code was generated by v0 by Vercel.
 * @see https://v0.dev/t/YM8CwHHa3IE
 */
'use client';

import PocketBase from 'pocketbase';
import clsx from "clsx"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { DropdownMenuTrigger, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuItem, DropdownMenuContent, DropdownMenu } from "@/components/ui/dropdown-menu"
import { JSXElementConstructor, Key, PromiseLikeOfReactNode, ReactElement, ReactNode, ReactPortal, SVGProps, useEffect, useRef, useState } from "react"
import { handleSubmit } from '@/lib/actions';

const pb = new PocketBase('https://node.taskmate.ae');

export function ChatLayout({ convoId, resultList, conversationList }: { convoId: string, resultList: any, conversationList: any }) {
  const box = useRef(null);
  const ref = useRef<HTMLFormElement>(null)
  const currentConvo = resultList.items.find((item: { id: string; }) => item.id === convoId);
  const [messages, setMessages] = useState(conversationList.find((item: { id: string; }) => item.id === convoId));

  const [drawerState, toggleDrawer] = useState(true);
  useEffect(() => {
    if (!currentConvo?.name) {
      return;
    }
    setMessages(conversationList.find((item: { id: string; }) => item.id === convoId));
    console.log({ convoId }, currentConvo.name);
    pb.admins.authWithPassword('icemelt7@gmail.com', 'Jojo.33443344').then((res) => {
      pb.collection('messages').subscribe('*', function (e) {
        // console.log(e.action);
        // console.log(e.record);
        if (e.action === 'create') {
          setMessages((prev: { messages: any; }) => {
            return {
              ...prev,
              messages: [...prev.messages, e.record],
            };
          });
        }
      }, { /* other options like expand, custom headers, etc. */ });
    });
    setTimeout(() => {
      window.scrollTo(0, document.body.scrollHeight);
    }, 200);
    
    return () => {
      pb.collection('messages').unsubscribe('*'); // remove all '*' topic subscriptions
    }
    
  }, [convoId]);
  
  const handleSubmitWithData = handleSubmit.bind(null, { convoId, phoneNo: currentConvo?.phone_number, from: 'agent' });
  return (
    <div className="w-full flex" style={{ height: 'calc(100vh - 40px'}}>
      <div className="border-r bg-gray-100/40 block">
        <div className={clsx(`h-full flex-col gap-2`, drawerState ? 'flex' : 'hidden')}>
          <div className="flex h-[60px] items-center border-b px-6">
            <Link className="flex items-center gap-2 font-semibold" href="#">
              <MessageSquareIcon className="h-6 w-6" />
              <span className="">Conversations</span>
            </Link>
            <Button className="ml-auto h-8 w-8" size="icon" variant="outline">
              <SearchIcon className="h-4 w-4" />
              <span className="sr-only">Toggle search</span>
            </Button>
          </div>
          <div className='flex-1 overflow-auto py-2'>
            <div className="grid items-start px-4 text-sm font-medium">
              {resultList.items.map((item: { id: Key | null | undefined; name: string | number | boolean | ReactElement<any, string | JSXElementConstructor<any>> | Iterable<ReactNode> | ReactPortal | PromiseLikeOfReactNode | null | undefined; }) => (
                <Link
                  className="flex items-center gap-3 rounded-lg mb-2 bg-gray-100 px-3 py-2 text-gray-900  transition-all hover:text-gray-900"
                  href={`?convo=${item.id}`}
                  key={item.id}
                >
                  <img
                    alt="Avatar"
                    className="rounded-full"
                    height="32"
                    src="/next/placeholder.svg"
                    style={{
                      aspectRatio: "32/32",
                      objectFit: "cover",
                    }}
                    width="32"
                  />
                  {item.name}
                  <Badge className="ml-auto flex h-6 w-6 shrink-0 items-center justify-center rounded-full">3</Badge>
                </Link>
              ))}
              
            </div>
          </div>
        </div>
      </div>

      <div className="flex grow flex-col">
        <header className="flex h-14 lg:h-[60px] items-center gap-4 border-b bg-gray-100/40 px-6">
          <button className="lg:hidden flex items-center gap-4 font-semibold" onClick={e => toggleDrawer(!drawerState)}>
            <MessageSquareIcon className="h-6 w-6" />
            <span className="sr-only">Conversations</span>
          </button>
          <div className="w-full flex-1">
            <form>
              <div className="relative">
                <SearchIcon className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-500 " />
                <Input
                  className="w-full pl-4 bg-gray-100/50 placeholder-gray-300 rounded-lg "
                  placeholder="Search conversations..."
                  type="search"
                />
              </div>
            </form>
          </div>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                className="rounded-full border border-gray-200 w-8 h-8 "
                size="icon"
                variant="ghost"
              >
                <img
                  alt="Avatar"
                  className="rounded-full"
                  height="32"
                  src="/next/placeholder.svg"
                  style={{
                    aspectRatio: "32/32",
                    objectFit: "cover",
                  }}
                  width="32"
                />
                <span className="sr-only">Toggle user menu</span>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuLabel>My Account</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem>Settings</DropdownMenuItem>
              <DropdownMenuItem>Support</DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem>Logout</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </header>


        <main className="flex flex-1 flex-col gap-4 p-4 md:gap-8 md:p-6">
          <div className="grid gap-2">
            <div className="flex items-center gap-2">
              <img
                alt="Avatar"
                className="rounded-full"
                height="40"
                src="/next/placeholder.svg"
                style={{
                  aspectRatio: "40/40",
                  objectFit: "cover",
                }}
                width="40"
              />
              <div className="flex-1">
                <h1 className="font-semibold text-lg">{currentConvo?.name}</h1>
                <div className="text-sm text-gray-500">Conversation with customer ID: {currentConvo?.id}</div>
              </div>
              <Button size="sm">Assign</Button>
            </div>
          </div>
          <div id="chat-window" className="border-t border-gray-200 h-full overflow-auto">
            <div className="grid gap-4 p-4">
              {!messages?.messages ? <div>Select a conversation</div> : messages.messages.map((message: { id: Key | null | undefined; from: string | number | boolean | ReactElement<any, string | JSXElementConstructor<any>> | Iterable<ReactNode> | PromiseLikeOfReactNode | null | undefined; message: string | number | boolean | ReactElement<any, string | JSXElementConstructor<any>> | Iterable<ReactNode> | ReactPortal | PromiseLikeOfReactNode | null | undefined; }) => (
                <div
                  className="flex items-start gap-4"
                  key={message.id}
                >
                  <img
                    alt="Avatar"
                    className="rounded-full"
                    height="40"
                    src="/next/placeholder.svg"
                    style={{
                      aspectRatio: "40/40",
                      objectFit: "cover",
                    }}
                    width="40"
                  />
                  <div className="grid gap-2">
                    <div>
                      <h1 className="font-semibold capitalize">{message.from}</h1>
                      {/* <p className="text-sm text-gray-500">{message.from}</p> */}
                    </div>
                    <div className={clsx("rounded-lg p-4", message.from !== 'agent' ? 'bg-blue-200' : 'bg-gray-100')}>
                      <p>{message.message}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
          <div className="mt-auto">
            <form ref={ref} action={async (formData) => {
              ref.current?.reset();
              await handleSubmitWithData(formData);
              window.scrollTo(0, document.body.scrollHeight);              
            }} className="flex gap-4 p-4 border-t">
              <Input ref={box} name="message" className="flex-1 min-h-[40px] " placeholder="Type a message..." type="text" />
              <Button type="submit">Send</Button>
            </form>
          </div>
        </main>
      </div>
    </div>
  )
}


function MessageSquareIcon(props: JSX.IntrinsicAttributes & SVGProps<SVGSVGElement>) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
    </svg>
  )
}


function SearchIcon(props: JSX.IntrinsicAttributes & SVGProps<SVGSVGElement>) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <circle cx="11" cy="11" r="8" />
      <path d="m21 21-4.3-4.3" />
    </svg>
  )
}
