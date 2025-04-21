import { Container, Flex, HStack, Button, Input } from "@chakra-ui/react";
import React from "react";
import { Link } from "react-router-dom";

import { FaCirclePlus } from "react-icons/fa6";
import Containers from "react-bootstrap/Container";
import { useColorMode } from "./ui/color-mode";
import { IoMoon } from "react-icons/io5";
import { LuSun } from "react-icons/lu";
import { useProductStore } from "@/store/product";
import { useColorModeValue } from "@/components/ui/color-mode";

const Navbar = () => {
  const { colorMode, toggleColorMode } = useColorMode();
  const { searchQuery, setSearchQuery } = useProductStore();
  return (
    <Container maxW={"1140px"} px={4}>
      <Flex
        h={16}
        alignItems={"center"}
        justifyContent={"space-between"}
        flexDir={{
          base: "column",
          sm: "row",
        }}
      >
        <Containers className="my-3">
          <h2 className="fw-bold text-uppercase">
            <Link
              to="/"
              style={{
                background: "linear-gradient(to right, #06b6d4, #3b82f6)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                textDecoration: "none",
              }}
            >
              Product Store 🛒
            </Link>
          </h2>
        </Containers>

        <HStack spacing={2} alignItems={"center"}>
          <Input
            placeholder="Search products..."
            size="lg"
            h="50px"
            fontSize={{ base: "18px", md: "20px", lg: "22px" }} // Responsive font size
            pl={{ base: "24px", md: "36px", lg: "48px" }} // Responsive left padding
            pr="24px"
            borderRadius="full"
            w={{ base: "100%", md: "400px", lg: "500px" }} // Responsive width
            bg={useColorModeValue("gray.100", "gray.700")}
            color={useColorModeValue("black", "white")}
            _placeholder={{
              color: useColorModeValue("gray.500", "gray.400"),
            }}
            _focus={{
              borderColor: "blue.400",
              boxShadow: "0 0 0 1px #3b82f6",
            }}
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />

          <Link to={"/create"}>
            <Button borderRadius="40px">
              <FaCirclePlus fontSize={20} />
            </Button>
          </Link>
          <Button onClick={toggleColorMode} borderRadius="40px">
            {colorMode === "light" ? <IoMoon /> : <LuSun size="20" />}
          </Button>
        </HStack>
      </Flex>
    </Container>
  );
};

export default Navbar;
