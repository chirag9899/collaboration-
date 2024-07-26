import { createSelector } from "@reduxjs/toolkit";
import { loginNetworkSelector } from "../reducers/accountSlice";
import { snapshotHeightsSelector } from "../reducers/authoringSlice";

export const loginNetworkSnapshotSelector = createSelector(
  (state, loginNetwork) => loginNetwork,
  snapshotHeightsSelector,
  (loginNetwork, snapshotHeights) => {
    console.log('loginNetwork:', snapshotHeights);
    return (
      (snapshotHeights || []).find(
        (snapshotHeight) => loginNetwork === snapshotHeight.network
      )?.height || 0
    );
  }
);
