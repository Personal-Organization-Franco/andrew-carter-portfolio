import { createContext, useContext, useReducer } from "react";

type Context = {
  expandAll: boolean;
};

type AppState = Context & { toggleExpandAll(): void };

const INITIAL_STATE: Context = {
  expandAll: false,
};

type ExpandAllAction = {
  type: "TOGGLE_EXPAND_ALL";
  payload: boolean;
};

type Action = ExpandAllAction;

const reducer = (state = INITIAL_STATE, action: Action) => {
  switch (action.type) {
    case "TOGGLE_EXPAND_ALL":
      return { ...state, expandAll: action.payload };
    default:
      return state;
  }
};

function useAppContextReducer(): AppState {
  const [{ expandAll }, dispatch] = useReducer(reducer, INITIAL_STATE);

  function toggleExpandAll() {
    dispatch({ type: "TOGGLE_EXPAND_ALL", payload: !expandAll });
  }

  return {
    expandAll,
    toggleExpandAll,
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
