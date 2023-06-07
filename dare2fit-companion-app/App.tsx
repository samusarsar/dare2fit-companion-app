import { equalTo, onValue, orderByChild, query, ref } from "firebase/database";
import { NativeBaseProvider, extendTheme } from "native-base";
import React, { useEffect, useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";

import { IAppContextValue, IUserData } from "./common/types";
import { auth, db } from "./config/firebase-config";
import { AppContext } from "./context/AppContext/AppContext";
import Activity from "./tabs/Activity/Activity";
import LogIn from "./tabs/LogIn/LogIn";
import TabNavigation from "./tabs/TabNavigation";

export default function App() {
  const [user, loading] = useAuthState(auth);
  const [appState, setAppState] = useState<IAppContextValue>({
    user,
    userData: null,
  });

  if (appState.user !== user) {
    setAppState({
      ...appState,
      user,
    });
  }

  useEffect(() => {
    if (!user) {
      return () => {};
    }
    return onValue(
      query(ref(db, `users`), orderByChild("uid"), equalTo(user.uid)),
      (snapshot) => {
        if (snapshot.exists()) {
          const userData = Object.values(snapshot.val())[0] as IUserData;
          setAppState({
            ...appState,
            userData,
          });
        }
      }
    );
  }, [user]);

  if ((!loading && !user) || (!loading && user && appState.userData)) {
    return (
      <NativeBaseProvider theme={theme}>
        <AppContext.Provider value={{ ...appState, setContext: setAppState }}>
          {!user ? <LogIn /> : <TabNavigation />}
        </AppContext.Provider>
      </NativeBaseProvider>
    );
  }

  return null;
}

const theme = extendTheme({
  colors: {
    // Add new color
    brand: {
      white: "#FFFFFF",
      light: "#EDF2F7",
      red: "#F24968",
      blue: "#6929F2",
      purple: "#9B72F2",
      green: "#14D990",
      yellow: "#F2B807",
      grey: "#2D3748",
      dark: "#1A202C",
    },
  },
});
