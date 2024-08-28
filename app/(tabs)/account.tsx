import { useState, useEffect } from "react";
import { supabase } from "../../lib/supabase";
import { StyleSheet, View, Alert, Text, TextInput, Pressable } from "react-native";
import { useAuth } from "../../providers/AuthProvider";

export default function Account() {
  const { session } = useAuth();

  const [loading, setLoading] = useState(true);
  const [username, setUsername] = useState("");
  const [website, setWebsite] = useState("");
  const [avatarUrl, setAvatarUrl] = useState("");

  useEffect(() => {
    console.log("useeffect session: ", session);
    if (session) getProfile();
  }, [session]);

  async function getProfile() {
    try {
      setLoading(true);
      if (!session?.user) throw new Error("No user on the session!");

      const { data, error, status } = await supabase
        .from("profiles")
        .select(`username, full_name, website, avatar_url`)
        .eq("id", session?.user.id)
        .single();
      if (error && status !== 406) {
        throw error;
      }

      if (data) {
        setUsername(data.username);
        setWebsite(data.website);
        setAvatarUrl(data.avatar_url);
      }
    } catch (error) {
      if (error instanceof Error) {
        Alert.alert(error.message);
      }
    } finally {
      setLoading(false);
    }
  }

  async function updateProfile({
    username,
    website,
    avatar_url,
  }: {
    username: string;
    website: string;
    avatar_url: string;
  }) {
    try {
      setLoading(true);
      if (!session?.user) throw new Error("No user on the session!");

      const updates = {
        id: session?.user.id,
        username,
        website,
        avatar_url,
        updated_at: new Date(),
      };

      const { error } = await supabase.from("profiles").upsert(updates);

      if (error) {
        throw error;
      }
    } catch (error) {
      if (error instanceof Error) {
        Alert.alert(error.message);
      }
    } finally {
      setLoading(false);
    }
  }

  return (
    <View style={styles.container}>
      <View style={[styles.verticallySpaced, styles.mt20]}>
        <TextInput placeholder="email" style={styles.textInput} value={session?.user?.email} />
      </View>
      <View style={styles.verticallySpaced}>
        <TextInput
          placeholder="username"
          style={styles.textInput}
          value={username || ""}
          onChangeText={text => setUsername(text)}
        />
      </View>
      <View style={styles.verticallySpaced}>
        <TextInput
          placeholder="website"
          style={styles.textInput}
          value={website || ""}
          onChangeText={text => setWebsite(text)}
        />
      </View>

      <View style={[styles.verticallySpaced, styles.mt20]}>
        <Pressable disabled={loading} onPress={() => updateProfile({ username, website, avatar_url: avatarUrl })}>
          <Text>{loading ? "Loading ..." : "Update"}</Text>
        </Pressable>
      </View>

      <View style={styles.verticallySpaced}>
        <Pressable onPress={() => supabase.auth.signOut()}>
          <Text>Sign Out</Text>
        </Pressable>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginTop: 40,
    padding: 12,
  },
  verticallySpaced: {
    paddingTop: 4,
    paddingBottom: 4,
    alignSelf: "stretch",
  },
  mt20: {
    marginTop: 20,
  },
  textInput: {
    borderColor: "black",
    borderWidth: 1,
  },
});
