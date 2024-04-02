'use client';

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
import { useEffect } from "react"

// Facebook Login with JavaScript SDK
function launchWhatsAppSignup() {
  try {


    // Conversion tracking code
    window.fbq && window.fbq('trackCustom', 'WhatsAppOnboardingStart', { appId: 'your-facebook-app-id', feature: 'whatsapp_embedded_signup' });

    // Launch Facebook login
    window.FB.login(function (response: any) {
      if (response.authResponse) {
        const code = response.authResponse.code;
        console.log('User granted access to your app with code: ' + code);
        fetch('/api/facebook?code=' + code).then(async access => {
          const r = await access.json();
          const access_token = r.access_token;
          window.localStorage.setItem('access_token', access_token);
          fetch("/api/facebook-data?access_token=" + access_token).then(async user => {
            console.log(user)
            const u = await user.json();
            console.log(u);
            window.location.href = "/admin";
          });
        });
        
        // The returned code must be transmitted to your backend, 
        // which will perform a server-to-server call from there to our servers for an access token
      } else {
        console.log('User cancelled login or did not fully authorize.');
      }
    }, {
      config_id: '298049523319578', // configuration ID goes here
      response_type: 'code',    // must be set to 'code' for System User access token
      override_default_response_type: true, // when true, any response types passed in the "response_type" will take precedence over the default types
      extras: {
        "featureType": "only_waba_sharing" 
      }
    });
  } catch (error) {
    console.log(error)
  }
}

export default function Login({ handleChange }: { handleChange: (event: React.ChangeEvent<HTMLInputElement>) => void }) {

  useEffect(() => {
    window.fbAsyncInit = function () {
      window.FB.init({
        appId: '625750322871339',
        cookie: true,
        xfbml: true,
        version: 'v19.0'
      });

      window.FB.AppEvents.logPageView();

      window.FB.getLoginStatus(function (response: any) {
        console.log(response);
      });
    };

    (function (d, s, id) {
      var js: HTMLScriptElement, fjs = d.getElementsByTagName(s)[0];
      if (d.getElementById(id)) { return; }
      js = d.createElement(s) as HTMLScriptElement; js.id = id;
      js.src = "https://connect.facebook.net/en_US/sdk.js";
      if (fjs && fjs.parentNode) {
        fjs.parentNode.insertBefore(js, fjs);
      }
    }(document, 'script', 'facebook-jssdk'));

  }, [])
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
          <Button onClick={launchWhatsAppSignup} type="button" className="w-full bg-blue-400" variant="outline">
            Login with Facebook
          </Button>
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

