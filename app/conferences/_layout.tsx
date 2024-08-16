import React from "react";
import { Stack } from "expo-router";

export default function Layout() {
  return (
    <Stack>
      <Stack.Screen
        name="index"
        options={{
          title: "Conferences",
        }}
      />
      <Stack.Screen
        name="[conference]"
        options={{
          title: "Conference Details",
        }}
      />
    </Stack>
  );
}
