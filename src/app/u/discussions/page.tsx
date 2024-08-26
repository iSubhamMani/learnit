"use client";

import DiscussionCard from "@/components/DiscussionCard";
import DiscussionCardSkeleton from "@/components/DiscussionCardSkeleton";
import { DiscussionCardData } from "@/interfaces/discussion.interface";
import { getAllDiscussions } from "@/queries/discussion.queries";
import { Frown, MoveRight } from "lucide-react";
import Link from "next/link";
import { useState } from "react";
import { useInfiniteQuery, useQueryClient } from "react-query";
import { useDebounce } from "use-debounce";

const Discussions = () => {
  const [filter, setFilter] = useState<string>("");
  const [debouncedFilter] = useDebounce(filter, 350);
  const queryClient = useQueryClient();

  const {
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    isLoading,
    isError,
    status,
    data: discussions,
  } = useInfiniteQuery({
    queryKey: ["discussions", { debouncedFilter }],
    queryFn: ({ pageParam }) =>
      getAllDiscussions({ pageParam, filter: debouncedFilter }),
    getNextPageParam: (lastPage) => {
      if (lastPage.data.metadata.hasNextPage) {
        return lastPage.data.metadata.page + 1;
      }
      return undefined;
    },
    staleTime: 1000 * 60 * 5,
  });

  return (
    <div className="px-5 md:pl-24 py-8 w-full flex flex-col bg-base-200">
      <h1 className="text-2xl text-base-content">Discussion Board</h1>
      <div className="mt-4">
        <label className="input input-bordered flex items-center gap-2 max-w-xs">
          <input
            value={filter}
            onChange={(e) => setFilter(e.target.value)}
            type="text"
            className="grow text-base-content"
            placeholder="Search by title or tags"
          />
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 16 16"
            fill="currentColor"
            className="h-4 w-4 opacity-70"
          >
            <path
              fillRule="evenodd"
              d="M9.965 11.026a5 5 0 1 1 1.06-1.06l2.755 2.754a.75.75 0 1 1-1.06 1.06l-2.755-2.754ZM10.5 7a3.5 3.5 0 1 1-7 0 3.5 3.5 0 0 1 7 0Z"
              clipRule="evenodd"
            />
          </svg>
        </label>
        <div className="mt-6 flex justify-start">
          <Link href="/u/ask">
            <div className="px-4 py-2 w-max flex gap-2 items-center rounded-full bg-primary bg-opacity-10 hover:bg-opacity-20 transition ease-in-out duration-200">
              <p className="text-primary text-base font-medium">
                Start a discussion
              </p>
              <MoveRight className="w-5 h-5 text-primary" />
            </div>
          </Link>
        </div>
      </div>
      <div className="mt-4">
        {discussions?.pages[0].data.data.length === 0 && (
          <div className="flex flex-col items-center gap-2 mt-12 md:mt-20">
            <Frown className="text-base-content h-5 w-5 md:w-6 md:h-6" />
            <p className="text-center text-base-content text-lg font-medium">
              No discussions found
            </p>
          </div>
        )}
        <div className="mt-6 md:mt-10 grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-4">
          {isLoading && (
            <>
              <DiscussionCardSkeleton />
              <DiscussionCardSkeleton />
              <DiscussionCardSkeleton />
              <DiscussionCardSkeleton />
              <DiscussionCardSkeleton />
            </>
          )}
          {discussions?.pages.map((group, i) => {
            return group.data.data.map((discussion: DiscussionCardData) => (
              <DiscussionCard key={discussion._id} discussion={discussion} />
            ));
          })}
        </div>
      </div>
    </div>
  );
};

export default Discussions;
