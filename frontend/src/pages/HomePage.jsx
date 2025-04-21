import React, { useEffect } from 'react'
import {  Container ,Text, SimpleGrid,} from '@chakra-ui/react'
import { VStack } from '@chakra-ui/react';
import Containers from 'react-bootstrap/Container';
import {Link} from "react-router-dom";
import { useProductStore } from '@/store/product';
import ProductCard from '@/components/ProductCard';


const HomePage = () => {
  const {fetchProducts,products,searchQuery}=useProductStore();
  useEffect(()=>{
    fetchProducts();
  },[] );  
  console.log("products",products);

  // Filter the products 
  const filteredProducts = products.filter((product) =>
    product.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <Container maxW="container.xl" py={12}>
      <VStack spacing={8}>
      <Containers className="my-3 ">
      <h2 className="fw-bold text-center ">
        <Link
          to="/"
          style={{
            background: "linear-gradient(to right, #06b6d4, #3b82f6)",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
            textDecoration: "none"
          }}
        >
          Current Products 🚀
        </Link>
      </h2>
    </Containers>

    <SimpleGrid columns={{
        base:1,
        md:2,
        lg:3,
    }}
    spacing={10}
    w={"full"}
    >
      {filteredProducts.map((product) => (
            <ProductCard key={product._id} product={product} />
          ))}
				</SimpleGrid>

        {filteredProducts.length === 0 && (
          <Text fontSize='xl' textAlign={"center"} fontWeight='bold' color='gray.500'>
          No products found 😢{" "}
          <Link to={"/create"}>
            <Text as='span' color='blue.500' _hover={{ textDecoration: "underline" }}>
              Create a product
            </Text>
          </Link>
        </Text>
        )}

      </VStack>
    </Container>
  )
}

export default HomePage