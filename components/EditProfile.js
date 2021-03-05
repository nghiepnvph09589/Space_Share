import React, { useState, useEffect } from 'react';
import { View, Text, Image, StyleSheet, TextInput, Dimensions, ScrollView, Button, Alert, LogBox } from 'react-native'
import MaterialIcon from '@expo/vector-icons/MaterialIcons';
import { Ionicons } from '@expo/vector-icons';
import { TouchableOpacity } from 'react-native-gesture-handler';
import * as ImagePicker from 'expo-image-picker';
import Spinner from 'react-native-loading-spinner-overlay';
import Constants from 'expo-constants';
import { firebaseApp, storage } from './FirebaseConfig'
import InputCom from './InputCom'
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
const EditProfile = ({ route, navigation }) => {
    let [isLoading, setIsloading] = useState(false)
    let { user } = route.params
    let [name, setName] = useState("");
    let [phone, setPhone] = useState("");
    let [password, setPassword] = useState("");
    const [image, setImage] = useState(null);
    const [height, setHeight] = useState(null);
    const pickImage = async () => {
        let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.All,
            allowsEditing: true,
            aspect: [4, 4],
            quality: 0.2,
        });

        console.log(result);

        if (!result.cancelled) {
            setImage(result.uri);
            let h = Dimensions.get('window').width / (result.width / result.height)
            setHeight(h)
        }
    };
    const uploadImage = async (uri, imageName) => {

        const res = await fetch(uri);
        const blob = await res.blob();
        let ref = storage.ref().child('avatars/' + imageName)
        return ref.put(blob);
    }
    useEffect(() => {
        console.log(user);

        (async () => {
            if (Platform.OS !== 'web') {
                const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
                if (status !== 'granted') {
                    alert('Sorry, we need camera roll permissions to make this work!');
                }
            }
        })();
        setName(user.providerData[0].displayName)

    }, []);
    function handleChangeName(newValue) {
        setName(newValue);
    }
    function handleChangePhone(newValue) {
        setPhone(newValue);
    }
    return (
        <View style={styles.container}>
            <Spinner
                visible={isLoading}
                textStyle={{ color: '#FFF' }}
            />
            <View style={{ width: 200, height: 200 }}>
                {image == null ? <Image source={{ uri: user.providerData[0].photoURL }} style={{ position: "absolute", width: 200, height: 200, borderRadius: 100, borderWidth: 2, borderColor: "cyan" }}></Image> : <Image source={{ uri: image }} style={{ width: 200, height: 200, borderRadius: 100, borderWidth: 2, borderColor: "cyan" }}></Image>}

                <View style={{ position: "absolute", top: 85, left: 85 }}>
                    <TouchableOpacity onPress={pickImage}>
                        <Ionicons name='ios-images-outline' size={30} color="white" />
                    </TouchableOpacity>
                </View>
            </View>


            <InputCom width="80%" place="Full Name" isPass={false} src={require('../images/icon_email.png')} onChange={handleChangeName}></InputCom>
            <InputCom width="80%" place="Phone Number" isPass={false} src={require('../images/icon_password.png')} onChange={handleChangePhone}></InputCom>


            <View style={[{ width: "80%", margin: 10 }]}>
                <Button

                    title="Change"
                    color="#0ed289"
                    hardwareAccelerated
                    onPress={
                        () => {
                            LogBox.ignoreAllLogs(true)
                            setIsloading(true)
                            if (image != null) {
                                uploadImage(image, user.providerData[0].uid + "-avatar").then(async () => {
                                    const ref = storage.ref('avatars/' + user.providerData[0].uid + "-avatar");
                                    const url = await ref.getDownloadURL();
                                    console.log(url);
                                    user.updateProfile({
                                        displayName: name,
                                        photoURL: url,
                                        phoneNumber: phone
                                    }).then(function () {
                                        firebaseApp.database().ref('Users/' + user.providerData[0].uid.split("@")[0]).set({
                                            name: name,
                                            avatar: url
                                        }, function (error) {
                                            setIsloading(false)
                                            navigation.navigate("MainScreen", { reload: 1 })
                                        });

                                        // Update successful.
                                    })

                                }).catch((e) => {
                                    setIsloading(false)
                                    console.log(e);
                                })
                            }
                            else {
                                user.updateProfile({
                                    displayName: name,
                                    phoneNumber: phone
                                }).then(function () {
                                    firebaseApp.database().ref('Users/' + user.providerData[0].uid.split("@")[0]).set({
                                        name: name,
                                        avatar: user.providerData[0].photoURL
                                    }, function (error) {
                                        setIsloading(false)
                                        navigation.navigate("MainScreen", { reload: 1 })
                                    });
                                }).catch((e) => {
                                    setIsloading(false)
                                    console.log(e);
                                })
                            }
                        }
                    }
                />
            </View>

        </View>

    );
};

export default EditProfile;