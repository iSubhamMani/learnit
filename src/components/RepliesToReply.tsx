import { getReplies } from "@/queries/replies.queries";
import { LoaderCircle, RotateCcw } from "lucide-react";
import { useInfiniteQuery } from "react-query";
import Reply from "./Reply";
import { ReplyData } from "@/interfaces/reply.interface";
import { useEffect } from "react";

const RepliesToReply = ({
  replyId,
  action,
}: {
  replyId: string;
  action: any;
}) => {
  const {
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    isLoading,
    isError,
    data: replies,
  } = useInfiniteQuery({
    queryKey: ["replies", { replyId }],
    queryFn: ({ pageParam }) => getReplies({ pageParam, replyId }),
    getNextPageParam: (lastPage) => {
      if (lastPage.data.metadata.hasNextPage) {
        return lastPage.data.metadata.page + 1;
      }
      return undefined;
    },
    staleTime: 1000 * 60 * 5,
  });

  useEffect(() => {
    action(replies?.pages[0].data.metadata.totalCount);
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

  if (replies?.pages[0]?.data?.data?.length === 0) return null;

  return (
    <div className="mt-4">
      <div className="flex flex-col mt-4">
        {replies?.pages.map((group, i) => {
          return group.data.data.map((reply: ReplyData) => (
            <div
              className="py-1 ml-6 pl-4 border-l-2 border-base-content/35"
              key={reply._id}
            >
              <Reply reply={reply} />
            </div>
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
    </div>
  );
};

export default RepliesToReply;
