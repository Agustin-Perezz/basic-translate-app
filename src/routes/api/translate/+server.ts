import { client } from '$lib/openia-config';

export async function POST({ request }: { request: Request }) {
  const { sourceLanguage, targetLanguage, input } = await request.json();

  const prompt = `Translate the following text from ${sourceLanguage} to ${targetLanguage}: ${input}. Do not add any explanation or extra text`;
  const response = await client.chat.completions.create({
    model: 'gpt-4o-mini',
    messages: [{ role: 'user', content: prompt }]
  });
  return new Response(response.choices[0].message.content);
}
