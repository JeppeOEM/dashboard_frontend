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
import { Chart } from "../components/charting/chart";

// import strategyStore from "../stores/strategyStore";
function StrategyPage() {

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
        <Chart></Chart>
        <StrategyContent></StrategyContent>
        <IndicatorSection></IndicatorSection>
      </GridItem>

    </Grid>
    </div>
  );
}

export default StrategyPage;