import React from 'react';
import {
  Box,
  Flex,
  Image,
  Spacer,
  Button,
  HStack,
  Link
} from '@chakra-ui/react';
import { useNavigate } from 'react-router-dom';

const DB_Navbar: React.FC = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    // Clear token/session here
    localStorage.removeItem('token');
    navigate('/login');
  };

  return (
    <Box  px={6} py={4} boxShadow="md">
      <Flex align="center">
        {/* Logo on the left */}
        <Image
          src="/assets/WVIS.png" // Adjust path if needed
          alt="Logo"
          h="40px"
        />

        <Spacer />

        {/* Right-side items */}
        <HStack spacing={4}>
          <Link href="/a/newsletter" fontWeight="medium">Newsletter</Link>
          <Link href="/a/blog" fontWeight="medium">Blog</Link>
          <Link href="/a/ebook" fontWeight="medium">E-Book</Link>
          <Button colorScheme="teal" onClick={handleLogout}>
            Logout
          </Button>
        </HStack>
      </Flex>
    </Box>
  );
};

export default DB_Navbar;
