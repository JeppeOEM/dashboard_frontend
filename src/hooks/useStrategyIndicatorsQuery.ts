import { useQuery } from "@tanstack/react-query"
import {IndicatorClient} from "../services/ApiClientInstances"
import Indicator from "../models/Indicator"

const useStrategyIndicatorQuery = () => {
  const fetchIndicators = async (): Promise<Indicator[]> => {

    const coinData: Indicator[] = await IndicatorClient.getAll()
    console.log(coinData)
    return coinData
  }

  return useQuery<Indicator[], Error>({
    queryKey: ["indicators"],
    queryFn: fetchIndicators,
  })
}

export default useStrategyIndicatorQuery