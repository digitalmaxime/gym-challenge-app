/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useState } from 'react';
import router from 'next/router';
import {
  Box, Input, Button, FormControl, FormHelperText, Spinner, Text,
  Flex, Stack, Avatar, Heading, Link, InputGroup, Divider, createStandaloneToast,
} from '@chakra-ui/react';
import { httpsCallable } from 'firebase/functions';
import {
  sendPasswordResetEmail, signInWithEmailAndPassword,
} from 'firebase/auth';
import AuthLevel from '../utils/AuthLevel';
import AppContext, { auth, firebaseFunctionsEmulator } from './global';

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [signIn, setsignIn] = useState(false);

  const handleSignUp = () => {
    router.push('/register');
  };

  const handleLogin = () => {
    setsignIn(true);
    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        const getUserAuthLevel = httpsCallable(firebaseFunctionsEmulator, 'getUserAuthLevel');
        const userEmail = auth.currentUser?.email;
        if (userEmail === null || userEmail === undefined) { router.push('/disconnected'); }

        getUserAuthLevel({ userEmail }).then((result) => {
          const { user } = userCredential;
          if (user.emailVerified) {
            AppContext.authVal = result.data as AuthLevel;
            if (result.data as AuthLevel > 0) { router.push('/cours'); } else { router.push('/unauthorized'); }
          } else { router.push('/notVerified'); }

          auth.onAuthStateChanged((userObserv) => {
            if (userObserv === null) {
              router.push('/disconnected');
            }
          });
          setsignIn(false);
          // Signed in
        });
      })
      .catch((error) => {
        const { toast } = createStandaloneToast();
        toast({
          title: 'Erreur de connection.',
          description: error.message,
          status: 'error',
          duration: 3000,
          isClosable: true,
          position: 'top',
        });
        setsignIn(false);
      });
  };

  const handleResetPassword = () => {
    sendPasswordResetEmail(auth, email)
      .then(() => {
      // Password reset email sent!
        const { toast } = createStandaloneToast();
        toast({
          title: 'Courriel de réinitialisation envoyé!.',
          description: 'Le courriel de réinitialisation de mot de passe à bien été envoyé.',
          status: 'success',
          duration: 3000,
          isClosable: true,
          position: 'top',
        });
        // ..
      })
      .catch((error) => {
        const errorMessage = error.message;
        const { toast } = createStandaloneToast();
        toast({
          title: "Erreur lors de l'envoie du courriel de réinitialisation",
          description: errorMessage,
          status: 'error',
          duration: 3000,
          isClosable: true,
          position: 'top',
        });
        // ..
      });
  };

  return (
    <Flex
      flexDirection="column"
      width="100wh"
      height="100vh"
      backgroundColor="gray.200"
      justifyContent="center"
      alignItems="center"
    >
      <Stack
        flexDir="column"
        mb="2"
        justifyContent="center"
        alignItems="center"
      >
        <Avatar bg="blue.500" />
        <Heading color="blue.400">Connectez vous sur Gappris!</Heading>
        <Box minW={{ base: '90%', md: '500px' }}>
          <form>
            <Stack
              spacing={4}
              p="1rem"
              backgroundColor="whiteAlpha.900"
              boxShadow="md"
            >
              <FormControl>
                <InputGroup>
                  <Input
                    type="email"
                    placeholder="email"
                    onChange={(event) => setEmail(event.currentTarget.value)}
                  />
                </InputGroup>
              </FormControl>
              <FormControl>
                <InputGroup>
                  <Input
                    type="password"
                    placeholder="Mot de Passe"
                    onChange={(event) => setPassword(event.currentTarget.value)}
                  />
                </InputGroup>
                <FormHelperText textAlign="left">
                  <Link onClick={handleResetPassword}>Mot de passe oublié?</Link>
                </FormHelperText>
              </FormControl>
              <Button
                colorScheme="blue"
                onClick={handleLogin}
                cursor={signIn ? 'wait ' : 'pointer'}
                disabled={signIn}
              >
                {!signIn ? <Text>Connexion</Text> : (
                  <Spinner
                    thickness="4px"
                    speed="0.65s"
                    emptyColor="gray.200"
                    color="blue.500"
                    size="lg"
                  />
                )}
              </Button>
              <Divider />
              <Button colorScheme="blue" onClick={handleSignUp} disabled={signIn}> Créer Un Compte </Button>
            </Stack>
          </form>
        </Box>
      </Stack>
    </Flex>
  );
}
export default Login;
