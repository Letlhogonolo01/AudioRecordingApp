import React from "react";
import { Provider } from "react-redux";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import AudioRecordingScreen from './screens/AudioRecordingScreen';
import AudioPlaybackScreen from './screens/AudioPlaybackScreen';
import store from "./redux/store";

const Stack = createStackNavigator();

export default function App() {
  return (
    <Provider store={store}>
      <NavigationContainer>
        <Stack.Navigator initialRouteName="AudioRecording">
          <Stack.Screen
            name="AudioRecording"
            component={AudioRecordingScreen}
          />
          <Stack.Screen name="AudioPlayback" component={AudioPlaybackScreen} />
        </Stack.Navigator>
      </NavigationContainer>
    </Provider>
  );
}
