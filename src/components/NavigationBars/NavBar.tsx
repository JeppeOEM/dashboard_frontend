import {
  Button,
  Flex,
  HStack,
  Image,
  useColorModeValue,
  useDisclosure,
} from "@chakra-ui/react";
import logo from "../../assets/react.svg";
import ColorModeSwitch from "../ColorModeSwitch";
import { Link } from "react-router-dom";
import CustomModal from "../common/layouts/CustomModal";
import LoginForm from "../auth/LoginForm";
import SignUpForm from "../auth/SignUpForm";
import useAuthStore from "../../stores/authStore";
import { useColorMode } from "@chakra-ui/react";
const NavBar = () => {
  const {
    isOpen: isLoginOpen,
    onOpen: onLoginOpen,
    onClose: onLoginClose,
  } = useDisclosure();
  const {
    isOpen: isSignUpOpen,
    onOpen: onSignUpOpen,
    onClose: onSignUpClose,
  } = useDisclosure();


  // Inside your component
  const { colorMode } = useColorMode();
  const { isAuthenticated, logout } = useAuthStore();
  const bg = useColorModeValue("teal.500", "gray.800");
  return (
    <>
      <Flex
        as="nav"
        align="center"
        justify="space-between"
        wrap="wrap"
        padding="0.8rem"
        bg={bg}
        color="white"
      >
        <Flex align="center" mr={5} className="space-x-4">
          <Link to="/" className="text-lg">
            <Image src={logo} alt="React Logo" boxSize="30px" />
          </Link>
          {isAuthenticated && (
            <Link to="/backtest" className="text-lg">
              Backtest Strategies
            </Link>
          )}
          <Link to="/coins" className="text-lg">
            Coin list
          </Link>
          <Link to="/dashboard" className="text-lg">
            Dashboard
          </Link>
          <Link to="/home" className="text-lg">
            Home
          </Link>
        </Flex>
        <Flex align="center">
          <ColorModeSwitch />
          {!isAuthenticated && (
            <div>
              <Button onClick={onLoginOpen} colorScheme="teal" ml={5}>
                Login
              </Button>
              <CustomModal
                isOpen={isLoginOpen}
                title="Login"
                onClose={onLoginClose}
              >
                <LoginForm onClose={onLoginClose}></LoginForm>
              </CustomModal>
            </div>
          )}
          {!isAuthenticated && (
            <div>
              <Button onClick={onSignUpOpen} colorScheme="teal">
                Sign up
              </Button>
              <CustomModal
                isOpen={isSignUpOpen}
                onClose={onSignUpClose}
                title="Create Account"
              >
                <SignUpForm onClose={onSignUpClose}></SignUpForm>
              </CustomModal>
            </div>
          )}

          {isAuthenticated && (
            <div>
<Button
  colorScheme={colorMode === "dark" ? "black" : "white"}
  color={colorMode === "dark" ? "white" : "black"}
  ml={4}
  onClick={() => logout()}
>
  Log out
</Button>
            </div>
          )}
        </Flex>
      </Flex>
    </>
  );
};

export default NavBar;
