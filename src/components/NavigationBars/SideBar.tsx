
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
const SideBar = () =>{
const {data, error, isLoading} = useStrategyQuery();
const [strategy, setStrategy] = useState<Strategy | null>(null);
let mutation: any = null;
if (strategy) {
  mutation = useStrategyMutation(strategy);
}

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

const {mutate} = useMutation({
  mutationFn: (newStrategy: Strategy) => StrategiesClient.post(newStrategy)
})


const { selectedStrategy, selectedId, setStrategyId } = strategyStore();

  return (
    <>
      {isLoading && <Spinner />}
      {error && <div>{error.message}</div>}
      <Button onClick={()=>{mutate({
        "base": 1,
        "coins": [
          {
            "name": "BTC"
          }
        ],
        "tags": [
          {
            "name": "string"
          }
        ],
        "indicators": [
          {
            "name": "string",
            "settings": "string"
          }
        ],
        "description": "string",
        "name": "11d"
      })}}>Add Strategy</Button>
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



