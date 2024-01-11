import {
  Input, chakra,
} from '@chakra-ui/react';

const InputHintOk = chakra(Input, {
  baseStyle: {
    border: 'none',
    _focus: {
      boxShadow: 'none',
    },
  },
});

const InputHintNo = chakra(Input, {
  baseStyle: {
    width: '40%',
    borderBottom: '1px',
    borderBottomColor: 'red',
    borderTop: 'none',
    borderRight: 'none',
    borderLeft: 'none',
    borderRadius: '0',
    _focus: {
      boxShadow: 'none',
      borderBottomColor: 'red',
    },
    _hover: {
      borderBottomColor: 'red',
    },
  },
});

const InputNoHoverShadow = chakra(Input, {
  baseStyle: {
    _focus: {
      boxShadow: 'none',
    },
    _hover: {
      borderBottomColor: 'parent',
    },
  },
});

export { InputHintOk, InputHintNo, InputNoHoverShadow };
