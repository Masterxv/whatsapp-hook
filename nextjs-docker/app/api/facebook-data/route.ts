import { NextRequest } from "next/server";

export async function GET(req: NextRequest) {
  try {
    const url = new URL('https://graph.facebook.com/v17.0/1756714334769812');
    console.log(req.nextUrl.searchParams.get('access_token') ?? '');
    url.searchParams.append('access_token', req.nextUrl.searchParams.get('access_token') ?? '');
    const response = await fetch(url, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });
    const data = await response.json();
    console.log({ data })
    return Response.json(data);
  } catch (e) {
    console.error(e);
    return Response.error();
  }
  
}