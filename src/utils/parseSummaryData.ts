import toast from "react-hot-toast";

export const parseData = (data: string) => {
  try {
    const parts = data.split("#");

    // The first part is the topic
    const topic = parts[0].trim();

    // The second part contains the points separated by \n
    const pointsSection = parts[1].trim();

    // Split points based on \n
    const points = pointsSection
      .split("\n")
      .map((point) => point.trim())
      .filter((point) => point.length > 0);

    return { topic, points };
  } catch (error) {
    toast.error("Error parsing summary data", {
      duration: 3000,
      position: "top-center",
    });
    return { topic: "", points: [] };
  }
};
