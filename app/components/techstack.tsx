import { useMantineTheme, Pill, Title } from '@mantine/core';
export const Techstack = () => {
  const theme = useMantineTheme();
  const techStack = [
    'Node.js',
    'Heroku Postgres',
    'pgvector',
    'LangChain',
    'OpenAI',
    'Remix',
    'Heroku Pipelines',
  ];

  return (
    <>
      <Title order={4}>Tech Stack</Title>
      <Pill.Group>
        {techStack.map((tech) => (
          <Pill key={tech} size="xl" bg={theme.colors.myColor[9]} c="white">
            {tech}
          </Pill>
        ))}
      </Pill.Group>
    </>
  );
};
