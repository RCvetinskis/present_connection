const range = (start, end) => {
  return [...Array(end).keys()].map((x) => x + start);
};

export default range;
