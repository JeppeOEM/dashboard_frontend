import { useMutation, useQueryClient } from "@tanstack/react-query"
import {IndicatorClient} from "../services/ApiClientInstances"
import Indicator from "../models/Indicator"

export const useUpdateIndicator = () => {
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: ({ id, newIndicator }: { id: number, newIndicator: Indicator }) => 
        IndicatorClient.update(id, newIndicator),
    onSuccess: (updatedIndicator) => {
      console.log("MUTATE", updatedIndicator);
      queryClient.setQueryData<Indicator[]>(["strategyIndicators"], (oldIndicators) => 
        oldIndicators?.map(indicator => 
          indicator.id === updatedIndicator.id ? updatedIndicator : indicator
        )
      );
    }
  })

  return mutation.mutateAsync
}