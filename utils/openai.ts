import { Configuration, OpenAIApi } from 'openai';

const config = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});

const openai = new OpenAIApi(config);

export const imagine = async (prompt: string): Promise<string | null> => {
  try {
    const response = await openai.createImage({
      prompt,
      n: 1,
      size: '512x512',
    });

    return response.data.data[0].url || null;
  } catch (error) {
    console.debug(error);
    return null;
  }
};
