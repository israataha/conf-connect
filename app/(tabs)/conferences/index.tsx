import { View, Text, FlatList, StyleSheet, TouchableOpacity } from "react-native";
import React from "react";
import { Conference } from "../../../types";
import { Link } from "expo-router";
import { conferences } from "../../../data/conferences";

type ConferenceProps = {
  conference: Conference;
};

const ConferenceCard = ({ conference }: ConferenceProps) => (
  <Link
    push
    key={conference.id}
    href={{
      pathname: "/conferences/[conference]",
      params: { conferenceId: conference.id },
    }}
    asChild>
    <TouchableOpacity>
      <View style={styles.itemContainer}>
        <Text style={styles.name}>{conference.name}</Text>
        <Text style={styles.location}>{conference.location}</Text>
        <Text style={styles.dates}>
          {conference.startDate} - {conference.endDate}
        </Text>
      </View>
    </TouchableOpacity>
  </Link>
);

export default function Conferences() {
  return (
    <View>
      <FlatList data={conferences} renderItem={({ item }) => <ConferenceCard conference={item} key={item.id} />} />
    </View>
  );
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
