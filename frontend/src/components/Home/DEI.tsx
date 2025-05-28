'use client'

import {
  Box,
  Container,
  Heading,
  SimpleGrid,
  Icon,
  Text,
  Stack,
  HStack,
  VStack,
} from '@chakra-ui/react'
import {
  FaCode,
  FaMobileAlt,
  FaRobot,
  FaChartBar,
  FaCloudUploadAlt,
  FaChartPie,
  FaBug,
  FaUniversalAccess,
} from 'react-icons/fa'

// Actual services with relevant descriptions and icons
const services = [
  {
    id: 1,
    label: 'Smart Web Solutions',
    icon: FaCode,
    description:
      'Expertise in building modern, responsive, and scalable web applications tailored to your business needs.',
  },
  {
    id: 2,
    label: 'Mobile Innovation',
    icon: FaMobileAlt,
    description:
      'Crafting intuitive and high-performance mobile apps across Android and iOS platforms for seamless user experiences.',
  },
  {
    id: 3,
    label: 'AI & ML Intelligence',
    icon: FaRobot,
    description:
      'Implementing intelligent automation and predictive systems using cutting-edge AI and machine learning technologies.',
  },
  {
    id: 4,
    label: 'Data Insights & Analytics',
    icon: FaChartBar,
    description:
      'Transforming raw data into actionable insights with advanced data analysis, dashboards, and custom reports.',
  },
  {
    id: 5,
    label: 'CloudCare Services',
    icon: FaCloudUploadAlt,
    description:
      'Providing secure, scalable, and reliable cloud hosting, migration, and maintenance solutions across platforms.',
  },
  {
    id: 6,
    label: 'Power BI Dashboards',
    icon: FaChartPie,
    description:
      'Creating dynamic, interactive Power BI dashboards for insightful business decisions and performance monitoring.',
  },
  {
    id: 7,
    label: 'Quality Testing Hub',
    icon: FaBug,
    description:
      'Delivering high-quality software through comprehensive manual and automated testing across various platforms.',
  },
  {
    id: 8,
    label: 'Inclusive Accessibility Testing',
    icon: FaUniversalAccess,
    description:
      'Ensuring digital accessibility through expert testing aligned with WCAG guidelines to support inclusive experiences.',
  },
]

export default function DEI() {
  return (
    <Box
      as="section"
      role="region"
      aria-labelledby="expert-services-heading"
      p={4}
    >
      <Stack spacing={4} as={Container} maxW="3xl" textAlign="center">
        <Heading as="h2" id="expert-services-heading" fontSize="4xl" fontWeight="bold">
          Our Expert Services
        </Heading>
        <Text color="gray.600" fontSize="lg">
          We specialize in delivering cutting-edge solutions across web, mobile, AI, cloud, testing,
          and accessibility, ensuring your digital success.
        </Text>
      </Stack>

      <Container maxW="6xl" mt={10}>
        <SimpleGrid columns={{ base: 1, md: 2 }} spacing={10}>
          {services.map((service) => (
            <Box
              as="article"
              key={service.id}
              role="group"
              aria-labelledby={`service-${service.id}`}
            >
              <HStack align="start" spacing={4}>
                <Box color="green.400" px={2} pt={1}>
                  <Icon as={service.icon} boxSize={6} aria-hidden="true" />
                </Box>
                <VStack align="start" spacing={2}>
                  <Text id={`service-${service.id}`} fontWeight={600} fontSize="lg">
                    {service.label}
                  </Text>
                  <Text color="gray.600" fontSize="md">
                    {service.description}
                  </Text>
                </VStack>
              </HStack>
            </Box>
          ))}
        </SimpleGrid>
      </Container>
    </Box>
  )
}
