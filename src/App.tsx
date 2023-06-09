import AsyncStorage from "@react-native-async-storage/async-storage";
import { NavigationContainer } from "@react-navigation/native";
import { equalTo, onValue, orderByChild, query, ref } from "firebase/database";
import {
  NativeBaseProvider,
  extendTheme,
  StorageManager,
  ColorMode,
} from "native-base";
import React, { useEffect, useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";

import { IAppState, IUserData } from "./common/types";
import { auth, db } from "./config/firebase-config";
import { AppContext } from "./context/AppContext/AppContext";
import TabNavigation from "./navigation/TabNavigation/TabNavigation";

export default function App() {
  const [user, loading] = useAuthState(auth);
  const [appState, setAppState] = useState<IAppState>({
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

  if ((!loading && !user) || (user && appState.userData)) {
    return (
      <NativeBaseProvider theme={theme} colorModeManager={colorModeManager}>
        <AppContext.Provider value={{ ...appState, setContext: setAppState }}>
          <NavigationContainer>
            <TabNavigation />
          </NavigationContainer>
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

const colorModeManager: StorageManager = {
  get: async () => {
    try {
      const val = await AsyncStorage.getItem("@color-mode");
      return val === "dark" ? "dark" : "light";
    } catch {
      return "light";
    }
  },
  set: async (value: ColorMode) => {
    try {
      await AsyncStorage.setItem("@color-mode", value as string);
    } catch (e) {
      console.log(e);
    }
  },
};
