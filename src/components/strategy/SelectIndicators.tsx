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
  Flex,
  Box,
} from "@chakra-ui/react"

import { useState } from "react"

import CustomModal from "../common/layouts/CustomModal"
import useIndicatorListQuery from "../../hooks/useIndicatorListQuery"
import IndicatorDescription from "./IndicatorDescription"
import { useAddIndicator } from "../../hooks/useAddIndicator"
import { IoIosInformationCircleOutline } from "react-icons/io"
import strategyStore from "../../stores/strategyStore"
import Indicator from "../../models/Indicator"
//   import IndicatorForm from "./IndicatorForm"

export default function SelectIndicators() {
  const { isOpen, onOpen, onClose } = useDisclosure()

  const {
    isOpen: isOpenError,
    onOpen: onOpenError,
    onClose: onCloseError,
  } = useDisclosure()

  const { data, error, isLoading } = useIndicatorListQuery()
  const mutateAsync = useAddIndicator()
  const { selectedStrategy, selectedId, setStrategyId } = strategyStore()
  // const { selectedStrategy, selectedId, setStrategyId } = strategyStore()
  const [isListVisible, setListVisible] = useState(true)
  
  
  const addIndicator = async (indicator: Indicator, selectedId: number | null) => {
    console.log(indicator.id, selectedId)
    if (typeof indicator.id === "number" && selectedId !== null) {
      console.log(selectedId, indicator.kind, indicator.settings)
      try {
        const data = await mutateAsync({
          kind: indicator.kind,
          settings: indicator.settings,
          strategy_fk: selectedId,
        })
        console.log("Mutation was successful, returned data:", data)
      } catch (error) {
        console.error("Mutation failed with error:", error)
      }
    } else {
      console.log("Error")
      onOpenError()
    }
  }
  



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
      {isLoading && <Spinner />}
      {error && <div>{error.message}</div>}
      <Button
        onClick={() => setListVisible(!isListVisible)}
        width="100%"
        border="none"
      >
        {isListVisible ? "Indicator List" : "Indicator List"}
        <Box
          as="span"
          border="solid 1px"
          borderColor="currentColor"
          borderWidth="0 2px 2px 0"
          display="inline-block"
          padding="3px"
          transform={isListVisible ? "rotate(45deg)": "rotate(-135deg)"}
          marginLeft="5px"
        />
      </Button>
      {isListVisible && (
        <div>
          <List
            maxHeight="200px"
            bg="gray.300"
            className="overflow-auto"
            color="black"
            borderRadius="md"
            border="1px solid gray.300"
            fontSize="lg"
          >
            {data?.map((indicator, index) => (
              <ListItem key={indicator.id} paddingY="5px">
                {/* <HStack> */}
                <HStack>
                  <div>
                  <Flex justifyContent="space-between" width="full">
 

                  <Button
                    whiteSpace="normal"
                    textAlign="left"
                    onClick={() => addIndicator(indicator, selectedId)}
                    variant="link"
                    fontSize="md"
                    color="black"
                    >
                    {indicator.kind}
                  </Button>
                  
                  <Button onClick={onOpen}>
                    <IoIosInformationCircleOutline size={24} />
                  </Button>
  
                </Flex>
                    <CustomModal
                      isOpen={isOpen}
                      title="Indicator Description"
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
  )
}
