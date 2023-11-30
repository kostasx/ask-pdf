import { expect, test } from 'vitest';
import path from 'node:path';
import url from 'node:url';
import { PDFUtils } from '~/src/pdf';

const __dirname = url.fileURLToPath(new URL('.', import.meta.url));

test('PDFUtils should have the uploadFile method', () => {
  expect(PDFUtils.uploadFile).toBeDefined();
});

test('PDFUtils should load the pdf', async () => {
  const filename = '../test/fixtures/sample.pdf';
  const docs = await PDFUtils.loadPDF(filename);
  expect(docs).toBeDefined();
  expect(docs).toBeInstanceOf(Array);
  expect(docs.length).toBe(1);
  expect(docs[0].pageContent).toContain(
    'is a universal file format that preserves all\nof  the  fonts'
  );
});

test('getFileName should return correct file path', () => {
  const filename = 'test.pdf';
  const expectedPath = path.join(__dirname, '..', '..', 'tmp', filename);
  const result = PDFUtils.getFileName(filename);
  expect(result).toBe(expectedPath);
});

test('getFileName should handle filenames with special characters', () => {
  const filename = 'test@#$%^&*().pdf';
  const expectedPath = path.join(__dirname, '..', '..', 'tmp', filename);
  const result = PDFUtils.getFileName(filename);
  expect(result).toBe(expectedPath);
});

test('getFileName should handle empty filename', () => {
  const filename = '';
  const expectedPath = path.join(__dirname, '..', '..', 'tmp', filename);
  const result = PDFUtils.getFileName(filename);
  expect(result).toBe(expectedPath);
});
