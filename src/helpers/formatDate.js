export const formatDate = (dateString) => {
  return new Date(dateString).toLocaleDateString("en-US", {
    year: "2-digit",
    month: "2-digit",
    day: "2-digit",
  });
};

export const calculateDaysReamiming = (expirationDate) => {
  const currentDate = new Date();
  const expDate = new Date(expirationDate);
  const timeDiff = expDate - currentDate;
  const daysRemaining = Math.ceil(timeDiff / (1000 * 60 * 60 * 24)); // Convert milliseconds to days
  return daysRemaining;
};