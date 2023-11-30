import type { PDFData } from '~/types/pdf';
import { AspectRatio, Card } from '@mantine/core';

export const PDFViewer = ({ url, name }: PDFData) => {
  return (
    <Card withBorder shadow="md" p="xs">
      <AspectRatio
        ratio={1}
        style={{
          border: 'solid 1px var(--mantine-color-gray-3)',
        }}
      >
        <object data={url} type="application/pdf">
          <iframe title={name} src={url} height={100} />
        </object>
      </AspectRatio>
    </Card>
  );
};
