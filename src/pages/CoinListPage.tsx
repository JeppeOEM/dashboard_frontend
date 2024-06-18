import { NavLink, Outlet } from "react-router-dom";
import CoinList from "../components/coinList/ListCoins";
import { Grid, GridItem, Spinner, Text } from "@chakra-ui/react";
import useCoinQuery from "../hooks/useCoinQuery";

export default function CoinListPage() {
  const { data, error, isLoading } = useCoinQuery();

  return (
    <>
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
        {isLoading && <Spinner />}
        {error && <div>{error.message}</div>}

        {/* <Show above="lg"> */}
        <GridItem gridArea={"aside"} paddingX={1}>
          <div className="flex">
            <div className="h-screen overflow-auto">
              <ul>
                {data?.map((coin) => (
                  <li key={coin.id} className="p-4 hover:bg-gray-300">
                    <NavLink className="block" to={`/coins/${coin.name}`}>
                      {coin.name}
                    </NavLink>
                  </li>
                ))}
              </ul>
            </div>
          </div>
          {/* <GridDashboard /> */}
        </GridItem>
        {/* </Show> */}
        <GridItem gridArea={"main"}>
          <Outlet />
        </GridItem>
      </Grid>
    </>
  );
}
