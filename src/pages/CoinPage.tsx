import { useParams } from "react-router-dom";
import { splitPairName } from "../utils/splitPairName";
import { useQueryClient } from "@tanstack/react-query";
import Coin from "../models/Coin";
import usePriceQuery from "../hooks/usePriceQuery";
import useCoinQuery from "../hooks/useCoinQuery";

export default function Coinpage() {
  const queryClient = useQueryClient();
  let coins = queryClient.getQueryData<Coin[]>(["coins"]);
  if (!coins) {
   const {data} = useCoinQuery();
   coins = data;
  }
  const params = useParams<{ id: string }>();
  const coin = coins?.find((coin) => coin.name === params.id);

  if (!coin) {
    return <div>Coin not found</div>;
  }

  const { data, isError, isLoading } = usePriceQuery(coin.id);
  console.log(params);
  return (
  <div>
    {<h1>Coin {splitPairName(params.id)}</h1>}
    
    </div>
    
  );
}