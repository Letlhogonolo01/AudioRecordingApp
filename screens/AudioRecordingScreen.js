import AsyncStorage from "@react-native-async-storage/async-storage";
import React, { useState, useEffect } from "react";
import { StyleSheet, View, Text, Button } from "react-native";
import { Audio } from "expo-av";
import { useDispatch } from "react-redux";
import { addRecording } from "../redux/audioSlice";
import Buttons from "../components/Buttons";

export default function AudioRecordingScreen({ navigation }) {
  const [recording, setRecording] = useState(null);
  const [isRecording, setIsRecording] = useState(false);
  const [timer, setTimer] = useState(0); // Timer in seconds
  const dispatch = useDispatch();

  const [userDetails, setUserDetails] = React.useState();
  React.useEffect(() => {
    getUserData();
  }, []);

  const getUserData = async () => {
    const userData = await AsyncStorage.getItem("userData");
    if (userData) {
      setUserDetails(JSON.parse(userData));
    }
  };

  const logout = () => {
    AsyncStorage.setItem(
      "userData",
      JSON.stringify({ ...userDetails, loggedIn: false })
    );
    navigation.navigate("LoginScreen");
  };

  useEffect(() => {
    if (isRecording) {
      // Update the timer every second while recording is in progress
      const interval = setInterval(() => {
        setTimer((prevTimer) => prevTimer + 1);
      }, 2000);

      return () => {
        clearInterval(interval); // Clean up the interval when component unmounts or isRecording becomes false.
      };
    }
  }, [isRecording]);

  const startRecording = async () => {
    try {
      await Audio.requestPermissionsAsync();
      await Audio.setAudioModeAsync({ allowsRecordingIOS: true });
      const recordingInstance = new Audio.Recording();
      await recordingInstance.prepareToRecordAsync(
        Audio.RECORDING_OPTIONS_PRESET_HIGH_QUALITY
      );
      await recordingInstance.startAsync();
      setRecording(recordingInstance);
      setIsRecording(true);
      setTimer(0); // Reset the timer when starting a new recording
    } catch (error) {
      console.error("Failed to start recording", error);
    }
  };

  const stopRecording = async () => {
    try {
      await recording.stopAndUnloadAsync();
      setIsRecording(false);
      const uri = recording.getURI();
      dispatch(addRecording({ uri }));
    } catch (error) {
      console.error("Failed to stop recording", error);
    }
  };

  return (
    <View style={styles.container}>
      <View
        style={styles.container1}
      >
        <Text style={styles.textWelcome}>
          Welcome {userDetails?.fullname}
        </Text>
        <Text style={styles.text}>Audio Recording Screen</Text>
      </View>

      {isRecording ? (
        <View style={styles.timerContainer}>
          <Text style={styles.timerText}>Recording: {formatTimer(timer)}</Text>
          <Button title="Stop Recording" onPress={stopRecording} />
        </View>
      ) : (
        <Button title="Start Recording" onPress={startRecording} />
      )}

      <Button
        title="View Recordings"
        onPress={() => navigation.navigate("AudioPlayback")}
      />
      <Buttons title="Logout" onPress={logout} />
    </View>
  );
}

const formatTimer = (timer) => {
  const minutes = Math.floor(timer / 60);
  const seconds = timer % 60;
  return `${minutes.toString().padStart(2, "0")}:${seconds.toString().padStart(2, "0")}`;
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 20,
  },
  container1: {
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 20,
  },
  text: {
    fontWeight: "700",
    fontSize: 20,
    marginBottom: 50,
  },
  textWelcome: {
    fontSize: 20, 
    fontWeight: "bold"
  },
  timerContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 20,
  },
  timerText: {
    marginRight: 10,
  },
});
