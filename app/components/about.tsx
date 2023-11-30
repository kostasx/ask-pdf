import { useDisclosure, useToggle } from '@mantine/hooks';
import {
  useMantineTheme,
  Anchor,
  Image,
  Modal,
  Stack,
  Text,
  Divider,
} from '@mantine/core';
import { IconPdf, IconHeart } from '@tabler/icons-react';
import { Techstack } from '~/components/techstack';

export const About = () => {
  const [opened, { open, close }] = useDisclosure();
  const [value, toggle] = useToggle([
    'ask-pdf-diagram.png',
    'ask-pdf-diagram-steps.png',
  ]);
  const theme = useMantineTheme();

  return (
    <>
      <Modal
        opened={opened}
        onClose={close}
        title={
          <Text size="xl" fw={600}>
            Ask <IconPdf />
          </Text>
        }
        size="xl"
        centered
        overlayProps={{
          backgroundOpacity: 0.55,
          blur: 3,
        }}
      >
        <Stack>
          <Text size="xl">
            Built with <IconHeart color={theme.colors.myColor[9]} size={18} />{' '}
            by the Heroku Developer Relations Team
          </Text>
          <Divider />
          <Techstack />
          <Divider />
          <Image
            src={value}
            onClick={() => toggle()}
            style={{
              cursor: 'pointer',
            }}
          />
        </Stack>
      </Modal>
      <Anchor c="white" onClick={open}>
        <IconPdf size={42} />
      </Anchor>
    </>
  );
};
