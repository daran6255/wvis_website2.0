import {
  Box,
  Button,
  Flex,
  Heading,
  Image,
  Text,
} from "@chakra-ui/react";
import { motion } from "framer-motion";

const MotionHeading = motion(Heading);
const MotionText = motion(Text);
const MotionButton = motion(Button);

const HeroSection = () => {

  return (
    <>
      <Box
        as="section"
        role="region"
        aria-labelledby="hero-heading"
        position="relative"
        overflow="hidden"
        minH="100vh"
        bg="white"
        mt={{ base: 0, md: 20 }}
        px={{ base: 4, md: 20 }}
        py={{ base: 6, md: 12 }}
        style={{ perspective: "1000px" }}
      >

        {/* Main Hero Content */}
        <Flex
          position="relative"
          zIndex={1}
          direction={{ base: "column-reverse", md: "row" }}
          align="center"
          justify="space-between"
          gap={{ base: 8, md: 10 }}
        >
          {/* Text Section */}
          <Box flex="1" textAlign={{ base: "center", md: "left" }}>
            <MotionHeading
              id="hero-heading"
              as="h1"
              fontSize={{ base: "2xl", sm: "3xl", md: "5xl" }}
              fontWeight="bold"
              color="gray.800"
              mb={{ base: 4, md: 6 }}
              lineHeight="1.3"
              initial={{ opacity: 0, y: -40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
            >
              Empowering <br />Innovation, Inclusion, <br />and Impact
            </MotionHeading>

            <MotionText
              fontSize={{ base: "sm", md: "lg" }}
              color="gray.600"
              mb={6}
              maxW={{ base: "100%", md: "lg" }}
              mx={{ base: "auto", md: 0 }}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: 0.4 }}
            >
              Delivering cutting-edge IT solutions, transformative DEI services, and impactful corporate training programs.
              From web and mobile development to AI and cloud, we power digital transformation.
              Championing inclusivity and upskilling through accessible, future-ready training and DEI initiatives.
            </MotionText>

            <MotionButton
              size="lg"
              bg="green.400"
              color="white"
              _hover={{ bg: "green.500" }}
              px={8}
              py={6}
              shadow="xl"
              fontWeight="bold"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, delay: 0.9 }}
              aria-label="Get started with our services"
            >
              GET STARTED
            </MotionButton>
          </Box>

          {/* Image Section */}
          <Box
            flex="1"
            display="flex"
            justifyContent="center"
            alignItems="center"
            className="animate__animated animate__fadeInUp animate__delay-1s"
          >
            <Image
              src="/assets/hero.png"
              alt="Illustration of a developer at work"
              maxW={{ base: "90%", sm: "80%", md: "500px" }}
              objectFit="contain"
              zIndex={1}
            />
          </Box>
        </Flex>
      </Box>
    </>
  );
};

export default HeroSection;
