import { View, Text, FlatList, StyleSheet, TouchableOpacity, TextInput } from "react-native";
import React, { useState } from "react";
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
  const [search, setSearch] = useState("");
  const [confereceList, setConferenceList] = useState(conferences);

  const handleSearch = (searchTerm: string) => {
    let filteredList = conferences;

    if (searchTerm) {
      filteredList = conferences.filter((conference) =>
        conference.name.toLowerCase().includes(searchTerm.toLowerCase()),
      );
    }

    setSearch(searchTerm);
    setConferenceList(filteredList);
  };
  return (
    <FlatList
      ListHeaderComponent={
        <TextInput
          value={search}
          style={styles.textInput}
          onChangeText={handleSearch}
          placeholder="Search"
          autoCapitalize="none"
        />
      }
      style={styles.container}
      contentContainerStyle={styles.contentContainer}
      data={confereceList}
      renderItem={({ item }) => <ConferenceCard conference={item} key={item.id} />}
    />
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#fff",
    flex: 1,
    paddingTop: 12,
  },
  contentContainer: {
    paddingBottom: 24,
  },
  textInput: {
    borderColor: "#ccc",
    borderWidth: 2,
    padding: 12,
    fontSize: 18,
    borderRadius: 50,
    marginHorizontal: 12,
    marginBottom: 12,
    backgroundColor: "#fff",
  },
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
