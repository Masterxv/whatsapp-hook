"use client"

import { logoutUser } from "@/state/user/user";
import { useRouter } from "next/navigation";
import {useEffect} from "react";

interface LogoutProps {

}

export function Logout({ }: LogoutProps) {
    const router = useRouter();

    useEffect(() => {
        (function (d, s, id) {
            var js: HTMLScriptElement, fjs = d.getElementsByTagName(s)[0];
            if (d.getElementById(id)) { return; }
            js = d.createElement(s) as HTMLScriptElement; js.id = id;
            js.src = "https://connect.facebook.net/en_US/sdk.js";
            if (fjs && fjs.parentNode) {
                fjs.parentNode.insertBefore(js, fjs);
            }
        }(document, 'script', 'facebook-jssdk'));
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
        <button
            className=" hover:bg-slate-700 "
            onClick={() => {
                console.log("log out")
                logoutUser()
                // router.refresh()

            }} >
            Logout
        </button>
    );
}
