"use client";

import RepliesSection from "@/components/RepliesSection";
import Tag from "@/components/Tag";
import { getDiscussion } from "@/queries/discussion.queries";
import { dislikeDiscussion, likeDiscussion } from "@/queries/votes.queries";
import { convertDateTime } from "@/utils/convertDateTime";
import {
  ArrowLeft,
  LoaderCircle,
  Pencil,
  ThumbsDown,
  ThumbsUp,
} from "lucide-react";
import Link from "next/link";
import { useParams, useRouter } from "next/navigation";
import toast from "react-hot-toast";
import { useMutation, useQuery, useQueryClient } from "react-query";

const DiscussionPage = () => {
  const router = useRouter();
  const { id } = useParams<{ id: string }>();

  const queryClient = useQueryClient();

  const { data, isLoading } = useQuery({
    queryKey: ["discussion", { id }],
    queryFn: () => getDiscussion(id),
    staleTime: 1000 * 60 * 5,
    onError: () => {
      toast.error("Error fetching discussion", {
        duration: 3000,
        position: "top-center",
      });
    },
  });

  const { mutate: mutateLike } = useMutation({
    mutationFn: likeDiscussion,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["discussion", { id }],
        exact: true,
      });
    },
    onMutate: async () => {
      await queryClient.cancelQueries({
        queryKey: ["discussion", { id }],
      });

      const previousData: any = queryClient.getQueryData([
        "discussion",
        { id },
      ]);

      // Create an optimistic update based on the new userReaction

      const optimisticData = {
        discussion: {
          ...previousData.discussion,
        },
        userReaction: previousData.userReaction === "like" ? null : "like",
        reactionCount:
          previousData.userReaction === "like"
            ? previousData.reactionCount - 1
            : previousData.reactionCount === -1
            ? 1
            : previousData.reactionCount + 1,
      };

      queryClient.setQueryData(["discussion", { id }], optimisticData);

      return { previousData };
    },
    onError: (_error, _variables, context) => {
      queryClient.setQueryData(["discussion", { id }], context?.previousData);
      toast.error("Error liking discussion", {
        duration: 3000,
        position: "top-center",
      });
    },
  });

  const { mutate: mutateDislike } = useMutation({
    mutationFn: dislikeDiscussion,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["discussion", { id }],
        exact: true,
      });
    },
    onMutate: async () => {
      await queryClient.cancelQueries({
        queryKey: ["discussion", { id }],
      });

      const previousData: any = queryClient.getQueryData([
        "discussion",
        { id },
      ]);

      // Create an optimistic update based on the new userReaction

      const optimisticData = {
        discussion: {
          ...previousData.discussion,
        },
        userReaction: "dislike",
        reactionCount:
          previousData.userReaction === "dislike"
            ? previousData.reactionCount + 1
            : previousData.reactionCount === 1
            ? -1
            : previousData.reactionCount - 1,
      };

      queryClient.setQueryData(["discussion", { id }], optimisticData);

      return { previousData };
    },
    onError: (_error, _variables, context) => {
      queryClient.setQueryData(["discussion", { id }], context?.previousData);
      toast.error("Error disliking discussion", {
        duration: 3000,
        position: "top-center",
      });
    },
  });

  const handleLike = () => {
    mutateLike(id);
  };

  const handleDislike = () => {
    mutateDislike(id);
  };

  if (isLoading)
    return (
      <div className="className=px-5 md:pl-24 py-8 w-full flex flex-col items-center justify-center bg-base-200">
        <LoaderCircle className="text-primary animate-spin w-6 h-6" />
      </div>
    );

  return (
    <div className="px-4 md:pl-24 py-8 w-full flex flex-col bg-base-200">
      <div className="mb-4">
        <button
          onClick={() => router.back()}
          className="btn btn-sm sm:btn-md btn-circle"
        >
          <ArrowLeft className="text-base-content w-5 h-5 sm:w-6 sm:h-6" />
        </button>
      </div>
      <div className="w-full mx-auto max-w-3xl">
        <div className="border-b border-base-content/35 pb-4">
          <h1 className="text-base-content text-2xl font-medium">
            {data?.discussion?.title}
          </h1>
          <div className="flex flex-wrap gap-2 mt-4">
            {data?.discussion?.tags.map((tag: string) => (
              <Tag key={tag} value={tag} onClickHandler={undefined} />
            ))}
          </div>
          <div className="mt-4 flex justify-end">
            <Link href="/u/ask">
              <div className="flex gap-2 items-center text-primary font-medium">
                <span>Edit</span>
                <Pencil className="w-4 h-4" />
              </div>
            </Link>
          </div>
        </div>
        <div className="flex flex-col gap-1 sm:flex-row sm:items-center justify-between mt-3">
          <p className="text-base-content text-sm">
            Asked by{" "}
            <span className="font-bold">
              {data?.discussion?.askedBy.displayName}
            </span>
          </p>
          <p className="text-sm text-base-content">
            {convertDateTime(data?.discussion?.createdAt.toString())}
          </p>
        </div>
        <div className="flex mt-6 gap-4">
          <div className="flex flex-col items-center gap-2">
            <button
              onClick={handleLike}
              className="btn btn-circle btn-sm md:btn-md
            "
            >
              <ThumbsUp
                className={`${
                  data?.userReaction === "like"
                    ? "text-primary"
                    : "text-base-content"
                } w-5 h-5 sm:w-6 sm:h-6`}
              />
            </button>
            <span className="text-base-content text-lg">
              {data?.reactionCount}
            </span>
            <button
              className="btn btn-circle btn-sm sm:btn-md
            "
            >
              <ThumbsDown
                onClick={handleDislike}
                className={`${
                  data?.userReaction === "dislike"
                    ? "text-error"
                    : "text-base-content"
                } w-5 h-5 sm:w-6 sm:h-6`}
              />
            </button>
          </div>
          <div>
            <p className="text-lg text-base-content font-medium">
              {data?.discussion?.description}
            </p>
          </div>
        </div>
        <div className="mt-8 pt-4 border-t border-base-content/35">
          <RepliesSection discussionId={id} />
        </div>
      </div>
    </div>
  );
};

export default DiscussionPage;