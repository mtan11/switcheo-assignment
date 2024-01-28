import tokenApi from '@switcheo/services/tokenApi';
import { removeDuplicatesByLatestDate } from '@switcheo/utils/helper';
import { useQuery } from '@tanstack/react-query';

const useGetTokenPrices = () => {
  const { data, isLoading, error, isError } = useQuery({
    queryKey: ['getTokenPrices'],
    queryFn: () =>
      tokenApi.getTokenPrices().then((data) => {
        return removeDuplicatesByLatestDate(data);
      }),
    retry: 1,
  });
  return { data, isLoading, error, isError };
};

export default useGetTokenPrices;
