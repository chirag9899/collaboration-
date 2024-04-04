const { useState } = require("react");

const useModal = () => {
  const [open, setShow] = useState(false);

  const openModal = () => {
    setShow(true);
  };
  const closeModal = () => {
    setShow(false);
  };

  return {
    open,
    openModal,
    closeModal,
  };
};

export default useModal;
