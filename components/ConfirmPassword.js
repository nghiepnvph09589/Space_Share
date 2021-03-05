import React, { useState } from 'react'
import { View, Text, Image, StyleSheet, TextInput, Dimensions, ScrollView, Button, Alert, LogBox , ToastAndroid} from 'react-native'
import { firebaseApp, storage } from './FirebaseConfig'
import Spinner from 'react-native-loading-spinner-overlay';
import InputCom from './InputCom'
export default function ConfirmPassword({route, navigation}) {
    let [password, setPassword] = useState("");
    let [isLoading, setIsloading] = useState(false)
    let { user } = route.params
    function handleChangePassword(newValue) {
        setPassword(newValue);
        
    }

    return (
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center',backgroundColor: '#333542' }}>
            <Spinner
                visible={isLoading}
                textStyle={{ color: '#FFF' }}
            />
            <Text style={{color:"white"}}>Để bảo mật thông tin, vui lòng nhập lại mật khẩu!</Text>
            <InputCom width="80%" place="password" isPass={true} src={require('../images/icon_password.png')} onChange={handleChangePassword}></InputCom>
            <View style={[{ width: "80%", margin: 10, alignSelf: 'center' }]}>
                <Button

                    title="Confirm"
                    color="#0ed289"
                    hardwareAccelerated
                    onPress={
                        () => {
                            setIsloading(true)
                            firebaseApp.auth().signInWithEmailAndPassword(user.providerData[0].uid, password).then(
                                () => {
                                    setIsloading(false)
                                    // ToastAndroid.show('Đăng nhập thành công! Xin chào ' + firebaseApp.auth().currentUser.providerData[0].displayName, ToastAndroid.SHORT);
                                    navigation.navigate("ChangePassScreen")
                                }
                            ).catch(
                                (e) => {
                                    setIsloading(false)
                                    Alert.alert("Sai mật khẩu!")
                                }
                            )
                        }
                    }
                />
            </View>
        </View>
    )
}
