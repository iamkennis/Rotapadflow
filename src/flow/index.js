import React, { useEffect, useState, useRef } from "react";
import ReactFlow, {
  ReactFlowProvider,
  Background,
  useReactFlow,
  Controls,
} from "reactflow";
import { Box, Flex, Heading, Text,Stack } from "@chakra-ui/react";
import { Image } from "@chakra-ui/react";
import rotapadgirl from "../assets/rotagal.png";

import Hero from "../components/Hero";
import ColorPicker from "../components/ColorPicker";
import Slider from "../components/Slider";
import Switcher from "../components/Switcher";
import Swoopy from "../components/Swoopy";

const nodeTypes = {
  hero: Hero,
  colorpicker: ColorPicker,
  slider: Slider,
  switcher: Switcher,
  swoopy: Swoopy,
};

const nodeStyle = {};
const isMobileFlow = typeof window !== "undefined" && window.innerWidth < 992;
const isLargeFlow = typeof window !== "undefined" && window.innerWidth > 1250;

function getNodePositions(headlineBounds) {
  const px = window.innerWidth * 0.05;
  const rfHeight = window.innerHeight * 0.8;
  const rfWidth = window.innerWidth;

  // if (isMobileFlow) {
  //   const offsetY =
  //     headlineBounds.top +
  //     headlineBounds.height +
  //     (rfHeight - headlineBounds.height) / 2 -
  //     125;

  //   return {
  //     hero: { x: rfWidth - 150 - px, y: offsetY + 15 },
  //     shape: { x: px + px / 4, y: offsetY + 15 },
  //     color: { x: px / 2, y: offsetY + 90 },
  //     zoom: { x: px, y: offsetY + 170 },
  //     swoopy1: { x: 40, y: -40 },
  //     swoopy2: { x: 160, y: 40 },
  //   };
  // }

  // if (isLargeFlow) {
  // const offsetX = window.innerWidth / 2;
  // const offsetY = headlineBounds.top + 20;

  //   return {
  //     hero: { x: offsetX + 340, y: offsetY },
  //     shape: { x: offsetX - 50, y: offsetY - 60 },
  //     color: { x: offsetX - 150, y: offsetY + 80 },
  //     zoom: { x: offsetX - 20, y: offsetY + 220 },
  //     swoopy1: { x: 75, y: -35 },
  //     swoopy2: { x: 160, y: 40 },
  //   };
  // }

  const offsetX = headlineBounds.left + headlineBounds.width + px;
  const offsetY = rfHeight / 2 - 150;

  // const offsetX = window.innerWidth / 2;
  // const offsetY = headlineBounds.top + 20;

  return {
    hero: { x: offsetX + 340, y: offsetY },
    shape: { x: offsetX - 50, y: offsetY - 60 },
    color: { x: offsetX - 150, y: offsetY + 80 },
    zoom: { x: offsetX - 20, y: offsetY + 220 },
    swoopy1: { x: 75, y: -35 },
    swoopy2: { x: 160, y: 40 },
  };
}

const defaultNodes = [];

const defaultEdges = [
  {
    id: "color->hero",
    source: "color",
    target: "hero",
    targetHandle: "color",
    style: {
      stroke: "#A3ADB8",
      strokeWidth: 1.5,
    },
    animated: true,
  },
  {
    id: "zoom->hero",
    source: "zoom",
    target: "hero",
    targetHandle: "zoom",
    style: {
      stroke: "#A3ADB8",
      strokeWidth: 1.5,
    },
    animated: true,
  },
  {
    id: "shape->hero",
    source: "shape",
    target: "hero",
    targetHandle: "shape",
    style: {
      stroke: "#A3ADB8",
      strokeWidth: 1.5,
    },
    animated: true,
  },
];

function RotaPadFlows({ headlineRef }) {
  const { setNodes } = useReactFlow();
  const reactFlowRef = useRef(null);
  const [headlineDimensions, setHeadlineDimensions] = useState(null);
  const [color, setColor] = useState("#851de0");
  const [zoom, setZoom] = useState(12);
  const [shape, setShape] = useState("goods");

  const proOptions = { hideAttribution: true };


  useEffect(() => {
    if (headlineRef.current && reactFlowRef.current) {
      const headlineBbox = headlineRef.current.getBoundingClientRect();
      const rfBbox = reactFlowRef.current.getBoundingClientRect();
      setHeadlineDimensions({
        top: headlineBbox.top - rfBbox.top,
        left: headlineBbox.left - rfBbox.left,
        width: headlineBbox.width,
        height: headlineBbox.height,
      });
    }
  }, []);

  useEffect(() => {
    if (!headlineDimensions) {
      return;
    }

    const nodePositions = getNodePositions(headlineDimensions);

    setNodes([
      {
        id: "hero",
        type: "hero",
        position: nodePositions.hero,
        style: { width: 300, ...nodeStyle },
        data: { color, zoom, shape, label: "ROTAPAD" },
      },
      {
        id: "color",
        type: "colorpicker",
        data: { color, onChange: setColor, label: "OFFICE ADMIN" },
        style: { ...nodeStyle, width: 150 },
        position: nodePositions.color,
      },
      {
        id: "zoom",
        type: "slider",
        data: {
          value: zoom,
          min: 0,
          max: 40,
          onChange: setZoom,
          label: "WHATAPPS MASSAGES",
        },
        style: { ...nodeStyle, width: 150 },
        position: nodePositions.zoom,
      },
      {
        id: "shape",
        type: "switcher",
        data: {
          value: shape,
          options: ["goods", "services"],
          onChange: setShape,
          label: "YOUR WEBSITE",
        },
        style: { ...nodeStyle, width: 170 },
        position: nodePositions.shape,
      },
      {
        id: "swoopy1",
        type: "swoopy",
        draggable: false,
        data: { label: "Website requests", swoopyDir: "bottom" },
        position: nodePositions.swoopy1,
        parentNode: "shape",
      },
      {
        id: "swoopy2",
        type: "swoopy",
        draggable: false,
        data: { label: "WhatsApp requests", swoopyDir: "top" },
        position: nodePositions.swoopy2,
        parentNode: "zoom",
      },
    ]);
  }, [headlineDimensions]);

  useEffect(() => {
    setNodes((nds) =>
      nds.map((n) => {
        if (n.id === "color") {
          n.data = { ...n.data, value: color };
        }
        if (n.id === "hero") {
          n.data = { ...n.data, color };
        }
        return n;
      })
    );
  }, [color]);

  useEffect(() => {
    setNodes((nds) =>
      nds.map((n) => {
        if (n.id === "zoom") {
          n.data = { ...n.data, value: zoom };
        }
        if (n.id === "hero") {
          n.data = { ...n.data, zoom };
        }
        return n;
      })
    );
  }, [zoom]);

  useEffect(() => {
    setNodes((nds) =>
      nds.map((n) => {
        if (n.id === "shape") {
          n.data = { ...n.data, value: shape };
        }
        if (n.id === "hero") {
          n.data = { ...n.data, shape };
        }
        return n;
      })
    );
  }, [shape]);

  return (
    <ReactFlow
      preventScrolling={false}
      zoomOnScroll={false}
      nodeTypes={nodeTypes}
      defaultNodes={defaultNodes}
      defaultEdges={defaultEdges}
      ref={reactFlowRef}
      proOptions={proOptions}
      nodesDraggable={false}
      id="hero"
    >
      <Background />
      <Controls/>
    </ReactFlow>
  );
}

export default () => {
  const headlineRef = useRef();

  return (
    <ReactFlowProvider>
      <Box
        className="headline"
        pointerEvents="none"
        width="100%"
        position="relative"
      >
        <Box
          ref={headlineRef}
          pointerEvents="all"
          // p={3}
          pl={[3, 3, 3, 10, 10]}
          maxWidth={550}
        >
          <Box position="absolute" top="40px" px="20px">
           <Stack>
           <Heading color="purple.800" fontSize={{ base: '34px', md: '34px', lg: '40px' }} fontWeight="black">
            About RotaPad 
            </Heading>
            <Text color="gray.600" fontSize={{ base: '15px', md: '14px', lg: '14px' }} maxW={400}>
            We help teams view their members' schedules at a glance, submit absence requests 
            effortlessly, and receive instant notifications.
             Simplify your workforce management with just a few taps.
            </Text>
           </Stack>
          </Box>

          <Box position="absolute" zIndex={99} right="5%" top={{base:"250px", lg:"200px"}}>
            <Image boxSize="300px" objectFit="contain" src={rotapadgirl} />
          </Box>
        </Box>
      </Box>

      <RotaPadFlows headlineRef={headlineRef} />
    </ReactFlowProvider>
  );
};
