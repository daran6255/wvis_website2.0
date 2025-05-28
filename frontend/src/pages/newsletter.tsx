import {
  Box,
  Container,
  Heading,
  Text,
  Stack,
  Flex,
  Image,
  SimpleGrid,
  Badge,
  useColorModeValue,
  Link as ChakraLink,
  Spinner,
} from '@chakra-ui/react'
import Navbar from '../components/common/Navbar'
import Footer from '../components/common/Footer'
import { useEffect, useState } from 'react'
import { getAllNewsletters } from '../helpers/newsletter_service'
import { Newsletter } from '../helpers/model'
import useCustomToast from '../hooks/useCustomToast'

export default function NewsletterPage() {
  const [newsletterData, setNewsletterData] = useState<Newsletter[]>([])
  const [loading, setLoading] = useState(true)
  const showToast = useCustomToast()

  useEffect(() => {
    getAllNewsletters()
      .then((res) => {
        setNewsletterData(res)
      })
      .catch(() =>
        showToast('Error', 'An error occurred while fetching newsletters.', 'error')
      )
      .finally(() => setLoading(false))
      .catch(() => showToast('Error', 'An error occurred while fetching newsletters.', 'error'))
      .finally(() => setLoading(false))
  }, [showToast])

  const latest = newsletterData[0] // Latest newsletter

  return (
    <>
      <Navbar />

      {/* Hero Section */}
      <Box
        bg="linear-gradient(90deg, rgba(131, 58, 180, 1) 0%, rgba(253, 29, 29, 1) 50%, rgba(252, 176, 69, 1) 100%)"
        py={20}
        mt={{ base: 20, md: 20 }}
        textAlign="center"
      >
        <Heading fontSize={{ base: '3xl', md: '5xl' }} color="white">
          Newsletter
        </Heading>
        <Text fontSize={{ base: 'md', md: 'lg' }} color="whiteAlpha.900" mt={4}>
          Stay updated with our latest insights, updates, and highlights.
        </Text>
      </Box>

      {/* Latest Update */}
      <Box py={16} bg={useColorModeValue('white', 'gray.800')}>
        <Container maxW="6xl">
          <Flex align="center" gap={3} mb={8}>
            <Heading fontSize="2xl">Latest Update</Heading>
            <Badge
              bgGradient="linear(to-r, pink.400, orange.400)"
              color="white"
              fontSize="0.8em"
              px={3}
              py={1}
              borderRadius="full"
              textTransform="uppercase"
            >
              New Update
            </Badge>
          </Flex>

          {loading ? (
            <Flex justify="center" py={10}>
              <Spinner size="xl" color="blue.500" />
            </Flex>
          ) : latest ? (
            <Flex
              direction={{ base: 'column', md: 'row' }}
              gap={10}
              align="flex-start"
              p={8}
              rounded="xl"
              boxShadow="md"
            >
              <Box as="a" href={latest.link} target="_blank" aria-label={`Read ${latest.title}`}>
                <Image
                  src={latest.image}
                  alt={latest.title}
                  borderRadius="md"
                  w={{ base: '100%', md: '240px' }}
                  h="300px"
                  objectFit="cover"
                  boxShadow="lg"
                />
                <Text mt={2} fontWeight="bold" color="blue.600">
                  {latest.title}
                </Text>
              </Box>

              <Stack flex={1} spacing={4}>
                <Heading size="lg">
                  {latest.title}
                  <Badge
                    colorScheme="red"
                    fontSize="0.4em"
                    ml={5}
                    px={2}
                    py={1}
                    borderRadius="md"
                  >
                    NEW
                  </Badge>
                </Heading>
                <Text color="gray.600">
                {latest.description}
                </Text>
                <ChakraLink
                  href={latest.link}
                  isExternal
                  color="blue.500"
                  fontWeight="bold"
                  aria-label={`Read full ${latest.title}`}
                >
                  Read Full Newsletter →
                </ChakraLink>
              </Stack>
            </Flex>
          ) : (
            <Text>No newsletters found.</Text>
          )}
        </Container>
      </Box>

      {/* All Newsletters */}
      <Box py={20} bg={useColorModeValue('gray.50', 'gray.900')}>
        <Container maxW="6xl">
          <Heading fontSize="2xl" mb={10}>
            Previous Newsletters
          </Heading>
          {loading ? (
            <Flex justify="center">
              <Spinner size="lg" />
            </Flex>
          ) : (
            <SimpleGrid columns={{ base: 1, sm: 2, md: 4 }} spacing={10}>
              {newsletterData.slice(1).map(({ title, image, link }) => (
                <NewsletterCard key={link} title={title} image={image} link={link} />
              ))}
            </SimpleGrid>
          )}
        </Container>
      </Box>

      <Footer />
    </>
  )
}

const NewsletterCard = ({
  title,
  image,
  link,
}: {
  title: string
  image: string
  link: string
}) => {
  return (
    <Box
      as="a"
      href={link}
      target="_blank"
      rel="noopener noreferrer"
      role="link"
      tabIndex={0}
      _hover={{ textDecoration: 'none' }}
      textAlign="center"
      transition="all 0.3s ease"
      aria-label={`Open ${title} PDF`}
    >
      <Box
        h="300px"
        bg="gray.100"
        display="flex"
        alignItems="center"
        justifyContent="center"
        borderRadius="md"
        overflow="hidden"
        boxShadow="md"
        transition="transform 0.3s ease"
        _hover={{ transform: 'scale(1.05)' }}
      >
        <Image
          src={image}
          alt={title}
          objectFit="contain"
          maxH="100%"
          maxW="100%"
        />
      </Box>
      <Text
        fontWeight="bold"
        fontSize="md"
        color="blue.600"
        mt={4}
        _hover={{ textDecor: 'underline' }}
      >
        {title}
      </Text>
    </Box>
  )
}
