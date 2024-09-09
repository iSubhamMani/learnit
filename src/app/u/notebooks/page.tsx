"use client";

import NewNotebookModal from "@/components/NewNotebookModal";
import NotebookCard from "@/components/NotebookCard";
import { NotebookData } from "@/interfaces/notebook.interface";
import { getAllNotebooks } from "@/queries/notebook.queries";
import { RotateCcw } from "lucide-react";
import Link from "next/link";
import { useState } from "react";
import { useInfiniteQuery } from "react-query";
import { useDebounce } from "use-debounce";

const NotebooksPage = () => {
  const [query, setQuery] = useState<string>("");
  const [debouncedQuery] = useDebounce(query, 350);

  const {
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    isLoading,
    isError,
    data: notebooks,
  } = useInfiniteQuery({
    queryKey: ["notebooks", { debouncedQuery }],
    queryFn: ({ pageParam }) =>
      getAllNotebooks({ pageParam, query: debouncedQuery }),
    getNextPageParam: (lastPage) => {
      if (lastPage.data.metadata.hasNextPage) {
        return lastPage.data.metadata.page + 1;
      }
      return undefined;
    },
    staleTime: 1000 * 60 * 5,
  });

  return (
    <div className="px-4 md:px-6 md:pl-24 py-8 w-full flex flex-col bg-base-200">
      <h1 className="text-2xl text-base-content">Your Notebooks</h1>
      <div className="mt-4">
        <NewNotebookModal debouncedQuery={debouncedQuery} />
        <div className="mt-4">
          {notebooks?.pages[0].data.data.length === 0 && (
            <div className="flex flex-col items-center gap-2 mt-12 md:mt-20">
              <p className="text-center text-base-content text-lg font-medium">
                No notebooks found
              </p>
            </div>
          )}
          <div className="mt-6 md:mt-10">
            {isLoading && (
              <div className="mt-4 flex justify-center">
                <div className="loading loading-spinner loading-sm text-primary"></div>
              </div>
            )}

            {!isLoading && isError && (
              <div>
                <p className="text-base-content text-center text-lg font-medium">
                  Error fetching notebooks
                </p>
              </div>
            )}

            {!isLoading && !isError && (
              <div>
                <div className="grid grid-cols-[1fr_150px] items-center border-b border-base-300 dark:border-gray-700 px-4 py-3 font-medium">
                  <div className="font-bold text-base-content text-xs sm:text-sm">
                    Name
                  </div>
                  <div className="font-bold text-right text-base-content text-xs sm:text-sm">
                    Created
                  </div>
                </div>
                <div>
                  {notebooks?.pages.map((group) => {
                    return group.data.data.map(
                      (notebook: NotebookData, i: number) => (
                        <Link href={`/u/n/${notebook._id}`} key={notebook._id}>
                          <NotebookCard index={i} notebook={notebook} />
                        </Link>
                      )
                    );
                  })}
                </div>
              </div>
            )}

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
                <div className="loading loading-spinner loading-sm text-primary"></div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NotebooksPage;
