import { Button, HStack, Image, useDisclosure } from "@chakra-ui/react";
import logo from "../../assets/react.svg";
import ColorModeSwitch from "../ColorModeSwitch";
import { Link } from "react-router-dom";
import CustomModal from "../common/layouts/CustomModal";
import LoginForm from "../auth/LoginForm";
import SignUpForm from "../auth/SignUpForm";
import useAuthStore from "../../stores/authStore";
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

  const { isAuthenticated, logout } = useAuthStore();

  return (
    <>
      <HStack justifyContent="space-between">
        <Link to="/">
          <Image src={logo} alt="React Logo" boxSize="50px" />
        </Link>
        <Link to="/backtest">
        Backtest Strategies
        </Link>
        <Link to="/coins">
        Coin list
        </Link>
        <Link to="/dashboard">
        Dashboard
        </Link>
        <Link to="/home">
        Home
        </Link>
        <ColorModeSwitch />
        {!isAuthenticated && (
          <div>
            <Button onClick={onLoginOpen} colorScheme="teal">
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
          <Button colorScheme="red" onClick={() => logout()}>
            Logout
          </Button>
        )}
      </HStack>
    </>
  );
};

export default NavBar;
