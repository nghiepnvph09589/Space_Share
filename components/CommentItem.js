import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, LogBox, BackHandler,Image } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Spinner from 'react-native-loading-spinner-overlay';
import { Ionicons } from '@expo/vector-icons';
import NewsScreen from './NewsScreen'
import UserScreen from './UserScreen'
import Login from './Login';
import { firebaseApp } from './FirebaseConfig';
import TempPost from './TempPost'
import { TouchableOpacity } from 'react-native-gesture-handler';
export default function CommentItem(props) {
   
    function removeItem() {
        firebaseApp.database().ref('Comments/'+props.item.ID).remove()
        firebaseApp.database().ref('Posts/'+props.item.PostID).update({commentCount:eval(props.commentCount -1)}).then(() => {})
            props.removeData()
    }
    return (
        <View style={{ width: "100%" }}>
            <View style={{ flex: 1, flexDirection: "row", padding: 5, marginVertical: 10 }}>
                {
                    props.item.avatar == null ? <Image source={require('../images/icon_account.png')} style={{ width: 50, height: 50, borderRadius: 25, borderWidth: 1, borderColor: "#ccc", margin: 10 }}></Image> :
                    <Image source={{uri:props.item.avatar}} style={{ width: 50, height: 50, borderRadius: 25, borderWidth: 1, borderColor: "#ccc", margin: 10 }}></Image>
                }
                <View style={{ width: 300, backgroundColor: "white", borderRadius: 5, alignSelf: "baseline" }}>
                   <View style={{flex:1}}>
                   <Text style={{ padding: 5, color: "black", fontSize: 18 }}>{props.item.commentContent}</Text>
                   </View>
                    <View style={{flex:0.1, flexDirection:"row"}}>
                    <Text style={{ padding: 5 }}>{props.item.time.split(" ")[1] + " " + props.item.time.split(" ")[2]+" " +props.item.time.split(" ")[4] }</Text>
                   {
                       props.currentUid == props.item.uid ?  <Text onPress={removeItem} style={{ padding: 5 , color:"red"}} >Delete</Text>: <View></View>
                   }
                    </View>
                  
                </View>
            </View>
        </View>
    )
}
