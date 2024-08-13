import { LoaderCircle, Send } from "lucide-react";

const ReplyInput = ({
  stateValue,
  stateAction,
  isReplyLoading,
  onClickAction,
  size = "md",
  placeholder = "Reply to this discussion",
}: {
  isReplyLoading: boolean;
  stateValue: string;
  stateAction: any;
  onClickAction: () => Promise<void>;
  size?: "sm" | "md";
  placeholder?: string;
}) => {
  return (
    <div className="flex items-center gap-3">
      <input
        onChange={(e) => stateAction(e.target.value)}
        value={stateValue}
        type="text"
        placeholder={placeholder}
        className={`input input-bordered w-full input-${size}`}
      />
      <button
        disabled={isReplyLoading}
        onClick={onClickAction}
        className="btn-sm md:btn-md btn btn-circle"
      >
        {isReplyLoading ? (
          <LoaderCircle className="text-primary animate-spin w-5 h-5" />
        ) : (
          <Send className="text-base-content w-4 h-4 md:w-5 md:h-5" />
        )}
      </button>
    </div>
  );
};

export default ReplyInput;
