import type { GetServerSidePropsContext, InferGetServerSidePropsType } from 'next';
import { getCsrfToken } from 'next-auth/react';
import {
  Box,
  Button,
  Checkbox,
  Container,
  FormControl,
  FormLabel,
  Heading,
  HStack,
  Input,
  Stack,
  Text,
} from '@chakra-ui/react';
import { Logo } from '../../components/Logo';
import { PasswordField } from '../../components/PasswordField';

export default function SignIn({ csrfToken }: InferGetServerSidePropsType<typeof getServerSideProps>) {
  return (
    <Container maxW="lg" py={{ base: '12', md: '24' }} px={{ base: '0', sm: '8' }}>
      <Stack spacing="8">
        <Stack spacing="6">
          <Logo />
          <Stack spacing={{ base: '2', md: '3' }} textAlign="center">
            <Heading size={{ base: 'xs', md: 'sm' }}>Log in to your account</Heading>
          </Stack>
        </Stack>
        <Box
          py={{ base: '0', sm: '8' }}
          px={{ base: '4', sm: '10' }}
          bg={{ base: 'transparent', sm: 'bg-surface' }}
          boxShadow={{ base: 'none', sm: 'md' }}
          borderRadius={{ base: 'none', sm: 'xl' }}
        >
          <form method="post" action="/api/auth/callback/credentials">
            <input name="csrfToken" type="hidden" defaultValue={csrfToken} />
            <Stack spacing="6">
              <Stack spacing="5">
                <FormControl>
                  <FormLabel htmlFor="email">Email</FormLabel>
                  <Input id="email" type="text" name="username" />
                </FormControl>
                <PasswordField />
              </Stack>
              <HStack justify="space-between">
                <Checkbox defaultChecked>Remember me</Checkbox>
                <Button variant="link" colorScheme="teal" size="sm">
                  Forgot password?
                </Button>
              </HStack>
              <Stack spacing="6">
                <Button variant="primary" type="submit">
                  Sign in
                </Button>
              </Stack>
            </Stack>
          </form>
        </Box>
      </Stack>
    </Container>
  );
}

export async function getServerSideProps(context: GetServerSidePropsContext) {
  return {
    props: {
      csrfToken: await getCsrfToken(context),
    },
  };
}
