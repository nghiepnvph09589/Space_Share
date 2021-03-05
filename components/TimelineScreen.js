import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, LogBox, BackHandler, Button, FlatList , Image} from 'react-native';
import Spinner from 'react-native-loading-spinner-overlay';
import { firebaseApp } from './FirebaseConfig';
import ListItem from './ListItem'
import {
    Menu,
    MenuOptions,
    MenuOption,
    MenuTrigger,
  } from 'react-native-popup-menu';
export default function TimelineScreen({ route }) {
    let [data, setData] = useState(null)
    let { user , nav} = route.params
    let [isLoading, setIsloading] = useState(false)
    useEffect(() => {
        let arr = []
        setIsloading(true)
        firebaseApp.database().ref('Posts/').orderByChild("uid").equalTo(user.providerData[0].uid).on("child_added", function (snapshot) {
            setIsloading(false)
            let childData = snapshot.val()
            childData.id = snapshot.key
            arr.push(childData)
            console.log(childData);
        })
        arr.reverse()
        firebaseApp.database().ref('Users/').on('value', function (snapshot) {
            let array = []
            snapshot.forEach(function (childSnapshot) {
              let childData = childSnapshot.val();
              array.push({
                email: childSnapshot.key,
                name: childData.name,
                avatar: childData.avatar
              });
            });
            // console.log(array);
            array.forEach(e => {
              arr.map((item) => {
                if (item.uid.split("@")[0] == e.email) {
                  item.avatar = e.avatar
                  item.userName = e.name
                  return item
                }
                else {
                  return item
                }
              })
            })
            setIsloading(false)
            // console.log(arr);
  
            setData(arr)
          });
        // setData(arr)
    }, [])
    return (
        <View style={{ backgroundColor: '#333542' }}>
            <Spinner
                visible={isLoading}
                textStyle={{ color: '#FFF' }}
            />
             <View>
  </View>
            <FlatList
                data={data}
                renderItem={
                    ({ item }) => <ListItem item={item} user={firebaseApp.auth().currentUser} nav={nav} isEdit={true}></ListItem>
                }
            >
            </FlatList>

        </View>
    )
}
