import { StyleSheet, Text, View, TouchableOpacity, Image } from 'react-native'
import React from 'react'
import { useNavigation } from '@react-navigation/native'

const PlaceholderImage = require("../assets/images/placeholder.jpg")
const MovieCard = ({ item, title }) => {
    const navigation = useNavigation();
    return (
        <TouchableOpacity
            onPress={() => navigation.navigate("DetailScreen", { movieId: item.id, title: title })}
            style={styles.mainContainer}>
            <Image
                style={styles.image}
                resizeMode="cover"
                source={
                    item.poster_path ?
                        { uri: "https://image.tmdb.org/t/p/w500" + item.poster_path }
                        : PlaceholderImage
                }
            />
            {!item.poster_path && (
                <Text style={styles.movieName}>{item.title}</Text>
            )}
        </TouchableOpacity>
    )
}

export default MovieCard

const styles = StyleSheet.create({
    mainContainer: {
        padding: 5,
        alignItems: 'center',
        position: 'relative',
        height: 200,
    },
    image: {
        height: 200,
        width: 120,
        borderRadius: 10
    },
    movieName: {
        position: 'absolute',
        width: 100,
        textAlign: "center",
        top: 10,
    },
})