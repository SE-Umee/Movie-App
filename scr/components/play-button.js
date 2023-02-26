import { StyleSheet, Text, View, TouchableOpacity } from 'react-native'
import React from 'react'
import Icon from 'react-native-vector-icons/Ionicons';
import { clearWarnings } from 'react-native/Libraries/LogBox/Data/LogBoxData';

const PlayButton = ({ handelPress }) => {
    return (
        <TouchableOpacity
            style={styles.button}
            onPress={() => {
                handelPress()

            }}>
            <Icon name="caret-forward-outline" size={30} color="#fff" />
        </TouchableOpacity>
    )
}

export default PlayButton

const styles = StyleSheet.create({
    button: {
        backgroundColor: "#4481FC",
        alignContent: 'center',
        justifyContent: 'center',
        padding: 10,
        width: 50,
        borderRadius: 50
    },
})