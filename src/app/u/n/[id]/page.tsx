"use client";

import BackButton from "@/components/BackButton";
import SummaryCard from "@/components/SummaryCard";
import { NotebookData } from "@/interfaces/notebook.interface";
import { Summary } from "@/interfaces/summary.interface";
import { getAllSummaries } from "@/queries/summary.queries";
import axios from "axios";
import { FileTextIcon, PuzzleIcon, RotateCcw } from "lucide-react";
import Link from "next/link";
import { useEffect, useState } from "react";
import { useInfiniteQuery } from "react-query";

const NotebookManagePage = ({ params }: { params: { id: string } }) => {
  const notebookId = params.id;
  const [notebookInfo, setNotebookInfo] = useState<NotebookData | null>(null);

  useEffect(() => {
    if (!notebookId) return;

    async function getNoteBookInfo() {
      const res = await axios.get(`/api/notebook/${notebookId}`);

      if (res.data.success) {
        setNotebookInfo(res.data.data);
      }
    }

    getNoteBookInfo();
  }, [notebookId]);

  const {
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    isLoading,
    isError,
    data: summaries,
  } = useInfiniteQuery({
    queryKey: ["summaries", { notebookId }],
    queryFn: ({ pageParam }) => getAllSummaries({ pageParam, notebookId }),
    getNextPageParam: (lastPage) => {
      if (lastPage.data.metadata.hasNextPage) {
        return lastPage.data.metadata.page + 1;
      }
      return undefined;
    },
    staleTime: 1000 * 60 * 5,
  });

  if (!notebookId) return;

  return (
    <div className="px-5 md:pl-24 py-8 w-full flex flex-col bg-base-200">
      <div className="flex gap-3 items-center">
        <BackButton />
        <h1 className="text-base-content text-xl font-medium">
          {notebookInfo?.name}
        </h1>
      </div>
      <div className="flex flex-col sm:flex-row gap-4 my-4">
        <Link href={`/u/n/${notebookId}/summarize`}>
          <div className="cursor-pointer w-full max-w-md card bg-base-100 shadow-md rounded-md hover:bg-white/55 dark:hover:bg-neutral">
            <div className="card-body p-4 sm:p-6 md:p-8">
              <div className="card-title">
                <div className="flex items-center gap-2">
                  <FileTextIcon className="text-primary w-4 h-4 sm:w-6 sm:h-6" />
                  <p className="text-lg sm:text-xl text-base-content font-bold">
                    Summarize
                  </p>
                </div>
              </div>
              <div>
                <p className="text-base-content/95 font-normal">
                  Quickly extract key points from images and generate concise
                  notes. Perfect for studying or preparing presentations
                </p>
              </div>
            </div>
          </div>
        </Link>
        <div className="cursor-pointer w-full max-w-md card bg-base-100 shadow-md rounded-md hover:bg-white/55 dark:hover:bg-neutral">
          <div className="card-body p-4 sm:p-6 md:p-8">
            <div className="card-title">
              <div className="flex items-center gap-2">
                <PuzzleIcon className="text-secondary w-4 h-4 sm:w-6 sm:h-6" />
                <p className="text-lg sm:text-xl text-base-content font-bold">
                  Generate Quiz
                </p>
              </div>
            </div>
            <div>
              <p className="text-base-content/95 font-normal">
                Create engaging quizzes from your notes to test your
                understanding
              </p>
            </div>
          </div>
        </div>
      </div>
      <div className="my-4">
        <h1 className="text-base-content text-2xl font-medium">
          Your summaries
        </h1>
        {isLoading && (
          <div className="mt-4 flex justify-center">
            <div className="loading loading-spinner loading-sm text-primary"></div>
          </div>
        )}
        <div className="mt-2 md:mt-4 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          {summaries?.pages.map((page) => {
            return page.data.data.map((summary: Summary & { _id: string }) => {
              return <SummaryCard key={summary._id} summary={summary} />;
            });
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
            <div className="loading loading-spinner loading-sm text-primary"></div>
          )}
        </div>
      </div>
      <div>
        <h1 className="text-base-content text-2xl font-medium">Your quizzes</h1>
      </div>
    </div>
  );
};

export default NotebookManagePage;
