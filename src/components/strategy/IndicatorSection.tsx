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
} from "@chakra-ui/react"

import { useEffect, useState } from "react"

import CustomModal from "../common/layouts/CustomModal"
import useIndicatorListQuery from "../../hooks/useIndicatorListQuery"
import IndicatorDescription from "./IndicatorDescription"
import { useAddIndicator } from "../../hooks/useAddIndicator"
import { IoIosInformationCircleOutline } from "react-icons/io"
import strategyStore from "../../stores/strategyStore"
import useStrategyIndicatorsQuery from "../../hooks/useStrategyIndicatorsQuery"
import { useUpdateIndicator } from "../../hooks/useUpdateIndicator"
import { useQueryClient } from "@tanstack/react-query"
import indicatorStore from "../../stores/indicatorStore"
//   import IndicatorForm from "./IndicatorForm"

export default function IndicatorSection() {
  // const { selectedStrategy, selectedId, setStrategyId } = strategyStore()
  const {selectedId, setStrategyId} = strategyStore()
  const {indicatorId} = indicatorStore()
  const { data, error, isLoading } = useStrategyIndicatorsQuery(selectedId)
  const mutateAsync = useUpdateIndicator()

  const [isListVisible, setListVisible] = useState(true)
  const queryClient = useQueryClient();

  useEffect(() => {
    queryClient.invalidateQueries({ queryKey: ['strategyIndicators'] })
    console.log(indicatorId)
    console.log(indicatorId)
    console.log(indicatorId)

  }, [selectedId, indicatorId])
  
  // Component logic goes here
  return (
    <>
      {isLoading && <Spinner />}
      {error && <div>{error.message}</div>}

      <Button onClick={() => setListVisible(!isListVisible)}>
        {isListVisible ? "Close" : "Open Indicators"}
      </Button>
      <h2>Test</h2>

      {isListVisible && (
        <div>
          <List>

            {data?.map((indicator, index) => (
              <div key={indicator.id}>
                {indicator.settings.map((setting: any[], settingIndex: number) => (
                  <div key={settingIndex}>
                    <label>{setting[0]}</label>
                    <input type={typeof setting[2]} defaultValue={setting[2]} />
                  </div>
                ))}
              </div>
            ))}
          </List>
        </div>
      )}
    </>
  )
}
