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
            <View style={styles.card}>
                <Text style={styles.title}>{this.props.post.title}</Text>
                <Text style={styles.description}>{this.props.post.description}</Text>
                <Text style={styles.owner}>{this.props.post.owner}</Text>
                <Text style={styles.date}>{this.convertirAFecha(this.props.post.createdAt.seconds)}</Text>
                {this.state.like ? <TouchableOpacity  style={styles.button} onPress={() => this.dislikear()}>
                    <Text>Dislike</Text>
                </TouchableOpacity> : <TouchableOpacity style={styles.button} onPress={() => this.likear()}>
                    <Text>Me gusta</Text>
                </TouchableOpacity>}
                <Text style={styles.likesCount} >Cantidad de likes: {this.state.contador}</Text>

            </View>
        )
    }
};

export default Card;

const styles = StyleSheet.create({
    card: {
        backgroundColor: '#E6E6FA',
        borderRadius: 10,
        padding: 15,
        marginVertical: 10,
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5, 
    },
    title: {
        fontSize: 18,
        fontWeight: 'bold',
        color: 'black', 
    },
    description: {
        fontSize: 16,
        color: '#333',
        marginVertical: 5,
    },
    owner: {
        fontSize: 14,
        color: '#6A1B9A', 
        marginBottom: 5,
    },
    date: {
        fontSize: 12,
        color: '#666',
        marginBottom: 10,
    },
    button: {
        backgroundColor: '#9370DB', 
        padding: 10,
        borderRadius: 5,
        alignItems: 'center',
        marginBottom: 10,
    },
    buttonText: {
        color: '#FFFFFF', 
        fontSize: 16,
    },
    likesCount: {
        fontSize: 14,
        color: '#333',
    },
});