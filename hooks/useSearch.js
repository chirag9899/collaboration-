import { useState } from "react";

const useSearch = (data) => {
  const [search, setSearch] = useState("");
  const [filtredData, setFiltredData] = useState(data);


  const onSearchChange = (event) => {
    const { value } = event.target;
    setSearch(value);
    const searchVal = value.toLowerCase();
    if (searchVal === "") {
      setFiltredData(data);
    } else {
      const result = data.filter(({name}) => name.match(searchVal));
      setFiltredData(result);
    }
  };
  return { search, onSearchChange, filtredData };
};

export default useSearch;
