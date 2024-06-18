import { NavLink, Outlet } from "react-router-dom"
import CoinList from "../coinList/ListCoins"
import {
  Box,
  Button,
  Grid,
  GridItem,
  Spinner,
  Text,
  useDisclosure,
} from "@chakra-ui/react"
import useCoinQuery from "../../hooks/useCoinQuery"
import SearchCoin from "../coinList/SearchCoin"
import SortCoinSelector from "../coinList/SortCoinSelector"
import { useEffect, useState } from "react"
import priceStore from "../../stores/priceStore"
import usePriceQuery from "../../hooks/usePriceQuery"

export default function CryptoCoinList() {
  const { data: dataCoins, error: errorCoins, isLoading:isLoadingCoins } = useCoinQuery()
  const {prices, selectedCoinId, setPrices, setNext, setPrevious, setResults, setCoinId, getByCoinId} = priceStore()
  
  const [isListVisible, setListVisible] = useState(true)


  const {data: dataPrices, error: errorPrices, isLoading: isLoadingPrices} = usePriceQuery(selectedCoinId)
 
  useEffect(() => {
    if (selectedCoinId) {
    console.log(selectedCoinId)
    //usePriceQuery have access to page number from the priceStore
    console.log(dataPrices)
    console.log(dataCoins)
    // if (data) {
    // setNext(data.next)
    // setPrevious(data.previous)
    // setResults(data.results)

    // }
    }
}, [selectedCoinId])



  return (
    <>
      {isLoadingCoins && <Spinner />}

      {errorCoins && <div>{errorCoins.message}</div>}

      <Button
        onClick={() => setListVisible(!isListVisible)}
        width="100%"
        border="none"
      >
        {isListVisible ? "Select Pair" : "Select Pair"}
        <Box
          as="span"
          border="solid 1px"
          borderColor="currentColor"
          borderWidth="0 2px 2px 0"
          display="inline-block"
          padding="3px"
          transform={isListVisible ? "rotate(45deg)": "rotate(-135deg)"}
          marginLeft="5px"
        />
      </Button>
      {isListVisible && (
        <div>

   

        <div>


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
          {/* <SortCoinSelector></SortCoinSelector> */}

        </div>
            
                </div>
      )}
            <div className="p-3">
                  <SearchCoin></SearchCoin>
                </div>
    </>
  )
}
