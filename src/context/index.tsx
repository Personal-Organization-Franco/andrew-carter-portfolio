import { createContext, useContext, useReducer } from "react";
import { isPasswordSet } from "utils/isPasswordSet";

type Context = {
  expandAll: boolean;
  passwordIsSet: boolean;
  activeIndex: number | null;
};

type AppState = Context & {
  toggleExpandAll(): void;
  togglePasswordIsSet(payload?: boolean): void;
  setActiveIndex(index: number | null): void;
};

const INITIAL_STATE: Context = {
  expandAll: false,
  passwordIsSet: isPasswordSet(),
  activeIndex: null,
};

type ExpandAllAction = {
  type: "TOGGLE_EXPAND_ALL";
  payload: boolean;
};

type TogglePasswordIsSetAction = {
  type: "TOGGLE_PASSWORD_IS_SET";
  payload: boolean;
};

type SetActiveIndexAction = {
  type: "SET_ACTIVE_INDEX";
  payload: number | null;
};

type Action =
  | ExpandAllAction
  | TogglePasswordIsSetAction
  | SetActiveIndexAction;

const reducer = (state = INITIAL_STATE, action: Action) => {
  switch (action.type) {
    case "TOGGLE_EXPAND_ALL":
      return { ...state, expandAll: action.payload };

    case "TOGGLE_PASSWORD_IS_SET":
      return { ...state, passwordIsSet: action.payload };

    case "SET_ACTIVE_INDEX":
      return { ...state, activeIndex: action.payload };

    default:
      return state;
  }
};

function useAppContextReducer(): AppState {
  const [{ expandAll, passwordIsSet, activeIndex }, dispatch] = useReducer(
    reducer,
    INITIAL_STATE,
  );

  function toggleExpandAll() {
    dispatch({ type: "TOGGLE_EXPAND_ALL", payload: !expandAll });
  }

  function togglePasswordIsSet(payload: boolean) {
    dispatch({ type: "TOGGLE_PASSWORD_IS_SET", payload });
  }

  function setActiveIndex(index: number | null) {
    dispatch({ type: "SET_ACTIVE_INDEX", payload: index });
  }

  return {
    activeIndex,
    expandAll,
    passwordIsSet,
    setActiveIndex,
    toggleExpandAll,
    togglePasswordIsSet,
  };
}

const AppContext = createContext<AppState | undefined>(undefined);

export function useAppContext() {
  const appContext = useContext(AppContext);

  if (!appContext) {
    throw new Error("appContext has to be used within <AppContext.Provider>");
  }

  return appContext;
}

export const AppContextProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  return (
    <AppContext.Provider value={{ ...useAppContextReducer() }}>
      {children}
    </AppContext.Provider>
  );
};
