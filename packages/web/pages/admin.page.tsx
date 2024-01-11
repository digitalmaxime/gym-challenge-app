import React from 'react';
import {
  useColorModeValue,
  HStack,
} from '@chakra-ui/react';
import { getUserLevel, SidebarContent } from './global';
import AdminUser from '../Components/AdminUserComponent';

export default function AdminUserF() {
  const isAuthorized = getUserLevel(2);
  if (isAuthorized !== null) { return isAuthorized; }
  return (
    // eslint-disable-next-line react-hooks/rules-of-hooks
    <HStack bg={useColorModeValue('gray.100', 'gray.900')} height="100%">
      <SidebarContent />
      <AdminUser />
    </HStack>
  );
}
