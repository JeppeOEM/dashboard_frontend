import { useMutation } from "@tanstack/react-query";
import {StrategiesClient} from "../services/ApiClientInstances"
import Strategy from "../models/Strategy";
// import {GridItemClass} from "../models/GridItem";

const useStrategyMutation = (strategy: Strategy) => {
  return useMutation({
    mutationFn: () => StrategiesClient.post(strategy)

  });
};

export default useStrategyMutation;
