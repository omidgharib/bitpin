export const addMarkets = (markets) => {
  return {
    type: "addMarkets",
    payload: markets,
  };
};