import React, { useState, useCallback, useEffect } from "react";
import { StyleSheet, Image } from "react-native";
import { useFocusEffect } from "@react-navigation/core";
import { HomeStackNav } from "./HomeStackNav";
import { UserProfileStackNav } from "./UserProfileStackNav";
import ChoirGroubTabs from "./ChoirGroupTabNav";
import NotificationsScreen from "../Screens/NotificationsScreen";

import { createDrawerNavigator } from "@react-navigation/drawer";

import { LogoTitle } from "../components/LogoTitle";
import { NotificationBell } from "../components/NotificationBell";
import { auth } from "../../firebase";
import { getChoirs, getUserByUsername } from "../utils/api";

const Drawer = createDrawerNavigator();

export default function DrawerNav() {
  const username = auth.currentUser.displayName;

  const [isLoading, setIsLoading] = useState(true);
  const [choirIds, setChoirIds] = useState([]);
  const [allChoirs, setAllChoirs] = useState([]);

  useFocusEffect(
    useCallback(() => {
      setIsLoading(true);
      getUserByUsername(username)
        .then((user) => {
          setChoirIds(user.groups);
          setIsLoading(false);
        })
        .then(() => {
          return getChoirs();
        })
        .then((choirs) => {
          setAllChoirs(choirs);
        })
        .catch((err) => {
          setIsLoading(false);
          console.log(err);
        });
    }, [])
  );

  if (isLoading) {
    return (
      <Image
        style={styles.loading}
        source={{
          uri: "https://www.teahub.io/photos/full/226-2267889_animated-circle-gif-transparent.gif",
        }}
      />
    );
  }

  const groups = allChoirs
    .filter((choir) => {
      return choirIds.includes(choir._id);
    })
    .map((choir) => {
      return { choirName: choir.name, choirId: choir._id };
    });

  return (
    <Drawer.Navigator
      screenOptions={{
        headerTintColor: "black", // this changes the hamburger colour
        headerTitle: () => <LogoTitle />,
        headerTitleAlign: "center", // this centers the logo on android
        headerRight: () => <NotificationBell />,
      }}
    >
      <Drawer.Screen name="Home" component={HomeStackNav} />
      <Drawer.Screen name="Profile" component={UserProfileStackNav} />

      {groups.map((group) => {
        return (
          <Drawer.Screen
            key={group.choirId}
            name={group.choirName}
            component={ChoirGroubTabs}
            initialParams={{ choirId: group.choirId }}
          />
        );
      })}

      <Drawer.Screen name="Notifications" component={NotificationsScreen} />
    </Drawer.Navigator>
  );
}

const styles = StyleSheet.create({});
