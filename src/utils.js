const getFilteredOptions = (options, selectedValues, searchTerm) => {
  return options.filter((o) => {
    return (
      !selectedValues.includes(o.value) &&
      o.label.toLowerCase().includes(searchTerm.toLowerCase())
    );
  });
};

export { getFilteredOptions };
