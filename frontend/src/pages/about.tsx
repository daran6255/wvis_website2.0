'use client'

import {
  Box,
  Container,
  Heading,
  Text,
  Stack,
  Flex,
  Image,
  useColorModeValue,
  Divider,
  Icon,
  SimpleGrid,
} from '@chakra-ui/react'
import { keyframes } from '@emotion/react'
import Navbar from '../components/common/Navbar'
import { IconType } from 'react-icons'
import { FaChalkboardTeacher, FaLanguage, FaUsers, FaUniversalAccess } from 'react-icons/fa'
import Footer from '../components/common/Footer'

const fadeInUp = keyframes`
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
`

export default function About() {
  return (
    <>
      <Navbar />

      {/* Hero Section */}
      <Box
        as="section"
        role="region"
        aria-label="Hero section"
        bgImage="url('/assets/13108.jpg')"
        bgSize="cover"
        bgPos="center"
        mt={{ base: 20, md: 20 }}
        py={{ base: 20, md: 36 }}
        position="relative"
      >
        <Box
          bgGradient="linear(to-r, blackAlpha.800, transparent)"
          position="absolute"
          inset={0}
          zIndex={0}
        />
        <Container maxW="6xl" position="relative" zIndex={1}>
          <Heading
            as="h1"
            bgGradient="linear(to-r, teal.300, blue.500)"
            bgClip="text"
            fontSize={{ base: '3xl', md: '5xl' }}
            fontWeight="bold"
            mb={4}
            animation={`${fadeInUp} 0.8s ease-out`}
          >
            Who We Are
          </Heading>
          <Text
            color="gray.200"
            fontSize={{ base: 'md', md: 'xl' }}
            maxW="2xl"
            animation={`${fadeInUp} 1s ease-out`}
          >
            Empowering minds through inclusive education, technology, and accessibility — for all.
          </Text>
        </Container>
      </Box>

      {/* Section: Founder Vision */}
      <Box as="section" role="region" aria-label="Founder Vision" bg={useColorModeValue('white', 'gray.800')} py={20}>
        <Container maxW="6xl">
          <Flex direction={{ base: 'column', md: 'row' }} align="center" gap={12}>
            <Box flex={1} animation={`${fadeInUp} 1s ease-out`}>
              <Image
                src="/assets/teams/Shiva.jpg"
                alt="Portrait of our founder"
                rounded="2xl"
                boxShadow="2xl"
                objectFit="cover"
              />
            </Box>
            <Stack flex={1} spacing={5}>
              <Heading
                fontSize="3xl"
                bgGradient="linear(to-r, pink.400, purple.500)"
                bgClip="text"
              >
                Meet Our Founder
              </Heading>
              <Text fontSize="md" color="gray.600">
                Our founder envisioned a world where education is barrier-free and welcoming to everyone — including
                persons with disabilities, regional language speakers, and visual learners. With a passion for
                accessibility and a background in tech-driven solutions, this vision led to the birth of NammAcademy.
              </Text>
            </Stack>
          </Flex>
        </Container>
      </Box>

      <Divider />

      {/* Section: Our Journey */}
      <Box as="section" role="region" aria-label="Our Journey" bg={useColorModeValue('gray.50', 'gray.900')} py={20}>
        <Container maxW="6xl">
          <Flex direction={{ base: 'column-reverse', md: 'row' }} align="center" gap={12}>
            <Stack flex={1} spacing={5}>
              <Heading
                fontSize="3xl"
                bgGradient="linear(to-r, green.400, blue.500)"
                bgClip="text"
              >
                Our Journey
              </Heading>
              <Text fontSize="md" color="gray.600">
                From humble beginnings to becoming a platform of choice for thousands of learners, NammAcademy continues
                to evolve. With courses in English, Indian Sign Language, and regional dialects, our journey is guided
                by inclusivity and excellence.
              </Text>
            </Stack>
            <Box flex={1}>
              <Image
                src="https://images.unsplash.com/photo-1596495577886-d920f1fb7238?auto=format&fit=crop&w=800&q=80"
                alt="Our journey visual representation"
                rounded="2xl"
                boxShadow="2xl"
                objectFit="cover"
              />
            </Box>
          </Flex>
        </Container>
      </Box>

      {/* Section: Impact Metrics */}
      <Box as="section" role="region" aria-label="Our Impact" bg={useColorModeValue('blue.50', 'blue.900')} py={16}>
        <Container maxW="6xl">
          <Heading
            textAlign="center"
            mb={10}
            bgGradient="linear(to-r, teal.400, blue.600)"
            bgClip="text"
          >
            Our Impact
          </Heading>
          <SimpleGrid columns={{ base: 1, sm: 2, md: 4 }} spacing={8}>
            <ImpactCard number="10K+" label="Learners Empowered" icon={FaUsers} />
            <ImpactCard number="25+" label="Courses in 5 Languages" icon={FaLanguage} />
            <ImpactCard number="50+" label="Experts & Trainers" icon={FaChalkboardTeacher} />
            <ImpactCard number="100%" label="Screen Reader Compatible" icon={FaUniversalAccess} />
          </SimpleGrid>
        </Container>
      </Box>

      <Footer />
    </>
  )
}

interface ImpactCardProps {
  number: string
  label: string
  icon: IconType
}

const ImpactCard = ({ number, label, icon }: ImpactCardProps) => {
  return (
    <Box
      as="article"
      role="group"
      aria-label={label}
      bg={useColorModeValue('white', 'gray.700')}
      p={8}
      rounded="xl"
      boxShadow="2xl"
      textAlign="center"
      _hover={{ transform: 'scale(1.05)', transition: '0.3s' }}
    >
      <Icon as={icon} w={10} h={10} color="blue.500" mb={3} aria-hidden="true" />
      <Heading fontSize="3xl" color="blue.600">
        {number}
      </Heading>
      <Text color="gray.600" fontSize="md">
        {label}
      </Text>
    </Box>
  )
}
