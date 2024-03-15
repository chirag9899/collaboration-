import React, { useState } from "react";

const useDropDown = (options) => {
  const [selectedOption, setSelectedOption] = useState(options[0].value);
  const [selectedCategory, setSelectCategories] = useState(null);

  const handleSelect = (option) => {
    setSelectedOption(option);
  };

  const handleCategories = (option) => {
    setSelectCategories(option);
  };
  return {
    options,
    handleSelect,
    selectedOption,
    handleCategories,
    selectedCategory,
  };
};

export default useDropDown;
