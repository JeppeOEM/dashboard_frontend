import { useMutation } from "@tanstack/react-query";
import GridService from "../services/GridService";

const useGridMutation = () => {
  //return mutate or mutateAsync
  return useMutation({
    mutationFn: GridService.create,
  });
};

export default useGridMutation;
