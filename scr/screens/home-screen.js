import React, { useState, useEffect } from 'react'
import { StyleSheet, View, Dimensions, ScrollView, ActivityIndicator } from 'react-native';
import {
    getFamilyMovies,
    getPopularMovies,
    getPopularTV,
    getRomanticMovies,
    getUpcomingMovies,
} from '../services/services';
import { SliderBox } from "react-native-image-slider-box";
import MovieList from '../components/movie-list';
import Error from '../components/error';

const dimensions = Dimensions.get('screen');
const HomeScreen = () => {
    const [movieImages, setMovieImages] = useState("");
    const [popularMovies, setPopularMovies] = useState();
    const [popularTVShow, setPopularTVShow] = useState();
    const [familyMovies, setFamilyMovies] = useState();
    const [romanticMovies, setRomanticMovies] = useState();
    const [error, setError] = useState(false);
    const [activityIndicator, setActivityIndicator] = useState(false);
    let moviesImagesArray = [];


    const UpcomingMovies = () => {
        getUpcomingMovies().then(movies => {
            movies.forEach(movie => {
                moviesImagesArray.push(
                    "https://image.tmdb.org/t/p/w500" + movie.poster_path
                );
            });
            setMovieImages(moviesImagesArray)
            setActivityIndicator(true)
        }).catch(() => {
            setError(true);
        })
    }

    const PopularMovies = () => {
        getPopularMovies().then(movies => {
            setPopularMovies(movies)
            setActivityIndicator(true)
        }).catch(e => {
            setError(e);
        })
    }

    const PopularTVShow = () => {
        getPopularTV().then(movies => {
            setPopularTVShow(movies)
            setActivityIndicator(true)
        }).catch(e => {
            setError(e);
        })
    }
    const FamilyMovies = () => {
        getFamilyMovies().then(movies => {
            setFamilyMovies(movies)
            setActivityIndicator(true)
        }).catch(e => {
            setError(e);
        })
    }
    const RomanticMovies = () => {
        getRomanticMovies().then(movies => {
            setRomanticMovies(movies)
            setActivityIndicator(true)
        }).catch(e => {
            setError(e);
        })
    }
    useEffect(() => {
        PopularMovies()
        UpcomingMovies()
        PopularTVShow()
        FamilyMovies()
        RomanticMovies()

    }, [])

    return (
        <View style={{ flex: 1 }}>
            {activityIndicator && !error && (
                <ScrollView
                    showsVerticalScrollIndicator={false}
                >
                    <View style={styles.mainSliderContainer}>
                        <SliderBox
                            images={movieImages}
                            autoplay
                            circleLoop
                            sliderBoxHeight={dimensions.height / 1.5}
                            dotStyle={{ height: 0 }}
                        />
                    </View>
                    <View style={styles.carousel}>
                        <MovieList
                            content={popularMovies}
                            title={"Popular Movies"}
                        />
                    </View>
                    <View style={styles.carousel}>
                        <MovieList
                            content={popularTVShow}
                            title={"Popular TV Shows"}
                        />
                    </View>
                    <View style={styles.carousel}>
                        <MovieList
                            content={familyMovies}
                            title={"Family Movies"}
                        />
                    </View>
                    <View style={styles.carousel}>
                        <MovieList
                            content={romanticMovies}
                            title={"Romantic Movies"}
                        />
                    </View>
                </ScrollView>
            )}
            {!activityIndicator && (
                <ActivityIndicator size="large" />
            )}
            {error && <Error />}
        </View>
    );
}
const styles = StyleSheet.create({
    mainSliderContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    carousel: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    }
})

export default HomeScreen;