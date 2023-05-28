import { map, assign, find } from "lodash";
import { IMarket } from "../../interfaces/IMarket";
const inititalState: IMarket[] = [

];
const marketReducer = (state: IMarket[] = inititalState, action) => {
  switch (action.type) {
    case "addMarkets": {
      const mergedList = map(state, function (item) {
        return assign(item, find(action.payload, { id: item.id }));
      });
      // return [...state, ...action.payload];
      return mergedList?.length > 0 ? mergedList : action.payload;
    }
    case "updateMarket": {
      return action.payload;
    }
  }
  return state;
};
export default marketReducer;