import { useMutation, useQueryClient } from "@tanstack/react-query"
import {IndicatorClient} from "../services/ApiClientInstances"
import Indicator from "../models/Indicator"

export const useDeleteIndicator = () => {
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: async ({ id}: { id: number }) => {
        // return id so we can use it in onSuccess
      await IndicatorClient.delete(id);
          return id;
    },
    onSuccess: (deletedIndicatorId) => {

      queryClient.setQueryData<Indicator[]>(["strategyIndicators"], (oldIndicators = []) => 
        oldIndicators.filter(indicator => indicator.id !== deletedIndicatorId)
      );
    }
  })

  return mutation.mutateAsync
}