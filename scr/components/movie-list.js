import { StyleSheet, Text, View, FlatList } from 'react-native'
import React from 'react'
import MovieCard from './movie-card'

const MovieList = ({ content, title }) => {
    return (
        <View style={styles.mainContainer}>
            <View>
                <Text style={styles.title}>{title}</Text>
            </View>
            <View>
                <FlatList
                    horizontal
                    showsHorizontalScrollIndicator={false}
                    data={content}
                    renderItem={({ item }) => (
                        <MovieCard
                            item={item}
                            title={title}
                        />
                    )}
                />
            </View>
        </View>
    )
}

export default MovieList

const styles = StyleSheet.create({
    mainContainer: {
        marginTop: '5%'
    },
    title: {
        fontSize: 20,
        fontWeight: 'bold',
        paddingBottom: '2%'
    },
})