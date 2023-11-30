import { AI } from '~/src/ai';

export async function getEmbeddings(text: string) {
  return AI.getEmbeddings(text);
}
