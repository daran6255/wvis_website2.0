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
	FaCode,
	FaMobileAlt,
	FaRobot,
	FaChartBar,
	FaCloudUploadAlt,
	FaChartPie,
	FaBug,
	FaUniversalAccess,
  } from "react-icons/fa";
  import { motion } from "framer-motion";
  
  const MotionGridItem = motion(GridItem);
  
  const services = [
	{ label: "Smart Web Solutions", icon: FaCode },
	{ label: "Mobile Innovation", icon: FaMobileAlt },
	{ label: "AI & ML Intelligence", icon: FaRobot },
	{ label: "Data Insights & Analytics", icon: FaChartBar },
	{ label: "CloudCare Services", icon: FaCloudUploadAlt },
	{ label: "Power BI Dashboards", icon: FaChartPie },
	{ label: "Quality Testing Hub", icon: FaBug },
	{ label: "Inclusive Accessibility Testing", icon: FaUniversalAccess },
  ];
  
  const ITServicesSection = () => {
	const headingId = "it-services-heading";
  
	return (
	  <Box
		as="section"
		role="region"
		aria-labelledby={headingId}
		bgGradient="linear(to-b, #f7fbfe, #f2faff)"
		py={{ base: 10, md: 20 }}
		px={{ base: 4, md: 20 }}
	  >
		<Grid templateColumns={{ base: "1fr", md: "1fr 1fr" }} alignItems="center" gap={10}>
		  {/* Left Section */}
		  <Box>
			<Heading id={headingId} as="h2" fontSize={{ base: "2xl", md: "4xl" }} mb={4} color="gray.800">
			  IT Consultancy Services
			</Heading>
			<Box w="60px" h="4px" bg="green.300" mb={6} borderRadius="full" />
			<Text fontSize="lg" color="gray.500" mb={10}>
			  Innovate smarter with end-to-end IT solutions. From web and mobile apps to AI-driven analytics, cloud services, and automation — our IT services are built to scale, secure, and simplify your digital journey.
			</Text>
  
			<VisuallyHidden as="h3">Our IT Services</VisuallyHidden>
  
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
				  aria-labelledby={`service-${index}`}
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
					  id={`service-${index}`}
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
  
		  {/* Right Section - Image */}
		  <Box position="relative" textAlign="center" height="350px">
			<Box
			  as="img"
			  src="/assets/IT.png"
			  alt="Illustration representing IT services"
			  position="absolute"
			  top="50%"
			  left="50%"
			  transform="translate(-50%, -50%)"
			  zIndex={0}
			  maxW="350px"
			  w="100%"
			  objectFit="contain"
			/>
		  </Box>
		</Grid>
	  </Box>
	);
  };
  
  export default ITServicesSection;
  