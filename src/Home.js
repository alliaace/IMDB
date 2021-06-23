import axios from 'axios'
import React, { Component } from 'react'
import { Image, ImageBackground, ScrollView, Text, TextInput, TouchableOpacity, View } from 'react-native'

export default class Home extends Component {
    constructor(props) {
        super(props)
        this.state = {
            movieTitle: 'forest',
            resData: []
        }
    }
    handleSearch = () => {
        axios.get(`https://www.omdbapi.com/?s=${this.state.movieTitle}&apikey=54816d00`)
            .then((res) => this.setState({ resData: res.data.Search }))
            .catch((err) => alert(err))
    }
    render() {
        return (
            <ScrollView contentContainerStyle={{ flexGrow: 1, alignItems: 'center', paddingVertical: 10, paddingHorizontal: 10 }}>
                <View style={{ flexDirection: 'row' }}>

                    <TextInput placeholder="Movie Title?" style={{ width: '75%', height: 40, borderWidth: 0.5 }} onChangeText={(val) => this.setState({ movieTitle: val })} />
                    <TouchableOpacity style={{ width: "20%", backgroundColor: "red", marginLeft: 5, justifyContent: "center", alignItems: "center" }}
                        onPress={() => this.handleSearch()}
                    >
                        <Text style={{ color: "white" }}>Search</Text>
                    </TouchableOpacity>
                </View>
                {this.state.resData === [] ? <Text>No Record found</Text> : this.state.resData?.map((x) =>
                    <View style={{ height: 250, backgroundColor: "rgba(0,0,0,0.2)", width: '97%', marginTop: 10, justifyContent: "center", paddingHorizontal: 10 }}  >
                        <TouchableOpacity style={{ flexDirection: "row", height: "100%", width: "100%", alignItems: "center", }}
                            onPress={() => this.props.navigation.navigate("Detail", x.imdbID)}
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
}
