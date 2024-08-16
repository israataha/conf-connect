import { View, Text, FlatList, StyleSheet } from "react-native";
import React from "react";
import { Conference } from "../../types";

type ConferenceProps = {
  conference: Conference;
};

const ConferenceCard = ({ conference }: ConferenceProps) => (
  <View style={styles.itemContainer}>
    <Text style={styles.name}>{conference.name}</Text>
    <Text style={styles.location}>{conference.location}</Text>
    <Text style={styles.dates}>
      {conference.startDate} - {conference.endDate}
    </Text>
  </View>
);

export default function Conferences() {
  const conferences = [
    {
      id: "1",
      name: "Tech Innovations 2024",
      location: "San Francisco, CA",
      startDate: "September 12, 2024",
      endDate: "September 14, 2024",
    },
    {
      id: "2",
      name: "Global Health Summit",
      location: "New York, NY",
      startDate: "October 22, 2024",
      endDate: "October 24, 2024",
    },
    {
      id: "3",
      name: "AI & Robotics Expo",
      location: "Austin, TX",
      startDate: "November 5, 2024",
      endDate: "November 7, 2024",
    },
  ];
  return <FlatList data={conferences} renderItem={({ item }) => <ConferenceCard conference={item} key={item.id} />} />;
}

const styles = StyleSheet.create({
  itemContainer: {
    padding: 15,
    borderBottomWidth: 1,
    borderBottomColor: "#ccc",
  },
  name: {
    fontSize: 18,
    fontWeight: "bold",
  },
  location: {
    fontSize: 16,
    color: "#555",
  },
  dates: {
    fontSize: 14,
    color: "#888",
  },
});
