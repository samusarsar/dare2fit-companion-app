import { StatusBar } from "expo-status-bar";
import React, { useEffect, useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { StyleSheet, Text, View } from "react-native";

import { IAppContextValue } from "./common/types";
import { auth } from "./config/firebase-config";
import { logoutUser } from "./services/auth.services";

export default function App() {
  const [user] = useAuthState(auth);
  const [appState, setAppState] = useState<IAppContextValue>({
    user,
    userData: null,
  });

  console.warn(user);

  if (appState.user !== user) {
    setAppState({
      ...appState,
      user,
    });
  }

  useEffect(() => {
    if (!user) {
      console.log("logging in");
      // loginUser('samusar@dare2fit.bg', '123456');
      return () => {};
      // return () => {
      //     return;
      // };
    }
    logoutUser();
    console.warn(user);
    // return onValue(query(ref(db, `users`), orderByChild('uid'), equalTo(user.uid)), (snapshot) => {
    //     if (snapshot.exists()) {
    //         const userData = Object.values(snapshot.val())[0] as IUserData;
    //         setAppState({
    //             ...appState,
    //             userData,
    //         });
    //     }
    // });
  }, [user]);

  return (
    <View style={styles.container}>
      {!user ? <Text>Not Logged In</Text> : <Text>Logged In</Text>}
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
