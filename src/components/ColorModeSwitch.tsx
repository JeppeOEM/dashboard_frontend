import { HStack, Switch, useColorMode } from "@chakra-ui/react"
import { FaMoon, FaSun } from 'react-icons/fa'

// Color mode switch changes dark/light mode
const ColorModeSwitch = () => {
  const { colorMode, toggleColorMode } = useColorMode() // useColorMode from chakra

  return (
    <div>
      <HStack>
        <Switch
          colorScheme="green"
          isChecked={colorMode === "dark"}
          onChange={toggleColorMode}
        />
        {colorMode === 'dark' ? <FaSun size="1.5em"/> : <FaMoon size="1.5em" />}
      </HStack>
    </div>
  )
}

export default ColorModeSwitch