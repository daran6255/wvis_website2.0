import {
  Box,
  Container,
  Heading,
  Text,
  // Image,
  Stack,
  Tag,
  Spinner,
  Center,
  useColorModeValue,
  Divider,
  VStack,
  Fade,
} from '@chakra-ui/react'
import { useParams } from 'react-router-dom'
import { useEffect, useState } from 'react'
import Navbar from '../components/common/Navbar'
import Footer from '../components/common/Footer'
import { getBlogById } from '../helpers/blog_services'
import { Blog } from '../helpers/model'

export default function BlogDetails() {
  const { id } = useParams()
  const [blog, setBlog] = useState<Blog | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  const bgColor = useColorModeValue('gray.50', 'gray.900')
  const textColor = useColorModeValue('gray.700', 'gray.200')
  const authorDateColor = useColorModeValue('gray.500', 'gray.400')
  const tagHoverBg = useColorModeValue('blue.100', 'blue.600')

  useEffect(() => {
    const fetchBlog = async () => {
      try {
        const data = await getBlogById(id || '')
        setBlog(data)
      } catch {
        setError('Blog not found.')
      } finally {
        setLoading(false)
      }
    }

    if (id) fetchBlog()
  }, [id])

  return (
    <>
      <Navbar />
      <Box bg={bgColor} py={{ base: 12, md: 20 }} mt={{ base: 20, md: 20 }} minH="80vh">
        <Container
          maxW="5xl"
          bg={useColorModeValue('white', 'gray.800')}
          p={{ base: 6, md: 10 }}
          borderRadius="lg"
          boxShadow="xl"
          border="1px solid"
          borderColor={useColorModeValue('gray.200', 'gray.700')}
        >
          {loading ? (
            <Center h="50vh">
              <Spinner size="xl" />
            </Center>
          ) : error ? (
            <Center>
              <Text color="red.500" fontSize="xl" fontWeight="semibold">
                {error}
              </Text>
            </Center>
          ) : blog ? (
            <Fade in={!loading}>
              <VStack spacing={8} align="stretch">
                <Box
                  pos="relative"
                  borderRadius="md"
                  overflow="hidden"
                  boxShadow="lg"
                  _before={{
                    content: '""',
                    position: 'absolute',
                    inset: 0,
                    bgGradient: 'linear(to-b, transparent, blackAlpha.600)',
                    zIndex: 0,
                  }}
                >
                  {/* <Image
                    src={blog.image}
                    alt={blog.title}
                    w="100%"
                    h={{ base: '200px', md: '400px' }}
                    objectFit="cover"
                    position="relative"
                    zIndex={1}
                    loading="lazy"
                    borderRadius="md"
                    transition="transform 0.4s ease"
                    _hover={{ transform: 'scale(1.05)' }}
                  /> */}
                </Box>

                <Heading
                  as="h1"
                  size={{ base: 'xl', md: '2xl' }}
                  fontFamily="'Georgia', serif"
                  color={textColor}
                  textAlign={{ base: 'center', md: 'left' }}
                >
                  {blog.title}
                </Heading>

                <Text
                  color={authorDateColor}
                  fontSize="sm"
                  fontStyle="italic"
                  textAlign={{ base: 'center', md: 'left' }}
                >
                  By {blog.author} • {new Date(blog.created_at).toLocaleDateString()}
                </Text>

                <Stack direction="row" wrap="wrap" spacing={3} justify={{ base: 'center', md: 'flex-start' }}>
                  {blog.tags.map((tag, i) => (
                    <Tag
                      key={i}
                      colorScheme="blue"
                      size="md"
                      borderRadius="full"
                      cursor="pointer"
                      _hover={{ bg: tagHoverBg, transform: 'scale(1.1)', transition: 'all 0.2s ease-in-out' }}
                    >
                      {tag}
                    </Tag>
                  ))}
                </Stack>

                <Divider />

                <Text
                  color={textColor}
                  fontSize={{ base: 'md', md: 'lg' }}
                  lineHeight="tall"
                  whiteSpace="normal"
                  dangerouslySetInnerHTML={{ __html: blog.description }}
                />

              </VStack>
            </Fade>
          ) : null}
        </Container>
      </Box>
      <Footer />
    </>
  )
}
