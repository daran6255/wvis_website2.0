"use client";
import {
  Badge,
  Box,
  Button,
  Container,
  Heading,
  Stack,
  Text,
} from "@chakra-ui/react";
import TyperComponent from "../common/TyperComponent";

export default function Hero() {
  return (
    <Box
      as="section"
      position="relative"
      bg="white"
      minH="900px"
      display="flex"
      alignItems="center"
      justifyContent="center"
      overflow="hidden"
    >
      <Container maxW="container.lg" position="relative" zIndex={1}>
        <Stack spacing={8} align="center" textAlign="center">

          {/* Gradient Border Badge */}
          <Badge
            px={4}
            py={2}
            fontSize="sm"
            fontWeight="semibold"
            position="relative"
            bg="white"
            _before={{
              content: '""',
              position: "absolute",
              inset: 0,
              borderRadius: "10px",
              padding: "1.5px",
              background:
                "linear-gradient(90deg, rgba(63, 94, 251, 1) 0%, rgba(252, 70, 107, 1) 100%)",
              WebkitMask:
                "linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)",
              WebkitMaskComposite: "xor",
              maskComposite: "exclude",
            }}
          >
            Trusted Technology Consulting Partner
          </Badge>

          {/* Headline */}
          <Heading as="h1" size="4xl" fontWeight="semibold">
            Driving Business Growth with
            <br />
          </Heading>
          <TyperComponent
            strings={[
              "AI-Powered Solutions",
              "Enterprise-Grade IT Consulting",
              "Compliance & Accessibility Services",
              "Digital Transformation Strategies",
              "Custom Software Development",
              "Cloud & Infrastructure Solutions",
            ]}
          />

          {/* Subheading */}
          <Text fontSize="lg" color="gray.600" maxW="3xl">
            We help U.S. enterprises achieve <strong>scalable growth</strong> through{" "}
            <em>AI innovation, digital transformation, and secure technology solutions</em>{" "}
            built for long-term business success.
          </Text>

          {/* CTA Buttons */}
          <Stack
            direction={{ base: "column", sm: "row" }}
            spacing={4}
            justify="center"
          >
            <Button
              size="lg"
              colorScheme="teal"
              variant="solid"
              px={8}
              rightIcon={<i className="icon feather-arrow-right"></i>}
            >
              Explore Our Services
            </Button>
            <Button
              size="lg"
              colorScheme="blue"
              variant="outline"
              px={8}
              rightIcon={<i className="icon feather-arrow-right"></i>}
            >
              Schedule a Consultation
            </Button>
          </Stack>

          {/* Supporting tagline */}
          <Text fontSize="sm" color="gray.500" mt={6}>
            🚀 Empowering organizations nationwide with{" "}
            <strong>secure, compliant, and future-ready IT solutions</strong>.
          </Text>
        </Stack>
      </Container>
    </Box>
  );
}
