import { OPERATION_START, OPERATION_END } from "../actions/types";

const initialAuthState = {
  message: "",
  operation: null,
  inProcess: false,
  itemId: "",
};

const operation = (state = initialAuthState, action) => {
  switch (action.type) {
    case OPERATION_START:
      return {
        ...state,
        message: action.message,
        inProcess: true,
        itemId: action.id,
        operation: action.operation,
      };
    case OPERATION_END:
      // console.log(action);
      return {
        ...state,
        message: action.message,
        inProcess: false,
        itemId: "",
        operation: "",
      };

    default:
      return state;
  }
};
export default operation;
