import React from "react";
import { Redirect, Tabs } from "expo-router";
import Ionicons from "@expo/vector-icons/Ionicons";
import { useAuth } from "../../providers/AuthProvider";

export default function Layout() {
  const { isAuthenticated } = useAuth();

  if (!isAuthenticated) {
    return <Redirect href={"/(auth)/sign-in"} />;
  }

  return (
    <Tabs screenOptions={{ tabBarShowLabel: false }}>
      <Tabs.Screen
        name="index"
        options={{
          title: "Home",
          tabBarIcon: ({ color, size }) => <Ionicons name="home" size={size} color={color} />,
        }}
      />
      <Tabs.Screen
        name="conferences"
        options={{
          title: "Conferences",
          headerShown: false,
          tabBarIcon: ({ color, size }) => <Ionicons name="list" size={size} color={color} />,
        }}
      />
      <Tabs.Screen
        name="connections"
        options={{
          title: "Connections",
          tabBarIcon: ({ color, size }) => <Ionicons name="people-sharp" size={size} color={color} />,
        }}
      />
      <Tabs.Screen
        name="account"
        options={{
          title: "Account",
          tabBarIcon: ({ color, size }) => <Ionicons name="people-sharp" size={size} color={color} />,
        }}
      />
    </Tabs>
  );
}
