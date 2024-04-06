'use client';

import {useEffect} from "react";
import {Button} from "@/components/ui/button";

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
                let access_token = 'EAAI5Hdm2fCsBOwtWx9zRXjW4lTov8ryUeYgN5l8fRZB9wVfAbjsSTZAWFMZAMkxV6cmnZCxfM2uZCs5YHDALP5H2MYjrakCMZBEZAexfpqW5rYREy1KdLF7HZBD14HUqtSFnuh3HOfhH0kiAZC8CdEAcSZBGMhEdQI4H468AGByT28ijvf60kbodbyaFf1WOF9IfjM7mL482JiKH8YZBHIBIQIO1FeDWp5GbCisUuBbXmKQh5RhE9IATbm9aKpuROgIixLP5ZCEADkiXMQ8h55NKbrewpbT8P6tv04MZAppI5XZAyQ1ZAZCQ1wZDZD' ?? localStorage.getItem('access_token');
                fetch('/next/api/facebook?code=' + code).then(async access => {
                    if (code) {
                        const r = await access.json();
                        access_token = r.access_token;
                        if (access_token) {
                            window.localStorage.setItem('access_token', access_token);
                        }
                    }

                    // window.FB.api('/me', function(_response) {
                    //   console.log('Good to see you, ' + _response.name + '.');
                    // });
                    fetch("/next/api/facebook-data?access_token=" + access_token).then(async user => {
                        console.log(user)
                        const u = await user.json();
                        console.log(u);
                        window.location.href = window.location.href.includes('logical') ? `/admin?name=${u.name}` : `/next/admin?name=${u.name}`;
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

export default function Login() {

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
            if (d.getElementById(id)) {
                return;
            }
            js = d.createElement(s) as HTMLScriptElement;
            js.id = id;
            js.src = "https://connect.facebook.net/en_US/sdk.js";
            if (fjs && fjs.parentNode) {
                fjs.parentNode.insertBefore(js, fjs);
            }
        }(document, 'script', 'facebook-jssdk'));

    }, [])
    return (
        <Button onClick={launchWhatsAppSignup} type="button" className="w-full bg-blue-400" variant="outline">
            Login with Facebook
        </Button>
    )

}