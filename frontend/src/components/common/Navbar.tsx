import {
  Box,
  Flex,
  HStack,
  IconButton,
  Button,
  Link as ChakraLink,
  useDisclosure,
  Drawer,
  DrawerOverlay,
  DrawerContent,
  DrawerHeader,
  DrawerBody,
  Image,
  VStack,
  DrawerCloseButton,
} from '@chakra-ui/react'
import { HamburgerIcon } from '@chakra-ui/icons'
import { FaLinkedin, FaInstagram, FaYoutube, FaFacebook, FaTwitter } from 'react-icons/fa'
import { useEffect, useState } from 'react'
import { Link as RouterLink } from 'react-router-dom'

const Navbar = () => {
  const { isOpen, onOpen, onClose } = useDisclosure()
  const [scrolling, setScrolling] = useState(false)

  useEffect(() => {
    const handleScroll = () => setScrolling(window.scrollY > 10)
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  // Menu links for reuse
  const menuLinks = [
    { label: 'Home', to: '/' },
    { label: 'About', to: '/about' },
    { label: 'Newsletters', to: '/newsletters' },
    { label: 'Blogs', to: '/blogs' },
    { label: 'Accessible Ebooks', to: '/ebooks' },
  ]

  const socialLinks = [
    {
      label: 'LinkedIn',
      href: 'https://www.linkedin.com',
      icon: FaLinkedin,
      color: '#0A66C2',
    },
    {
      label: 'Twitter X',
      href: 'https://twitter.com',
      icon: FaTwitter,
      color: '#1DA1F2',
    },
    {
      label: 'Instagram',
      href: 'https://www.instagram.com',
      icon: FaInstagram,
      color: '#E1306C',
    },
    {
      label: 'Facebook',
      href: 'https://www.facebook.com',
      icon: FaFacebook,
      color: '#1877F2',
    },
    {
      label: 'YouTube',
      href: 'https://www.youtube.com',
      icon: FaYoutube,
      color: '#FF0000',
    },
  ]

  return (
    <Box as="header" role="banner" position="fixed" top={0} left={0} right={0} zIndex={1000}>
      {/* Skip to main content */}
      <ChakraLink
        href="#main-content"
        position="absolute"
        left="-999px"
        _focus={{
          left: '4px',
          top: '4px',
          bg: 'white',
          zIndex: '1001',
          padding: '8px',
          borderRadius: 'md',
          boxShadow: 'md',
        }}
      >
        Skip to main content
      </ChakraLink>

      <Box
        bg={scrolling ? 'white' : 'transparent'}
        boxShadow={scrolling ? 'md' : 'none'}
        px={{ base: 4, md: 8, lg: 10 }}
        py={{ base: 2, md: 3 }}
        transition="background-color 0.3s ease, box-shadow 0.3s ease"
      >
        <Flex h={{ base: '56px', md: '64px' }} alignItems="center" justifyContent="space-between" maxW="1200px" mx="auto">
          {/* Logo */}
          <Box>
            <ChakraLink
              as={RouterLink}
              to="/"
              aria-label="Go to homepage"
              _focus={{ boxShadow: 'outline' }}
            >
              <Image
                src="/assets/WVIS.png"
                alt="Website Logo"
                h={{ base: '36px', md: '48px' }}
                objectFit="contain"
              />
            </ChakraLink>
          </Box>

          {/* Desktop Nav */}
          <HStack spacing={6} display={{ base: 'none', md: 'flex' }} alignItems="center">
            {menuLinks.slice(1).map(({ label, to }) => (
              <ChakraLink
                key={label}
                as={RouterLink}
                to={to}
                fontWeight="medium"
                fontSize="md"
                color="gray.700"
                _hover={{ color: 'purple.600', textDecoration: 'none' }}
                aria-label={`Navigate to ${label} page`}
                _focus={{ boxShadow: 'outline' }}
              >
                {label}
              </ChakraLink>
            ))}

            <Button
              as={RouterLink}
              to="/contact"
              variant="outline"
              borderColor="green.200"
              fontWeight="bold"
              size="sm"
              _hover={{ bg: 'green.50' }}
              aria-label="Contact Us page"
            >
              Contact Us
            </Button>

            {/* Social Media Links */}
            <HStack spacing={3}>
              {socialLinks.map(({ label, href, icon: Icon, color }) => (
                <ChakraLink
                  key={label}
                  href={href}
                  isExternal
                  aria-label={`Visit ${label} profile`}
                  _hover={{ transform: 'scale(1.1)' }}
                  transition="transform 0.2s"
                >
                  <Icon size={20} color={color} />
                </ChakraLink>
              ))}
            </HStack>
          </HStack>

          {/* Mobile Menu Button */}
          <IconButton
            size="md"
            icon={<HamburgerIcon />}
            aria-label="Open mobile menu"
            display={{ base: 'flex', md: 'none' }}
            onClick={onOpen}
            variant="ghost"
            _focus={{ boxShadow: 'outline' }}
          />
        </Flex>

        {/* Mobile Drawer */}
        <Drawer
          isOpen={isOpen}
          placement="right"
          onClose={onClose}
          size="xs"
          returnFocusOnClose={false}
          onOverlayClick={onClose}
          aria-label="Mobile navigation menu"
        >
          <DrawerOverlay />
          <DrawerContent>
            <DrawerCloseButton aria-label="Close mobile menu" />
            <DrawerHeader>Menu</DrawerHeader>
            <DrawerBody>
              <VStack align="start" spacing={6}>
                {menuLinks.map(({ label, to }) => (
                  <ChakraLink
                    key={label}
                    as={RouterLink}
                    to={to}
                    fontSize="lg"
                    fontWeight="medium"
                    _hover={{ color: 'purple.600', textDecoration: 'none' }}
                    onClick={onClose}
                    aria-label={`Navigate to ${label} page in mobile menu`}
                    _focus={{ boxShadow: 'outline' }}
                    w="full"
                  >
                    {label}
                  </ChakraLink>
                ))}

                <Button
                  as={RouterLink}
                  to="/contact"
                  w="full"
                  variant="outline"
                  borderColor="green.200"
                  fontWeight="bold"
                  onClick={onClose}
                  aria-label="Go to Contact Us page"
                >
                  Contact Us
                </Button>

                {/* Social Media Icons */}
                <HStack spacing={5} pt={4}>
                  {socialLinks.map(({ label, href, icon: Icon, color }) => (
                    <ChakraLink
                      key={label}
                      href={href}
                      isExternal
                      aria-label={`Visit ${label} profile`}
                      _hover={{ transform: 'scale(1.1)' }}
                      transition="transform 0.2s"
                    >
                      <Icon size={24} color={color} />
                    </ChakraLink>
                  ))}
                </HStack>
              </VStack>
            </DrawerBody>
          </DrawerContent>
        </Drawer>
      </Box>
    </Box>
  )
}

export default Navbar
