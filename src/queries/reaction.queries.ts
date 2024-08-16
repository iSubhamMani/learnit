import axios from "axios";

export const likeDiscussion = async (id: string) => {
  await axios.patch(`/api/discussion/like/${id}`, null, {
    headers: {
      Authorization: `Bearer ${localStorage.getItem("learnit-token")}`,
    },
  });
};

export const dislikeDiscussion = async (id: string) => {
  await axios.patch(`/api/discussion/dislike/${id}`, null, {
    headers: {
      Authorization: `Bearer ${localStorage.getItem("learnit-token")}`,
    },
  });
};
