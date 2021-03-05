import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Text, View , Image} from 'react-native';

import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator, HeaderTitle } from '@react-navigation/stack';
import Login from './components/Login'
import MainScreen from './components/MainScreen'
import SignUp from './components/SignUp'
import PostScreen from './components/PostScreen'
import EditProfile from './components/EditProfile'
import ConfirmPassword from './components/ConfirmPassword'
import ChangePassScreen from './components/ChangePassScreen'
import TimelineScreen from './components/TimelineScreen'
import CommentScreen from './components/CommentScreen'
import ReplaceUserScreen from './components/ReplaceUserScreen'
import EditPost from './components/EditPost'
import { MenuProvider } from 'react-native-popup-menu';
const RootStack = createStackNavigator();
function LogoTitle() {
  return (
    <Image
      style={{ width: 125, height: 25 }}
      source={require('./images/sst.png')}
    />
  );
}
export default function App() {
  return (
    <MenuProvider>
    <NavigationContainer>
      <RootStack.Navigator  >
      <RootStack.Screen options={{headerShown:false}} name="Login" component={Login} />
      <RootStack.Screen name="Post" component={PostScreen} options={{headerStyle:{backgroundColor:"#D965D9"}, headerTitleStyle:{color:"white"}}}/>
      <RootStack.Screen name="MainScreen" component={MainScreen}  options={{headerStyle:{backgroundColor:"#D965D9"}, headerTitleStyle:{color:"white"}, headerTitle:props => <LogoTitle {...props} />}} />
      <RootStack.Screen  name="EditProfile" component={EditProfile} />
      <RootStack.Screen  name="CommentScreen" component={CommentScreen} />
      <RootStack.Screen  name="ConfirmPassword" component={ConfirmPassword} />
      <RootStack.Screen  name="ChangePassScreen" component={ChangePassScreen} />
      <RootStack.Screen  name="TimelineScreen" component={TimelineScreen} />
      <RootStack.Screen  name="EditPost" component={EditPost} />
      <RootStack.Screen options={{headerShown:false}} name="SignUp" component={SignUp} />
    </RootStack.Navigator>
  </NavigationContainer>
    </MenuProvider>

  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
