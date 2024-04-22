export const LIST_TAB_ITEMS = [
  {
    value: "proposals-all",
    name: "All Proposals",
  },
  {
    value: "proposals-active",
    name: "Active",
  },
  {
    value: "proposals-pending",
    name: "Pending",
    tooltip: "Waiting for the start date",
  },
  {
    value: "proposals-closed",
    name: "Closed",
  },
];

export const EmptyQuery = {
  total: 0,
  page: 1,
  pageSize: 10,
  items: [],
};

export const TOAST_TYPES = {
  SUCCESS: "Success",
  ERROR: "Error",
  INFO: "Info",
  PENDING: "Pending",
  WARNING:"Warning"
};


export const SPACE_SIDEBAR_TAB_ITEMS = [
  {
    value: "proposals-all",
    name: "Proposals",
  },
  {
    value: "treasury",
    name: "Treasury",
  },
  {
    value: "about",
    name: "About",
  },
];