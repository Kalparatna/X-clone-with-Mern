import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";

const useGetTotalPosts = () => {
	const queryClient = useQueryClient();

	const { mutateAsync: getTotalPosts, isPending: isGettingTotalPosts } = useMutation({
		mutationFn: async (userId) => {
			try {
				const res = await fetch(`/api/posts/totalPosts/${userId}`);
				const data = await res.json();
				if (!res.ok) {
					throw new Error(data.error || "Something went wrong");
				}
				return data;
			} catch (error) {
				throw new Error(error.message);
			}
		},
		onSuccess: () => {
			Promise.all([
				queryClient.invalidateQueries({ queryKey: ["authUser"] }),
				// queryClient.invalidateQueries({ queryKey: ["userProfile"] }),
			]);
		},
		onError: (error) => {
			toast.error(error.message);
		},
	});

	return { getTotalPosts, isGettingTotalPosts };
};

export default useGetTotalPosts;
