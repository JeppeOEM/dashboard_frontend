import { Grid, GridItem } from '@chakra-ui/react';
import CustomGrid from '../components/CustomGrid';
import GridDashboard from '../components/GridDashboard/GridDashboard';
import SideBar from '../components/NavigationBars/SideBar';

function StrategyPage() {
  return (

      <Grid
        templateAreas={{
          base: '"main"',
          lg: '"aside main main"',
        }}
      >

        <GridItem gridArea={"main"}>
          <CustomGrid />
        </GridItem>
        <GridDashboard />
      </Grid>

  );
}

export default StrategyPage;