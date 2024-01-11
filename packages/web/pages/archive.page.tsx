import React from 'react';
import {
  useColorModeValue,
  HStack,
} from '@chakra-ui/react';
import CourseArchive from '../Components/CourseArchiveComponent';
import { getUserLevel, SidebarContent } from './global';

export default function CourseArchiveF() {
  const isAuthorized = getUserLevel(1);
  if (isAuthorized !== null) { return isAuthorized; }
  return (
    // eslint-disable-next-line react-hooks/rules-of-hooks
    <HStack bg={useColorModeValue('gray.100', 'gray.900')} height="100%">
      <SidebarContent />
      <CourseArchive />
    </HStack>
  );
}
