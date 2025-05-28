'use client'

import {
  Box,
  Container,
  Flex,
  Heading,
  Input,
  Stack,
  Text,
  Textarea,
  Button,
  Icon,
  useColorModeValue,
  Divider,
} from '@chakra-ui/react'
import { EmailIcon, PhoneIcon } from '@chakra-ui/icons'
import { MdLocationOn } from 'react-icons/md'
import Navbar from './Navbar'

export default function ContactPage() {
  return (
    <>
      <Navbar />
      <Box bg={useColorModeValue('gray.50', 'gray.800')} mt={{ base: 20, md: 20 }} px={[10, 20]} py={[10, 20]}>
        <Container maxW="7xl">
          <Heading
            textAlign="center"
            mb={10}
            fontSize={['2xl', '3xl', '4xl']}
            bgGradient="linear(to-r, purple.500, blue.400)"
            bgClip="text"
          >
            Contact Us
          </Heading>

          <Flex direction={{ base: 'column', md: 'row' }} gap={10} align="stretch">
            {/* Left side: Info & Map */}
            <Box flex={1}>
              <Heading
                fontSize="xl"
                mb={4}
                color={useColorModeValue('purple.600', 'purple.300')}
              >
                Our Address
              </Heading>

              <Stack spacing={6}>
                <Flex align="center">
                  <Icon as={MdLocationOn} boxSize={6} mr={3} color="purple.500" />
                  <Text fontSize="md">25/3 Brindavan, 3rd Cross, Post, Nyanappana Halli, Hulimavu, Bengaluru, Karnataka 560076</Text>
                </Flex>
                <Flex align="center">
                  <EmailIcon boxSize={5} mr={3} color="blue.500" />
                  <Text fontSize="md">info@winvinaya.com</Text>
                </Flex>
                <Flex align="center">
                  <PhoneIcon boxSize={5} mr={3} color="green.500" />
                  <Text fontSize="md">+91 88702 53474</Text>
                </Flex>
              </Stack>

              <Box mt={8} w="100%" h="280px" borderRadius="xl" overflow="hidden" boxShadow="lg">
                <iframe
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3889.4057357187976!2d77.60912577507493!3d12.881611787425545!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bae15bf4b28eb9f%3A0x17a2dfc50e265b85!2sWinVinaya%20InfoSystems%20India%20Private%20Limited!5e0!3m2!1sen!2sin!4v1747979212877!5m2!1sen!2sin"
                  width="100%"
                  height="100%"
                  style={{ border: 0 }}
                  loading="lazy"
                  allowFullScreen
                ></iframe>
              </Box>
            </Box>

            {/* Divider - vertical line on desktop only */}
            <Divider
              orientation="vertical"
              display={{ base: 'none', md: 'block' }}
              borderColor="gray.300"
            />

            {/* Right side: Contact Form */}
            <Box
              flex={1}
              bg={useColorModeValue('white', 'gray.700')}
              p={[6, 8]}
              borderRadius="2xl"
              boxShadow="2xl"
            >
              <Heading
                fontSize="xl"
                mb={4}
                color={useColorModeValue('blue.600', 'blue.300')}
              >
                Send a Query
              </Heading>

              <form onSubmit={(e) => e.preventDefault()}>
                <Stack spacing={5}>
                  <Input
                    placeholder="Your Name"
                    name="name"
                    variant="filled"
                    bg={useColorModeValue('gray.100', 'gray.600')}
                    _hover={{ bg: useColorModeValue('gray.200', 'gray.500') }}
                    _focus={{ borderColor: 'purple.400' }}
                    required
                  />
                  <Input
                    placeholder="Your Email"
                    type="email"
                    name="email"
                    variant="filled"
                    bg={useColorModeValue('gray.100', 'gray.600')}
                    _hover={{ bg: useColorModeValue('gray.200', 'gray.500') }}
                    _focus={{ borderColor: 'blue.400' }}
                    required
                  />
                  <Input
                    placeholder="Your Phone"
                    name="phone"
                    variant="filled"
                    bg={useColorModeValue('gray.100', 'gray.600')}
                    _hover={{ bg: useColorModeValue('gray.200', 'gray.500') }}
                    _focus={{ borderColor: 'green.400' }}
                    required
                  />
                  <Textarea
                    placeholder="Your Question"
                    name="question"
                    rows={5}
                    variant="filled"
                    bg={useColorModeValue('gray.100', 'gray.600')}
                    _hover={{ bg: useColorModeValue('gray.200', 'gray.500') }}
                    _focus={{ borderColor: 'teal.400' }}
                    required
                  />
                  <Button
                    type="submit"
                    colorScheme="purple"
                    size="lg"
                    fontWeight="bold"
                    _hover={{ transform: 'scale(1.02)' }}
                  >
                    Submit
                  </Button>
                </Stack>
              </form>
            </Box>
          </Flex>
        </Container>
      </Box>
    </>
  )
}
