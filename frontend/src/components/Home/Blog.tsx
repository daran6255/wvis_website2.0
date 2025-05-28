import {
  Box,
  Heading,
  Text,
  Image,
  Tag,
  HStack,
  useColorModeValue,
  VisuallyHidden,
} from '@chakra-ui/react'
import Slider from 'react-slick'

interface BlogAuthorProps {
  date: Date
  name: string
}

const BlogAuthor = ({ date, name }: BlogAuthorProps) => (
  <HStack marginTop="2" spacing="2" alignItems="center">
    <Image
      borderRadius="full"
      boxSize="40px"
      src="https://100k-faces.glitch.me/random-image"
      alt={`Avatar of ${name}`}
    />
    <Text fontWeight="medium">{name}</Text>
    <Text as="span" aria-hidden="true">—</Text>
    <Text>{date.toLocaleDateString()}</Text>
  </HStack>
)

const BlogTags = ({ tags }: { tags: string[] }) => (
  <HStack spacing={2} marginTop={2}>
    {tags.map((tag) => (
      <Tag
        size="md"
        variant="solid"
        colorScheme="orange"
        key={tag}
        aria-label={`Tag: ${tag}`}
      >
        {tag}
      </Tag>
    ))}
  </HStack>
)

const blogData = [
  {
    title: 'Article One',
    tags: ['Engineering', 'Product'],
    desc: 'This is a short description of article one.',
    date: new Date('2021-04-06T19:01:27Z'),
    author: 'John Doe',
    image:
      'https://images.unsplash.com/photo-1499951360447-b19be8fe80f5?auto=format&fit=crop&w=800&q=80',
  },
  {
    title: 'Article Two',
    tags: ['Design'],
    desc: 'This is a short description of article two.',
    date: new Date('2021-04-06T19:01:27Z'),
    author: 'Jane Smith',
    image:
      'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=800&q=80',
  },
  {
    title: 'Article Three',
    tags: ['UX', 'Tips'],
    desc: 'This is a short description of article three.',
    date: new Date('2021-04-06T19:01:27Z'),
    author: 'Mark Lee',
    image:
      'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=800&q=80',
  },
  {
    title: 'Article Four',
    tags: ['Productivity'],
    desc: 'This is a short description of article four.',
    date: new Date('2021-04-06T19:01:27Z'),
    author: 'Alice Chen',
    image:
      'https://images.unsplash.com/photo-1499951360447-b19be8fe80f5?auto=format&fit=crop&w=800&q=80',
  },
]

const Blog = () => {
  const textColor = useColorModeValue('gray.700', 'gray.300')
  const settings = {
    dots: true,
    infinite: true,
    speed: 600,
    slidesToShow: 3,
    slidesToScroll: 1,
    responsive: [
      {
        breakpoint: 1024,
        settings: { slidesToShow: 2 },
      },
      {
        breakpoint: 768,
        settings: { slidesToShow: 1 },
      },
    ],
    accessibility: true,
    arrows: false,
  }

  return (
    <Box
      maxW="7xl"
      mx="auto"
      px={{ base: 4, md: 6, lg: 8 }}
      py={{ base: 8, md: 12 }}
      role="region"
      aria-labelledby="latest-articles-heading"
    >
      <Heading as="h2" mb={6} id="latest-articles-heading">
        Latest Articles
      </Heading>

      <VisuallyHidden as="h3">Blog Article Carousel</VisuallyHidden>

      <Slider {...settings}>
        {blogData.map((post, idx) => (
          <Box
            key={idx}
            p={{ base: 2, md: 4 }}
            role="article"
            aria-label={`Blog post: ${post.title}`}
          >
            <Box borderRadius="lg" overflow="hidden">
              <Image
                src={post.image}
                alt={`Cover image for ${post.title}`}
                objectFit="cover"
                width="100%"
                height="200px"
                borderRadius="lg"
              />
            </Box>
            <BlogTags tags={post.tags} />
            <Heading fontSize="xl" mt={2}>
              {post.title}
            </Heading>
            <Text
              as="p"
              fontSize="md"
              mt={2}
              color={textColor}
            >
              {post.desc}
            </Text>

            <BlogAuthor name={post.author} date={post.date} />
          </Box>
        ))}
      </Slider>
    </Box>
  )
}

export default Blog