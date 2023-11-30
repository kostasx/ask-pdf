import { expect, test, vi } from 'vitest';
import { DB } from '~/src/db';

const mockQuery = vi.fn().mockImplementation((query, values) => {
  if (query.includes('INSERT INTO pdf_documents')) {
    return { rows: [{ id: 1 }] };
  } else if (query.includes('SELECT id FROM pdf_documents')) {
    return { rows: values[0] === 'exists.pdf' ? [{}] : [] };
  }
});

const mockInsertPDF = vi.fn().mockImplementation(() => {
  return 1;
});

const mockPdfExists = vi.fn().mockImplementation((name) => {
  if (name === 'exists.pdf') return true;
  if (name === 'notexists.pdf') return false;
});

const mockListPDFs = vi.fn().mockImplementation(() => {
  return [{ id: 1, name: 'test.pdf', url: 'url' }];
});

const similaritySearch = vi.fn().mockImplementation(() => {
  return [{ id: 1, content: 'content', metadata: 'metadata', distance: 1 }];
});

vi.mock('~/src/db', () => {
  return {
    DB: vi.fn().mockImplementation(() => {
      return {
        query: mockQuery,
        insertPDF: mockInsertPDF,
        listPDFs: mockListPDFs,
        pdfExists: mockPdfExists,
        similaritySearch,
      };
    }),
  };
});

test('it should be able to insert a PDF', async () => {
  const db = new DB();
  const id = await db.insertPDF('test.pdf', 'url');
  expect(id).toBe(1);
});

test('it should be able to check if a PDF exists', async () => {
  const db = new DB();
  const exists = await db.pdfExists('exists.pdf');
  const notExists = await db.pdfExists('notexists.pdf');
  expect(exists).toBe(true);
  expect(notExists).toBe(false);
});

test('it should be able to list PDFs', async () => {
  const db = new DB();
  const pdfs = await db.listPDFs();
  expect(pdfs).toEqual([{ id: 1, name: 'test.pdf', url: 'url' }]);
});

test('it should be able to search for similar PDFs', async () => {
  const db = new DB();
  const result = await db.similaritySearch([1, 2, 3]);
  expect(result).toEqual([
    { id: 1, content: 'content', metadata: 'metadata', distance: 1 },
  ]);
});
