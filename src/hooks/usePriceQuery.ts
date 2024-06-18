import { useQuery } from "@tanstack/react-query";
import {PricesClient, StrategiesClient} from "../services/ApiClientInstances"
import Strategy from "../models/Strategy";
import Coin from "../models/Coin";
import { PriceResponse } from "../models/PriceResponse";
import priceStore from "../stores/priceStore";
// import {GridItemClass} from "../models/GridItem";

const usePriceQuery = (coinId:number) => {
  const {page} = priceStore();
  const fetchPrices = async (): Promise<PriceResponse> => {
    
    const priceData: PriceResponse = await PricesClient.get(coinId,{ page: page } );

    return priceData;
  };

  return useQuery<PriceResponse, Error>({
    queryKey: ["prices"],
    queryFn: fetchPrices,
  });
};

export default usePriceQuery;
