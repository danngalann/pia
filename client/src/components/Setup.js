import { Center, createStyles, Stack, Title, Text, TextInput, PasswordInput, Button } from '@mantine/core';
import { useForm } from '@mantine/form';
import { IconLock, IconAt } from '@tabler/icons';
import React from 'react';

export default function Setup() {
  const { classes } = useStyles();
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

    console.log(userData); // TODO send to server
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
        <form onSubmit={form.onSubmit(submitUser)}>
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
            <Button type="submit">Finish setup</Button>
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
