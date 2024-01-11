import React, { ReactText } from 'react';
import { connectFirestoreEmulator, getFirestore } from 'firebase/firestore';
import { initializeApp } from 'firebase/app';
import { getFunctions, connectFunctionsEmulator } from 'firebase/functions';
import { getAuth, connectAuthEmulator } from 'firebase/auth';
import { connectStorageEmulator, getStorage } from 'firebase/storage';
import { FiHome, FiTrendingUp, FiCompass } from 'react-icons/fi';
import {
  Box, Image, Text, Flex, Icon, useColorModeValue, FlexProps, HStack,
} from '@chakra-ui/react';
import { IconType } from 'react-icons';
import Link from 'next/link';

const AppContext = { authVal: -1 };
export default AppContext;

// Initialize Firebase
const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_AUTH_DOMAIN,
  projectId: process.env.NEXT_PUBLIC_PROJECT_ID,
  storageBucket: process.env.NEXT_PUBLIC_STORAGE_BUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_MESSAGING_SENDER_ID,
  appId: process.env.NEXT_PUBLIC_APP_ID,
  measurementId: process.env.NEXT_PUBLIC_MEASUREMENT_ID,
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
const firebaseFunctions = getFunctions(app);
const storage = getStorage(app);
const firestore = getFirestore(app);
// connectFirestoreEmulator(firestore, 'localhost', 8080);
// connectFunctionsEmulator(firebaseFunctions, 'localhost', 5001);
// connectStorageEmulator(storage, 'localhost', 9199);
// connectAuthEmulator(auth, 'http://127.0.0.1:9099');
export const firestoreEmulator = firestore;
export const firebaseFunctionsEmulator = firebaseFunctions;
export const storageEmulator = storage;

export interface LinkItemProps {
    name: string;
    icon: IconType;
    link: string;
}

export interface NavItemProps extends FlexProps {
    icon: IconType;
    children: ReactText;
    hrefT:string;
}

export function NavItem({ icon, children, hrefT }: NavItemProps) {
  return (
    <Link href={hrefT} style={{ textDecoration: 'none' }}>
      <Flex
        align="center"
        p="4"
        mx="4"
        borderRadius="lg"
        role="group"
        cursor="pointer"
        _hover={{
          bg: 'cyan.400',
          color: 'white',
        }}
      >
        {icon && (
        <Icon
          mr="4"
          fontSize="16"
          _groupHover={{
            color: 'white',
          }}
          as={icon}
        />
        )}
        {children}
      </Flex>
    </Link>
  );
}

export function SidebarContent() {
  const LinkItems = AppContext.authVal === 2 ? [
    { name: 'Création de cours', icon: FiHome, link: '/cours' },
    { name: 'Modification de cours', icon: FiTrendingUp, link: '/modification' },
    { name: 'Analytiques', icon: FiCompass, link: '/analytiques' },
    { name: 'Gestion de cours', icon: FiCompass, link: '/archive' },
    { name: 'Gestion de comptes', icon: FiCompass, link: '/admin' },
  ] : [
    { name: 'Création de cours', icon: FiHome, link: '/cours' },
    { name: 'Modification de cours', icon: FiTrendingUp, link: '/modification' },
    { name: 'Analytiques', icon: FiCompass, link: '/analytiques' },
    { name: 'Gestion de cours', icon: FiCompass, link: '/archive' },

  ];
  return (
    <Box
      transition="3s ease"
      bg={useColorModeValue('white', 'gray.900')}
      borderRight="1px"
      borderRightColor={useColorModeValue('gray.200', 'gray.700')}
      w="15%"
      top={0}
      pos="fixed"
      height="100%"
    >

      <Image bg="blackAlpha.300" src="Logo.png" p="5" />

      {LinkItems.map((link) => (
        <NavItem key={link.name} icon={link.icon} hrefT={link.link}>
          {link.name}
        </NavItem>
      ))}
    </Box>
  );
}

export function Unauthorized() {
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
        <Text>

          Vous n&apos;avez pas accès a cette page. Vous devez attendre que
          l&apos;administrateur change les permissions de votre compte pour y accéder.

        </Text>
        <Text fontSize="xl">Veuillez retourner </Text>
        <Link href="/">
          <Text fontSize="xl" style={{ color: 'blue', cursor: 'pointer' }}>
            sur la page de connexion.
          </Text>

        </Link>
      </HStack>
      {' '}

    </Flex>
  );
}

export function DisconnectedContent() {
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
        <Text fontSize="xl">Vous avez été deconnecté. Veuillez retourner </Text>
        <Link href="/">
          <Text fontSize="xl" style={{ color: 'blue', cursor: 'pointer' }}>
            sur la page de connexion.
          </Text>

        </Link>
      </HStack>
    </Flex>

  );
}

export function getUserLevel(authRequired: number) {
  if (AppContext.authVal === -1) { return DisconnectedContent(); }
  if (AppContext.authVal < authRequired) { return Unauthorized(); }
  return (null);
}
