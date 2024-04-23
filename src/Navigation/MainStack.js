import {createStackNavigator} from '@react-navigation/stack';
import {AddAmountScreen, HomeScreen} from '../screens';
import {NavigationContainer} from '@react-navigation/native';

const Stack = createStackNavigator();

export const MainStack = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{headerShown: false}}>
        <Stack.Screen name="HomeScreen" component={HomeScreen} />
        <Stack.Screen name="AddAmountScreen" component={AddAmountScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};