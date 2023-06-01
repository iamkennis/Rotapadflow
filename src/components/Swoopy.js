import React from 'react';
import { Flex, Box } from '@chakra-ui/react';

export default function Swoopy({ data }) {
  return (
    <Flex
      fontSize={14}
      fontFamily="mono"
      alignItems={data.swoopyDir === 'top' ? 'flex-end' : 'flex-start'}
      color="gray.500"
      fontWeight="bold"
    >
      <Box
        transform={data.swoopyDir === 'top' ? 'rotate(120deg) scale(-1, 1)' : 'none'}
        fontSize={30}
        fontWeight="normal"
      >
        ⤹
      </Box>
      <Box ml={1}>{data.label}</Box>
    </Flex>
  );
}