import {
  Box,
  Grid,
  GridItem,
  Text,
  Icon,
  Flex,
  Heading,
  VStack,
  useColorModeValue,
  List,
  ListItem,
  ListIcon,
  useBreakpointValue,
} from "@chakra-ui/react";
import {
  MdSettings,
  MdEmail,
  MdDashboard,
  MdInfo,
  MdOutlineExtension,
  MdOutlineAlarm,
  MdCheckCircle,
  MdOutlineDocumentScanner,
} from "react-icons/md";
import { IconType } from "react-icons";
import { motion, useInView } from "framer-motion";
import { useRef, Fragment } from "react";

interface Service {
  icon: IconType;
  label: string;
  subtitle: string;
  points: string[];
  bg: string;
  color: string;
}

interface FeatureCardProps {
  service: Service;
  index: number;
  cardBg: string;
  iconHoverColor: string;
}

const MotionGridItem = motion(GridItem);

const FeatureCard = ({
  service,
  index,
  cardBg,
  iconHoverColor,
}: FeatureCardProps) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });

  return (
    <MotionGridItem
      ref={ref}
      p={6}
      bg={cardBg}
      borderRadius="lg"
      boxShadow="md"
      _hover={{
        boxShadow: "xl",
        transform: "translateY(-5px)",
        filter: "brightness(1.05)",
      }}
      role="group"
      initial={{ opacity: 0, y: 30 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, delay: index * 0.1 }}
      aria-labelledby={`feature-card-${index}`}
    >
      <Flex align="center" gap={4} mb={4}>
        <Flex
          w={12}
          h={12}
          bg={service.bg}
          borderRadius="full"
          align="center"
          justify="center"
          transition="all 0.3s ease"
          _groupHover={{ bg: service.color }}
        >
          <Icon
            as={service.icon}
            boxSize={6}
            color={service.color}
            _groupHover={{ color: iconHoverColor }}
            aria-hidden="true"
            focusable="false"
          />
        </Flex>
        <Box>
          <Text
            fontWeight="bold"
            fontSize="xl"
            _groupHover={{ color: service.color }}
            id={`feature-card-${index}`}
          >
            {service.label}
          </Text>
          <Text fontSize="md" color="gray.500">
            {service.subtitle}
          </Text>
        </Box>
      </Flex>
      <List spacing={2} pl={2}>
        {service.points.map((point, idx) => (
          <ListItem key={idx} fontSize="md" color="gray.600">
            <ListIcon
              as={MdCheckCircle}
              color={service.color}
              aria-hidden="true"
              focusable="false"
            />
            {point}
          </ListItem>
        ))}
      </List>
    </MotionGridItem>
  );
};

const services: Service[] = [
  {
    icon: MdSettings,
    label: "Disability Awareness Orientation",
    subtitle: "Understand Diverse Strength",
    points: [
      "Live Interaction with PWDs",
      "Experiential Zones",
      "Immersive Learning Experience",
    ],
    bg: "green.100",
    color: "green.400",
  },
  {
    icon: MdEmail,
    label: "Indian Sign Language Course",
    subtitle: "Customized ISL Training by Inclusive Team",
    points: [
      "Practice-Oriented Learning",
      "Real-World Scenarios",
      "Hands-On Communication Skills",
    ],
    bg: "purple.100",
    color: "purple.400",
  },
  {
    icon: MdDashboard,
    label: "Inclusive Course Content Creation",
    subtitle: "Accessible Learning for All",
    points: [
      "Content Tailored for PWDs",
      "Real-Time Examples",
      "Self-Paced Flexibility",
    ],
    bg: "blue.100",
    color: "blue.400",
  },
  {
    icon: MdInfo,
    label: "Skill-Building & Upskilling Programs",
    subtitle: "Upskill Your PWD Associates",
    points: [
      "Accessible Curriculum Design",
      "Practice-Driven Training",
      "Conducted by Inclusive Experts",
    ],
    bg: "orange.100",
    color: "orange.400",
  },
  {
    icon: MdOutlineExtension,
    label: "Sign Language Interpretation",
    subtitle: "Communication Without Barriers",
    points: [
      "Interviews & HR Interactions",
      "Support in Trainings",
      "Events, Workshops & Meetings",
    ],
    bg: "teal.100",
    color: "teal.400",
  },
  {
    icon: MdOutlineDocumentScanner,
    label: "Comprehensive Document Remediation",
    subtitle: "Document Digitization and Remediation",
    points: [
      "Equitable Digital Access",
      "Covers Multi-format Remediation",
      "Certified Accessibility Excellence",
    ],
    bg: "red.100",
    color: "red.400",
  },
  {
    icon: MdOutlineAlarm,
    label: "Inclusive Recruitment & Support",
    subtitle: "Empowering Inclusive Workplaces",
    points: [
      "Tailored Recruitment Model",
      "Onboarding with Job Coaches",
      "Train-and-Hire Strategy",
    ],
    bg: "red.100",
    color: "red.400",
  },
];

const Features = () => {
  const cardBg = useColorModeValue("white", "gray.800");
  const iconHoverColor = useColorModeValue("white", "white");

  const gridTemplateColumns = useBreakpointValue({
    base: "1fr",
    md: "repeat(2, 1fr)",
    lg: "repeat(3, 1fr)",
  });

  // Detect large screens
  const isLargeScreen = useBreakpointValue({
    base: false,
    md: false,
    lg: true,
  });

  const shouldCenterLast = services.length % 3 === 1 && isLargeScreen === true;

  return (
    <Box
      as="section"
      aria-labelledby="features-heading"
      bg="gray.50"
      py={20}
      px={[4, 6, 16]}
    >
      <VStack spacing={4} textAlign="center" mb={10}>
        <Heading id="features-heading" fontSize="4xl" fontWeight="bold">
          Features of DEI Services
        </Heading>
        <Box h="2px" w="60px" bg="green.400" borderRadius="full" />
        <Text color="gray.500" maxW="600px" fontSize="lg">
          We provide holistic and inclusive training and support services to
          ensure accessibility, upskilling, and empowerment of persons with
          disabilities.
        </Text>
      </VStack>

      <Grid templateColumns={gridTemplateColumns} gap={6}>
        {services.map((service, index) => {
          const isLast = index === services.length - 1;

          if (shouldCenterLast && isLast) {
            return (
              <Fragment key={index}>
                {/* Empty grid item left */}
                <GridItem display={{ base: "none", lg: "block" }} />
                {/* Center card */}
                <FeatureCard
                  service={service}
                  index={index}
                  cardBg={cardBg}
                  iconHoverColor={iconHoverColor}
                />
                {/* Empty grid item right */}
                <GridItem display={{ base: "none", lg: "block" }} />
              </Fragment>
            );
          }

          return (
            <FeatureCard
              key={index}
              service={service}
              index={index}
              cardBg={cardBg}
              iconHoverColor={iconHoverColor}
            />
          );
        })}
      </Grid>
    </Box>
  );
};

export default Features;
