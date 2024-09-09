import axios from "axios";

export const getAllSummaries = async ({
  pageParam = 1,
  notebookId = "",
}: {
  pageParam: number;
  notebookId: string;
}) => {
  const res = await axios.get(`/api/summaries/${notebookId}?page=${pageParam}`);

  return res.data;
};
