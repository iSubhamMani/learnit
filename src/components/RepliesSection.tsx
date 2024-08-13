"use client";

import { LoaderCircle, RotateCcw, Send } from "lucide-react";
import { useInfiniteQuery, useMutation, useQueryClient } from "react-query";
import Reply from "./Reply";
import { ReplyData } from "@/interfaces/reply.interface";
import { addReply, getReplies } from "@/queries/replies.queries";
import { useCallback, useState } from "react";
import toast from "react-hot-toast";
import ReplyInput from "./ReplyInput";

const RepliesSection = ({ discussionId }: { discussionId: string }) => {
  const [content, setContent] = useState<string>("");

  const queryClient = useQueryClient();

  const {
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    isLoading,
    isError,
    data: replies,
  } = useInfiniteQuery({
    queryKey: ["replies", { discussionId }],
    queryFn: ({ pageParam }) => getReplies({ pageParam, discussionId }),
    getNextPageParam: (lastPage) => {
      if (lastPage.data.metadata.hasNextPage) {
        return lastPage.data.metadata.page + 1;
      }
      return undefined;
    },
    staleTime: 1000 * 60 * 5,
  });

  const { mutate, isLoading: isReplyLoading } = useMutation({
    mutationFn: addReply,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["replies", { discussionId }],
        exact: true,
      });
      setContent("");
    },
    onError: () => {
      toast.error("Error sending reply", {
        duration: 3000,
        position: "top-center",
      });
    },
  });

  const sendReply = async () => {
    if (!content.trim()) return;
    mutate({ discussionId, content });
  };

  const calculateTotalReplies = useCallback(() => {
    let totalReplies = 0;
    replies?.pages.map((group, i) => {
      totalReplies += group.data.data.length;
    });
    return totalReplies;
  }, [replies]);

  if (isLoading)
    return (
      <div className="mt-4 flex justify-center">
        <LoaderCircle className="text-primary animate-spin w-5 h-5" />
      </div>
    );

  if (isError)
    return (
      <div className="mt-4 flex justify-center">
        <p className="text-base-content text-sm">Error fetching replies</p>
      </div>
    );

  return (
    <>
      <ReplyInput
        isReplyLoading={isReplyLoading}
        onClickAction={sendReply}
        stateValue={content}
        stateAction={setContent}
      />
      <h1 className="border-t border-base-content/35 mt-4 mb-6 pt-2 text-xl text-primary font-medium">
        <span>{calculateTotalReplies()}</span> Replies
      </h1>
      <div className="flex flex-col gap-4 mt-4">
        {replies?.pages.map((group, i) => {
          return group.data.data.map((reply: ReplyData) => (
            <Reply key={reply._id} reply={reply} />
          ));
        })}
      </div>
      <div className="mt-4 flex justify-center">
        {hasNextPage && !isFetchingNextPage ? (
          <button
            onClick={() => fetchNextPage()}
            className="text-sm text-primary font-bold px-4 py-2 w-max flex gap-2 items-center rounded-full bg-primary bg-opacity-10 hover:bg-opacity-20 transition ease-in-out duration-200"
          >
            Load more
            <RotateCcw className="w-4 h-4 text-primary" />
          </button>
        ) : null}
        {isFetchingNextPage && (
          <LoaderCircle className="text-primary animate-spin w-5 h-5" />
        )}
      </div>
    </>
  );
};

export default RepliesSection;
