import { Center, createStyles, Stack, Title, Text, TextInput, PasswordInput, Button } from '@mantine/core';
import { IconLock, IconAt } from '@tabler/icons';
import React from 'react';

export default function Setup() {
  const { classes } = useStyles();

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
        <Stack>
          <TextInput
            label="Email address"
            placeholder="johndoe@yourcompany.com"
            radius="md"
            size="md"
            icon={<IconAt size={16} />}
            required
          />
          <PasswordInput
            label="Password"
            radius="md"
            size="md"
            icon={<IconLock size={16} />}
            required
          />
          <PasswordInput
            label="Repeat password"
            radius="md"
            size="md"
            icon={<IconLock size={16} />}
            required
          />
          <Button>Finish setup</Button>
        </Stack>
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
