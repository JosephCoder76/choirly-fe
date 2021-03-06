import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { FontAwesome } from "@expo/vector-icons";

import { MessagesStackNav } from "./MessagesStackNav";
import { EventsStackNav } from "./EventsStackNav";
import { FilesStackNav } from "./FilesStackNav";

const Tab = createBottomTabNavigator();


export default function ChoirGroubTabs({ route }) {

  const { choirId } = route.params;
  const choirName = route.name;

  return (
    <Tab.Navigator
      initialRouteName="MessagesMain"
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          let iconName;

          if (route.name === "MessagesMain") {
            iconName = focused ? "envelope-open" : "envelope";
          } else if (route.name === "EventsMain") {
            iconName = focused ? "calendar" : "calendar-o";
          } else if (route.name === "FilesMain") {
            iconName = focused ? "folder-open" : "folder";
          }

          return <FontAwesome name={iconName} size={size} color={color} />;
        },
        tabBarActiveTintColor: "#BD5C1E",
        tabBarInactiveTintColor: "gray",
      })}
    >
      <Tab.Screen
        name="MessagesMain"
        component={MessagesStackNav}
        options={{ headerShown: false, title: "Messages" }}
        initialParams={{ choirId: choirId }}
      />
      <Tab.Screen
        name="EventsMain"
        component={EventsStackNav}
        options={{ headerShown: false, title: "Events" }}
        initialParams={{ choirId: choirId, choirName: choirName }}
      />
      <Tab.Screen
        name="FilesMain"
        component={FilesStackNav}
        options={{
          headerShown: false,
          title: "Files",
        }}
        initialParams={{ choirId: choirId }}
      />
    </Tab.Navigator>
  );
}
