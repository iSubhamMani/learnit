"use client";
import Reply from "@/components/reply";
import Tag from "@/components/Tag";
import { DiscussionData } from "@/interfaces/discussion.interface";
import axios from "axios";
import { ArrowDown, ArrowLeft, ArrowUp } from "lucide-react";
import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";

const DiscussionPage = () => {
  const router = useRouter();
  const { id } = useParams<{ id: string }>();
  const [discussion, setDiscussion] = useState<DiscussionData | null>(null);

  useEffect(() => {
    if (!id) return;

    async function getDiscussion() {
      try {
        const res = await axios.get(`/api/discussion/${id}`, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("learnit-token")}`,
          },
        });

        setDiscussion(res.data.data);
      } catch (error) {
        toast.error("Error fetching discussion", {
          duration: 3000,
          position: "top-center",
        });
      }
    }

    getDiscussion();
  }, [id]);

  if (!discussion) return null;

  return (
    <div className="min-h-screen px-4 sm:px-6 py-8 flex flex-col bg-base-200">
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
            {discussion.title} Lorem ipsum, dolor sit amet consectetur
            adipisicing elit. Incidunt quae est voluptates fuga distinctio
            reprehenderit?{" "}
          </h1>

          <div className="flex flex-wrap gap-2 mt-4">
            {discussion.tags.map((tag) => (
              <Tag key={tag} value={tag} onClickHandler={undefined} />
            ))}
          </div>
        </div>
        <div className="flex flex-col gap-1 sm:flex-row sm:items-center justify-between mt-3">
          <p className="text-base-content text-sm">
            Asked by{" "}
            <span className="font-bold">{discussion.askedBy.displayName}</span>
          </p>
          <p className="text-sm text-base-content">
            {discussion.createdAt.toString()}
          </p>
        </div>
        <div className="flex mt-6 gap-4">
          <div className="flex flex-col gap-2">
            <button
              className="btn btn-circle btn-sm md:btn-md
            "
            >
              <ArrowUp className="text-base-content w-5 h-5 sm:w-6 sm:h-6" />
            </button>
            <button
              className="btn btn-circle btn-sm sm:btn-md
            "
            >
              <ArrowDown className="text-base-content w-5 h-5 sm:w-6 sm:h-6" />
            </button>
          </div>
          <div>
            <p className="text-lg text-base-content font-medium">
              {discussion.description} Lorem ipsum dolor sit amet consectetur
              adipisicing elit. Perspiciatis nisi voluptates totam suscipit
              blanditiis consequuntur cumque! Vel, aliquid quis autem provident
              deserunt animi magnam expedita saepe quisquam doloribus explicabo
              fugiat voluptatem ut dolorum voluptate fuga? Facilis quasi cum vel
              numquam nulla eum? Quisquam officia esse repellat labore ipsam.
              Natus itaque fugit earum neque, nulla eum vitae aliquam cupiditate
              minima ab quisquam repudiandae quia eligendi doloribus repellendus
              ut iure officia consequuntur ad. Minima veniam voluptate itaque
              facilis, sunt temporibus? Consequatur at sit nulla quae suscipit
              similique dolore explicabo accusantium perspiciatis corporis,
              minima eos velit, nam facilis corrupti quia? Maxime, eligendi
              laboriosam?{" "}
            </p>
          </div>
        </div>
        <div className="mt-8 pt-4 border-t border-base-content/35">
          <h1 className="text-xl text-primary font-medium">Replies</h1>
          <div className="flex flex-col gap-4 mt-4">
            <Reply />
            <Reply />
            <Reply />
          </div>
        </div>
      </div>
    </div>
  );
};

export default DiscussionPage;
