import {
  Box,
  Button,
  Collapse,
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

import { useEffect, useState } from "react";
import Strategy from "../../models/Strategy";
import { useMutation } from "@tanstack/react-query";
import { StrategiesClient } from "../../services/ApiClientInstances";
import CustomModal from "../common/layouts/CustomModal";
import CreateStratForm from "./CreateStratForm";

export default function SelectStrategyPanel() {
  const {
    isOpen: isCreateStratOpen,
    onOpen: onCreateStratOpen,
    onClose: onCreateStratClose,
  } = useDisclosure();

  const { data, error, isLoading } = useStrategyQuery();

  const { strategies, selectedId, setStrategies, setStrategyId, getById } =
    strategyStore();

  const [isListVisible, setListVisible] = useState(true);

  // updates the client with new data everytime data changes
  useEffect(() => {
    if (data) {
      setStrategies(data);
    }
  }, [data]);

  // Component logic goes here
  return (
    <>
      {/* {error && <div>{error.message}</div>} */}

      <Button onClick={onCreateStratOpen} colorScheme="teal" mb={3} mt={3}>
        Create new strategy
      </Button>
      {isLoading && <Spinner />}
      <Button
        onClick={() => setListVisible(!isListVisible)}
        width="100%"
        border="none"
      >
        {isListVisible ? "Strategy List" : "Strategy List"}
        <Box
          as="span"
          border="solid 1px"
          borderColor="currentColor"
          borderWidth="0 2px 2px 0"
          display="inline-block"
          padding="3px"
          transform={isListVisible ? "rotate(-135deg)" : "rotate(45deg)"}
          marginLeft="5px"
        />
      </Button>
      {isListVisible && (
        <div>
          <CustomModal
            isOpen={isCreateStratOpen}
            title="Create strategy"
            onClose={onCreateStratClose}
          >
            <CreateStratForm onClose={onCreateStratClose}></CreateStratForm>
          </CustomModal>

          <List
            maxHeight="200px"
            bg="gray.300"
            className="overflow-auto"
            color="black"
            borderRadius="md"
            border="1px solid gray.300"
          >
            {data?.map((strategy, index) => (
              <ListItem
                key={strategy.id}
                py={2}
                px={3}
                borderBottom="1px solid grey.500"
              >
                <HStack>
                  <Button
                    whiteSpace="normal"
                    textAlign="left"
                    onClick={() => {
                      console.log(strategy.id);
                      if (typeof strategy.id === "number") {
                        console.log(strategy.id);
                        setStrategyId(strategy.id);
                      }
                    }}
                    variant="link"
                    fontSize="lg"
                    color="black"
                  >
                    {strategy.name}
                  </Button>
                </HStack>
              </ListItem>
            ))}
          </List>
        </div>
      )}
    </>
  );
}
