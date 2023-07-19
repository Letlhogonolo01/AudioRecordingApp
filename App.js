import React from "react";
import { Provider } from "react-redux";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import LoginScreen from "./screens/LoginScreen";
import RegistrationScreen from "./screens/RegistrationScreen";
import AsyncStorage from "@react-native-async-storage/async-storage";
import Loader from "./components/Loader";
import AudioRecordingScreen from "./screens/AudioRecordingScreen";
import AudioPlaybackScreen from "./screens/AudioPlaybackScreen";
import store from "./redux/store";

const Stack = createNativeStackNavigator();

const App = () => {
  const [initialRouteName, setInitialRouteName] = React.useState("");

  React.useEffect(() => {
    setTimeout(() => {
      authUser();
    }, 1000);
  }, []);

  const authUser = async () => {
    try {
      let userData = await AsyncStorage.getItem("userData");
      if (userData) {
        userData = JSON.parse(userData);
        if (userData.loggedIn) {
          setInitialRouteName("AudioRecording");
        } else {
          setInitialRouteName("LoginScreen");
        }
      } else {
        setInitialRouteName("RegistrationScreen");
      }
    } catch (error) {
      setInitialRouteName("RegistrationScreen");
    } 
  };

  // return (
  //   <Provider store={store}>
  //     <NavigationContainer>
  //     {!initialRouteName ? (
  //         <Loader visible={true} />
  //       ) : (
  //         <>
  //       <Stack.Navigator 
  //          initialRouteName={initialRouteName}
  //          screenOptions={{ headerShown: true }}
  //       >
  //         <Stack.Screen name="AudioRecording" component={AudioRecordingScreen} />
  //         <Stack.Screen name="AudioPlayback" component={AudioPlaybackScreen} />
  //       </Stack.Navigator>
  //       </>
  //       )}
  //     </NavigationContainer>
  //   </Provider>
  // );
  return (
    <Provider store={store}>
      <NavigationContainer>
        {!initialRouteName ? (
          <Loader visible={true} />
        ) : (
          <>
            <Stack.Navigator
              initialRouteName={initialRouteName}
              screenOptions={{ headerShown: true }}
            >
              <Stack.Screen
                name="RegistrationScreen"
                component={RegistrationScreen}
              />
              <Stack.Screen 
              name="LoginScreen" 
              component={LoginScreen} 
              />
              <Stack.Screen
                name="AudioRecording"
                component={AudioRecordingScreen}
              />
              <Stack.Screen
                name="AudioPlayback"
                component={AudioPlaybackScreen}
              />
            </Stack.Navigator>
          </>
        )}
      </NavigationContainer>
    </Provider>
  );
};

export default App;
