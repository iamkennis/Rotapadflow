import { Box, Stack, Image, Text, Link, Flex } from "@chakra-ui/react";
import RotaPadFlow from "./flow";
import {AiOutlinePhone} from 'react-icons/ai'
import { MdOutlineLocationOn,MdEmail} from "react-icons/md";
import {FaTwitter,FaInstagram} from 'react-icons/fa'
import "reactflow/dist/style.css";
import logo from "./assets/rotapadlogo.png";
// import Layout from '@theme/Layout';

function App() {
  return (
    <div>
      <Stack height="30%" cursor="pointer" px={{ base: "30px", lg: "55px" }}>
        <Link href="https://site.rotapad.com">
          <Image boxSize="100px" objectFit="contain" src={logo} alt="logo" />
        </Link>
      </Stack>
      <Box height={[800, 500, 500]} position="relative">
        <RotaPadFlow />
      </Box>
      <Box bg="#dee9ff" height="200px" px="25px" pt="95px">
        <Flex alignItems="center" gap="20px">
          <Box
            w="35px"
            h="35px"
            color="white"
            bg="#0037a5"
            rounded="full"
          >
            <Stack p="9px"><MdOutlineLocationOn/></Stack>
          </Box>
          <Text color="black">support@rotapad.com</Text>
        </Flex>
        <Flex alignItems="center" gap="20px">
          <Box
            w="35px"
            h="35px"
            color="white"
            bg="#0037a5"
            rounded="full"
          >
            <Stack p="9px"><AiOutlinePhone/></Stack>
          </Box>
          <Text color="black">+01 4033901190</Text>
        </Flex>
      </Box>
      <Flex height={{ base: '150px', md: '150px', lg: '70px' }} flexDirection={{ base: 'column', md: 'column', lg: 'row' }} bg="#c5daff" justifyContent="space-between" alignItems="center" px="25px" py={{base:"25px",md:"20px"}}>
      <Stack height="30%">
          <Image boxSize="100px" objectFit="contain" src={logo} alt="logo" />
      </Stack>
      <Stack>
        <Text color="black" fontSize={{ base: '14px', md: '16px', lg: '16px' }} textAlign="center" fontWeight="bold">Made with Love from Calgary, Canada. Copyright © 2023</Text>
      </Stack>
      <Stack>
      <Flex alignItems="center" gap="20px">
          <Box
            w="45px"
            h="45px"
            color="white"
            bg="#dee9ff"
            rounded="full"
            
          >
            <Link href="https://twitter.com/therotapad">
            <Stack p="15px" color="#0037a5"><FaTwitter/></Stack>
            </Link>
          </Box>
          <Box
            w="45px"
            h="45px"
            color="white"
            bg="#dee9ff"
            rounded="full"
          >
            <Link href="https://www.instagram.com/therotapad" _hover="#0037a5">
            <Stack p="15px" color="#0037a5"><FaInstagram/></Stack>
            </Link>
          </Box>
          <Box
            w="45px"
            h="45px"
            color="white"
            bg="#dee9ff"
            rounded="full"
          >
            <Link href="http://support@rotapad.com/" _hover="#0037a5">
            <Stack p="15px" color="#0037a5"><MdEmail/></Stack>
            </Link>
          </Box>
        </Flex>
      </Stack>
      </Flex>
    </div>
  );
}

export default App;
