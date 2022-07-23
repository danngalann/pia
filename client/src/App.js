import { MantineProvider, ColorSchemeProvider, Title } from '@mantine/core';
import { useHotkeys, useLocalStorage, useColorScheme } from '@mantine/hooks';

function App() {
  // Try to detect the user's preferred color scheme via media query
  // https://developer.mozilla.org/en-US/docs/Web/CSS/@media/prefers-color-scheme
  const preferredColorScheme = useColorScheme();

  // Override the user's preferred color scheme with stored value if exists
  const [colorScheme, setColorScheme] = useLocalStorage({
    key: 'mantine-color-scheme',
    defaultValue: preferredColorScheme,
    getInitialValueInEffect: true,
  });

  const toggleColorScheme = value => setColorScheme(value || (colorScheme === 'dark' ? 'light' : 'dark'));

  // Allow changing the color scheme via keyboard shortcut
  useHotkeys([['mod+J', () => toggleColorScheme()]]);

  return (
    <ColorSchemeProvider
      colorScheme={colorScheme}
      toggleColorScheme={toggleColorScheme}
    >
      <MantineProvider
        theme={{ colorScheme }}
        withGlobalStyles
        withNormalizeCSS
      >
        <Title>Hello world</Title>
      </MantineProvider>
    </ColorSchemeProvider>
  );
}

export default App;
