import {
  Text,
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
import { IoIosInformationCircleOutline } from "react-icons/io";
import strategyStore from "../../stores/strategyStore";
import Indicator from "../../models/Indicator";
//   import IndicatorForm from "./IndicatorForm";

export default function SelectIndicators() {
  const { isOpen, onOpen, onClose } = useDisclosure();

  const {
    isOpen: isOpenError,
    onOpen: onOpenError,
    onClose: onCloseError,
  } = useDisclosure();

  const { data, error, isLoading } = useIndicatorListQuery();
  const mutateAsync = useAddIndicator();
  const { selectedStrategy, selectedId, setStrategyId } = strategyStore();
  // const { selectedStrategy, selectedId, setStrategyId } = strategyStore();
  const [isListVisible, setListVisible] = useState(true);
  
  
  const addIndicator = async (indicator: Indicator, selectedId: number | null) => {
    console.log(indicator.id, selectedId);
    if (typeof indicator.id === "number" && selectedId !== null) {
      console.log(selectedId, indicator.kind, indicator.settings);
      try {
        const data = await mutateAsync({
          kind: indicator.kind,
          settings: indicator.settings,
          strategy_fk: selectedId,
        });
        console.log("Mutation was successful, returned data:", data);
      } catch (error) {
        console.error("Mutation failed with error:", error);
      }
    } else {
      console.log("Error");
      onOpenError();
    }
  };
  



  // Component logic goes here
  return (
    <>
      <CustomModal
        isOpen={isOpenError}
        title="No strategy selected"
        onClose={onCloseError}
      >
        <Text>Select strategy to add an indicator</Text>
      </CustomModal>
      ;{isLoading && <Spinner />}
      {error && <div>{error.message}</div>}
      <Button onClick={() => setListVisible(!isListVisible)}>
        {isListVisible ? "Close" : "Open Indicators"}
      </Button>
      {isListVisible && (
        <div>
          <List className="max-h-[200px] overflow-auto">
            {data?.map((indicator, index) => (
              <ListItem key={indicator.id} paddingY="5px">
                {/* <HStack> */}
                <HStack>
                  <div>
                    <Button
                      whiteSpace="normal"
                      textAlign="left"
                      onClick={() => addIndicator(indicator, selectedId)}
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
                      <IndicatorDescription
                        onClose={onClose}
                        description={indicator.description}
                      ></IndicatorDescription>
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
}
