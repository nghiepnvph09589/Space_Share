import React, { useState, useEffect } from 'react';
import { View, Text, Image, Dimensions, LogBox, Share } from 'react-native'
import { Ionicons } from '@expo/vector-icons';
import { FlatList, ScrollView, TouchableOpacity } from 'react-native-gesture-handler';
import Spinner from 'react-native-loading-spinner-overlay';
import MaterialIcon from '@expo/vector-icons/MaterialIcons';
import { firebaseApp, storage } from './FirebaseConfig'
import ListItem from './ListItem'
const NewsScreen = (props) => {
    // let [data, setData] = useState(null);
    let [users, setUsers] = useState(null);
    useEffect(
        () => {
            LogBox.ignoreAllLogs(true)


        }, []
    )


    return (
        <View style={{ backgroundColor: '#333542' }}>
            <FlatList
                data={props.data}
                renderItem={
                    ({ item }) => <ListItem item={item} user={firebaseApp.auth().currentUser} nav={props.nav} isEdit={false}></ListItem>
                }
            >

            </FlatList>

        </View>
    );
};

export default NewsScreen;