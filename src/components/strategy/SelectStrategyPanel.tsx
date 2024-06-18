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
    
    const {data, error, isLoading} = useStrategyQuery();
    
    
    const { strategies, selectedId, setStrategies, setStrategyId, getById } = strategyStore();
    const [openIndex, setOpenIndex] = useState(-1);
    const [isListVisible, setListVisible] = useState(true);
    function lol() {
     let test =  getById()
    console.log(test);
    }
    useEffect(() => {
      if (data) {
          setStrategies(data);
      }
  }, [data]);


    // Component logic goes here
    return (
        <>
          {isLoading && <Spinner />}
          {error && <div>{error.message}</div>}
    
    
              <Button onClick={() => setListVisible(!isListVisible)}>
      {isListVisible ? 'Close' : 'Open strategies'}
    </Button>
    {isListVisible && (
          <div>
          <Button onClick={lol} colorScheme="teal">
            getByid
          </Button>
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
    
              <List className="overflow-auto">
      {data?.map((strategy, index) => (
        <ListItem key={strategy.id} paddingY="5px">
          <HStack>
            <Button
              whiteSpace="normal"
              textAlign="left"
              onClick={() => {
                setOpenIndex(index === openIndex ? -1 : index);
                console.log(strategy.id);
                if (typeof strategy.id === 'number') {
                  console.log(strategy.id);
                  setStrategyId(strategy.id);

                }
              }}
              variant="link"
              fontSize="lg"
            >
              {strategy.name}
            </Button>
            <Collapse in={openIndex === index}>
            <Box h="10px" w="10px" borderRadius="50%" bg="black" />
            </Collapse>
          </HStack>
        </ListItem>
      ))}
    </List>
    </div>
    )}
        </>
      );
    };
    
