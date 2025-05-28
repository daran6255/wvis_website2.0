import {
  Box,
  Grid,
  Text,
  Heading,
  VStack,
  Circle,
  Icon,
} from "@chakra-ui/react";
import {
  FaServer,
  FaCode,
  FaUsers,
  FaProjectDiagram,
} from "react-icons/fa";
import "animate.css";

const features = [
  {
    icon: FaServer,
    title: "Quick Deployment",
    description:
      "Launch IT solutions faster with minimal setup and expert support.",
    bg: "green.100",
    iconColor: "green.500",
    boxShadow: "0 0 0 1px #E2E8F0",
    bgBox: "white",
  },
  {
    icon: FaCode,
    title: "Secure Development",
    description:
      "We build and test software with strong security and quality in mind.",
    bg: "pink.100",
    iconColor: "pink.500",
    boxShadow: "0 0 0 1px #E2E8F0",
    bgBox: "white",
  },
  {
    icon: FaUsers,
    title: "Inclusive Workforce",
    description:
      "Train and upskill diverse teams with IT and DEI-focused programs.",
    bg: "purple.100",
    iconColor: "purple.500",
    boxShadow: "0 0 0 1px #E2E8F0",
    bgBox: "white",
  },
  {
    icon: FaProjectDiagram,
    title: "Smart Access",
    description:
      "Ensure accessibility and control across platforms and services.",
    bg: "orange.100",
    iconColor: "orange.500",
    boxShadow: "0 0 0 1px #E2E8F0",
    bgBox: "white",
  },
];

const SecHeroSection = () => {
  return (
    <Box
      as="section"
      role="region"
      aria-labelledby="feature-section-title"
      py={{ base: 5, md: 10 }}
      px={{ base: 4, md: 5, lg: 10 }}
      bg="white"
    >
      <Heading
        id="feature-section-title"
        as="h2"
        size="lg"
        mb={8}
        srOnly
      >
        Our IT Capabilities
      </Heading>

      <Grid
        role="list"
        aria-label="List of Our IT Capabilities"
        templateColumns={{
          base: "1fr",
          sm: "1fr",
          md: "repeat(2, 1fr)",
          lg: "repeat(4, 1fr)",
        }}
        gap={{ base: 6, md: 8 }}
      >
        {features.map((feature, idx) => {
          const titleId = `feature-title-${idx}`;
          const descId = `feature-desc-${idx}`;

          return (
            <Box
              key={idx}
              aria-labelledby={titleId}
              aria-describedby={descId}
              className={`animate__animated animate__fadeInUp animate__delay-${idx + 1}s`}
              p={{ base: 6, md: 8 }}
              bg={feature.bgBox}
              borderRadius="xl"
              boxShadow={feature.boxShadow}
              transition="all 0.1s"
              _hover={{
                transform: "translateY(-5px)",
                bgGradient: "linear(135deg, #23bdb8, #43e794)",
                color: "white",
              }}
              role="group"
              aria-roledescription="feature"
            >
              <VStack spacing={4} align="start">
                <Circle
                  size="50px"
                  bg={feature.bg}
                  _groupHover={{ bg: "white" }}
                  transition="background-color 0.3s"
                >
                  <Icon
                    as={feature.icon}
                    boxSize={6}
                    color={feature.iconColor}
                    transition="color 0.3s"
                    aria-hidden="true"
                  />
                </Circle>

                <Heading
                  id={titleId}
                  as="h3"
                  fontSize={{ base: "md", md: "lg" }}
                  fontWeight="bold"
                  _groupHover={{ color: "white" }}
                  transition="color 0.3s"
                >
                  {feature.title}
                </Heading>

                <Text
                  id={descId}
                  fontSize={{ base: "sm", md: "sm" }}
                  _groupHover={{ color: "white" }}
                  transition="color 0.3s"
                  tabIndex={0} // make it focusable for screen reader navigation
                  aria-labelledby={titleId} // tell the screen reader to read the heading first
                >
                  {feature.description}
                </Text>

              </VStack>
            </Box>
          );
        })}
      </Grid>

    </Box>
  );
};

export default SecHeroSection;
