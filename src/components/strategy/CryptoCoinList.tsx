import { NavLink, Outlet } from "react-router-dom";
import CoinList from "../coinList/ListCoins";
import {
  Button,
  Grid,
  GridItem,
  Spinner,
  Text,
  useDisclosure,
} from "@chakra-ui/react";
import useCoinQuery from "../../hooks/useCoinQuery";
import SearchCoin from "../coinList/SearchCoin";
import SortCoinSelector from "../coinList/SortCoinSelector";
import { useState } from "react";

export default function CryptoCoinList() {
  const { data, error, isLoading } = useCoinQuery();

  const [isListVisible, setListVisible] = useState(true);

  return (
    <>
      {isLoading && <Spinner />}

      {error && <div>{error.message}</div>}

      <Button onClick={() => setListVisible(!isListVisible)}>
        {isListVisible ? "Close" : "Select Pair"}
      </Button>
      {isListVisible && (
        <div>
          <div className="pb-2">
            <SearchCoin></SearchCoin>
          </div>

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
          </div>
          <SortCoinSelector></SortCoinSelector>
        </div>
      )}
    </>
  );
}
