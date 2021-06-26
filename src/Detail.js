import axios from 'axios'
import React from 'react'
import { useEffect, useState } from 'react'
import { Image, ScrollView, Text, View } from 'react-native'
import { TouchableOpacity } from 'react-native-gesture-handler'

export default function Detail({ route }) {

    const [data, setData] = useState([])
    const [isVisible, setIsVisible] = useState(false)


    useEffect(() => {

        axios.get(`https://www.omdbapi.com/?apikey=54816d00&i=${route.params}`)
            .then((res) => setData(res.data))
            .catch((err) => alert(err))

    }, [])

    var x = data
    return (
        <View style={{ flex: 1, backgroundColor: "rgba(0,0,0,0.2)", paddingHorizontal: 10 }} >
            <Image source={{ uri: x.Poster }} style={{ height: "30%", width: "100%", marginVertical: 10 }} resizeMode="stretch" />
            <ScrollView>
                <Text style={{ fontSize: 26, color: "black" }}>Title: {x.Title}</Text>
                <View style={{ width: "100%", height: 1, borderBottomWidth: 0.5, marginVertical: 10 }}></View>
                <Text style={{ fontSize: 18 }}>Year: {x.Year}</Text>
                <Text style={{ fontSize: 18 }}>Genre: {x.Genre}</Text>
                <Text style={{ fontSize: 18 }}>Released: {x.Released}</Text>
                <Text style={{ fontSize: 18 }}>Runtime: {x.Runtime}</Text>
                <Text style={{ fontSize: 18 }}>imdbRating: {x.imdbRating}</Text>
                {!isVisible &&
                    <TouchableOpacity onPress={() => setIsVisible(!isVisible)}>
                        <Text style={{ fontSize: 18, color: "blue" }}>More...</Text>

                    </TouchableOpacity>
                }
                {isVisible &&
                    <View>
                        <Text style={{ fontSize: 18 }}>Director: {x.Director}</Text>
                        <Text style={{ fontSize: 18 }}>Writer: {x.Writer}</Text>
                        <Text style={{ fontSize: 18 }}>Actor: {x.Actors}</Text>
                        <Text style={{ fontSize: 18 }}>Language: {x.Language}</Text>
                        <Text style={{ fontSize: 18 }}>Plot: {x.Plot}</Text>
                        <Text style={{ fontSize: 18 }}>Country: {x.Country}</Text>
                        <Text style={{ fontSize: 18 }}>Awards: {x.Awards}</Text>
                        <View style={{ width: "100%", height: 1, borderBottomWidth: 0.5, marginVertical: 10 }}></View>
                        {x.Ratings.map((y) =>
                            <View>

                                <Text style={{ fontSize: 18 }}>Source: {y.Source}</Text>
                                <Text style={{ fontSize: 18 }}>Value: {y.Value}</Text>
                            </View>

                        )}
                        <View style={{ width: "100%", height: 1, borderBottomWidth: 0.5, marginVertical: 10 }}></View>


                    </View>
                }
            </ScrollView>
        </View>
    )

}
