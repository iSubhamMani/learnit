import axios from "axios";

export async function getDiscussion(id: string) {
  const res = await axios.get(`/api/discussion/${id}`, {
    headers: {
      Authorization: `Bearer ${localStorage.getItem("learnit-token")}`,
    },
  });

  return res.data.data;
}
