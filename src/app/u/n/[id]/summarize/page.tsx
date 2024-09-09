"use client";

import BackButton from "@/components/BackButton";
import Summary from "@/components/Summary";
import axios from "axios";
import { ArrowUp } from "lucide-react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";

const Summarize = ({ params }: { params: { id: string } }) => {
  const [summary, setSummary] = useState<string[]>([]);
  const [image, setImage] = useState<File | undefined>(undefined);
  const [uploading, setUploading] = useState(false);
  const notebookId = params.id;
  const router = useRouter();

  useEffect(() => {
    if (!image) return;
    getSummary(image);
  }, [image]);

  useEffect(() => {
    window.scrollTo({
      top: document.body.scrollHeight,
      behavior: "smooth",
    });
  }, [summary]);

  const getSummary = async (image: File) => {
    setUploading(true);
    window.scrollTo({
      top: document.body.scrollHeight,
      behavior: "smooth",
    });
    try {
      const formData = new FormData();
      formData.append("mediaPath", image);
      formData.append("notebookId", notebookId);

      const res = await axios.post("/api/summarize", formData);

      if (res.data.success) {
        if (res.data.data === "null") {
          toast.error("No educational content found in the image", {
            duration: 3000,
            position: "top-center",
          });
          return;
        }
        setSummary((prev) => [...prev, res.data.data]);
      }
    } catch (error) {
      toast.error("Error summarizing image", {
        duration: 3000,
        position: "top-center",
      });
    } finally {
      setImage(undefined);
      setUploading(false);
    }
  };

  return (
    <div className="px-4 md:px-6 md:pl-24 py-8 lg:pb-12 w-full flex flex-col bg-base-200 relative">
      <div className="flex gap-3 items-center">
        <BackButton />
        <h1 className="text-base-content text-xl md:text-3xl font-bold tracking-tight sm:text-4xl">
          Summarize your notes
        </h1>
      </div>

      {summary.length === 0 && (
        <div className="fixed left-1/2 top-1/2 translate-x-[-50%] translate-y-[-50%]">
          <p className="text-center text-sm sm:text-base font-medium text-base-content/65">
            Upload your notes to get started
          </p>
        </div>
      )}
      <div className="my-4 lg:mt-8">
        {summary.map((s, i) => {
          return <Summary key={i} data={s} />;
        })}
      </div>
      {uploading && (
        <div className="flex flex-col gap-2">
          <div className="bg-gray-300 dark:bg-neutral/85 skeleton h-4 w-full mx-auto max-w-4xl"></div>
          <div className="bg-gray-300 dark:bg-neutral/85 skeleton h-4 w-full mx-auto max-w-4xl"></div>
        </div>
      )}
      <div className="z-50 fixed bottom-4 left-[50%] translate-x-[-50%] grid gap-4">
        <div className="flex justify-center">
          <label
            className="hover:bg-primary/85 transition duration-200 ease-in-out text-primary-content rounded-full cursor-pointer"
            htmlFor="pofile-photo"
          >
            <div className="flex items-center px-6 py-3 shadow-2xl bg-neutral text-white rounded-full">
              {!uploading && (
                <>
                  <span className="mr-2 font-medium text-neutral-content">
                    Upload
                  </span>
                  <span className="flex items-center justify-center p-1 bg-secondary rounded-full">
                    <ArrowUp className="text-secondary-content w-5 h-5" />
                  </span>
                </>
              )}
              {uploading && (
                <div className="loading loading-spinner loading-sm text-neutral-content"></div>
              )}
            </div>
          </label>
        </div>
        {!uploading && (
          <input
            onChange={(e) => setImage(e.target.files?.[0])}
            className="hidden"
            id="pofile-photo"
            type="file"
            accept="image/jpeg, image/jpg, image/png"
          />
        )}
      </div>
    </div>
  );
};

export default Summarize;
