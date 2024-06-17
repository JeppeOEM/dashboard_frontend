import { useQuery } from "@tanstack/react-query";
import {IndicatorTypesClient} from "../services/ApiClientInstances"
import Indicator from "../models/IndicatorList";
// import {GridItemClass} from "../models/GridItem";

const useIndicatorQuery = () => {
  const fetchIndicators = async (): Promise<Indicator[]> => {

    const indicatorsData: Indicator[] = await IndicatorTypesClient.getAll();

    return indicatorsData;
  };

  return useQuery<Indicator[], Error>({
    queryKey: ["indicators"],
    queryFn: fetchIndicators,
  });
};

export default useIndicatorQuery;
