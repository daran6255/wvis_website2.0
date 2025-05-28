'use client'

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
  Tag,
  Spinner,
  Center,
  Spacer,
} from '@chakra-ui/react'
import { Link } from 'react-router-dom'
import Navbar from '../components/common/Navbar'
import Footer from '../components/common/Footer'
import { useEffect, useState } from 'react'
import { getAllBlogs } from '../helpers/blog_services'
import { Blog as BlogType } from '../helpers/model'

export default function Blog() {
  const [blogData, setBlogData] = useState<BlogType[]>([])
  const [loading, setLoading] = useState(true)
  const textColor = useColorModeValue('gray.700', 'gray.200')

  const stripHtml = (html: string) => {
  if (!html) return ''
  const div = document.createElement('div')
  div.innerHTML = html
  return div.textContent || div.innerText || ''
}


  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        const blogs = await getAllBlogs()
        setBlogData(blogs)
      } catch (error) {
        console.error('Error fetching blogs:', error)
      } finally {
        setLoading(false)
      }
    }

    fetchBlogs()
  }, [])

  const featured = blogData[0]

  return (
    <>
      <Navbar />
      <Box
        as="section"
        bg="radial-gradient(circle,rgba(238, 174, 202, 1) 0%, rgba(148, 187, 233, 1) 100%)"
        py={{ base: 12, md: 20 }}
        mt={{ base: 20, md: 20 }}
        textAlign="center"
        role="region"
        aria-label="Blog introduction"
        overflowX="hidden" // prevent horizontal overflow
      >
        <Spacer />
        <Heading
          as="h1"
          fontSize={{ base: '3xl', md: '5xl' }}
          mb={2}
          tabIndex={-1} // allow skip-to-content to land here
        >
          Our Blog
        </Heading>
        <Text fontSize={{ base: 'md', md: 'lg' }} color="white" maxW="600px" mx="auto" wordBreak="break-word">
          Discover stories, insights, and updates from our journey.
        </Text>
      </Box>

      {/* Featured Blog */}
      <Box
        as="section"
        py={{ base: 10, md: 16 }}
        bg={useColorModeValue('white', 'gray.800')}
        role="region"
        aria-labelledby="featured-blog-heading"
        overflowX="hidden" // prevent horizontal overflow
      >
        <Container maxW="6xl" px={{ base: 4, md: 8 }} overflowX="hidden">
          <Flex align="center" gap={3} mb={8} flexWrap="wrap">
            <Heading
              id="featured-blog-heading"
              fontSize="2xl"
              as="h2"
              flexGrow={1}
              minW={{ base: '100%', md: 'auto' }}
              wordBreak="break-word"
            >
              Featured Blog
            </Heading>
            <Badge
              bgGradient="linear(to-r, pink.400, orange.400)"
              color="white"
              fontSize="0.8em"
              px={3}
              py={1}
              borderRadius="full"
              textTransform="uppercase"
              mt={{ base: 2, md: 0 }}
            >
              New Update
            </Badge>
          </Flex>

          {featured ? (
            <Flex
              direction={{ base: 'column', md: 'row' }}
              gap={6}
              align="flex-start"
              p={6}
              rounded="xl"
              boxShadow="md"
              flexWrap="wrap"
              role="article"
              aria-label={`Featured blog titled ${featured.title}`}
              overflow="hidden"
              maxW="100%"
            >
              <ChakraLink
                as={Link}
                to={`/blogs/${featured.id}`}
                aria-label={`Read featured blog: ${featured.title}`}
                flexShrink={0}
                mb={{ base: 4, md: 0 }}
                w={{ base: '100%', md: '240px' }}
                maxW="100%"
                _focus={{ boxShadow: 'outline' }}
                tabIndex={0}
              >
                <Image
                  src={featured.image}
                  alt={`Image for featured blog titled ${featured.title}`}
                  borderRadius="md"
                  w="100%"
                  h={{ base: 'auto', md: '300px' }}
                  objectFit="contain"
                  boxShadow="lg"
                  maxW="100%"
                  loading="lazy"
                />
                <Text
                  mt={2}
                  fontWeight="bold"
                  color="blue.600"
                  fontSize={{ base: 'md', md: 'lg' }}
                  noOfLines={2}
                  wordBreak="break-word"
                >
                  {featured.title}
                </Text>
              </ChakraLink>
              <Stack flex={1} spacing={4} minW={0}>
                <Heading size="lg" as="h3" tabIndex={-1} wordBreak="break-word">
                  {featured.title}
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
                <Text
                    color={textColor}
                    fontSize={{ base: 'md', md: 'lg' }}
                    lineHeight="tall"
                    whiteSpace="normal"
                    dangerouslySetInnerHTML={{
                      __html:
                        stripHtml(featured.description).length > 150
                          ? stripHtml(featured.description).slice(0, 150) + '...'
                          : featured.description,
                    }}
                  />

                <Text fontSize="sm" color="gray.500" mb={2}>
                  By {featured.author} •{' '}
                  {new Date(featured.created_at).toLocaleDateString()}
                </Text>
                <Stack
                  direction="row"
                  spacing={2}
                  mb={3}
                  flexWrap="wrap"
                  aria-label="Tags"
                  role="list"
                >
                  {featured.tags.map((tag, i) => (
                    <Tag key={i} colorScheme="blue" role="listitem">
                      {tag}
                    </Tag>
                  ))}
                </Stack>
                <ChakraLink
                  as={Link}
                  to={`/blogs/${featured.id}`}
                  color="blue.500"
                  fontWeight="bold"
                  aria-label={`Read full blog titled ${featured.title}`}
                  tabIndex={0}
                >
                  Read Full Blog →
                </ChakraLink>
              </Stack>
            </Flex>
          ) : (
            <Text>No featured blog available.</Text>
          )}
        </Container>
      </Box>

      {/* All Blogs */}
      <Box
        as="section"
        py={{ base: 12, md: 20 }}
        bg={useColorModeValue('gray.50', 'gray.900')}
        role="region"
        aria-labelledby="more-articles-heading"
        overflowX="hidden"
      >
        <Container maxW="6xl" px={{ base: 4, md: 8 }} overflowX="hidden">
          <Heading
            id="more-articles-heading"
            fontSize="2xl"
            mb={10}
            as="h2"
            tabIndex={-1}
            wordBreak="break-word"
          >
            More Articles
          </Heading>
          {loading ? (
            <Center>
              <Spinner size="lg" aria-label="Loading blogs" />
            </Center>
          ) : (
            <SimpleGrid columns={{ base: 1, sm: 2, md: 3 }} spacing={8}>
              {blogData.map((item) => (
                <BlogCard key={item.id} {...item} />
              ))}
            </SimpleGrid>
          )}
        </Container>
      </Box>
      <Footer />
    </>
  )
}

// 🔖 Blog Card Component
const BlogCard = ({
  id,
  title,
  image,
  tags,
  description,
  created_at,
  author,
}: BlogType) => {
  const stripHtml = (html: string) => {
  if (!html) return ''
  const div = document.createElement('div')
  div.innerHTML = html
  return div.textContent || div.innerText || ''
}
  return (
    <ChakraLink
      as={Link}
      to={`/blogs/${id}`}
      aria-label={`Read blog titled ${title}`}
      _hover={{ textDecoration: 'none', transform: 'scale(1.02)' }}
      transition="all 0.3s ease"
      bg={useColorModeValue('white', 'gray.700')}
      p={5}
      borderRadius="md"
      boxShadow="md"
      role="article"
      display="block"
      tabIndex={0}
      _focus={{ boxShadow: 'outline' }}
      maxW="100%"
      overflow="hidden"
    >
      <Image
        src={image}
        alt={`Image for blog titled ${title}`}
        objectFit="contain"
        h={{ base: 'auto', md: '200px' }}
        maxH="200px"
        w="100%"
        maxW="100%"
        borderRadius="md"
        mb={4}
        loading="lazy"
      />
      <Text fontWeight="bold" fontSize="lg" color="blue.600" mb={2} noOfLines={2} wordBreak="break-word">
        {title}
      </Text>
      <Text fontSize="sm" color="gray.500" mb={2}>
        By {author} • {new Date(created_at).toLocaleDateString()}
      </Text>
      <Stack direction="row" wrap="wrap" spacing={2} mb={3} aria-label="Tags" role="list">
        {tags.map((tag, i) => (
          <Tag key={i} colorScheme="blue" role="listitem">
            {tag}
          </Tag>
        ))}
      </Stack>
      <Text fontSize="sm" color={useColorModeValue('gray.700', 'gray.300')}>
        {stripHtml(description).length > 150
          ? stripHtml(description).slice(0, 150) + '...'
          : stripHtml(description)}
      </Text>

    </ChakraLink>
  )
}
