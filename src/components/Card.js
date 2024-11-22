import React, { Component } from "react";
import { Text, View, TouchableOpacity, TextInput, StyleSheet } from 'react-native';

import { auth, db } from "../firebase/config";
import firebase from "firebase";

class Card extends Component {
    constructor(props) {
        super(props);
        this.state = {
            liked: false,
        }
    }

    componentDidMount() {
        // string que tiene que estar dentro del array de likes para considerar que likeo el posteo
        // array
        this.props.post.likes.map(like => {
            if (like === auth.currentUser.email) {
                this.setState({ liked: true })
            }
        })
    }

    likear() {
        this.setState({ liked: !this.state.liked })

        db.collection("post").doc(this.props.post.id.toLocaleString()).update({
            likes : this.state.liked ? firebase.firestore.FieldValue.arrayRemove(auth.currentUser.email) : firebase.firestore.FieldValue.arrayUnion(auth.currentUser.email)
        })
            .then(() => {
                console.log("Listo")
            })
            .catch(err => {
                console.log(err)
            })

        // db.collection("posts").where("id", "==", this.props.post.id).onSnapshot(snapshot => {
        //    snapshot.forEach(doc => {
        //     console.log(doc.data())
        //    })
        // });
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
        return(
            <View>
                <Text>{this.props.post.title}</Text>
                <Text>{this.props.post.description}</Text>
                <Text>{this.props.post.owner}</Text>
                <Text>{this.props.post.likes.length} likes</Text>
                <Text>{this.convertirAFecha(this.props.post.createdAt.seconds)}</Text>
                <TouchableOpacity onPress={() => this.likear()}>
                    <Text>{this.state.liked ? "Dislike" : "Like"}</Text>
                </TouchableOpacity>
            </View>
        )
    }
};

export default Card;

const styles = StyleSheet.create({});