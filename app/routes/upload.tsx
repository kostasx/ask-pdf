import type { ActionFunctionArgs } from '@remix-run/node';
import type { CompleteMultipartUploadCommandOutput } from '@aws-sdk/client-s3';
import { PassThrough } from 'node:stream';
import {
  json,
  redirect,
  writeAsyncIterableToWritable,
  unstable_createMemoryUploadHandler as createMemoryUploadHandler,
  unstable_composeUploadHandlers as composableUploadHandlers,
  unstable_parseMultipartFormData as parseMultipartFormData,
} from '@remix-run/node';

import { PDFUtils } from '~/src/pdf';
import { AI } from '~/src/ai';
import { DB } from '~/src/db';

export async function loader() {
  return redirect('/');
}

async function uploadToS3(filename: string, data: AsyncIterable<Uint8Array>) {
  const passThrough = new PassThrough();
  await writeAsyncIterableToWritable(data, passThrough);

  // Upload the file to S3
  const response: CompleteMultipartUploadCommandOutput =
    await PDFUtils.uploadFile(filename, passThrough);

  // Vectorize the PDF
  const ai = await AI.build();
  await ai.vectorizePDF(filename);

  return response.Location;
}

export async function action({ request }: ActionFunctionArgs) {
  if (request.method === 'POST') {
    let name = '';
    const uploadHandler = composableUploadHandlers(
      async ({ data, filename }) => {
        const url = await uploadToS3(filename as string, data);
        name = filename as string;
        return url;
      },
      createMemoryUploadHandler()
    );

    const formData = await parseMultipartFormData(request, uploadHandler);
    const url = formData.get('pdf');

    // Save the PDF in the database
    const db = new DB();
    await db.insertPDF(name, url as string);

    return json({ name, url });
  }
}
