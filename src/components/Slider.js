import React from 'react';
import { Box, Slider, SliderTrack, SliderFilledTrack, SliderThumb } from '@chakra-ui/react';
import { Position } from 'reactflow';

import Handle from './Handle';
import Wrapper from './Wrapper';

export default function Sliders({ data }) {
  const { label = '', min = 0, max = 1, onChange = () => {}, value = 0.5 } = data;

  return (
    <Wrapper label={label}>
      <Handle type="source" position={Position.Right} />
      <Box pl={1} pr={4}>
        <Slider
          className="nodrag"
          min={min}
          max={max}
          value={value}
          onChange={onChange}
          aria-label="zoom-slider"
          isReversed
        >
          <SliderTrack>
            <SliderFilledTrack />
          </SliderTrack>
          <SliderThumb />
        </Slider>
      </Box>
    </Wrapper>
  );
}