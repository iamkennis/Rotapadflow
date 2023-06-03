import { Box,Stack,Image,Text,Link} from "@chakra-ui/react";
import RotaPadFlow from "./flow";
import 'reactflow/dist/style.css';
import logo from "./assets/rotapadlogo.png";
// import Layout from '@theme/Layout';

function App() {
  return (
    <div>
        <Stack height="30%" cursor="pointer" px={{base:"30px", lg:"55px"}}>
          <Link href="https://site.rotapad.com">
          <Image boxSize="100px" objectFit="contain" src={logo} alt="logo" />
          </Link>
          </Stack>
      <Box height={[800, 500, 500]} position="relative">
        <RotaPadFlow />
      </Box>
       <Box bg="#758ec5" height="200px">
          <Stack>
          <Text>support@rotapad.com</Text>
          <Text></Text>
          </Stack>
          <Stack>
          <Text></Text>
          <Text></Text>
          </Stack>
       </Box>
    </div>
  );
}

export default App;
