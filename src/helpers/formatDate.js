export const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString("en-GB", {
      year: "2-digit",
      month: "2-digit",
      day: "2-digit",
    });
  };