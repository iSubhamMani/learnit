import { ReplyData } from "@/interfaces/reply.interface";
import { convertDateTime } from "@/utils/convertDateTime";
import { ArrowDown, ArrowUp, MessageCircle, ReplyIcon } from "lucide-react";
import Image from "next/image";
import { useState } from "react";
import ReplyInput from "./ReplyInput";
import { useMutation, useQueryClient } from "react-query";
import { addReply } from "@/queries/replies.queries";
import RepliesToReply from "./RepliesToReply";
import toast from "react-hot-toast";

const Reply = ({ reply }: { reply: ReplyData }) => {
  const replyId = reply._id;

  const [replyInputVisible, setReplyInputVisible] = useState<boolean>(false);
  const [replyContent, setReplyContent] = useState<string>("");
  const [replySection, setReplySection] = useState<boolean>(false);

  const queryClient = useQueryClient();

  const { mutate, isLoading: isReplyLoading } = useMutation({
    mutationFn: addReply,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["replies", { replyId }],
        exact: true,
      });
      setReplyContent("");
      setReplyInputVisible(false);
    },
    onError: () => {
      toast.error("Error sending reply", {
        duration: 3000,
        position: "top-center",
      });
    },
  });

  const sendReply = async () => {
    if (!replyContent.trim()) return;
    mutate({ replyId, content: replyContent });
  };

  return (
    <div>
      <div className="py-2">
        <div className="flex justify-between gap-2 items-center">
          <div className="flex gap-3 items-center">
            <div className="avatar">
              <div className="ring-neutral-content ring-offset-base-100 ring-1 ring-offset-2 w-4 sm:w-6 rounded-full">
                <Image
                  src={reply.repliedBy.photoURL}
                  alt="avatar"
                  width={24}
                  height={24}
                />
              </div>
            </div>
            <span className="text-base-content text-sm font-bold">
              {reply.repliedBy.displayName}
            </span>
          </div>
          <span className="text-xs text-base-content/80">
            {convertDateTime(reply.createdAt.toString())}
          </span>
        </div>
        <div className="mt-2">
          <p className="text-base-content">{reply.content}</p>
        </div>
        <div className="flex gap-4 mt-4">
          <div className="flex items-center gap-2">
            <ArrowUp className="hover:text-primary cursor-pointer text-base-content w-4 h-4 sm:w-5 sm:h-5" />
            <ArrowDown className="hover:text-red-400 cursor-pointer text-base-content w-4 h-4 sm:w-5 sm:h-5" />
          </div>
          <ReplyIcon
            onClick={() => setReplyInputVisible(!replyInputVisible)}
            className="hover:text-primary cursor-pointer text-base-content w-4 h-4 sm:w-5 sm:h-5"
          />
          <MessageCircle
            onClick={() => setReplySection(!replySection)}
            className="hover:text-primary cursor-pointer text-base-content w-4 h-4 sm:w-5 sm:h-5"
          />
        </div>
        {replyInputVisible && (
          <div className="mt-2">
            <ReplyInput
              isReplyLoading={isReplyLoading}
              onClickAction={sendReply}
              stateValue={replyContent}
              stateAction={setReplyContent}
              size="sm"
              placeholder="Reply to this comment"
            />
          </div>
        )}
      </div>
      {replySection && <RepliesToReply replyId={replyId} />}
    </div>
  );
};

export default Reply;
