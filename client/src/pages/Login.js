import { Center, createStyles, Stack, Title, Text, TextInput, PasswordInput, Button } from '@mantine/core';
import { useNavigate } from 'react-router-dom';
import { showNotification } from '@mantine/notifications';
import { IconLock, IconAt, IconX } from '@tabler/icons';
import { useForm } from '@mantine/form';

import { login } from '../api/user';

export default function Login() {
  const { classes } = useStyles();
  const navigate = useNavigate();

  const form = useForm({
    initialValues: {
      email: '',
      password: '',
    },
    validate: {
      email: value => (/^\S+@\S+$/.test(value) ? null : 'Invalid email'),
    },
  });

  const submitUser = formData => {
    const userData = {
      ...formData,
    };

    login(userData)
      .then(() => {
        navigate('/incidents');
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
            <Title>Login</Title>
          </Center>
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
            <Button onClick={form.onSubmit(submitUser)}>Login</Button>
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
    width: 500,
  },
}));
