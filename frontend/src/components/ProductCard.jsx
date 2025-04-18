import React, { useState } from "react";
import { Box, Heading, HStack, Text, Image, Input } from "@chakra-ui/react";
import { useColorModeValue } from "./ui/color-mode";
import { MdDelete } from "react-icons/md";
import { FaRegEdit } from "react-icons/fa";
import { useProductStore } from "@/store/product";
import { Toaster, toaster } from "@/components/ui/toaster";
import * as Dialog from "@radix-ui/react-dialog";

const ProductCard = ({ product }) => {
  const textColor = useColorModeValue("gray.600", "gray.200");
  const bg = useColorModeValue("white", "gray.800");
  const iconColor = useColorModeValue("red.600", "red.300");
  const hoverBg = useColorModeValue("red.100", "red.600");
  const hoverColor = useColorModeValue("red.800", "white");
  const borderColor = useColorModeValue("red.300", "red.500");
  const iconColor1 = useColorModeValue("blue.600", "blue.200");
  const hoverColor1 = useColorModeValue("blue.800", "white");
  const borderColor1 = useColorModeValue("blue.300", "blue.100");
  const hoverBg1 = useColorModeValue("blue.50", "blue.900");
  const [isOpen, setIsOpen] = useState(false);
  const { deleteProduct, updateProduct } = useProductStore();
  const [updatedProduct, setUpdatedProduct] = useState(product);

  // Styling helpers

  const cancelBtnStyle = {
    padding: "8px 16px",
    backgroundColor: "#f5f5f5",
    border: "1px solid #ccc",
    borderRadius: "5px",
    cursor: "pointer",
  };

  const updateBtnStyle = {
    padding: "8px 16px",
    backgroundColor: "#3182ce",
    color: "white",
    border: "none",
    borderRadius: "5px",
    cursor: "pointer",
  };

  const handleDeleteProduct = async (pid) => {
    const { success, message } = await deleteProduct(pid);
    if (!success) {
      toaster.create({
        description: message,
        type: "error",
      });
    } else {
      toaster.create({
        description: "Product Deleted successfully😑!",
        type: "success",
      });
    }
  };

  const handleUpdateProduct = async (pid, updatedProduct) => {
    toaster.create({
      description: "Product Updated successfully🥳!",
      type: "info",
    });
    const { success, message } = await updateProduct(pid, updatedProduct);
    onclose();
    if (!success) {
      toaster.create({
        description: message,
        type: "error",
      });
    } else {
      toaster.create({
        description: "Product Updated successfully🥳!",
        type: "success",
      });
    }
  };

  return (
    <Box
      shadow="lg"
      rounded="lg"
      overflow="hidden"
      transition="all 0.3s"
      _hover={{ transform: "translateY(-5px)", shadow: "xl" }}
      bg={bg}
      mb={4}
      ml={3}
    >
      <Image
        src={product.image}
        alt={product.name}
        h={48}
        w="full"
        objectFit="cover"
      />

      <Box p={4}>
        <Heading as="h2" size="md" mb={2} color={textColor}>
          {product.name}
        </Heading>

        <Text fontWeight="bold" fontSize="xl" color={textColor} mb={4}>
          ${product.price}
        </Text>
        <HStack spacing={2}>
          <Box
            onClick={() => {
              setIsOpen(true);
              toaster.create({
                description: "Opening edit modal...",
                type: "info",
              });
            }}
            as="button"
            p={2}
            border="2px solid transparent"
            borderRadius="md"
            color={iconColor1}
            transition="all 0.3s ease"
            _hover={{
              color: hoverColor1,
              borderColor: borderColor1,
              bg: hoverBg1,
            }}
          >
            <FaRegEdit size={39} />
          </Box>
          <Box
            as="button"
            onClick={() => handleDeleteProduct(product._id)}
            p={2}
            border="2px solid transparent"
            borderRadius="md"
            color={iconColor}
            transition="all 0.3s ease"
            _hover={{
              bg: hoverBg,
              color: hoverColor,
              borderColor: borderColor,
            }}
          >
            <MdDelete size={40} />
          </Box>
          <Toaster />
        </HStack>
      </Box>

      <Dialog.Root open={isOpen} onOpenChange={setIsOpen}>
        <Dialog.Portal>
          {/* Backdrop */}
          <Dialog.Overlay
            style={{
              backgroundColor: "rgba(0, 0, 0, 0.6)",
              position: "fixed",
              inset: 0,
            }}
          />
          {/* Dialog Content */}
          <Dialog.Content
            style={{
              backgroundColor: "white",
              borderRadius: "10px",
              padding: "20px",
              width: "400px",
              position: "fixed",
              top: "50%",
              left: "50%",
              transform: "translate(-50%, -50%)",
              boxShadow: "0px 10px 25px rgba(0,0,0,0.2)",
            }}
          >
            <Dialog.Title style={{ fontSize: "20px", marginBottom: "15px" }}>
              Update Product
            </Dialog.Title>

            <div
              style={{ display: "flex", flexDirection: "column", gap: "10px" }}
            >
              <Input
                placeholder="Product Name"
                name="name"
                value={updatedProduct.name}
                onChange={(e) =>
                  setUpdatedProduct({ ...updatedProduct, name: e.target.value })
                }
              />
              <Input
                placeholder="Price"
                name="price"
                type="number"
                value={updatedProduct.price}
                onChange={(e) =>
                  setUpdatedProduct({
                    ...updatedProduct,
                    price: e.target.value,
                  })
                }
              />
              <Input
                placeholder="Image URL"
                name="image"
                value={updatedProduct.image}
                onChange={(e) =>
                  setUpdatedProduct({
                    ...updatedProduct,
                    image: e.target.value,
                  })
                }
              />
            </div>

            <div
              style={{
                marginTop: "20px",
                display: "flex",
                justifyContent: "flex-end",
                gap: "10px",
              }}
            >
              <Dialog.Close asChild>
                <button style={cancelBtnStyle}>Cancel</button>
              </Dialog.Close>
              <Dialog.Close asChild>
                <button
                  style={updateBtnStyle}
                  onClick={() =>
                    handleUpdateProduct(product._id, updatedProduct)
                  }
                >
                  Update
                </button>
              </Dialog.Close>
            </div>
          </Dialog.Content>
        </Dialog.Portal>
      </Dialog.Root>
    </Box>
  );
};

export default ProductCard;
