import {
	Box,
	Center,
	Heading,
	Text,
	SimpleGrid,
	Flex,
	Button,
	VisuallyHidden,
  } from "@chakra-ui/react";
  import { Link as RouterLink } from "react-router-dom";
  
  const stats = [
	{ value: "150+", label: "Training Sessions Conducted" },
	{ value: "5000+", label: "Beneficiaries Trained" },
	{ value: "50+", label: "Corporate Clients Served" },
	{ value: "20+", label: "Inclusive Trainers" },
  ];
  
  const Details = () => {
	return (
	  <Box
		as="section"
		aria-labelledby="corporate-training-heading"
		py={20}
		px={[4, 8, 16]}
		textAlign="center"
		position="relative"
		backgroundImage="url('/assets/details.png')"
		backgroundPosition="center"
		backgroundRepeat="no-repeat"
		backgroundSize="contain"
	  >
		{/* Main Heading */}
		<Center as="header" flexDirection="column" mb={12}>
		  <Heading
			id="corporate-training-heading"
			as="h2"
			fontSize={["2xl", "3xl", "4xl"]}
			fontWeight="bold"
			color="gray.800"
		  >
			Empowering Organizations Through Inclusive Training
		  </Heading>
  
		  <Box
			mt={3}
			mb={4}
			w="60px"
			h="4px"
			bg="green.300"
			borderRadius="full"
			mx="auto"
		  />
  
		  <Text color="gray.500" maxW="600px" aria-label="Training mission summary">
			We collaborate with organizations to deliver impactful sessions that foster
			inclusion and empower persons with disabilities through upskilling programs.
		  </Text>
		</Center>
  
		{/* Stats Section */}
		<SimpleGrid
		  as="section"
		  aria-labelledby="stats-overview-heading"
		  columns={[2, 2, 4]}
		  spacing={10}
		  justifyContent="center"
		  mb={10}
		  role="region"
		>
		  <VisuallyHidden>
			<Heading as="h3" id="stats-overview-heading">
			  Corporate Training Statistics Overview
			</Heading>
		  </VisuallyHidden>
  
		  {stats.map((item, idx) => (
			<Box
			  key={idx}
			  role="group"
			  aria-label={`${item.label}: ${item.value}`}
			>
			  <Text
				fontSize="4xl"
				fontWeight="bold"
				color="green.400"
				aria-hidden="true"
			  >
				{item.value}
			  </Text>
			  <Text color="gray.600">{item.label}</Text>
			</Box>
		  ))}
		</SimpleGrid>
  
		{/* Call to Action Section */}
		<Flex
		  as="section"
		  aria-labelledby="contact-us-heading"
		  maxW="720px"
		  mx="auto"
		  mt={8}
		  p={8}
		  border="1px solid #edf2f7"
		  borderRadius="md"
		  justify="space-between"
		  align="center"
		  flexWrap="wrap"
		  boxShadow="sm"
		  bg="white"
		>
		  <Box mb={[4, 0]}>
			<Heading as="h4" fontSize="lg" color="gray.800" id="contact-us-heading">
			  Have Any Questions About Our Training?
			</Heading>
			<Text color="blue.400" fontSize="sm">
			  We're here to help. Reach out today!
			</Text>
		  </Box>
  
		  <Button
			bgGradient="linear(to-r, #c471f5, #fa71cd)"
			color="white"
			as={RouterLink}
			to="/contact"
			px={6}
			py={4}
			fontWeight="bold"
			borderRadius="md"
			_hover={{ opacity: 0.9 }}
			aria-label="Go to Contact Us page"
		  >
			CONTACT US
		  </Button>
		</Flex>
	  </Box>
	);
  };
  
  export default Details;
  