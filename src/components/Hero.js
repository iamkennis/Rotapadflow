import React from 'react';
import { Box } from '@chakra-ui/react';
import { Position } from 'reactflow';

import Fiber from './Fiber';
import Handle from './Handle';
import Wrapper from './Wrapper';

export default function HeroNode({ data }) {
  const { label = '' } = data;

  return (
    <Wrapper label={label}>
      <Box height="100%" width="100%">
        <Fiber {...data} />
        <Handle type="target" position={Position.Left} style={{ top: 20 }} id="shape" />
        <Handle type="target" position={Position.Left} style={{ top: 40 }} id="color" />
        <Handle type="target" position={Position.Left} style={{ top: 60 }} id="zoom" />
      </Box>
    </Wrapper>
  );
}