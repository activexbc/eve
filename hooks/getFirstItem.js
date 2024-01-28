export const getFirstStringFromArray = (array) => {
  if (
    Array.isArray(array) &&
    array.length > 0 &&
    typeof array[0] === "string"
  ) {
    return array[0];
  } else {
    return null; // or any default value you want to return when the array is empty or doesn't contain strings
  }
};
