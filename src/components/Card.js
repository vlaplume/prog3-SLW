import React, { Component } from "react";
import { Text, View, TouchableOpacity, StyleSheet, ScrollView } from 'react-native';

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
        if (this.props.post.likes.includes(auth.currentUser.email)) {
            this.setState({
                liked: true
            })
        }
    }

    borrarPosteo(id) {
        db.collection("posts")
            .doc(id)
            .delete()
    }

    likear() {

        console.log(this.props.post.likes.length)


        console.log(this.props)

        db.collection('posts').doc(this.props.id).update({
            likes: firebase.firestore.FieldValue.arrayUnion(auth.currentUser.email)
        })
            .then(() => {

                console.log('pruebaa')
                this.setState({
                    liked: true,
                    contador: this.props.post.likes.length

                })
            })
    }

    dislikear() {

        db.collection("posts").doc(this.props.id).update({
            likes: firebase.firestore.FieldValue.arrayRemove(auth.currentUser.email)
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
            <ScrollView>
                <View style={styles.card}>
                    <Text style={styles.title}>{this.props.post.title}</Text>
                    <Text style={styles.description}>{this.props.post.description}</Text>
                    <Text style={styles.owner}>{this.props.post.owner}</Text>
                    <Text style={styles.date}>{this.convertirAFecha(this.props.post.createdAt.seconds)}</Text>
                    {this.state.liked ? <TouchableOpacity style={styles.button} onPress={() => this.dislikear()}>
                        <Text>Me gusta</Text>
                    </TouchableOpacity> : <TouchableOpacity style={styles.button} onPress={() => this.likear()}>
                        <Text>Me gusta</Text>
                    </TouchableOpacity>}



                    {auth.currentUser.email === this.props.post.owner ? <TouchableOpacity
                        onPress={() => this.borrarPosteo(this.props.id)}
                    >
                        <Text style={styles.borrar}> Borrar posteo </Text>
                    </TouchableOpacity> : null}

                    <Text style={styles.likesCount} >Cantidad de likes: {this.state.contador}</Text>

                </View>
            </ScrollView>
        )
    }
};

export default Card;

const styles = StyleSheet.create({
    card: {
        flex: 1,
        backgroundColor: '#E6E6FA',
        borderRadius: 10,
        padding: 20,
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
    borrar: {
        backgroundColor: '#9370DB',
        padding: 5,
        borderRadius: 5,
        alignItems: 'center',
        marginBottom: 10,
    }
});