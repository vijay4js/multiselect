const options = Array.from({ length: 10 }, (_, i) => {
  return {
    value: `Option${i}`,
    label: `Label ${i}`
  };
});

const moreOptions = [
  {
    value: "Vijay1",
    label: "Vijay Kumar"
  },
  {
    value: "Joe",
    label: "Joe Rogan Is my name Longer enough to trim?"
  },
  {
    value: "Mani Kumari",
    label: "Smt Mani Kumari"
  },
  {
    value: "Jo",
    label: "Jyothsna Priyanka"
  },
  {
    value: "Vijay2",
    label: "Treat"
  },
  {
    value: "Vijay3",
    label: "Vijay Kumar"
  }
];

export default [...moreOptions, ...options];
