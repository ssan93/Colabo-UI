import { useQuery } from "@tanstack/react-query";
import { transformItemDBtoClient, transformDiscountDBtoClient } from "..";

const fetchCalculator = async () => {
  const res = await fetch(
    "https://us-central1-colavolab.cloudfunctions.net/requestAssignmentCalculatorData"
  );
  return res.json();
};

export const useFetchCalculator = () => {
  const { data, isLoading, error } = useQuery({
    queryKey: ["items"],
    queryFn: fetchCalculator,
  });

  if (isLoading) return { data: null, isLoading, error };
  if (error) return { data: null, isLoading, error };

  const formattedData = {
    ...data,
    items: transformItemDBtoClient(data.items),
    discounts: transformDiscountDBtoClient(data.discounts),
  };

  return { data: formattedData, isLoading, error };
};
