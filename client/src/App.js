import { MantineProvider, ColorSchemeProvider } from '@mantine/core';
import { NotificationsProvider } from '@mantine/notifications';
import { useHotkeys, useLocalStorage, useColorScheme } from '@mantine/hooks';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

import Home from './pages/Home';
import Incidents from './pages/Incidents';
import ApiConfig from './components/api/ApiConfig';
import Login from './pages/Login';

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
        <NotificationsProvider position="bottom-right">
          <ApiConfig>
            <BrowserRouter>
              <Routes>
                <Route
                  path="/"
                  element={<Home />}
                />
                <Route
                  path="/incidents"
                  element={<Incidents />}
                />
                <Route
                  path="/incidents/:id"
                  element={<Incidents />}
                />
                <Route
                  path="/login"
                  element={<Login />}
                />
              </Routes>
            </BrowserRouter>
          </ApiConfig>
        </NotificationsProvider>
      </MantineProvider>
    </ColorSchemeProvider>
  );
}

export default App;
