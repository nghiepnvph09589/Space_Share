import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, LogBox, BackHandler, Button } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Spinner from 'react-native-loading-spinner-overlay';
import { useNavigation } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons';
import NewsScreen from './NewsScreen'
import UserScreen from './UserScreen'
import Login from './Login';
import { firebaseApp } from './FirebaseConfig';


export default function TempPost(props) {
    let navigation = useNavigation()
    useEffect(() => {
      navigation.navigate("Post", {
        user: props.user
      })
    })
    return (
       <View>
          
       </View>
    )
}
