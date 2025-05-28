import {
  Container,
  SimpleGrid,
  Image,
  Flex,
  Heading,
  Text,
  Stack,
  Icon,
  useColorModeValue,
  VisuallyHidden,
} from '@chakra-ui/react';
import {
  FaUsers,
  FaClock,
  FaCertificate,
  FaCode,
  FaLanguage,
  FaArrowRight,
} from 'react-icons/fa';
import { ReactElement } from 'react';

interface FeatureProps {
  text: string;
  iconBg: string;
  icon?: ReactElement;
}

const Feature = ({ text, icon, iconBg }: FeatureProps) => {
  return (
    <Stack
      as="div"
      role="group"
      direction={'row'}
      align={'center'}
      spacing={4}
      aria-label={text}
    >
      <Flex
        w={10}
        h={10}
        align={'center'}
        justify={'center'}
        rounded={'full'}
        bg={iconBg}
        aria-hidden="true"
      >
        {icon}
      </Flex>
      <Text fontWeight={600}>{text}</Text>
    </Stack>
  );
};

export default function Product() {
  return (
    <section
      role="region"
      aria-labelledby="product-overview"
      aria-describedby="product-description"
    >
      <Container maxW={'6xl'} py={12}>
        <SimpleGrid columns={{ base: 1, md: 2 }} spacing={10}>
          {/* Text Content */}
          <Stack spacing={4} as="div">
            <Text
              id="product-badge"
              textTransform={'uppercase'}
              color={'blue.400'}
              fontWeight={600}
              fontSize={'sm'}
              bg={useColorModeValue('blue.50', 'blue.900')}
              p={2}
              alignSelf={'flex-start'}
              rounded={'md'}
              aria-label="Platform Name: NammAcademy"
            >
              NammAcademy
            </Text>

            <Heading
              id="product-overview"
              as="h1"
              fontSize={{ base: '2xl', md: '3xl' }}
            >
              Unlock Your Potential with NammAcademy
            </Heading>

            <Text
              id="product-description"
              color={'gray.500'}
              fontSize={'lg'}
              aria-label="NammAcademy description"
            >
              NammAcademy is an inclusive learning platform offering courses in
              English, Indian Sign Language, and regional languages. Whether
              you're a student or a seasoned professional, enhance your skills
              on our user-friendly platform — designed for all, including screen
              reader users. Stay ahead with courses updated to match the latest
              industry trends.
            </Text>

            {/* Features Section */}
            <section
              aria-labelledby="features-heading"
              role="region"
            >
              <VisuallyHidden>
                <Heading as="h2" id="features-heading">
                  Key Features of NammAcademy
                </Heading>
              </VisuallyHidden>

              <SimpleGrid columns={{ base: 1, sm: 2 }} spacing={4} pt={4}>
                <Feature
                  icon={<Icon as={FaUsers} color={'blue.500'} w={5} h={5} />}
                  iconBg={useColorModeValue('blue.100', 'blue.900')}
                  text={'Inclusive for All'}
                />
                <Feature
                  icon={<Icon as={FaClock} color={'orange.500'} w={5} h={5} />}
                  iconBg={useColorModeValue('orange.100', 'orange.900')}
                  text={'Self Paced Learning'}
                />
                <Feature
                  icon={
                    <Icon as={FaCertificate} color={'red.500'} w={5} h={5} />
                  }
                  iconBg={useColorModeValue('red.100', 'red.900')}
                  text={'Certification'}
                />
                <Feature
                  icon={<Icon as={FaCode} color={'cyan.500'} w={5} h={5} />}
                  iconBg={useColorModeValue('cyan.100', 'cyan.900')}
                  text={'Coding Sandbox'}
                />
                <Feature
                  icon={
                    <Icon as={FaLanguage} color={'yellow.600'} w={5} h={5} />
                  }
                  iconBg={useColorModeValue('yellow.100', 'yellow.900')}
                  text={'Regional Languages'}
                />
                <Flex pt={2}>
                  <a
                    href="https://nammacademy.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="Visit the official NammAcademy website"
                  >
                    <Text
                      display="flex"
                      alignItems="center"
                      fontWeight="bold"
                      color="blue.500"
                      _hover={{ color: 'blue.600' }}
                      transition="all 0.3s ease"
                    >
                      Visit Site
                      <Icon as={FaArrowRight} ml={2} />
                    </Text>
                  </a>
                </Flex>
              </SimpleGrid>
            </section>
          </Stack>

          {/* Image Section */}
          <Flex
            justify="center"
            align="center"
            role="img"
            aria-label="Screenshot of NammAcademy platform"
          >
            <Image
              rounded={'md'}
              alt="Screenshot of NammAcademy learning platform"
              src={'/assets/4144421.jpg'}
              objectFit={'cover'}
              maxW={'100%'}
              height={{ base: 'auto', sm: '300px', md: '400px' }}
            />
          </Flex>
        </SimpleGrid>
      </Container>
    </section>
  );
}
