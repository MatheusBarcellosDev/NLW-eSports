import { StatusBar } from "react-native";
import { useRef, useEffect } from "react";
import * as Notifications from "expo-notifications";
import {
  useFonts,
  Inter_400Regular,
  Inter_600SemiBold,
  Inter_700Bold,
  Inter_900Black,
} from "@expo-google-fonts/inter";
import { Subscription } from "expo-modules-core";

import { Routes } from "./src/routes";

import { Background } from "./src/components/Background";
import { Loading } from "./src/components/Loading";

import "./src/service/notificationConfig";
import { getPushNotificationToken } from "./src/service/getPushNotificationToken";

export default function App() {
  const getPushNotificationListener = useRef<Subscription>();
  const resposeNotificationListener = useRef<Subscription>();

  useEffect(() => {
    getPushNotificationToken();
  });

  useEffect(() => {
    getPushNotificationListener.current =
      Notifications.addNotificationReceivedListener((notification) => {
        console.log(notification);
      });

    resposeNotificationListener.current =
      Notifications.addNotificationResponseReceivedListener((response) => {
        console.log(response);
      });

    return () => {
      if (
        getPushNotificationListener.current &&
        resposeNotificationListener.current
      ) {
        Notifications.removeNotificationSubscription(
          getPushNotificationListener.current
        );
        Notifications.removeNotificationSubscription(
          resposeNotificationListener.current
        );
      }
    };
  }, []);

  const [fontsLoaded] = useFonts({
    Inter_400Regular,
    Inter_600SemiBold,
    Inter_700Bold,
    Inter_900Black,
  });

  return (
    <Background>
      <StatusBar
        barStyle="light-content"
        backgroundColor="transparent"
        translucent
      />

      {fontsLoaded ? <Routes /> : <Loading />}
    </Background>
  );
}
