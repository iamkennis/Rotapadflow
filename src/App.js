import { Box} from "@chakra-ui/react";
import RotaPadFlow from "./flow";
import 'reactflow/dist/style.css';

// import Layout from '@theme/Layout';

function App() {
  return (
    <>
      <Box height={["100%", null, null, 580]} position="relative">
        <RotaPadFlow />
      </Box>
    </>
  );
}

export default App;
