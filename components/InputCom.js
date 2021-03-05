import React, { Component } from 'react';
import { View, Text, TextInput, Image, Button } from 'react-native';

export default function InputCom(props) {
    function handleChange(txt) {
        props.onChange(txt)
    }
    return (
        <View style={
            {
                margin: 10,
                width: props.width,
                padding: 10,
                height: 60,
                backgroundColor: "#474955",
            }
        }>
            <View
                style={{
                    flex: 1,
                    flexDirection: "row"
                }}>
                <Image
                    source={
                        props.src
                    }
                    style={
                        {
                            width: 40,
                            height: 40
                        }

                    }></Image>
                <TextInput
                    onChangeText={handleChange}
                    placeholder={props.place}
                    placeholderTextColor="cyan"
                    secureTextEntry={props.isPass}
                    style={
                        {
                            padding: 10,
                            color: "cyan",
                            width:"90%"
                        }
                    }
                ></TextInput>
            </View>
        </View>
    );
}