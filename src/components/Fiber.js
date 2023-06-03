import React, { Suspense, useEffect, useRef, useMemo } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { Tetrahedron, Box, MeshWobbleMaterial } from '@react-three/drei';
import { Box as ChakraBox,Card, CardHeader, CardBody,SimpleGrid,Heading,Text} from '@chakra-ui/react';

const isMobileFlow = typeof window !== 'undefined' && window.innerWidth < 992;

const randomVector = (r) => [
  r / 2 - Math.random() * r,
  r / 2 - Math.random() * r,
  r / 2 - Math.random() * r,
];

const randomEuler = () => [
  Math.random() * Math.PI,
  Math.random() * Math.PI,
  Math.random() * Math.PI,
];

const canvasResize = { scroll: false };

function Shape({ type, random, color, ...props }) {
  const ref = useRef();
  useFrame((state) => {
    const t = state.clock.getElapsedTime() + random * 10000;
    ref.current.rotation.set(Math.cos(t / 4) / 2, Math.sin(t / 4) / 2, Math.cos(t / 1.5) / 2);
  });

  const ShapeComponent = type === 'goods' ? Box : Tetrahedron;

  return (
    <ShapeComponent ref={ref} args={[1]} {...props}>
      <MeshWobbleMaterial color={color} />
    </ShapeComponent>
  );
}

function Cam({ zoom }) {
  const { camera } = useThree();

  useEffect(() => {
    camera.position.set(0, 0, +zoom);
  }, [zoom]);

  return null;
}

export default function FibApp({ color, zoom, shape, count = 150 }) {
  const randomData = useMemo(
    () =>
      Array.from({ length: count }, (r = 10) => ({
        random: Math.random(),
        position: randomVector(r),
        rotation: randomEuler(),
      })),
    [count]
  );

  return (
    <ChakraBox height="180">
      <SimpleGrid spacingX='10px' spacingY='10px' columns={3}>
  <Card width={20} height={20}>
  </Card>
  <Card width={20} height={20}>
  </Card>
  <Card width={20} height={20}>
  </Card>
  <Card width={20} height={20}>
  </Card>
  <Card width={20} height={20}>
  </Card>
  <Card width={20} height={20}>
  </Card>
</SimpleGrid>
    </ChakraBox>
  );
}