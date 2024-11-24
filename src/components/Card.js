import React, { Component } from "react";
import { Text, View, TouchableOpacity, TextInput, StyleSheet } from 'react-native';

import { auth, db } from "../firebase/config";
import firebase from "firebase";

class Card extends Component {
    constructor(props) {
        super(props);
        this.state = {
            liked: false,
            contador: this.props.post.likes.length
        }
    }

    componentDidMount() {
        if(this.props.post.likes.includes(auth.currentUser.email)){
            this.setState({
                like: true
            })
        }
    }

    likear() {
        db.collection('post').doc(this.props.post.id).update({
            likes: firebase.firestore.FieldValue.arrayUnion(this.props.post.owner)
        })
            .then(() => this.setState({
                like: true,
                contador: this.props.post.likes.length

            }))
    }

    dislikear() {

        db.collection("post").doc(this.props.post.id).update({
            likes: firebase.firestore.FieldValue.arrayRemove(this.props.post.owner)
        })
            .then(() => this.setState({
                like: false,
                contador: this.props.post.likes.length

            }))
    }

    // Convertir a timestamp
    convertirAFecha(segundos) {
        let fecha;

        if (segundos) {
            fecha = new Date(segundos * 1000).toLocaleString();
        }

        return fecha;
    }

    render() {
        return (
            <View>
                <Text>{this.props.post.title}</Text>
                <Text>{this.props.post.description}</Text>
                <Text>{this.props.post.owner}</Text>
                <Text>{this.convertirAFecha(this.props.post.createdAt.seconds)}</Text>
                {this.state.like ? <TouchableOpacity onPress={() => this.dislikear()}>
                    <Text>Dislike</Text>
                </TouchableOpacity> : <TouchableOpacity onPress={() => this.likear()}>
                    <Text>Like</Text>
                </TouchableOpacity>}
                <Text>Cantidad de likes: {this.state.contador}</Text>

            </View>
        )
    }
};

export default Card;

const styles = StyleSheet.create({});