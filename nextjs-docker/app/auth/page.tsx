import { ClientAuth } from "@/app/auth/components/ClientAuth";
import { Suspense } from "react";
interface User {
  email: string;
  password: string;
}
export default async function AuthPage() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <ClientAuth />
    </Suspense>
  );
}
