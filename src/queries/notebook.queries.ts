import axios from "axios";

export const createNotebook = async (name: string) => {
  const res = await axios.post("/api/notebook", { name });

  return res.data.data;
};

export const getAllNotebooks = async ({
  pageParam = 1,
  query = "",
}: {
  pageParam: number;
  query: string;
}) => {
  const res = await axios.get(`/api/notebook?page=${pageParam}&q=${query}`);

  return res.data;
};
