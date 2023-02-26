import {
    StyleSheet,
    Text,
    View,
    ScrollView,
    Image,
    Dimensions,
    ActivityIndicator,
    Modal,
    Pressable,
    SafeAreaView,
    Alert,
    TouchableOpacity
} from 'react-native'
import React, { useEffect, useState } from 'react'
import { getMoviesDetails, getTVDetails } from '../services/services';
import StarRating from 'react-native-star-rating';
import dateFormat from 'dateformat';
import PlayButton from '../components/play-button';
import VideoPlayer from 'react-native-video-player';


const PlaceholderImage = require("../assets/images/placeholder.jpg");
const height = Dimensions.get('screen').height;
const TVShow = "Popular TV Shows";
const MovieDetailsScreen = ({ route }) => {
    const { movieId, title } = route.params;
    const [movieDetail, setMovieDetail] = useState();
    const [activityIndicator, setActivityIndicator] = useState(false);
    const [modalVisible, setModalVisible] = useState(false);

    const getMoviesDetail = () => {
        {
            title != TVShow ? (
                getMoviesDetails(movieId).then(movies => {
                    setMovieDetail(movies)
                    setActivityIndicator(true)
                }).catch(e => {
                    setError(e);
                }))
                : (
                    getTVDetails(movieId).then(movies => {
                        setMovieDetail(movies)
                        setActivityIndicator(true)
                    }).catch(e => {
                        setError(e);
                    })
                )
        }
    }

    useEffect(() => {
        getMoviesDetail()
    }, [movieId])

    const videoShown = () => {
        setModalVisible(!modalVisible)
    }
    return (
        <View style={styles.mainContainer}>
            {activityIndicator && (
                <View>
                    <ScrollView>
                        <Image
                            style={styles.image}
                            resizeMode="cover"
                            source={
                                movieDetail.poster_path ?
                                    { uri: "https://image.tmdb.org/t/p/w500" + movieDetail.poster_path }
                                    : PlaceholderImage
                            }
                        />
                        <View>
                            <TouchableOpacity style={styles.playButton}
                                onPress={() => Alert.alert("....")}
                            >
                                <PlayButton handelPress={videoShown} />
                            </TouchableOpacity>
                            <View style={styles.titleView}>
                                {title != TVShow ?
                                    <Text style={styles.title}>{movieDetail.title}</Text>
                                    :
                                    <Text style={styles.title}>{movieDetail.original_name}</Text>
                                }
                            </View>
                            {movieDetail.genres && (
                                <View style={styles.genresView}>
                                    {movieDetail.genres.map(genre => {
                                        return (
                                            <Text
                                                key={genre.id}
                                                style={styles.genre}>
                                                {genre.name}
                                            </Text>
                                        )
                                    })}
                                </View>
                            )}
                            <View style={styles.starView}>
                                <StarRating
                                    disabled={true}
                                    maxStars={5}
                                    rating={movieDetail.vote_average / 2}
                                    fullStarColor={"gold"}
                                    starSize={30}
                                />
                            </View>
                            <View style={styles.genresView}>
                                <Text style={styles.overView}>{movieDetail.overview}</Text>
                            </View>
                            <View style={styles.genresView}>
                                <Text style={styles.releaseDateView}>{`Release Date : ${dateFormat(movieDetail.release_date, "mmmm dS ,yyyy")}`}</Text>
                            </View>
                        </View>
                    </ScrollView>
                    <Modal
                        animationType="slide"
                        visible={modalVisible}
                    >
                        <SafeAreaView>
                            <Pressable onPress={() =>
                                videoShown()

                            }>
                                <VideoPlayer
                                    onBack={() => {
                                        videoShown()
                                    }}
                                    video={{ uri: 'http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4' }}
                                    videoWidth={1600}
                                    videoHeight={1900}
                                    thumbnail={{ uri: 'https://i.picsum.photos/id/866/1600/900.jpg' }}
                                />
                            </Pressable>
                        </SafeAreaView>
                    </Modal>
                </View>
            )}
            {!activityIndicator && <ActivityIndicator size="large" />}
        </View>
    )
}

export default MovieDetailsScreen

const styles = StyleSheet.create({
    mainContainer: {
        flex: 1,
    },
    image: {
        height: height / 1.7,
    },
    titleView: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    title: {
        fontSize: 24,
        fontWeight: "bold",
        marginTop: '6%',
    },
    genresView: {
        flexDirection: 'row',
        alignSelf: 'center',
        marginTop: '2%'
    },
    genre: {
        marginRight: '3%',
        fontWeight: "bold"
    },
    overView: {
        padding: '3%'
    },
    releaseDateView: {
        fontWeight: 'bold'
    },
    starView: {
        alignSelf: 'center'
    },
    playButton: {
        position: "absolute",
        top: -25,
        right: 30
    },
    video: {
        flex: 1,
        position: 'absolute',
        top: 0,
        bottom: 0,
        left: 0,
        right: 0,
    },
})