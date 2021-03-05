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
const UserScreen = (props) => {
    const navigation = useNavigation();
    return (
        <View style={{ flex: 1, justifyContent: 'flex-start', alignItems: 'stretch', backgroundColor: "#474955" }}>

            <View style={{ height: 100 }}>
                <View style={{ flex: 1, flexDirection: "row", justifyContent: "space-around", alignItems: 'center' }}>
                    <View style={{ flex: 1, flexDirection: "row", justifyContent: "flex-start", alignItems: "center", paddingLeft: 5 }}>
                        {
                            props.user.photoURL == null ? <Image style={{ margin: 20, width: 80, height: 80, borderWidth: 2, borderColor: "white", borderRadius: 2 }}
                                source={require('../images/icon_account.png')} ></Image> : <Image style={{ margin: 20, width: 80, height: 80, borderWidth: 2, borderColor: "white", borderRadius: 2 }}
                                    source={{ uri: props.user.providerData[0].photoURL }} ></Image>
                        }

                        <Text style={{ color: "white", fontSize: 20 }}>{props.user.providerData[0].displayName}</Text>
                    </View>

                    <View style={{ flex: 1, justifyContent: "flex-end", alignItems: "flex-end", paddingRight: 20 }}>
                        <TouchableOpacity onPress={() => {
                            navigation.navigate('EditProfile', {
                                user: props.user
                            })
                        }}>
                            <MaterialIcon name="settings" size={35} color="yellow" />
                        </TouchableOpacity>
                    </View>
                </View>

            </View>
            <Text>Post: {props.postCount}</Text>
            <Text>Like: {props.totalLike}</Text>
            {/* <Text> {totalLike}</Text> */}
            <View style={{ height: 60, paddingHorizontal: 10 }}>
                <View style={styles.textAreaContainer} >
                    <Text onPress={() => {
                        navigation.navigate('Post', {
                            user: props.user
                        })
                    }}>Bạn đang nghĩ gì?</Text>
                </View>
            </View>
            <View style={{ flex: 1, justifyContent: "flex-end" }}>
                <View style={[{ width: "80%", margin: 10, alignSelf: 'center' }]}>
                    <Button

                        title="Your Timeline"
                        color="#0ed289"
                        hardwareAccelerated
                        onPress={
                            () => {
                                navigation.navigate("TimelineScreen", {
                                    user: props.user,
                                    nav: navigation
                                })
                            }
                        }
                    />
                </View>
                <View style={[{ width: "80%", margin: 10, alignSelf: 'center' }]}>
                    <Button

                        title="Change password"
                        color="#0ed289"
                        hardwareAccelerated
                        onPress={
                            () => {
                                navigation.navigate("ConfirmPassword", {
                                    user: props.user
                                })
                            }
                        }
                    />
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

        </View>

    );
};

export default UserScreen;