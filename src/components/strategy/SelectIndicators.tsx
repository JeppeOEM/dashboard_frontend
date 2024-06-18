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

  
  import { useState } from "react";

  import CustomModal from "../common/layouts/CustomModal";
  import useIndicatorListQuery from "../../hooks/useIndicatorListQuery";
  import IndicatorDescription from "./IndicatorDescription";
import { useAddIndicator } from "../../hooks/useAddIndicator";
import { IoIosInformationCircleOutline } from 'react-icons/io';
import strategyStore from "../../stores/strategyStore";
//   import IndicatorForm from "./IndicatorForm";

  

export default function SelectIndicators() {

    const {
        isOpen,
        onOpen,
        onClose,
      } = useDisclosure();
    
    const {data, error, isLoading} = useIndicatorListQuery();
    const mutateAsync = useAddIndicator();

    const { selectedStrategy, selectedId, setStrategyId } = strategyStore();
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
            <HStack>
            <div className="">
            <Button
              whiteSpace="normal"
              textAlign="left"
              onClick={() => {
                if (typeof indicator.id === 'number' && selectedId !== null) {
                  mutateAsync({kind: indicator.kind, settings: indicator.settings, strategy_fk: selectedId});
                }
              }}
              variant="link"
              fontSize="lg"
              >
              {indicator.kind}
            </Button>
            <Button onClick={onOpen}>
              <IoIosInformationCircleOutline size={24} />
            </Button>
            <CustomModal
            isOpen={isOpen}
            title="Create strategy"
            onClose={onClose}
            >
            <IndicatorDescription onClose={onClose} description={indicator.description} ></IndicatorDescription>
            </CustomModal>
          </div>  
          </HStack>
          {/* </HStack> */}
        </ListItem>
      ))}
    </List>
    </div>
    )}
        </>
      );
    };
    
