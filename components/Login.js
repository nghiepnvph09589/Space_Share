import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Button, Image, Alert, ToastAndroid, LogBox } from 'react-native';
import InputCom from './InputCom'
import { firebaseApp } from './FirebaseConfig'
import Spinner from 'react-native-loading-spinner-overlay';
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#333542',
    alignItems: 'center',
    justifyContent: 'center',
  },
  circle: {
    width: 150,
    height: 150,
    backgroundColor: 'gray',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 50,
    borderRadius: 75
  },
});

const Login = ({ navigation }) => {
  useEffect(() => {
    LogBox.ignoreAllLogs(true)
    setEmail("")
    setPassword("")
  }, [])
  let [email, setEmail] = useState("");
  let [password, setPassword] = useState("");
  let [isLoading, setIsloading] = useState(false)
  function handleChangeEmail(newValue) {
    setEmail(newValue);
  }
  function handleChangePassword(newValue) {
    setPassword(newValue);
  }
  return (
    <View style={styles.container}>

      <Spinner
        visible={isLoading}
        textStyle={{ color: '#FFF' }}
      />
      <Text
        style={
          {
            color: "white",
            fontSize: 30,
            marginBottom: 80
          }
        }>Welcome</Text>
      <View style={styles.circle}>
        <Image source={require('../images/ss.png')} style={{ width: 125, height: 125 }}></Image>

      </View>
      <InputCom width="80%" place="email" isPass={false} src={require('../images/icon_email.png')} onChange={handleChangeEmail}></InputCom>
      <InputCom width="80%" place="password" isPass={true} src={require('../images/icon_password.png')} onChange={handleChangePassword}></InputCom>
      <View style={[{ width: "80%", margin: 10 }]}>
        <Button

          title="Sign In"
          color="#0ed289"
          hardwareAccelerated
          onPress={
            () => {
              setIsloading(true)
              firebaseApp.auth().signInWithEmailAndPassword(email, password).then(() => {
                setIsloading(false)
                ToastAndroid.show('Đăng nhập thành công! Xin chào ' + firebaseApp.auth().currentUser.providerData[0].displayName, ToastAndroid.SHORT);
                navigation.navigate('MainScreen', {
                  reload: 1
                })
              }).catch(function (error) {
                setIsloading(false)
                Alert.alert('Thông tin đăng nhập không đúng')
              });

            }
          }
        />
      </View>
      <View style={{
        height: 150
      }}>
        <View style={{ flex: 1, flexDirection: "row", marginTop: 130 }}>
          <Text style={{ color: "white" }}>Don't have an account? </Text>
          <Text style={{ color: 'cyan', textDecorationLine: "underline" }} onPress={() => { navigation.navigate("SignUp") }}>Create one</Text>
        </View>
      </View>
      {/* <StatusBar style="auto" /> */}
    </View>
  );
};

export default Login;