export const getFirstObjectFromArray = (arr) => {
  if (Array.isArray(arr) && arr.length > 0) {
    return arr[0];
  }
  return null; // Return null if the array is empty or not an array
};
