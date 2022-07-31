import { SWRConfig } from 'swr';
import { IconX } from '@tabler/icons';
import { showNotification } from '@mantine/notifications';
import { revalidateToken } from '../../api/user';

export default function ApiConfig({ children }) {
  return (
    <SWRConfig
      value={{
        onError: (error, key) => {
          showNotification({
            title: 'Error',
            message: error.message,
            icon: <IconX />,
            color: 'red',
            autoClose: 5000,
          });
        },
        onErrorRetry: (error, key, config, revalidate, { retryCount }) => {
          // Never retry on 404.
          if (error.status === 404) return;

          if (error.status === 403) {
            revalidateToken();
          }

          // Only retry up to 3 times.
          if (retryCount >= 3) return;

          // Retry after 20 miliseconds.
          setTimeout(() => revalidate({ retryCount }), 20);
        },
      }}
    >
      {children}
    </SWRConfig>
  );
}
