import React from 'react';
import {
  useColorModeValue,
  HStack,
} from '@chakra-ui/react';

import CourseCreationForm from '../Components/CourseFormComponent';
import { getUserLevel, SidebarContent } from './global';

export default function CourseCreation() {
  const isAuthorized = getUserLevel(1);
  if (isAuthorized !== null) { return isAuthorized; }
  return (
    // eslint-disable-next-line react-hooks/rules-of-hooks
    <HStack bg={useColorModeValue('gray.100', 'gray.900')}>
      <SidebarContent />
      <CourseCreationForm />
    </HStack>
  );
}
