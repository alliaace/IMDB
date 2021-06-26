import axios from 'axios'
import React from 'react'
import { useState } from 'react'
import { Image, ScrollView, Text, TextInput, TouchableOpacity, View, StyleSheet } from 'react-native'

export default function Home({ navigation }) {

    const [movieTitle, setMovieTitle] = useState('forest')
    const [resData, setResData] = useState([])
    const handleSearch = () => {
        axios.get(`https://www.omdbapi.com/?s=${movieTitle}&apikey=54816d00`)
            .then((res) => setResData(res.data.Search))
            .catch((err) => alert(err))
    }

    return (
        <ScrollView contentContainerStyle={styles.main}>
            <View style={{ flexDirection: 'row' }}>

                <TextInput placeholder="Movie Title?" style={styles.input} onChangeText={(val) => setMovieTitle(val)} />
                <TouchableOpacity style={styles.searchButton}
                    onPress={() => handleSearch()}
                >
                    <Text style={{ color: "white" }}>Search</Text>
                </TouchableOpacity>
            </View>
            {typeof resData == 'undefined' ? <Text>No Record found</Text> : resData?.map((x) =>
                <View style={styles.cardMain}  >
                    <TouchableOpacity style={styles.cardTouchProp}
                        onPress={() => navigation.navigate("Detail", x.imdbID)}
                    >

                        <Image source={{ uri: x.Poster }} style={{ height: "70%", width: "30%" }} />
                        <View style={{ marginLeft: 10, overflow: "scroll" }}>
                            <Text style={{ fontSize: 26, fontWeight: "bold" }}>{x.Title}</Text>
                            <View style={{ width: "100%", height: 1, borderBottomWidth: 0.5, marginVertical: 10 }}></View>
                            <Text style={{ fontSize: 18 }}>{x.Year}</Text>
                            <Text style={{ fontSize: 18 }}>{x.Type}</Text>
                        </View>
                    </TouchableOpacity >
                </View>

            )}

        </ScrollView>
    );

}
const styles = StyleSheet.create({
    main: {
        flexGrow: 1, alignItems: 'center', paddingVertical: 10, paddingHorizontal: 10
    },
    input: {
        width: '75%', height: 40, borderWidth: 0.5
    },
    searchButton: {
        width: "20%", backgroundColor: "red", marginLeft: 5, justifyContent: "center", alignItems: "center"
    },
    cardMain: {
        height: 250, backgroundColor: "rgba(0,0,0,0.2)", width: '97%', marginTop: 10, justifyContent: "center", paddingHorizontal: 10
    },
    cardTouchProp: {
        flexDirection: "row", height: "100%", width: "100%", alignItems: "center",
    }
})