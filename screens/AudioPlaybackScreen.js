import React from "react";
import { StyleSheet, View, Text, FlatList, Button } from "react-native";
import { useSelector, useDispatch } from "react-redux";
import { Audio } from "expo-av";
import { deleteRecording } from "../redux/audioSlice";

export default function AudioPlaybackScreen() {
  const recordings = useSelector((state) => state.audio.recordings);
  const dispatch = useDispatch();

  const playRecording = async (uri) => {
    try {
      const sound = new Audio.Sound();
      await sound.loadAsync({ uri });
      await sound.playAsync();
    } catch (error) {
      console.error("Failed to play recording", error);
    }
  };

  const handleDeleteRecording = (uri) => {
    dispatch(deleteRecording(uri));
  };

  return (
    <View style={styles.container}>
      <Text style={styles.text}>Audio Playback Screen</Text>
      <FlatList
        data={recordings}
        keyExtractor={(item) => item.uri}
        renderItem={({ item }) => (
          <View>
            <Text>{item.uri}</Text>
            <Button title="Play" onPress={() => playRecording(item.uri)} />
            <Button
              title="Delete"
              onPress={() => handleDeleteRecording(item.uri)}
            />
          </View>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  text: {
    fontWeight: "700",
    fontSize: 18,
  },
});
