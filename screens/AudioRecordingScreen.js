import React, { useState } from 'react';
import { StyleSheet, View, Text, Button } from 'react-native';
import { Audio } from 'expo-av';
import { useDispatch } from 'react-redux';
import { addRecording } from '../redux/audioSlice';

export default function AudioRecordingScreen({ navigation }) {
  const [recording, setRecording] = useState(null);
  const [isRecording, setIsRecording] = useState(false);
  const dispatch = useDispatch();

  const startRecording = async () => {
    try {
      await Audio.requestPermissionsAsync();
      await Audio.setAudioModeAsync({ allowsRecordingIOS: true });
      const recordingInstance = new Audio.Recording();
      await recordingInstance.prepareToRecordAsync(Audio.RECORDING_OPTIONS_PRESET_HIGH_QUALITY);
      await recordingInstance.startAsync();
      setRecording(recordingInstance);
      setIsRecording(true);
    } catch (error) {
      console.error('Failed to start recording', error);
    }
  };

  const stopRecording = async () => {
    try {
      await recording.stopAndUnloadAsync();
      setIsRecording(false);
      const uri = recording.getURI();
      dispatch(addRecording({ uri }));
    } catch (error) {
      console.error('Failed to stop recording', error);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.text}>Audio Recording Screen</Text>
      {isRecording ? (
        <Button title="Stop Recording" onPress={stopRecording} />
      ) : (
        <Button title="Start Recording" onPress={startRecording} />
      )}
      <Button
        title="View Recordings"
        onPress={() => navigation.navigate('AudioPlayback')}
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
    fontWeight: "400",
    fontSize: 18,
  },
});