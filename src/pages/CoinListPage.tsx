import { NavLink, Outlet } from "react-router-dom";
import CoinList from "../components/coinList/ListCoins";
import { Grid, GridItem, Spinner, Text } from "@chakra-ui/react";
import useCoinQuery from "../hooks/useCoinQuery";
import SearchCoin from "../components/coinList/SearchCoin";
import SortCoinSelector from "../components/coinList/SortCoinSelector";
import { useState } from "react";

export default function CoinListPage() {
  const { data, error, isLoading } = useCoinQuery();

  const [page, setPage] = useState(1);
  const pageSize = 10;

  return (
    <>
      {isLoading && <Spinner />}

      {error && <div>{error.message}</div>}

      {/* <Show above="lg"> */}

      <div className="pb-2">
        <SearchCoin></SearchCoin>
      </div>
      {/* <div className="flex"> */}

      <div className="max-h-[300px] lg:h-screen overflow-auto ">
        <ul>
          {data?.map((coin) => (
            <li key={coin.id} className="p-4 hover:bg-gray-300">
              <NavLink className="block" to={`/coins/${coin.name}`}>
                {coin.name}
              </NavLink>
            </li>
          ))}
        </ul>
        <button
          disabled={page === 1}
          onClick={() => setPage(page - 1)}
          className="btn btn-primary"
        >
          Previous
        </button>
        <button onClick={() => setPage(page + 1)} className="btn btn-primary">
          Next
        </button>
      </div>
      <SortCoinSelector></SortCoinSelector>
      {/* </div> */}
      {/* <GridDashboard /> */}
    </>
  );
}
