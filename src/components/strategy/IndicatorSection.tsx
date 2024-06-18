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
import useStrategyIndicatorsQuery from "../../hooks/useStrategyIndicatorsQuery";
import { useUpdateIndicator } from "../../hooks/useUpdateIndicator";
//   import IndicatorForm from "./IndicatorForm";

  

export default function IndicatorSection() {


    // const { selectedStrategy, selectedId, setStrategyId } = strategyStore();
    const {data, error, isLoading} = useStrategyIndicatorsQuery();
    const mutateAsync = useUpdateIndicator();



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
              <List>
              {data?.map((indicator, index) => (
                <div key={indicator.id}>
                  
                  {indicator.settings.map((setting, settingIndex) => (
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
      );
    };
    
