import { PROCESS_START, PROCESS_END ,PROCESS_CLEAR } from "../actions/types";

const initialAuthState = {
  category: null,
  inProcess: false,
  process: null,
  status: null,
};

const process = (state = initialAuthState, action) => {
  switch (action.type) {
    case PROCESS_START:
      return {
        ...state,
        category: action.category,
        inProcess: action.inProcess,
        process: action.process,
        status: null,
      };
    case PROCESS_END:
      // console.log(action);
      return {
        ...state,
        category: action.category,
        inProcess: action.inProcess,
        process: action.process,
        status: action.status,
      };
      case PROCESS_CLEAR:
      // console.log(action);
      return {
        ...state,
        category: null,
        inProcess: false,
        process: null,
        status: null,
      };

    default:
      return state;
  }
};
export default process;
