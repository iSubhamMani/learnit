import axios from "axios";

export async function getReplies({
  pageParam = 1,
  discussionId,
}: {
  pageParam: number;
  discussionId: string;
}) {
  const response = await axios.get(
    `/api/reply?discussionId=${discussionId}&page=${pageParam}`,
    {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("learnit-token")}`,
      },
    }
  );
  return response.data;
}

export async function addReply({
  discussionId,
  content,
}: {
  discussionId: string;
  content: string;
}) {
  const response = await axios.post(
    "/api/reply",
    { discussionId, content },
    {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("learnit-token")}`,
      },
    }
  );
  return response.data.data;
}
