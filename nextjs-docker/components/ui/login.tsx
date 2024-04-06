import {Suspense} from "react";

declare global {
  interface Window {
    fbAsyncInit: () => void;
    FB: any;
    fbq: any;
  }

}

import { CardTitle, CardDescription, CardHeader, CardContent, Card } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import FBLoginButton from "../FBLoginButton";
// import { useEffect } from "react"



export default function Login({ handleChange }: { handleChange: (event: React.ChangeEvent<HTMLInputElement>) => void }) {

  return (
    <Card className="mx-auto max-w-sm">
      <CardHeader>
        <CardTitle>Login</CardTitle>
        <CardDescription>Use facebook login to register with your whatsapp business account</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="grid gap-4">
          {/* <div className="grid gap-2">
            <Label htmlFor="identity">User Name</Label>
            <Input id="identity" onChange={handleChange} name="identity" required type="text" />
          </div>
          <div className="grid gap-2">
            <div className="flex items-center">
              <Label htmlFor="password">Password</Label>
              <Link className="ml-auto inline-block text-sm underline" href="#">
                Forgot your password?
              </Link>
            </div>
            <Input name="password" onChange={handleChange} id="password" required type="password" />
          </div> */}
          {/* <Button className="w-full" type="submit" variant="outline">
            Login
          </Button> */}
          <Suspense>
            <FBLoginButton />
          </Suspense>

        </div>
        {/* <div className="mt-4 text-center text-sm">
          Don't have an account?
          <Link className="underline" href="#">
            Sign up
          </Link>
        </div> */}
      </CardContent>
    </Card>
  )
}

