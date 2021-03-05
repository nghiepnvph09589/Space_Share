import React, { useState, useEffect } from 'react';
import { View, Text, Image, StyleSheet, TextInput, Dimensions, ScrollView, Button, Alert, LogBox, ToastAndroid } from 'react-native'
import MaterialIcon from '@expo/vector-icons/MaterialIcons';
import { Ionicons } from '@expo/vector-icons';
import { TouchableOpacity } from 'react-native-gesture-handler';
import * as ImagePicker from 'expo-image-picker';
import Spinner from 'react-native-loading-spinner-overlay';
import Constants from 'expo-constants';
import { firebaseApp, storage } from './FirebaseConfig'
import InputCom from './InputCom'
export default function EditPost({ route, navigation }) {
    let [content, setContent] = useState("")
    let { id } = route.params
    let [isLoading, setIsloading] = useState(false)
    function handleChangeContent(newValue) {
        setContent(newValue);
    }
    return (
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: '#333542' }}>
            <Spinner
                visible={isLoading}
                textStyle={{ color: '#FFF' }}
            />
            <Text style={{ color: "white" }}>Nội dung cần thay đổi</Text>
            <InputCom width="80%" place="Status..." isPass={false} src={require('../images/icon_comment.png')} onChange={handleChangeContent}></InputCom>
            <View style={[{ width: "80%", margin: 10, alignSelf: 'center' }]}>
                <Button

                    title="Update"
                    color="#0ed289"
                    hardwareAccelerated
                    onPress={
                        () => {
                            if (content == "") {
                                Alert.alert("Chưa nhập Status mới!")
                            }
                            else {
                                setIsloading(true)
                                firebaseApp.database().ref('Posts/' + id).update({ status: content }).then(() => {
                                    setIsloading(false)
                                    navigation.navigate("MainScreen", {
                                        reload: 1
                                    })
                                })
                            }
                        }
                    }
                />
            </View>
        </View>
    )
}
