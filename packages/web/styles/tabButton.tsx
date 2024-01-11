import {
  Text, chakra,
} from '@chakra-ui/react';

const TabButton = chakra(Text, {
  baseStyle: {
    bg: 'whiteAlpha.50',
    fontSize: 'xl',
    textAlign: 'left',
  },
});

export default TabButton;
