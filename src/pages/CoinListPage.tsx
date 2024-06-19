import { NavLink, Outlet } from "react-router-dom";
import CoinList from "../components/coinList/ListCoins";
import { Grid, GridItem, Spinner, Text } from "@chakra-ui/react";
import useCoinSearchQueryStore from "../stores/coinSearchQueryStore";
import SearchCoin from "../components/coinList/SearchCoin";
import SortCoinSelector from "../components/coinList/SortCoinSelector";
import { useEffect, useState } from "react";
import usesearchQuery from "../hooks/useCoinQuery";
import useCoinQuery from "../hooks/useCoinQuery";

export default function CoinListPage() {
  const { data, error, isLoading } = useCoinQuery();
  
  const { searchCoinQuery } = useCoinSearchQueryStore();

  const [filteredCoins, setFilteredCoins] = useState([]);
  useEffect(() => {
    if (searchCoinQuery.searchText) {
      setFilteredCoins(data?.filter(coin => coin.name.includes(searchCoinQuery.searchText)));
    } else {
      setFilteredCoins(data);
    }
  }, [data, searchCoinQuery.searchText]);
  return (
    <>
      {isLoading && <Spinner />}

      {error && <div>{error.message}</div>}

      <div className="pb-2 ml-5 mr-5">
        <SearchCoin ></SearchCoin>
      </div>

      <div className="lg:h-screen overflow-auto bg-gray-100 p-4">
        <ul className="space-y-4">
          {filteredCoins?.map((coin) => (
            <li key={coin.id} className="p-4 hover:bg-gray-300 rounded-lg">
              <NavLink className="block text-lg font-semibold text-blue-600 hover:text-blue-800" to={`/coins/${coin.name}`}>
                {coin.name}
              </NavLink>
            </li>
          ))}
        </ul>
      </div>
    </>
  );
}