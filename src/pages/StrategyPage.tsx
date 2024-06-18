import { Grid, GridItem, Show } from "@chakra-ui/react";
import SideBar from "../components/navigationBars/SideBar";
import useStrategyQuery from "../hooks/useStrategyQuery";
import GridDashboard from "../components/GridDashboard/GridDashboard";
import IndicatorSection from "../components/strategy/IndicatorSection";
import SelectStratgyPanel from "../components/strategy/SelectStrategyPanel";
import SelectIndicators from "../components/strategy/SelectIndicators";
import CryptoCoinList from "../components/strategy/CryptoCoinList";
import strategyStore from "../stores/strategyStore";
import { get } from "http";
import StrategyContent from "../components/strategy/StrategyContent";
import { ChartComponent } from "../components/charting/ChartComponent";
import { useEffect, useState } from "react";

// import strategyStore from "../stores/strategyStore";
function StrategyPage() {
  const initialData = [
    { time: '2018-12-22', value: 32.51 },
    { time: '2018-12-23', value: 31.11 },
    { time: '2018-12-24', value: 27.02 },
    { time: '2018-12-25', value: 27.32 },
    { time: '2018-12-26', value: 25.17 },
    { time: '2018-12-27', value: 28.89 },
    { time: '2018-12-28', value: 25.46 },
    { time: '2018-12-29', value: 23.92 },
    { time: '2018-12-30', value: 22.68 },
    { time: '2018-12-31', value: 22.67 },
];

  const chartProps = {
    data: initialData, // replace with actual data
    colors: {
      backgroundColor: 'white',
      lineColor: '#2962FF',
      textColor: 'black',
      areaTopColor: '#2962FF',
      areaBottomColor: 'rgba(41, 98, 255, 0.28)',
    },
  };

  const otherData = [
    { time: '2019-01-01', value: 30.11 },
    { time: '2019-01-02', value: 32.43 },
    { time: '2019-01-03', value: 31.98 },
    // Add more data as needed
];
const [windowSize, setWindowSize] = useState();


useEffect(() => {
  const handleResize = () => {
    // Update the state variable when the window is resized
    setWindowSize(window.innerWidth);
  };

  window.addEventListener('resize', handleResize);

  return () => {
    window.removeEventListener('resize', handleResize);
  };
}, []);
return (
<div>


<Grid
      templateAreas={{
        base: "main",
        lg: `"aside main"`,
      }}
      templateColumns={{
        base: "1fr",
        lg: "200px 1fr",
      }}
    >

      {/* <Show above="lg"> */}
        <GridItem gridArea={"aside"} paddingX={1}>
        <SideBar>
          <SelectStratgyPanel />
          <SelectIndicators />
          <CryptoCoinList />
        </SideBar>
        {/* <GridDashboard /> */}
        </GridItem>
      {/* </Show> */}
      <GridItem gridArea={"main"}>
        <ChartComponent data={otherData}></ChartComponent>
        <StrategyContent></StrategyContent>
        <IndicatorSection></IndicatorSection>
      </GridItem>

    </Grid>
    </div>
  );
}

export default StrategyPage;