import React, {useContext} from 'react';
import {Text, View} from 'react-native';

import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import { Provider } from "react-redux";
import HomeScreen from '../screens/HomeScreen';
import LoginScreen from '../screens/LoginScreen';
import RegisterScreen from '../screens/RegisterScreen';
import AudioRecordingScreen from '../screens/AudioRecordingScreen';
import AudioPlaybackScreen from '../screens/AudioPlaybackScreen';
import {AuthContext} from '../context/AuthContext';
import SplashScreen from '../screens/SplashScreen';
import store from '../redux/store';

const Stack = createNativeStackNavigator();

const Navigation = () => {
  const {userInfo, splashLoading} = useContext(AuthContext);

  return (
    <Provider store={store}>
    <NavigationContainer>
      <Stack.Navigator>
        {splashLoading ? (
          <Stack.Screen
            name="Splash Screen"
            component={SplashScreen}
            options={{headerShown: false}}
          />
        ) : userInfo.access_token ? (
          <Stack.Screen name="Home" component={HomeScreen} />
        ) : (
          <>
            <Stack.Screen
              name="Login"
              component={LoginScreen}
              options={{headerShown: false}}
            />
            <Stack.Screen
              name="Register"
              component={RegisterScreen}
              options={{headerShown: false}}
            />
            <Stack.Screen
            name="AudioRecording"
            component={AudioRecordingScreen}
          />
          <Stack.Screen 
          name="AudioPlayback" 
          component={AudioPlaybackScreen} />
          </>
        )}
      </Stack.Navigator>
    </NavigationContainer>
    </Provider>
  );
};

export default Navigation;