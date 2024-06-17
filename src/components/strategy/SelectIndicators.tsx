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
    VStack,
    useDisclosure,
  } from "@chakra-ui/react";
  import strategyStore from "../../stores/strategyStore";
  import useStrategyQuery from "../../hooks/useStrategyQuery";
  
  import { useState } from "react";
  import Strategy from "../../models/Strategy";
  import { useMutation } from "@tanstack/react-query";
  import { StrategiesClient } from "../../services/ApiClientInstances";
  import CustomModal from "../common/layouts/CustomModal";
  import useIndicatorQuery from "../../hooks/useIndicatorQuery";
  import IndicatorDescription from "./IndicatorDescription";
import { useAddIndicator } from "../../hooks/useAddIndicator";
//   import IndicatorForm from "./IndicatorForm";

  

export default function SelectIndicators() {

    const {
        isOpen,
        onOpen,
        onClose,
      } = useDisclosure();
    
    const {data, error, isLoading} = useIndicatorQuery();
    const mutateAsync = useAddIndicator();

    
    // const { selectedStrategy, selectedId, setStrategyId } = strategyStore();

    const [isListVisible, setListVisible] = useState(true);


    // Component logic goes here
    return (
        <>
          {isLoading && <Spinner />}
          {error && <div>{error.message}</div>}
    
    
      <Button onClick={() => setListVisible(!isListVisible)}>
      {isListVisible ? 'Close' : 'Open Indicators'}
    </Button>
    {isListVisible && (
          <div>
              <List className="max-h-[200px] overflow-auto">
      {data?.map((indicator, index) => (
        <ListItem key={indicator.id} paddingY="5px">
          {/* <HStack> */}
            <VStack>
            <Button
              whiteSpace="normal"
              textAlign="left"
              onClick={() => {
                if (typeof indicator.id === 'number') {
                  mutateAsync({kind: indicator.kind, settings: indicator.settings});
                }
              }}
              variant="link"
              fontSize="lg"
            >
              {indicator.kind}
            </Button>
            <CustomModal
            isOpen={isOpen}
            title="Create strategy"
            onClose={onClose}
          >
            <IndicatorDescription onClose={onClose} description={indicator.description} ></IndicatorDescription>
          </CustomModal>
          </VStack>
          {/* </HStack> */}
        </ListItem>
      ))}
    </List>
    </div>
    )}
        </>
      );
    };
    
