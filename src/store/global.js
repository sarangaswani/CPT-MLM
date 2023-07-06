import { createGlobalState } from "react-hooks-global-state";

const { setGlobalState, useGlobalState, getGlobalState } = createGlobalState({
  contract: null,
  directReferrals: [],
  allReferrals: [],
  paid: "",
  unpaid: "",
  balance: "",
  balanceInCpt: "",
  connectedAccount: "",
});

export { useGlobalState, setGlobalState, getGlobalState };
