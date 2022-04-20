import NavLink from '@/components/UI/NavLink'
import Web3 from '@/components/UI/Web3'
import { useApp } from '@/components/Context'
import {
  Alert,
  AlertIcon,
  Box,
  Flex,
  HStack,
  IconButton,
  Button,
  useDisclosure,
  Stack
} from '@chakra-ui/react'
import { HamburgerIcon, CloseIcon } from '@chakra-ui/icons'

const Links = [{ slug: '/', title: 'HOME' }]

const Bar = () => {
  const { isOpen, onOpen, onClose } = useDisclosure()
  const { state } = useApp()
  const { isTestnet } = state

  return (
    <>
      <Box bg={'gray.900'} px={4}>
        <Flex h={16} alignItems={'center'} justifyContent={'space-between'}>
          <IconButton
            size={'md'}
            icon={isOpen ? <CloseIcon /> : <HamburgerIcon />}
            aria-label={'Open Menu'}
            display={{ md: 'none' }}
            onClick={isOpen ? onClose : onOpen}
          />
          <HStack spacing={8} alignItems={'center'}>
            <HStack
              as={'nav'}
              spacing={4}
              display={{ base: 'none', md: 'flex' }}>
              {/* {Links.map((link) => (
                <NavLink key={link.slug} slug={link.slug}>
                  {link.title}
                </NavLink>
              ))} */}
            </HStack>
          </HStack>
          <Flex alignItems={'center'}>
            <Web3 />
          </Flex>
        </Flex>

        {isOpen ? (
          <Box pb={4} display={{ md: 'none' }}>
            <Stack as={'nav'} spacing={4}>
              {Links.map((link) => (
                <NavLink key={link.slug} slug={link.slug}>
                  {link.title}
                </NavLink>
              ))}
            </Stack>
          </Box>
        ) : null}
      </Box>
      {isTestnet && (
        <Alert status='warning'>
          <AlertIcon />
          You are currently on testnet.
        </Alert>
      )}
    </>
  )
}

export default Bar
