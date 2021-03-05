import React, { useEffect, useState } from 'react';
import { View, Text, Image, Dimensions, StyleSheet, TextInput, Button } from 'react-native'
import { Ionicons } from '@expo/vector-icons';
import { ScrollView, TouchableOpacity } from 'react-native-gesture-handler';
import MaterialIcon from '@expo/vector-icons/MaterialIcons';
import { useNavigation } from '@react-navigation/native';
import { firebaseApp, storage } from './FirebaseConfig'
const styles = StyleSheet.create({
    textAreaContainer: {
        borderColor: "gray",
        borderWidth: 1,
        padding: 20,
        backgroundColor: "white", borderRadius: 40, flex: 1
    },
    textArea: {
        height: 10, textAlignVertical: "top", fontSize: 20, color: "black"
    }
})
export default function ReplaceUserScreen(props) {
    const navigation = useNavigation();
    return (
        <View style={{ flex: 1, alignItems: 'center', backgroundColor:"#333542" }}>
            <View style={{ width: "100%", height: 300, backgroundColor: "#333542" }}>
                <View style={{ flex: 1, flexDirection: "row", justifyContent: "space-between", alignItems: "center" }}>
                    <View style={{ flex: 2, justifyContent: "center", alignItems: "center" }}>
                        {
                            props.user.photoURL == null ?
                                <Image style={{ margin: 20, width: 100, height: 100, borderWidth: 2, borderColor: "white", borderRadius: 50 }} source={require('../images/icon_account.png')} ></Image>
                                : <Image style={{ margin: 20, width: 100, height: 100, borderWidth: 2, borderColor: "white", borderRadius: 50 }}
                                    source={{ uri: props.user.providerData[0].photoURL }} ></Image>
                        }

                    </View>
                    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
                        <Text style={{ fontSize: 30 ,color:"white"}}>{props.postCount}</Text>
                        <Text style={{color:"white"}}>Post</Text>
                    </View>
                    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
                        <Text style={{ fontSize: 30,color:"white" }}>{props.totalLike}</Text>
                        <Text style={{color:"white"}}>Like</Text>
                    </View>
                    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
                        <TouchableOpacity onPress={() => {
                            navigation.navigate('EditProfile', {
                                user: props.user
                            })
                        }}>
                            <Ionicons name="settings" size={40} color="cyan" />
                        </TouchableOpacity>
                    </View>
                </View>
                <Text style={{ marginBottom: 20, marginLeft: 30, fontSize: 23, fontWeight: "bold" ,color:"cyan"}}>{props.user.providerData[0].displayName}</Text>
                <View style={{ height: 60, paddingHorizontal: 10 }}>
                    <View style={styles.textAreaContainer} >
                        <Text onPress={() => {
                            navigation.navigate('Post', {
                                user: props.user
                            })
                        }}>Bạn đang nghĩ gì?</Text>
                    </View>
                </View>
                <View style={{ flex: 0.5, flexDirection: "row", justifyContent: "space-between", alignItems: "center" }}>

                    <View style={{ flex: 1, justifyContent: "center", alignItems: "center", borderColor: "white", borderWidth: 1, marginLeft: 20, borderRadius: 5, marginRight: 5 }}>
                        <TouchableOpacity onPress={() => {
                            navigation.navigate("TimelineScreen", {
                                user: props.user,
                                nav: navigation
                            })
                        }}>
                            <Text style={{ fontSize: 15 ,color:"white"}}>Dòng thời gian</Text>
                        </TouchableOpacity>
                    </View>
                    <View style={{ flex: 1, justifyContent: "center", alignItems: "center", borderColor: "white", borderWidth: 1, marginRight: 20, borderRadius: 5, marginLeft: 5 }}>
                        <TouchableOpacity onPress={
                            () => {
                                navigation.navigate("ConfirmPassword", {
                                    user: props.user
                                })
                            }
                        }>
                            <Text style={{ fontSize: 15 ,color:"white"}}>Đổi mật khẩu</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
            <View style={{width:"100%"}}>
                {
                    props.user.photoURL == null ? <View></View>:
                    <Image style={{ width: "100%", height: 300 }} source={{ uri: props.user.providerData[0].photoURL }}></Image>
                }
           
            </View>
            <View style={[{ width: "80%", margin: 10, alignSelf: 'center' }]}>
                    <Button

                        title="Log out"
                        color="#0ed289"
                        hardwareAccelerated
                        onPress={
                            async () => {
                                await firebaseApp.auth().signOut();
                                navigation.navigate("Login")
                            }
                        }
                    />
                </View>
        </View>
    )
}
