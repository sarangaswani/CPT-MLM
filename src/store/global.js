import { createGlobalState } from "react-hooks-global-state";

const { setGlobalState, useGlobalState, getGlobalState } = createGlobalState({
  contract: null,
  directReferrals: [],
  allReferrals: [],
  allReferralsLength: "",
  paid: "",
  unpaid: "",
  balance: "",
  balanceInCpt: "",
  connectedAccount: "",
});

export { useGlobalState, setGlobalState, getGlobalState };
