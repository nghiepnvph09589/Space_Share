import React, { useState, useEffect } from 'react';
import { View, Text, Image, StyleSheet, TextInput, Dimensions, ScrollView, Button, Alert, LogBox, ToastAndroid } from 'react-native'
import MaterialIcon from '@expo/vector-icons/MaterialIcons';
import { Ionicons } from '@expo/vector-icons';
import { TouchableOpacity } from 'react-native-gesture-handler';
import * as ImagePicker from 'expo-image-picker';
import Spinner from 'react-native-loading-spinner-overlay';
import Constants from 'expo-constants';
import { firebaseApp, storage } from './FirebaseConfig'

const styles = StyleSheet.create({
    textAreaContainer: {
        borderColor: "gray",
        borderWidth: 1,
        padding: 20,
        backgroundColor: "white", borderRadius: 5, flex: 1
    },
    textArea: {
        height: 150, textAlignVertical: "top", fontSize: 20, color: "black"
    }
})

const PostScreen = ({ route, navigation }) => {
    useEffect(() => {

        (async () => {
            if (Platform.OS !== 'web') {
                const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
                if (status !== 'granted') {
                    alert('Sorry, we need camera roll permissions to make this work!');
                }
            }
        })();


    }, []);
    const [image, setImage] = useState(null);
    const [height, setHeight] = useState(null);
    let [isLoading, setIsloading] = useState(false)
    let [status, setStatus] = useState("")
    let { user } = route.params
    const pickImage = async () => {
        let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.All,
            allowsEditing: true,
            aspect: [3, 4],
            quality: 0.6,
        });

        console.log(result);
        // console.log(result.uri.split("ImagePicker")[1].split("/")[1]);
        if (!result.cancelled) {
            setImage(result.uri);
            let h = Dimensions.get('window').width / (result.width / result.height)
            setHeight(h)
        }
    };
    const uploadImage = async (uri, imageName) => {
        const res = await fetch(uri);
        const blob = await res.blob();
        let ref = storage.ref().child('images/' + user.providerData[0].uid + '/' + imageName)
        return ref.put(blob);
    }

    return (
        <ScrollView style={{ width: Dimensions.get('window').width, backgroundColor: "#474955" }}>
            <Spinner
                visible={isLoading}
                textStyle={{ color: '#FFF' }}
            />
            <View style={{ flex: 1, justifyContent: 'flex-start', alignItems: 'stretch', backgroundColor: "#474955" }}>
                <View style={{ height: 200 }}>
                    <View style={{ flex: 1, flexDirection: "row", justifyContent: "flex-start", alignItems: 'center' }}>
                        {
                            user.photoURL == null ? <Image style={{ margin: 20, width: 80, height: 80, borderWidth: 2, borderColor: "white", borderRadius: 2 }}
                                source={require('../images/icon_account.png')} ></Image> : <Image style={{ margin: 20, width: 80, height: 80, borderWidth: 2, borderColor: "white", borderRadius: 2 }}
                                    source={{ uri: user.providerData[0].photoURL }} ></Image>
                        }

                        <Text style={{ color: "white", fontSize: 20 }}>{user.providerData[0].displayName}</Text>
                    </View>
                </View>
                <View style={{ height: 150 }}>
                    <View style={styles.textAreaContainer} >
                        <TextInput
                            style={styles.textArea}
                            underlineColorAndroid="transparent"
                            placeholder="Bạn đang nghĩ gì?"
                            placeholderTextColor="grey"
                            numberOfLines={10}
                            multiline={true}
                            onChangeText={(text) => { setStatus(text) }}
                        />
                    </View>
                </View>
                <View style={{ height: height, marginTop: 20 }}
                >
                    <View style={{ flex: 1, alignItems: "stretch", justifyContent: "center" }}>
                        <Image style={{ height: height }} source={{ uri: image }}></Image>
                    </View>
                </View>
                <View style={{ height: 80, marginVertical: 20, borderTopWidth: 2, borderTopColor: "white", borderBottomColor: "white", borderBottomWidth: 2 }}>

                    <View style={{ paddingLeft: 20, flex: 1, alignItems: "center", justifyContent: "flex-start", flexDirection: "row" }}>
                        <TouchableOpacity onPress={pickImage}>
                            <Ionicons name='ios-images-outline' size={30} color="white" />
                        </TouchableOpacity>
                        <Text style={{ color: "white", marginHorizontal: 20 }}>Thêm ảnh</Text>
                    </View>
                </View>

                {/* <View style={[{ width: "80%", margin: 10, alignSelf: "center" }]}> */}
                <Button

                    title="Post"
                    color="#0ed289"
                    hardwareAccelerated
                    onPress={
                        () => {
                            LogBox.ignoreAllLogs(true)
                            // firebaseApp.database().ref('Posts/').on('value', function    (snapshot) {
                            //     console.log(snapshot.val())
                            // });
                            if (image == null && status == "") {

                            }
                            else {
                                setIsloading(true)
                                if (image != null) {
                                    uploadImage(image, image.split("ImagePicker")[1].split("/")[1]).then(async () => {
                                        setIsloading(false)
                                        const ref = storage.ref('images/' + user.providerData[0].uid + '/' + image.split("ImagePicker")[1].split("/")[1]);
                                        const url = await ref.getDownloadURL();
                                        firebaseApp.database().ref('Posts/' + Date.now()).set({
                                            photoURL: url,
                                            status: status,
                                            likeCount: 0,
                                            commentCount: 0,
                                            time: Date(),
                                            uid: user.providerData[0].uid,
                                            userName: user.providerData[0].displayName,
                                            avatar: user.photoURL,
                                            liked: JSON.stringify([])
                                        }, function (error) {

                                            if (error) {
                                                // The write failed...
                                                setIsloading(false)
                                                alert('Loi')
                                            } else {
                                                // Data saved successfully!
                                                setIsloading(false)
                                                navigation.navigate("MainScreen", {
                                                    reload: 1
                                                })
                                            }
                                        });
                                    }).catch((e) => {
                                        console.log(e);
                                    })
                                }
                                else {
                                    firebaseApp.database().ref('Posts/' + Date.now()).set({
                                        photoURL: null,
                                        status: status,
                                        likeCount: 0,
                                        commentCount: 0,
                                        time: Date(),
                                        uid: user.providerData[0].uid,
                                        userName: user.providerData[0].displayName,
                                        avatar: user.photoURL,
                                        liked: JSON.stringify([])
                                    }, function (error) {

                                        if (error) {
                                            setIsloading(false)
                                            // The write failed...
                                            alert('Loi')
                                        } else {
                                            setIsloading(false)
                                            // Data saved successfully!
                                            navigation.navigate("MainScreen", {
                                                reload: 1
                                            })
                                        }
                                    });
                                }
                            }


                        }
                    }
                />
                {/* </View> */}
            </View>
        </ScrollView>

    );

};

export default PostScreen;
