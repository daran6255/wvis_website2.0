import {
  Box,
  Center,
  Text,
  Heading,
  SimpleGrid,
  HStack,
  IconButton,
  Image,
} from '@chakra-ui/react';
import {
  FaFacebookF,
  FaLinkedinIn,
  FaInstagram,
} from 'react-icons/fa';
import { FaXTwitter } from 'react-icons/fa6'; // from react-icons for X icon

const teamMembers = [
  {
    name: 'Sivasankar Jayagopal',
    role: 'Founder & Chairman',
    image: '/assets/teams/Shiva.jpeg',
    description: 'A recognized IT thought leader with 30+ years of expertise, has held key roles at Keane (NTT Data), Adobe, and Microsoft, driving benchmarking and global engagements.',
  },
  {
    name: 'Akila Sankar',
    role: 'Co-Founder',
    image: '/assets/teams/Akila.jpg',
    description: 'An expert in disability support, child development, neurodiversity, soft skills, and Indian Sign Language, with 17+ years of experience.',
  },
  {
    name: 'Baskaran Arumugam',
    role: 'Director - Products',
    image: '/assets/teams/Baskaran.jpeg',
    description: 'An IT expert with 27+ years of experience, specializes in software design, testing, automation, and Agile project management, with domain expertise across cloud telephony, medical devices, and test equipment.',
  },
  {
    name: 'Aravindan G',
    role: 'Director - Business Intelligence',
    image: '/assets/teams/Aravindan.jpeg',
    description: 'A Power BI expert with 22+ years of IT experience, has shaped Microsofts data-driven culture, trained top corporates, and specializes in CIO and Engineering dashboards.',
  },
];

const Team = () => {
  return (
    <section aria-labelledby="our-team-heading">
      <Box py={16} bg="#fdfbfb">
        <Center flexDirection="column" mb={12} textAlign="center">
          <Heading id="our-team-heading" size="lg" mb={2} color="gray.800">
            Our Awesome Team
          </Heading>
          <Box
            w="50px"
            h="3px"
            bgGradient="linear(to-r, green.300, green.400)"
            borderRadius="full"
            mb={2}
          />
          <Text color="gray.500" maxW="600px">
            Meet the leaders driving inclusive, accessible, and impactful learning experiences.
          </Text>
        </Center>

        <SimpleGrid
          columns={[1, 2, 3, 4]}
          spacing={6}
          px={[4, 8, 16]}
          aria-labelledby="our-team-heading"
        >
          {teamMembers.map((member, index) => (
            <Box
              key={index}
              as="article"
              bg="white"
              borderRadius="md"
              boxShadow="sm"
              p={6}
              textAlign="center"
              transition="all 0.3s"
              _hover={{ boxShadow: 'md' }}
              aria-labelledby={`team-member-${index}`}
              aria-describedby={`team-member-desc-${index}`}
            >
              <Center mb={4}>
                <Image
                  src={member.image}
                  alt={`Photo of ${member.name}`}
                  boxSize="150px"
                  borderRadius="full"
                  border="4px solid #c4f0d9"
                  objectFit="cover"
                  boxShadow="sm"
                />
              </Center>

              <Text
                fontWeight="bold"
                fontSize="md"
                color="gray.800"
                id={`team-member-${index}`}
              >
                {member.name}
              </Text>
              <Text fontSize="sm" fontWeight="medium" color="green.500">
                {member.role}
              </Text>

              <HStack spacing={4} justify="center" mt={4} mb={2}>
                <IconButton
                  aria-label={`Follow ${member.name} on Facebook`}
                  icon={<FaFacebookF />}
                  variant="ghost"
                  isRound
                  color="#3b5998"
                />
                <IconButton
                  aria-label={`Follow ${member.name} on X (formerly Twitter)`}
                  icon={<FaXTwitter />}
                  variant="ghost"
                  isRound
                  color="black"
                />
                <IconButton
                  aria-label={`Follow ${member.name} on Instagram`}
                  icon={<FaInstagram />}
                  variant="ghost"
                  isRound
                  color="#E1306C"
                />
                <IconButton
                  aria-label={`Follow ${member.name} on LinkedIn`}
                  icon={<FaLinkedinIn />}
                  variant="ghost"
                  isRound
                  color="#0077b5"
                />
              </HStack>

              <Text fontSize="sm" color="gray.500" id={`team-member-desc-${index}`}>
                {member.description}
              </Text>
            </Box>
          ))}
        </SimpleGrid>
      </Box>
    </section>
  );
};

export default Team;
