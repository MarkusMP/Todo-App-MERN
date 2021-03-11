const initialState = {
  userId: "",
  jwt: "",
  logged: false,
};

const auth = (state = initialState, action) => {
  switch (action.type) {
    case "SIGN_OUT":
      return {
        jwt: "",
        userId: "",
        logged: false,
      };
    case "FETCH_DATA":
      return {
        jwt: action.payload.token,
        userId: action.payload.payload.user.id,
        logged: true,
      };

    default:
      return state;
  }
};

export default auth;
