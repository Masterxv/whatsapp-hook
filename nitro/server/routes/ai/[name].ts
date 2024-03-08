import OpenAI from 'openai';

export default eventHandler(async (event) => {
  const name = getRouterParam(event, 'name')

  const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });
  const response = await openai.chat.completions.create({
    model: 'gpt-3.5-turbo',
    messages: [
      {
        role: 'system',
        content: 'You are a helpful assistant.',
      },
      {
        role: 'user',
        content: `Hello, my name is ${name}.`,
      },
    ],
    max_tokens: 50,
  });
  return response.choices[0].message.content
});
