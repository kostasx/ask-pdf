import type { MetaFunction } from '@remix-run/node';
import { useLoaderData } from '@remix-run/react';
import { Grid } from '@mantine/core';
import { StateContextProvider } from '~/components/state';
import { PDF } from '~/components/pdf';
import { Chat } from '~/components/chat';

import { listPDFs } from '~/server/db.server';

export const meta: MetaFunction = () => {
  return [{ title: 'Ask PDF | Heroku at AWS re:Invent' }];
};

export async function loader() {
  const documents = await listPDFs();
  return {
    documents,
  };
}

export default function App() {
  const { documents } = useLoaderData<typeof loader>();
  return (
    <StateContextProvider>
      <Grid.Col span={7}>
        <PDF documents={documents} />
      </Grid.Col>
      <Grid.Col span={5}>
        <Chat />
      </Grid.Col>
    </StateContextProvider>
  );
}
