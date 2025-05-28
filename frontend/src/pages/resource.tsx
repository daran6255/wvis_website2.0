'use client'

import {
  Box,
  Container,
  Heading,
  SimpleGrid,
  Image,
  Text,
  Stack,
  useColorModeValue,
  Link as ChakraLink,
  VisuallyHidden,
} from '@chakra-ui/react'
import { DownloadIcon } from '@chakra-ui/icons'
import Navbar from '../components/common/Navbar'
import Footer from '../components/common/Footer'

// 🗂️ Sample Resource Data
const resources = [
  {
    id: 1,
    title: 'Inclusive Education Guide',
    image: '/assets/resources/resource1.jpg',
    fileUrl: '/downloads/inclusive-education.pdf',
    lastModified: '2024-12-10T10:00:00Z',
  },
  {
    id: 2,
    title: 'Tech Tools for Educators',
    image: '/assets/resources/resource2.jpg',
    fileUrl: '/downloads/tech-tools.pdf',
    lastModified: '2025-02-21T15:30:00Z',
  },
  {
    id: 3,
    title: 'Accessibility Checklist',
    image: '/assets/resources/resource3.jpg',
    fileUrl: '/downloads/accessibility-checklist.pdf',
    lastModified: '2025-03-08T09:45:00Z',
  },
]

export default function ResourcePage() {
  return (
    <>
      <Navbar />

      {/* Hero Section */}
      <Box
        py={{ base: 16, md: 24 }}
        textAlign="center"
        bg="linear-gradient(90deg,rgba(131, 58, 180, 1) 0%, rgba(253, 29, 29, 1) 50%, rgba(252, 176, 69, 1) 100%)"
        px={4}
      >
        <Heading fontSize={{ base: '3xl', md: '5xl' }} color={'white'} fontWeight="bold">
          Resources
        </Heading>
        <Text mt={4} fontSize={{ base: 'md', md: 'lg' }} color={useColorModeValue('white.600', 'white.300')}>
          Download helpful guides and tools to support your journey.
        </Text>
      </Box>

      {/* Resource Cards */}
      <Box py={{ base: 10, md: 16 }} bg={useColorModeValue('white', 'gray.900')} px={4}>
        <Container maxW="7xl">
          <SimpleGrid columns={{ base: 1, sm: 2, md: 3 }} spacing={8}>
            {resources.map((res) => (
              <ResourceCard key={res.id} {...res} />
            ))}
          </SimpleGrid>
        </Container>
      </Box>
      <Footer />
    </>
  )
}

// 📦 Individual Resource Card
const ResourceCard = ({
  title,
  image,
  fileUrl,
  lastModified,
}: {
  title: string
  image: string
  fileUrl: string
  lastModified: string
}) => {
  return (
    <Box
      bg={useColorModeValue('gray.50', 'gray.700')}
      borderRadius="lg"
      boxShadow="lg"
      p={6}
      transition="all 0.3s"
      _hover={{
        transform: 'translateY(-4px)',
        boxShadow: 'xl',
      }}
      role="group"
    >
      <Image
        src={image}
        alt={`${title} thumbnail`}
        objectFit="contain"
        h={{ base: '160px', md: '180px' }}
        w="100%"
        borderRadius="md"
        mb={4}
        fallbackSrc="https://via.placeholder.com/300x180?text=Loading..."
      />
      <Stack spacing={3}>
        <Heading fontSize="lg" color={useColorModeValue('gray.800', 'white')}>
          {title}
        </Heading>
        <Text fontSize="sm" color={useColorModeValue('gray.600', 'gray.300')}>
          Last updated: {new Date(lastModified).toLocaleDateString()}
        </Text>
        <ChakraLink
          href={fileUrl}
          download
          color="blue.500"
          fontWeight="medium"
          display="inline-flex"
          alignItems="center"
          gap={2}
          _hover={{ textDecoration: 'underline' }}
          aria-label={`Download ${title}`}
        >
          <DownloadIcon />
          <Text as="span">Download</Text>
          <VisuallyHidden>Download {title}</VisuallyHidden>
        </ChakraLink>
      </Stack>
    </Box>
  )
}
