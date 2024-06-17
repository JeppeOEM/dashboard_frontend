
import {
  Box,
  Button,
  HStack,
  Image,
  Input,
  List,
  ListItem,
  Spinner,
  useDisclosure,
} from "@chakra-ui/react";
import strategyStore from "../../stores/strategyStore";
import useStrategyQuery from "../../hooks/useStrategyQuery";
import useStrategyMutation from "../../hooks/useStrategyMutation";
import { useState } from "react";
import Strategy from "../../models/Strategy";
import { useMutation } from "@tanstack/react-query";
import { StrategiesClient } from "../../services/ApiClientInstances";
import CustomModal from "../common/layouts/CustomModal";
import CreateStratForm from "./CreateStratForm";
const SideBar = () =>{

  const {
    isOpen: isCreateStratOpen,
    onOpen: onCreateStratOpen,
    onClose: onCreateStratClose,
  } = useDisclosure();

const {data, error, isLoading} = useStrategyQuery();
const [strategy, setStrategy] = useState<Strategy | null>(null);
// let mutation: any = null;
// if (strategy) {
//   mutation = useStrategyMutation(strategy);
// }

// const { isOpen, onOpen, onClose } = useDisclosure();
// const [inputValue, setInputValue] = useState("");

// const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
//   setInputValue(event.target.value);
// };

// const handleSubmit = async () => {
//   if (inputValue) {
//     const newStrategy = {/* id, */ name: inputValue /*, other parameters...*/};
//     setStrategy(newStrategy);
//     try {
//       await mutation.mutateAsync();
//       setInputValue("");
//       onClose();
//     } catch (error) {
//       console.error('Mutation failed', error);
//     }
//   }
// };



const { selectedStrategy, selectedId, setStrategyId } = strategyStore();

  return (
    <>
      {isLoading && <Spinner />}
      {error && <div>{error.message}</div>}
      <div>
            <Button onClick={onCreateStratOpen} colorScheme="teal">
              Create new strategy
            </Button>
            <CustomModal
              isOpen={isCreateStratOpen}
              title="Create strategy"
              onClose={onCreateStratClose}
            >
              <CreateStratForm onClose={onCreateStratClose} ></CreateStratForm>
            </CustomModal>
          </div>



      {/* {isOpen && (
        <Box>
          <Input value={inputValue} onChange={handleInputChange} />
          <Button onClick={handleSubmit}>Submit</Button>
        </Box>
      )} */}
      <List>
        {data?.map((strategy) => (
          <ListItem key={strategy.id} paddingY="5px">
            <HStack>
              <Button
                whiteSpace="normal"
                textAlign="left"
                onClick={() => {
                  if (typeof strategy.id === 'number') {
                    setStrategyId(strategy.id);
                  }
                }}
                variant="link"
                fontSize="lg"
                // colorScheme={selectedId ?? "white"}
              >
                {strategy.name}
              </Button>
            </HStack>
          </ListItem>
        ))}
      </List>
    </>
  );
};


export default SideBar



