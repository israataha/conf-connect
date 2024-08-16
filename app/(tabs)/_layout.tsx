import React from "react";
import { Tabs } from "expo-router";
import Ionicons from "@expo/vector-icons/Ionicons";

export default function TabLayout() {
  return (
    <Tabs screenOptions={{ tabBarShowLabel: false }}>
      <Tabs.Screen
        name="conferences"
        options={{
          title: "Conferences",
          tabBarIcon: ({ color, size }) => <Ionicons name="list" size={24} color="black" />,
        }}
      />
      <Tabs.Screen
        name="connections"
        options={{
          title: "Connections",
          tabBarIcon: ({ color, size }) => <Ionicons name="people-sharp" size={24} color="black" />,
        }}
      />
    </Tabs>
  );
}
