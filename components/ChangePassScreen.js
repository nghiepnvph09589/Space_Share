import React, { useState } from 'react'
import { View, Text, Image, StyleSheet, TextInput, Dimensions, ScrollView, Button, Alert, LogBox, ToastAndroid } from 'react-native'
import { firebaseApp, storage } from './FirebaseConfig'
import Spinner from 'react-native-loading-spinner-overlay';
import InputCom from './InputCom'
export default function ChangePassScreen({navigation}) {
    let [password, setPassword] = useState("");
    let [confirmPassword, setConfirmPassword] = useState("");
    let [isLoading, setIsloading] = useState(false)
    function handleChangePassword(newValue) {
        setPassword(newValue);
    }
    function handleChangeConfirmPassword(newValue) {
        setConfirmPassword(newValue);
    }
    return (
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <Spinner
            visible={isLoading}
            textStyle={{ color: '#FFF' }}
        />
        <Text>Vui lòng nhập mật khẩu mới!</Text>
        <InputCom width="80%" place="password" isPass={true} src={require('../images/icon_password.png')} onChange={handleChangePassword}></InputCom>
        <InputCom width="80%" place="password" isPass={true} src={require('../images/icon_password.png')} onChange={handleChangeConfirmPassword}></InputCom>
        <View style={[{ width: "80%", margin: 10, alignSelf: 'center' }]}>
            <Button

                title="Confirm"
                color="#0ed289"
                hardwareAccelerated
                onPress={
                    () => {
                        setIsloading(true)
                      if(password != confirmPassword){
                          setIsloading(false)
                          Alert.alert("Mật khẩu không khớp, vui lòng nhập lại chính xác mật khẩu!")
                      }
                      else{
                        firebaseApp.auth().currentUser.updatePassword(password).then(async () => {
                            setIsloading(false)
                            await ToastAndroid.show('Thay đổi mật khẩu thành công! Vui lòng đăng nhập lại!', ToastAndroid.SHORT);
                            await firebaseApp.auth().signOut();
                            navigation.navigate("Login")
                        }).catch(e => {
                            setIsloading(false)
                            Alert.alert("Sai định dạng mật khẩu, mật khẩu tối thiểu có 6 ký tự!")
                        })
                      }
                    }
                }
            />
        </View>
    </View>
    )
}
