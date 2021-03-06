const initialState = {
  todos: [],
};

const todo = (state = { todos: [] }, action) => {
  switch (action.type) {
    case "FETCH_TODOS":
      return {
        todos: action.payload,
      };

    default:
      return state;
  }
};

export default todo;
