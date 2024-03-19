import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { axiosPrivate } from "../api/axios";

export const useGetUserTweets = (userId) => {
  return useQuery({
    queryKey: ["tweet"],
    queryFn: async () => {
      const response = await axiosPrivate.get(`/tweets/user/${userId}`, {
        withCredentials: true,
      });

      return response.data;
    },
    enabled: !!userId,
  });
};

export const getAllTweets = ()=>{
  return useQuery({
    queryKey: ['tweets'],
    queryFn: async ()=>{
      const response = await axiosPrivate.get('/tweets/all');
      console.log("The response is ")
      return response.data
    }
  })
}

// export const useCreateTweet = () => {
//   const queryClient = useQueryClient();

//   return useMutation(
//     async (tweetData) => {
//       const response = await axiosPrivate.post("/tweets", tweetData, {
//         withCredentials: true,
//       });
//       return response.data;
//     },
//     {
//       onSuccess: () => {
//         queryClient.invalidateQueries(["tweet"]);
//         queryClient.invalidateQueries(["tweets"]);
//       },
//     }
//   );
// };

export const useCreateTweet = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (data) => {
      console.log(data)
      const response = await axiosPrivate.post(`/tweets`, data, {
        headers: {
          "Content-Type": "application/json",
        },
        withCredentials: true,
      });

      return response.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["tweets"],
      });

      queryClient.invalidateQueries({
        queryKey: ["tweet"],
      });
    },
  });
};
