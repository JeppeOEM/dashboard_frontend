import { useQuery } from "@tanstack/react-query";
import {IndicatorClient} from "../services/ApiClientInstances"
import Indicator from "../models/Indicator";

const useStrategyIndicatorsQuery = () => {
  const fetchIndicators = async (): Promise<Indicator[]> => {
    try {
      const indicatorsData: Indicator[] = await IndicatorClient.getAll();
      return indicatorsData;
    } catch (error) {
      console.log(error)
      throw new Error("Failed to fetch indicators");
    }
  };

  const { data, error, isError, isLoading } = useQuery<Indicator[], Error>({
    queryKey: ["indicator"],
    queryFn: fetchIndicators,
  });

  return { data, error, isError, isLoading };
};

export default useStrategyIndicatorsQuery;