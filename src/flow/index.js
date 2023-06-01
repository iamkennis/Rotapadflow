import React, { useEffect, useState, useRef } from "react";
import ReactFlow, {
  ReactFlowProvider,
  Background,
  useReactFlow,
} from "reactflow";
import { Box,Text } from "@chakra-ui/react";

import HeroRD from "../components/Hero";
import ColorPickerRD from "../components/ColorPicker";
import SliderRD from "../components/Slider";
import SwitcherRD from "../components/Switcher";
import SwoopyRD from "../components/Swoopy";

const nodeTypes = {
  hero: HeroRD,
  colorpicker: ColorPickerRD,
  slider: SliderRD,
  switcher: SwitcherRD,
  swoopy: SwoopyRD,
};

const nodeStyle = {};
const isMobileFlow = typeof window !== "undefined" && window.innerWidth < 992;
const isLargeFlow = typeof window !== "undefined" && window.innerWidth > 1250;

function getNodePositions(headlineBounds) {
  const px = window.innerWidth * 0.05;
  const rfHeight = window.innerHeight * 0.8;
  const rfWidth = window.innerWidth;

  if (isMobileFlow) {
    const offsetY =
      headlineBounds.top +
      headlineBounds.height +
      (rfHeight - headlineBounds.height) / 2 -
      125;

    return {
      hero: { x: rfWidth - 150 - px, y: offsetY + 15 },
      shape: { x: px + px / 4, y: offsetY + 15 },
      color: { x: px / 2, y: offsetY + 90 },
      zoom: { x: px, y: offsetY + 170 },
      swoopy1: { x: 40, y: -40 },
      swoopy2: { x: 160, y: 40 },
    };
  }

  if (isLargeFlow) {
    const offsetX = window.innerWidth / 2;
    const offsetY = headlineBounds.top + 20;

    return {
      hero: { x: offsetX + 340, y: offsetY },
      shape: { x: offsetX - 50, y: offsetY - 60 },
      color: { x: offsetX - 150, y: offsetY + 80 },
      zoom: { x: offsetX - 20, y: offsetY + 220 },
      swoopy1: { x: 75, y: -35 },
      swoopy2: { x: 160, y: 40 },
    };
  }

  const offsetX = headlineBounds.left + headlineBounds.width + px;
  const offsetY = rfHeight / 2 - 150;

  return {
    hero: { x: rfWidth - px - 180, y: offsetY + 20 },
    shape: { x: offsetX, y: offsetY - 10 },
    color: { x: offsetX, y: offsetY + 100 },
    zoom: { x: offsetX, y: offsetY + 200 },
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
        style: { width: isLargeFlow ? 300 : 200, ...nodeStyle },
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
      id="hero"
    >
      <Background />
    </ReactFlow>
  );
}

export default () => {
  const headlineRef = useRef();

  return (
    <ReactFlowProvider>
      <Box
        top={[0, 0, 0, 150]}
        left={[0, 0, 0, "20px"]}
        right={0}
        bottom={0}
        position="absolute"
        maxWidth={100}
        className="headline"
        pointerEvents="none"
        ref={headlineRef}
      >
        <Box
          position="absolute"
          top={[0, 0, 0, -140]}
          left={[0, 0, 0, "20px"]}
          right={0}
          bottom={0}
        >
          {" "}
          <Text color="#851de0" fontSize="18px" fontWeight="black">
            ROTA
            <span
              style={{
                backgroundColor: "#851de0",
                padding: 3,
                color: "white",
                borderRadius: "5px",
              }}
            >
              PAD
            </span>
          </Text>
        </Box>
      </Box>
     <RotaPadFlows headlineRef={headlineRef} />
    </ReactFlowProvider>
  );
};
