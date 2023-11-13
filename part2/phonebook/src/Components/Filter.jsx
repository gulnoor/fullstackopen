const Filter = ({ setQuery, query }) => {
  const handleSearchInput = (e) => {
    setQuery(() => e.target.value);
  };
  return (
    <div>
      Search: <input value={query} onChange={handleSearchInput} />
    </div>
  );
};

export default Filter;
