import React, { useState } from "react";
import { Box, Container, Button, Input } from "@chakra-ui/react";
import { useColorModeValue } from "@/components/ui/color-mode";
import { VStack } from "@chakra-ui/react";
import { useProductStore } from "@/store/product";
import { Toaster, toaster } from "@/components/ui/toaster";
import { Link } from "react-router-dom";  

const CreatePage = () => {
 
  const inputTextColor = useColorModeValue("gray.800", "white");
  
  const [newProduct, setNewProduct] = useState({
    name: "",
    price: "",
    image: "",
  });

  const { createProduct } = useProductStore();
  const handleAddProduct = async () => {
    const { success, message } = await createProduct(newProduct);
    if (!success) {
      toaster.create({
        description: message || "Failed to create product",
        type: "error",
      });
    } else {
      toaster.create({
        description: "Product created successfully!",
        type: "success",
      });
    }
    setNewProduct({ name: "", price: "", image: "" });
  };
  return (
    <Container maxW={"container.sm"}>
      <VStack spacing={8}>
        <Link style={{
            background: "linear-gradient(to right, #06b6d4, #3b82f6)",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
            textDecoration: "none",
            fontSize:"40px"
          }}>
          Create New Product
        </Link>
        <Box
          w={"full"}
          bg={useColorModeValue("white", "gray.900")} 
          p={6}
          rounded={"1g"}
          shadow={"md"}
        >
          <VStack spacing={4}>
            <Input
              placeholder="Product Name"
              name="name"
              value={newProduct.name}
              color={inputTextColor}
              onChange={(e) =>
                setNewProduct({ ...newProduct, name: e.target.value })
              }
            />
            <Input
              placeholder="Price"
              name="price"
              type="number"
              value={newProduct.price}
              color={inputTextColor}
              onChange={(e) =>
                setNewProduct({ ...newProduct, price: e.target.value })
              }
            />
            <Input
              placeholder="Image URL"
              name="image"
              value={newProduct.image}
              color={inputTextColor}
              onChange={(e) =>
                setNewProduct({ ...newProduct, image: e.target.value })
              }
            />
            <Button colorScheme="blue" onClick={handleAddProduct} w="half" borderRadius="full">
              Add Product
              <Toaster />
            </Button>

            <Link to="/">
              <Button colorScheme="blue" w={125} borderRadius="full"  >
                Back
              </Button>
            </Link>
          </VStack>
        </Box>
      </VStack>
    </Container>
  );
};

export default CreatePage;
