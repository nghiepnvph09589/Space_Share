import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, LogBox, BackHandler, Image, Button, FlatList } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Spinner from 'react-native-loading-spinner-overlay';
import { Ionicons } from '@expo/vector-icons';
import NewsScreen from './NewsScreen'
import UserScreen from './UserScreen'
import Login from './Login';
import { firebaseApp } from './FirebaseConfig';
import TempPost from './TempPost'
import { ScrollView, TextInput, TouchableOpacity } from 'react-native-gesture-handler';
import CommentItem from './CommentItem'
import { set } from 'react-native-reanimated';
export default function CommentScreen({route}) {
    let {PostID, user, commentCount} = route.params
    let [commentContent, setCommentContent] = useState("")
    let [reload, setReload] = useState(null);
    let [data, setData] = useState(null)
    let [isLoading, setIsloading] = useState(false)
    let [ccount, setCcount] = useState(0)
    function removeData() {
       setReload(Date.now())
      }
    useEffect( () => {
        console.log("reloaded");
        let arr = []
        setIsloading(true)
         firebaseApp.database().ref('Comments/').orderByChild("PostID").equalTo(PostID).on("child_added", function (snapshot) {
            
            arr.push(snapshot.val())
           
        })

        setTimeout(() => {
            setIsloading(false)
            console.log(arr);
            setData(arr)
            setCcount(arr.length)
        },500)
       
    },[reload])
    return (
        <View style={{ flex: 1, alignItems: 'center', backgroundColor: "#474955", justifyContent: "space-between" }}>
                        <Spinner
                visible={isLoading}
                textStyle={{ color: '#FFF' }}
            />
            <View style={{flex:1}}>
            <FlatList
                data={data}
                renderItem={
                    ({ item }) => <CommentItem item={item} removeData={removeData} commentCount={ccount} currentUid={user.providerData[0].uid}></CommentItem>
                }
            >

            </FlatList>
            </View>
            <View style={{ paddingVertical: 5, flex: 0.08, backgroundColor: "#ccc", width: "100%", flexDirection: "row", justifyContent: "space-around" , alignItems:"center"}}>
                <TextInput onChangeText={(txt)=>{setCommentContent(txt)}} placeholder="Your Comment Here..." placeholderTextColor="white" style={{ width: 350, fontSize: 15 , paddingLeft:20}}></TextInput>
                <TouchableOpacity onPress={()=>{
                    // setIsloading(true)
                    if(commentContent == ""){

                    }
                    else{
                        let id = Date.now()
                        firebaseApp.database().ref('Comments/'+id).set({
                            commentContent: commentContent,
                            time: Date(),
                            userName: user.providerData[0].displayName,
                            avatar: user.photoURL,
                            PostID: PostID,
                            ID: id,
                            uid: user.providerData[0].uid
                        }, function (error) {
                            // setIsloading(false)
                            if (error) {
                                // setIsloading(false)
                                // The write failed...
                                alert('Loi')
                            } else {
                                let arr = []
                               
                                firebaseApp.database().ref('Comments/').orderByChild("PostID").equalTo(PostID).on("child_added", function (snapshot) {
                                    arr.push(snapshot.val())
                                })
                                firebaseApp.database().ref('Posts/'+PostID).update({commentCount:eval(ccount+1)}).then(() => {setCcount(ccount+1)})
                                console.log(arr);
                                setData(arr)
                            }
                        });
                    }
                }}>
                <Image source={require('../images/sent.png')} style={{ width: 30, height: 30,  marginHorizontal: 20, borderWidth:2, borderColor:"#ccc" }}></Image>
                </TouchableOpacity>
            </View>
        </View>


    )
}
