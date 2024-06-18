import { Grid, GridItem, Show } from "@chakra-ui/react";
import SideBar from "../components/strategy/SideBar";
import useStrategyQuery from "../hooks/useStrategyQuery";
import GridDashboard from "../components/GridDashboard/GridDashboard";
import IndicatorSection from "../components/strategy/IndicatorSection";

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
        <SideBar></SideBar>
        {/* <GridDashboard /> */}
        </GridItem>
      {/* </Show> */}
      <GridItem gridArea={"main"}>
        <IndicatorSection></IndicatorSection>
      </GridItem>

    </Grid>
    </div>
  );
}

export default StrategyPage;