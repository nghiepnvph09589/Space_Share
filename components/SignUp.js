import React, { useState } from 'react';
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
    backgroundColor: '#474955',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 50,
    borderRadius: 75
  },
});

const SignUp = ({ navigation }) => {
  let [email, setEmail] = useState("");
  let [name, setName] = useState("");
  let [password, setPassword] = useState("");
  let [confirmPassword, setConfirmPassword] = useState("");
  let [isLoading, setIsloading] = useState(false)
  function handleChangeEmail(newValue) {
    setEmail(newValue);
  }
  function handleChangeName(newValue) {
    setName(newValue);
  }
  function handleChangePassword(newValue) {
    setPassword(newValue);
  }
  function handleChangeConfirmPassword(newValue) {
    setConfirmPassword(newValue);
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
        }>Create an Account</Text>
      <InputCom width="80%" isPass={false} place="email" src={require('../images/icon_email.png')} onChange={handleChangeEmail}></InputCom>
      <InputCom width="80%" isPass={false} place="Full name" src={require('../images/icon_email.png')} onChange={handleChangeName}></InputCom>
      <InputCom width="80%" isPass={true} place="password" src={require('../images/icon_password.png')} onChange={handleChangePassword}></InputCom>
      <InputCom width="80%" isPass={true} place="repeat password" src={require('../images/icon_password.png')} onChange={handleChangeConfirmPassword}></InputCom>
      <View style={[{ width: "80%", margin: 10 }]}>
        <Button
          title="Sign Up"
          color="#0ed289"
          hardwareAccelerated
          onPress={
            () => {
              if (password != confirmPassword) {
                Alert.alert("M???t kh???u kh??ng tr??ng kh???p!")
              }
              else if(email == "" || password == "" || confirmPassword == "" || name == "" ){
                Alert.alert("Kh??ng ???????c ????? tr???ng d??? li???u!")
              }
              else {
                LogBox.ignoreAllLogs(true)
                setIsloading(true)
                firebaseApp.auth().createUserWithEmailAndPassword(email, password).then((userCredentials) => {
                  userCredentials.user.updateProfile({
                    displayName: name
                  })
                  firebaseApp.database().ref('Users/' + email.split("@")[0]).set({
                    name: name,
                    avatar: ""
                  }, function (error) {
                    // Data saved successfully!
                    setIsloading(false)
                    ToastAndroid.show('????ng k?? th??nh c??ng!', ToastAndroid.SHORT);
                    navigation.navigate('Login')

                  });
                })
                  .catch(function (error) {
                    if (error.code === 'auth/email-already-in-use') {
                      Alert.alert('T??i kho???n ???? t???n t???i')
                      setIsloading(false)
                    }

                    else if (error.code === 'auth/invalid-email') {
                      Alert.alert('Kh??ng ????ng ?????nh d???ng email')
                      setIsloading(false)
                    }
                    else {
                      Alert.alert("????? d??i t???i thi???u c???a password l?? 6 k?? t???!")
                      setIsloading(false)
                    }
                  })
                  ;
              }

            }
          }
        />
      </View>
      <View style={{
        height: 150
      }}>
        <View style={{ flex: 1, flexDirection: "row", marginTop: 130 }}>
          <Text style={{ color: "white" }}>Already have an account? </Text>
          <Text style={{ color: 'cyan', textDecorationLine: "underline" }} onPress={() => { navigation.navigate("Login") }}>Login</Text>
        </View>
      </View>
      {/* <StatusBar style="auto" /> */}
    </View>
  );
};

export default SignUp;