import { useMutation } from "@tanstack/react-query";
import {IndicatorClient} from "../services/ApiClientInstances"
import Indicator from "../models/Indicator";
// import {GridItemClass} from "../models/GridItem";

export const useUpdateIndicator = () => {
  const mutation = useMutation({
    mutationFn: ({ id, newIndicator }: { id: number, newIndicator: Indicator }) => 
        IndicatorClient.update(id, newIndicator)
  });

  return mutation.mutateAsync
};

