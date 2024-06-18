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
import { useEffect, useState } from "react";
import priceStore from "../../stores/priceStore";
import usePriceQuery from "../../hooks/usePriceQuery";

export default function CryptoCoinList() {
  const { data: dataCoins, error: errorCoins, isLoading:isLoadingCoins } = useCoinQuery();
  const {prices, selectedCoinId, setPrices, setNext, setPrevious, setResults, setCoinId, getByCoinId} = priceStore();
  
  const [isListVisible, setListVisible] = useState(true);


  const {data: dataPrices, error: errorPrices, isLoading: isLoadingPrices} = usePriceQuery(selectedCoinId);
 
  useEffect(() => {
    if (selectedCoinId) {
    console.log(selectedCoinId);
    //usePriceQuery have access to page number from the priceStore
    console.log(dataPrices)
    console.log(dataCoins);
    // if (data) {
    // setNext(data.next);
    // setPrevious(data.previous);
    // setResults(data.results);

    // }
    }
}, [selectedCoinId]);



  return (
    <>
      {isLoadingCoins && <Spinner />}

      {errorCoins && <div>{errorCoins.message}</div>}

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
              {dataCoins?.map((coin) => (
                <li key={coin.id} className="p-4 hover:bg-gray-300">
                <p onClick={() => setCoinId(coin.id)}>
                    {coin.name}
                </p>
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
