import { Center, createStyles, Stack, Title, Text, TextInput, PasswordInput, Button } from '@mantine/core';
import { useForm } from '@mantine/form';
import { showNotification } from '@mantine/notifications';
import { IconLock, IconAt, IconX } from '@tabler/icons';
import React from 'react';
import { createUser } from '../../api/user';
import { useAuth } from '../../context/AuthContext';

export default function Setup() {
  const { classes } = useStyles();
  const { setToken, setRefreshToken } = useAuth();

  const form = useForm({
    initialValues: {
      email: '',
      password: '',
    },
    validate: {
      email: value => (/^\S+@\S+$/.test(value) ? null : 'Invalid email'),
      password: value => (value.length < 8 ? 'Password must be at least 8 characters' : null),
    },
  });

  const submitUser = formData => {
    const userData = {
      ...formData,
    };

    createUser(userData)
      .then(res => {
        setToken(res.data.accessToken);
        setRefreshToken(res.data.refreshToken); // TODO Implement some way to refresh tokens
        // TODO Redirect to incidents page
      })
      .catch(err => {
        showNotification({
          title: 'Error',
          message: err.message,
          icon: <IconX />,
          color: 'red',
          autoClose: 5000,
        });
      });
  };

  return (
    <Center style={{ height: '100vh' }}>
      <Stack
        className={classes.formContainer}
        spacing="xl"
      >
        <div>
          <Center>
            <Title>Add your first account</Title>
          </Center>
          <Text size="xs">
            Add your first account to complete application setup. This account will act as the main application
            administrator.
          </Text>
        </div>
        <form>
          <Stack>
            <TextInput
              label="Email address"
              placeholder="johndoe@yourcompany.com"
              radius="md"
              size="md"
              icon={<IconAt size={16} />}
              required
              {...form.getInputProps('email')}
            />
            <PasswordInput
              label="Password"
              radius="md"
              size="md"
              icon={<IconLock size={16} />}
              required
              {...form.getInputProps('password')}
            />
            <Button onClick={form.onSubmit(submitUser)}>Finish setup</Button>
          </Stack>
        </form>
      </Stack>
    </Center>
  );
}

const useStyles = createStyles(theme => ({
  formContainer: {
    backgroundColor: theme.colorScheme === 'dark' ? theme.colors.gray[9] : theme.colors.gray[1],
    padding: 40,
    borderRadius: 10,
    boxShadow: theme.shadows.md,
    maxWidth: 500,
  },
}));
