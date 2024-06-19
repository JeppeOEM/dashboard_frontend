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

import { useEffect, useRef, useState } from "react";
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
  const [formValues, setFormValues] = useState({});
  const [isListVisible, setListVisible] = useState(true);
  const queryClient = useQueryClient();
  const inputRefs = useRef({});
  const indicatorObjectRefs = useRef({});
  




  useEffect(() => {
    queryClient.invalidateQueries({ queryKey: ["strategyIndicators"] });
    console.log(indicatorId);
  }, [selectedId, indicatorId, queryClient]);

  const handleSave = (indicatorId) => {
    const indicatorSettings = Object.keys(inputRefs.current[indicatorId]).map(
      (key) => inputRefs.current[indicatorId][key].value
    );

    const indicatorObject = data.find((indicator) => indicator.id === indicatorId);

    console.log(indicatorSettings);
    console.log(indicatorObject);
    const objSettings = indicatorObject.settings.slice(1);

    const settingsToUpdate = indicatorObject.settings[0].slice(1).map((setting, index) => {
      return [setting[0], setting[1], indicatorSettings[index]]; // Update the third element [2] with indicatorSettings[index]
    });
    console.log("Updated Settings:", settingsToUpdate);

    // Now you have both indicatorSettings and indicatorObject, handle them as needed
    // Example: mutateAsync({ indicatorId, settings: indicatorSettings });

    return indicatorObject; // Return the indicator object for further handling
  };

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
                {indicator.settings[0].slice(1)
                  .map((setting, settingIndex) => (
                    <div key={settingIndex}>
                      <label className="text-sm font-medium">
                        {setting[0]}{" "}
                      </label>
                      <input
                        type={typeof setting[2]}
                        defaultValue={setting[2]}
                        ref={(el) => {
                          if (!inputRefs.current[indicator.id]) {
                            inputRefs.current[indicator.id] = {};
                          }
                          inputRefs.current[indicator.id][settingIndex] = el;
                        }}
                        className="border-2 border-gray-300 rounded-md p-1 m-1 w-10"
                      />
                    </div>
                  ))}
              </div>
              <Button
                  mt={2}
                  colorScheme="teal"
                  onClick={() => handleSave(indicator.id)}
                >
                  Save Settings
                </Button>
            </Box>
          ))}
        </List>
      </Box>
    )}
  </>
)
  }
