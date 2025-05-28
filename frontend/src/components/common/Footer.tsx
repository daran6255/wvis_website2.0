import {
  Box,
  chakra,
  Container,
  Stack,
  Text,
  useColorModeValue,
  VisuallyHidden,
  Flex,
} from '@chakra-ui/react'
import { FaInstagram, FaTwitter, FaYoutube, FaFacebook } from 'react-icons/fa'
import { ReactNode } from 'react'

const SocialButton = ({
  children,
  label,
  href,
}: {
  children: ReactNode
  label: string
  href: string
}) => {
  const bgColor = useColorModeValue('blackAlpha.100', 'whiteAlpha.100')
  const hoverBg = useColorModeValue('blackAlpha.200', 'whiteAlpha.200')

  return (
    <chakra.button
      as="a"
      href={href}
      bg={bgColor}
      rounded="full"
      w={10}
      h={10}
      display="inline-flex"
      alignItems="center"
      justifyContent="center"
      transition="background 0.3s ease"
      _hover={{ bg: hoverBg }}
      aria-label={label}
    >
      <VisuallyHidden>{label}</VisuallyHidden>
      {children}
    </chakra.button>
  )
}

export default function SmallWithSocial() {
  const bg = useColorModeValue('gray.50', 'gray.900')
  const color = useColorModeValue('gray.700', 'gray.200')

  return (
    <Box as="footer" role="contentinfo" bg={bg} color={color}>
      <Container maxW="6xl" py={5}>
        <Flex
          direction={{ base: 'column', md: 'row' }}
          justify="space-between"
          align="center"
          fontSize="sm"
          textAlign={{ base: 'center', md: 'left' }}
        >
          <Text>© 2025 WinVinaya InfoSystems. All rights reserved.</Text>
          <Stack spacing={6}>
            <Flex justify="center">
              <Stack direction="row" spacing={6}>
                <SocialButton label="Twitter X" href="https://twitter.com">
                  <FaTwitter />
                </SocialButton>
                <SocialButton label="YouTube" href="https://youtube.com">
                  <FaYoutube />
                </SocialButton>
                <SocialButton label="Instagram" href="https://instagram.com">
                  <FaInstagram />
                </SocialButton>
                <SocialButton label="Facebook" href="https://facebook.com">
                  <FaFacebook />
                </SocialButton>
              </Stack>
            </Flex>
          </Stack>
          <Text>Empowering through Inclusive Innovation</Text>
        </Flex>
      </Container>
    </Box>
  )
}
