import { View, Text } from "react-native";
import * as Linking from "expo-linking";
import React from "react";
import { conferences } from "../../../data/conferences";
import { useLocalSearchParams } from "expo-router";

export default function Conference() {
  const params = useLocalSearchParams();
  const conference = conferences.find(conference => conference.id === params.conferenceId);
  return (
    <>
      {conference ? (
        <View>
          <Text>{conference.name}</Text>
          <Text>{conference.location}</Text>
          <Text>
            {conference.startDate} - {conference.endDate}
          </Text>
          <Text onPress={() => Linking.openURL(conference.website)}>{conference.website}</Text>
        </View>
      ) : (
        <View>
          <Text>Conference not found</Text>
        </View>
      )}
    </>
  );
}
