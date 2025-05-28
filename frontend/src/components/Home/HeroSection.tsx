import {
  Box,
  Button,
  Flex,
  Heading,
  Image,
  Text,
  useBreakpointValue,
} from "@chakra-ui/react";
import { keyframes } from "@emotion/react";
import { motion } from "framer-motion";
import "animate.css";

const coinFlip = keyframes`
  0% { transform: rotateY(0deg); }
  50% { transform: rotateY(180deg); }
  100% { transform: rotateY(360deg); }
`;

const MotionHeading = motion(Heading);
const MotionText = motion(Text);
const MotionButton = motion(Button);

const HeroSection = () => {
  const isMobile = useBreakpointValue({ base: true, md: false });

  const coinCircles = [
    { top: "10%", left: "5%", size: "30px", bg: "green.200", dur: "6s", opacity: 0.6 },
    { bottom: "15%", right: "8%", size: "20px", bg: "blue.200", dur: "8s", opacity: 0.5 },
    { top: "25%", right: "20%", size: "15px", bg: "purple.200", dur: "5s", opacity: 0.4 },
    { bottom: "30%", left: "15%", size: "25px", bg: "yellow.200", dur: "7s", opacity: 0.5 },
    { top: "40%", left: "70%", size: "18px", bg: "pink.200", dur: "9s", opacity: 0.5 },
    { top: "10%", right: "15%", size: "25px", bg: "orange.200", dur: "6s", opacity: 0.5 },
    { bottom: "10%", right: "10%", size: "30px", bg: "teal.200", dur: "7s", opacity: 0.6 },
    { top: "50%", right: "5%", size: "22px", bg: "red.200", dur: "5s", opacity: 0.4 },
    { top: "5%", left: "10%", size: "22px", bg: "cyan.200", dur: "5s", opacity: 0.5 },
    { top: "45%", left: "8%", size: "18px", bg: "pink.300", dur: "6s", opacity: 0.4 },
    { bottom: "15%", left: "5%", size: "28px", bg: "purple.100", dur: "7s", opacity: 0.6 },
    { bottom: "5%", left: "20%", size: "20px", bg: "blue.100", dur: "8s", opacity: 0.5 },
    { top: "20%", left: "12%", size: "24px", bg: "orange.100", dur: "6s", opacity: 0.5 },
    { top: "60%", left: "10%", size: "20px", bg: "teal.100", dur: "7s", opacity: 0.4 },
    { bottom: "20%", right: "20%", size: "26px", bg: "cyan.100", dur: "6s", opacity: 0.5 },
    { top: "35%", right: "10%", size: "18px", bg: "yellow.100", dur: "5s", opacity: 0.5 },
  ];

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
        {/* Background Coins - Decorative Only */}
        {(isMobile ? coinCircles.slice(0, 5) : coinCircles).map((circle, i) => (
          <Box
            key={i}
            position="absolute"
            top={circle.top}
            bottom={circle.bottom}
            left={circle.left}
            right={circle.right}
            w={circle.size}
            h={circle.size}
            borderRadius="full"
            bg={circle.bg}
            animation={`${coinFlip} ${circle.dur} linear infinite`}
            zIndex={0}
            opacity={circle.opacity}
            aria-hidden="true"
            role="presentation"
          />
        ))}

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
