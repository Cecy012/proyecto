
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Login from './components/auth/screens/Login';

import HomeProfile from './components/auth/screens/HomeProfile';
const Stack = createNativeStackNavigator();
export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{headerShown: false}}>
        <Stack.Screen name= "Login" component={Login} /> 
        <Stack.Screen name= "HomeProfile" component={HomeProfile} /> 
      </Stack.Navigator>
    </NavigationContainer>
  );
}


