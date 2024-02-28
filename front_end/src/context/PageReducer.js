import Cookies from "js-cookie";
const initialState = {
  isLogin: Cookies.get("forFe"),
  dataAllUsers: null,
};

function PageReducer(state, action) {
  switch (action.type) {
    case "SET_USER_LOGIN":
      return { ...state, isLogin: action.payload };
    case "SET_DATA_ALL_USERS":
      return { ...state, dataAllUsers: action.payload };
    default:
      throw new Error("Invalid Action");
  }
}

export { initialState, PageReducer };
