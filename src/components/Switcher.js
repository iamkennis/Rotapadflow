import React from 'react';
import { RadioGroup, Radio, Stack, Text } from '@chakra-ui/react';
import { Position } from 'reactflow';

import Handle from './Handle';
import Wrapper from './Wrapper';

export default function Switcher({ data }) {
  const { label = '', options = [], onChange = () => {}, value } = data;

  return (
    <Wrapper label={label}>
      <Handle type="source" position={Position.Right} />
      <RadioGroup fontFamily="mono" value={value} onChange={onChange}>
        <Stack direction="row">
          {options.map((option) => (
            <Radio size="sm" key={option} value={option}>
              <Text fontSize="11" fontFamily="mono" as="span">
                {option}
              </Text>
            </Radio>
          ))}
        </Stack>
      </RadioGroup>
    </Wrapper>
  );
}