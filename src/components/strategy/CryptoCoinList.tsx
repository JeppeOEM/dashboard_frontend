import { NavLink, Outlet } from "react-router-dom"
import CoinList from "../coinList/ListCoins"
import {
  Box,
  Button,
  Grid,
  GridItem,
  HStack,
  List,
  ListItem,
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
import { splitPairName } from "../../utils/splitPairName"

export default function CryptoCoinList() {
  const { data: dataCoins, error: errorCoins, isLoading:isLoadingCoins } = useCoinQuery()
  const { setCoinId} = priceStore()
  
  const [isListVisible, setListVisible] = useState(true)







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
      <List
        maxHeight="300px"
        bg="gray.300"
        className="overflow-auto"
        color="black"
        borderRadius="md"
        border="1px solid gray.300"
      >
        {dataCoins?.map((coin) => (
          <ListItem
            key={coin.id}
            py={2}
            px={3}
            borderBottom="1px solid grey.500"
            className="hover:bg-gray-300"
          >
            <HStack>
              <Button
                whiteSpace="normal"
                textAlign="left"
                onClick={() => setCoinId(coin.id)}
                variant="link"
                fontSize="md"
                color="black"
              >
                {splitPairName(coin.name)}
              </Button>
            </HStack>
          </ListItem>
        ))}
      </List>
    </div>
  </div>
)}
<div className="p-3">
  <SearchCoin></SearchCoin>
</div>
    </>
  )
}
