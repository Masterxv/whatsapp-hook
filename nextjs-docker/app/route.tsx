export const GET = async (req: Request) => {
  return Response.redirect(req.url + "/admin");
}