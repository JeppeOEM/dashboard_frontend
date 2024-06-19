import {
  Box,
  Button,
  Spinner,
  List,
  VStack,
  Input,
  FormControl,
  FormLabel,
  Flex,
} from "@chakra-ui/react";

import { useEffect, useState } from "react";
import { useQueryClient } from "@tanstack/react-query";

import strategyStore from "../../stores/strategyStore";
import indicatorStore from "../../stores/indicatorStore";
import useStrategyIndicatorsQuery from "../../hooks/useStrategyIndicatorsQuery";
import { useUpdateIndicator } from "../../hooks/useUpdateIndicator";

export default function IndicatorSection() {
  const { selectedId } = strategyStore();
  const { indicatorId } = indicatorStore();
  const { data, error, isLoading } = useStrategyIndicatorsQuery(selectedId);
  const mutateAsync = useUpdateIndicator();

  const [isListVisible, setListVisible] = useState(true);
  const queryClient = useQueryClient();

  useEffect(() => {
    queryClient.invalidateQueries({ queryKey: ["strategyIndicators"] });
    console.log(indicatorId);
  }, [selectedId, indicatorId, queryClient]);

  return (
    <>

    
      <Button
        onClick={() => setListVisible(!isListVisible)}
        width="100%"
        border="none"
        mb={3}

      >
        {isListVisible ? "Indicators" : "Indicator"}
        <Box
          as="span"
          border="solid 1px"
          borderColor="currentColor"
          borderWidth="0 2px 2px 0"
          display="inline-block"
          padding="3px"
          transform={isListVisible ? "rotate(45deg)" : "rotate(-135deg)"}
          marginLeft="5px"
        />
      </Button>
      {isLoading && <Spinner />}
      {error && <div>{error.message}</div>}
      {isListVisible && (
      <Box>
        <List className="flex flex-row flex-wrap">
          {data?.map((indicator) => (
            <Box
              key={indicator.id}
              p={2}
              borderWidth="1px"
              borderRadius="lg"
              mb={2}
              className="mr-4"
            >
              <span className="text-lg">{indicator.kind}</span>
              <div className="flex flex-row items-center">
                {/* <div className="flex flex-col space-y-2"> */}
                {indicator.settings[0].slice(0)
                  .map((setting, settingIndex) => (
                    <div key={settingIndex}>
                      <label className="text-sm font-medium">
                        {setting[0]}{" "}
                      </label>
                      <input
                        type={typeof setting[2]}
                        defaultValue={setting[2]}
                        className="border-2 border-gray-300 rounded-md p-1 m-1 w-10"
                      />
                    </div>
                  ))}
              </div>
            </Box>
          ))}
        </List>
      </Box>
    )}
  </>
)
}
