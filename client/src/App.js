import { MantineProvider, ColorSchemeProvider } from '@mantine/core';
import { NotificationsProvider } from '@mantine/notifications';
import { useHotkeys, useLocalStorage, useColorScheme } from '@mantine/hooks';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { IconX } from '@tabler/icons';
import { showNotification } from '@mantine/notifications';

import Home from './pages/Home';
import { AuthProvider } from './context/AuthContext';
import Incidents from './pages/Incidents';
import { SWRConfig } from 'swr';

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
    <AuthProvider>
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
            <SWRConfig
              value={{
                onError: (error, key) => {
                  showNotification({
                    title: 'Error',
                    message: error,
                    icon: <IconX />,
                    color: 'red',
                    autoClose: 5000,
                  });
                },
              }}
            >
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
                </Routes>
              </BrowserRouter>
            </SWRConfig>
          </NotificationsProvider>
        </MantineProvider>
      </ColorSchemeProvider>
    </AuthProvider>
  );
}

export default App;
