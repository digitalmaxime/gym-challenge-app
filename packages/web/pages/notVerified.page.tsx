import React from 'react';
import type { NextPage } from 'next';
import Link from 'next/link';
import {
  Flex, HStack, Text, Image,
} from '@chakra-ui/react';

export function NotVerified() {
  return (

    <Flex
      flexDirection="column"
      width="100wh"
      height="100vh"
      backgroundColor="gray.200"
      justifyContent="center"
      alignItems="center"
    >
      <HStack>
        <Image paddingTop="25%" bg="blackAlpha.300" src="Logo.png" p="5" />
        <Text fontSize="xl">

          Veuillez vérifier votre compte en cliquant sur le
          lien du message envoyé sur votre adresse email.

        </Text>
        <Text fontSize="xl">Veuillez retourner </Text>
        <Link href="/">
          <Text fontSize="xl" style={{ color: 'blue', cursor: 'pointer' }}>
            sur la page de connexion.
          </Text>

        </Link>
      </HStack>
    </Flex>
  );
}

const WaitPage: NextPage = function Page() {
  return NotVerified();
};

export default WaitPage;
