import { NextRequest } from "next/server";

export async function GET(req: NextRequest) {
  try {
    const url = new URL('https://graph.facebook.com/v17.0/oauth/access_token');
    url.searchParams.append('client_id', '625750322871339');
    url.searchParams.append('client_secret', 'b4a865c3ff38330c7c5f66ca7051d18f');
    url.searchParams.append('code', req.nextUrl.searchParams.get('code') ?? '');
    const response = await fetch(url, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });
    return Response.json(await response.json());
  } catch (e) {
    console.error(e);
    return Response.error();
  }
  
}