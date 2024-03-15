import React from "react";

const useDropDown = (options) => {
  const handleSelect = (option) => {
    console.log("Selected option:", option);
  };
  return { options, handleSelect };
};

export default useDropDown;
