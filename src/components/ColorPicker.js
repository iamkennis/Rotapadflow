import React, { memo } from 'react';
import { Input, Box, Stack, InputGroup, InputLeftAddon } from '@chakra-ui/react';
import { Position } from 'reactflow';

import Handle from './Handle';
import Wrapper from './Wrapper';

export default memo(({ data }) => {
  const { label = '', onChange = () => {}, color = '#000' } = data;

  return (
    <Wrapper label={label}>
      <Box pl={1} pr={2}>
        <Stack spacing={1}>
          <InputGroup size="xs">
            <InputLeftAddon children="Requests" />
            <Input
              className="nodrag"
              type="color"
              onChange={(evt) => onChange(evt.target.value)}
              defaultValue={color}
            />
          </InputGroup>
        </Stack>
      </Box>
      <Handle type="source" position={Position.Right} />
    </Wrapper>
  );
});