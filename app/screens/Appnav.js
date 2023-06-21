import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import WelcomesScreen from './WelcomesScreen';
import LoginScreen from './LoginScreen';
import SignupScreen from './SignupScreen';
import Homepage from './Homepage';
import VerificationScreen from './VerificationScreen';


function Appnav(props) {

    const Stack = createNativeStackNavigator();

  return (
    <NavigationContainer>
    <Stack.Navigator>
    
      <Stack.Screen name="Welcome Screen" component={WelcomesScreen} options={{
        headerShown:false
      }}/>
      <Stack.Screen name="Signup" component={SignupScreen} options={{
        headerShown:false
      }}/>
      
      <Stack.Screen name="Login" component={LoginScreen} options={{
        headerShown:false
      }}/>
      <Stack.Screen name="Homepage" component={Homepage} options={{
        headerShown:false
      }}/>
      <Stack.Screen name="verifypage" component={VerificationScreen} options={{
        headerShown:false
      }}/>
    </Stack.Navigator>
  </NavigationContainer>
  );
}


export default Appnav;