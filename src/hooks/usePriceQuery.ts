import { useQuery } from "@tanstack/react-query"
import {PricesClient, StrategiesClient} from "../services/ApiClientInstances"
import Strategy from "../models/Strategy"
import Coin from "../models/Coin"
import { PriceResponse } from "../models/PriceResponse"
import priceStore from "../stores/priceStore"

const usePriceQuery = (coinId:number) => {
  const {page} = priceStore()

  const fetchPrices = async (): Promise<PriceResponse> => {
    console.log("COINID",coinId)


    const priceData: PriceResponse = await PricesClient.get(coinId,{ page: page } )
    // console.log(`Price Data!: ${priceData.results}`)
    return priceData
  }

  return useQuery<PriceResponse, Error>({
    queryKey: coinId ? ["coin",coinId,"prices"] : ["prices"],
    queryFn: fetchPrices,
  })
}

export default usePriceQuery
