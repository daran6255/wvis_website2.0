"use client";

import {
  Box,
  Grid,
  GridItem,
  Heading,
  Text,
  Icon,
  Flex,
  VisuallyHidden,
} from "@chakra-ui/react";
import {
  FaUniversalAccess,
  FaChalkboardTeacher,
  FaHands,
  FaComments,
  FaUsers,
  FaBookOpen,
} from "react-icons/fa";
import { motion } from "framer-motion";

const MotionGridItem = motion(GridItem);

const services = [
  { label: "Disability Inclusion Workshops", icon: FaUniversalAccess },
  { label: "Upskilling for Diverse Abilities", icon: FaChalkboardTeacher },
  { label: "Learn Indian Sign Language", icon: FaHands },
  { label: "ISL Interpretation On-Demand", icon: FaComments },
  { label: "Inclusive Hiring Solutions", icon: FaUsers },
  { label: "Accessible Course Content", icon: FaBookOpen },
];

const DEIServicesSection = () => {
  return (
    <Box
      as="section"
      role="region"
      aria-labelledby="dei-services-heading"
      py={{ base: 10, md: 20 }}
      px={{ base: 4, md: 20 }}
    >
      <Grid
        templateColumns={{ base: "1fr", md: "1fr 1fr" }}
        alignItems="center"
        gap={10}
      >
        {/* Left Section - Image */}
        <Box position="relative" textAlign="center" height="350px">
          <Box
            as="img"
            src="/assets/6672.jpg"
            alt="Diversity and inclusion background"
            position="absolute"
            top="50%"
            left="50%"
            transform="translate(-50%, -50%)"
            zIndex={0}
            maxW="450px"
            w="100%"
            objectFit="contain"
          />
        </Box>

        {/* Right Section */}
        <Box>
          <Heading
            as="h2"
            id="dei-services-heading"
            fontSize={{ base: "2xl", md: "4xl" }}
            mb={4}
            color="gray.800"
          >
            Diversity, Equity, and Inclusion Services
          </Heading>

          <Box w="60px" h="4px" bg="green.300" mb={6} borderRadius="full" />

          <Text fontSize="lg" color="gray.500" mb={10}>
            Our DEI services are dedicated to creating environments where everyone thrives.
            Through awareness programs, skill enhancement, inclusive recruitment, and
            accessible content creation, we champion diversity and foster genuine inclusion
            in every initiative.
          </Text>

          <VisuallyHidden as="h3">Our DEI Services</VisuallyHidden>

          <Grid templateColumns={{ base: "1fr", md: "1fr 1fr" }} gap={4}>
            {services.map((service, index) => (
              <MotionGridItem
                as="article"
                key={index}
                p={4}
                bg="white"
                borderRadius="md"
                boxShadow="md"
                _hover={{
                  boxShadow: "lg",
                  transform: "translateY(-2px)",
                  bgGradient: "linear(135deg, #23bdb8, #43e794)",
                }}
                role="group"
                aria-labelledby={`dei-service-${index}`}
                initial={{ opacity: 0, y: 40 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 * index, duration: 0.6, ease: "easeOut" }}
              >
                <Flex align="center" gap={3}>
                  <Icon
                    as={service.icon}
                    color="green.400"
                    boxSize={5}
                    _groupHover={{ color: "white" }}
                    aria-hidden="true"
                  />
                  <Text
                    id={`dei-service-${index}`}
                    fontWeight="semibold"
                    color="gray.600"
                    _groupHover={{ color: "white" }}
                  >
                    {service.label}
                  </Text>
                </Flex>
              </MotionGridItem>
            ))}
          </Grid>
        </Box>
      </Grid>
    </Box>
  );
};

export default DEIServicesSection;
