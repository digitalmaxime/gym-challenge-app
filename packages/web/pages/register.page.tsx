import React, { useState } from 'react';
import router from 'next/router';

import Link from 'next/link';
import {
  Box, Input, Button, FormControl, Text, Spinner,
  Flex, Stack, Avatar, Heading, InputGroup, createStandaloneToast,
} from '@chakra-ui/react';

import { httpsCallable } from 'firebase/functions';
import {
  createUserWithEmailAndPassword, getAuth,
  sendEmailVerification,
} from 'firebase/auth';
import { firebaseFunctionsEmulator } from './global';

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [doing, setDoing] = useState(false);

  const handleSignUp = () => {
    setDoing(true);
    const auth = getAuth();
    createUserWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        // Signed in
        const { user } = userCredential;
        if (auth.currentUser === null) { return; }
        sendEmailVerification(user).then(() => {
          const addToAdminList = httpsCallable(firebaseFunctionsEmulator, 'addToAdminList');
          const { toast } = createStandaloneToast();
          toast({
            title: 'Courriel de vérification envoyé!.',
            description: 'Le courriel de vérification de compte à bien été envoyé.',
            status: 'success',
            duration: 3000,
            isClosable: true,
            position: 'top',
          });
          addToAdminList({}).then(() => { router.push('/notVerified'); });
          setDoing(false);
        }).catch((error) => {
          const errorMessage = error.message;
          const { toast } = createStandaloneToast();
          toast({
            title: "Erreur lors de l'envoie du courriel de vérification",
            description: errorMessage,
            status: 'error',
            duration: 3000,
            isClosable: true,
            position: 'top',
          });
          setDoing(false);
        });
      })
      .catch((error) => {
        const errorMessage = error.message;
        const { toast } = createStandaloneToast();
        toast({
          title: "Erreur lors de l'envoie du courriel de vérification",
          description: errorMessage,
          status: 'error',
          duration: 3000,
          isClosable: true,
          position: 'top',
        });
        setDoing(false);
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
        <Heading color="blue.400">Bienvenue Chez Gappris!</Heading>
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
              </FormControl>
              <Button
                colorScheme="blue"
                onClick={handleSignUp}
                cursor={doing ? 'wait ' : 'pointer'}
                disabled={doing}
              >
                {!doing ? <Text>Créer un compte</Text> : (
                  <Spinner
                    thickness="4px"
                    speed="0.65s"
                    emptyColor="gray.200"
                    color="blue.500"
                    size="lg"
                  />
                )}

              </Button>
            </Stack>
          </form>
        </Box>
      </Stack>
      <Link href="/"> Menu Principal</Link>
    </Flex>
  );
}

export default Login;
