import {
  Box, Flex, chakra,
} from '@chakra-ui/react';

const BoxCard = chakra(Box, {
  baseStyle: {
    boxShadow: 'xl',
    p: '5',
    w: '70%',
    rounded: 'md',
    bg: 'white',
    textAlign: 'left',
    alignSelf: 'center',
    verticalAlign: 'true',
  },
});

export default BoxCard;
