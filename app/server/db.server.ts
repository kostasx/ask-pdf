import type { PDFData, PDFSimilarityData } from '~/types/pdf';
import { DB } from '~/src/db';

const db = new DB();

export async function similaritySearch(
  vector: number[],
  limit = 10
): Promise<PDFSimilarityData[]> {
  return db.similaritySearch(vector, limit);
}

export async function listPDFs(): Promise<PDFData[]> {
  return db.listPDFs();
}
