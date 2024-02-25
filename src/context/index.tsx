import { createContext, useContext, useReducer } from "react";
import { isPasswordSet } from "utils/isPasswordSet";

type Context = {
  expandAll: boolean;
  passwordIsSet: boolean;
};

type AppState = Context & {
  toggleExpandAll(): void;
  togglePasswordIsSet(payload?: boolean): void;
};

const INITIAL_STATE: Context = {
  expandAll: false,
  passwordIsSet: isPasswordSet(),
};

type ExpandAllAction = {
  type: "TOGGLE_EXPAND_ALL";
  payload: boolean;
};

type TogglePasswordIsSetAction = {
  type: "TOGGLE_PASSWORD_IS_SET";
  payload: boolean;
};

type Action = ExpandAllAction | TogglePasswordIsSetAction;

const reducer = (state = INITIAL_STATE, action: Action) => {
  switch (action.type) {
    case "TOGGLE_EXPAND_ALL":
      return { ...state, expandAll: action.payload };

    case "TOGGLE_PASSWORD_IS_SET":
      return { ...state, passwordIsSet: action.payload };

    default:
      return state;
  }
};

function useAppContextReducer(): AppState {
  const [{ expandAll, passwordIsSet }, dispatch] = useReducer(
    reducer,
    INITIAL_STATE,
  );

  function toggleExpandAll() {
    dispatch({ type: "TOGGLE_EXPAND_ALL", payload: !expandAll });
  }

  function togglePasswordIsSet(payload: boolean) {
    dispatch({ type: "TOGGLE_PASSWORD_IS_SET", payload });
  }

  return {
    expandAll,
    passwordIsSet,
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
