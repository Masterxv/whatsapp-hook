export const GET = async (req: Request) => {
  const isProd = process.env.NODE_ENV === 'production'
  return Response.redirect(isProd ? 'https://node.taskmate.ae/next' : req.url + "/admin");
}