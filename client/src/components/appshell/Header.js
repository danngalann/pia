import { ActionIcon, Anchor, Badge, Button, Group, Title, useMantineColorScheme } from '@mantine/core';
import { SpotlightProvider, openSpotlight } from '@mantine/spotlight';
import { IconSun, IconMoonStars, IconSearch, IconBrandGithub } from '@tabler/icons';

// TODO This information should come from API
const actions = [
  {
    title: 'Home',
    description: 'Get to home page',
    onTrigger: () => console.log('Home'),
  },
  {
    title: 'Dashboard',
    description: 'Get full information about current system status',
    onTrigger: () => console.log('Dashboard'),
  },
  {
    title: 'Documentation',
    description: 'Visit documentation to lean more about all features',
    onTrigger: () => console.log('Documentation'),
  },
];

export default function Header() {
  const { colorScheme, toggleColorScheme } = useMantineColorScheme();
  const darkMode = colorScheme === 'dark';

  return (
    <SpotlightProvider
      actions={actions}
      searchIcon={<IconSearch size={18} />}
      searchPlaceholder="Search..."
      shortcut="mod + k"
      nothingFoundMessage="Nothing found..."
    >
      <header style={{ display: 'flex', justifyContent: 'space-between', margin: '1rem 1.5rem' }}>
        <Title>PIA</Title>
        <Group>
          {/* <Button
            leftIcon={<IconSearch />}
            variant="default"
            rightIcon={
              <Badge
                color="gray"
                variant="filled"
                radius="sm"
              >
                Ctrl + K
              </Badge>
            }
            onClick={() => openSpotlight()}
          >
            Search
          </Button> */}
          <Anchor
            href="https://github.com/danngalann/pia"
            target="_blank"
            style={{ display: 'flex', alignItems: 'center' }}
            title="PIA GitHub repository"
          >
            <IconBrandGithub />
          </Anchor>
          <ActionIcon
            color={darkMode ? 'yellow' : 'blue'}
            onClick={() => toggleColorScheme()}
            title={darkMode ? 'Switch to light mode (Ctrl+J)' : 'Switch to dark mode (Ctrl+J)'}
          >
            {darkMode ? <IconSun /> : <IconMoonStars />}
          </ActionIcon>
        </Group>
      </header>
    </SpotlightProvider>
  );
}
