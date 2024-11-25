// Formulario de creación del posteo
import React, { Component } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet } from 'react-native';
import { auth, db } from '../firebase/config';

class NewPost extends Component {
    constructor(props) {
        super(props);
        this.state = {
            title: "",
            description: "",
            error: ""
        };
    }

    createPost(title, description) {
        if (title === "" || description === "") {
            this.setState({
              error : "Debe completar todos los campos del registro."
            })
            return 
        }

        let cantidadPosteos;

        db.collection("post").onSnapshot(snapshot => {
            let posteos = [];
            snapshot.forEach(doc => {
                posteos.push(doc)
            })
            cantidadPosteos = posteos.length;
        })

        if (!cantidadPosteos) {
            cantidadPosteos = 0;
        }

        db.collection("posts").add({
            id: cantidadPosteos + 1,
            title: title,
            description: description,
            image: "https://via.placeholder.com/150", // imagen de dafult
            createdAt: new Date(), // la fecha del momento de creación
            owner: auth.currentUser.email, // email del dueño
            likes: []
        })
            .then(() => {
                this.props.navigation.navigate("Home");
            })
            .catch(err => {
                this.setState({
                    title : "",
                    description : "",
                    error : "Ocurrió un error"
                })
            })
    }

    render() {
        return (
            <View style={styles.container}>
                <Text style={styles.title}>Formulario NewPost</Text>

                <Text style={styles.label}>Título</Text>
                <TextInput style={styles.input}
                    keyboardType='default'
                    placeholder='Ingrse el título del posteo'
                    onChangeText={text => this.setState({ title: text })}
                    value={this.state.title} />

                <Text style={styles.label}>Description</Text>
                <TextInput style={styles.input}
                    keyboardType='default'
                    placeholder='Ingrse la descripción del posteo'
                    onChangeText={text => this.setState({ description: text })}
                    value={this.state.description} />

                <TouchableOpacity style={styles.button} onPress={() => {this.createPost(this.state.title, this.state.description)}}>
                    Agregar posteo
                </TouchableOpacity>

                <Text style={styles.error}>{this.state.error}</Text>
               
            
            </View>
        )
    }
}

export default NewPost;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
        backgroundColor: "#E6E6FA",
        justifyContent: 'center',
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        color: '#6A1B9A', 
        marginBottom: 20,
        textAlign: 'center',
    },
    label: {
        fontSize: 18,
        color: '#6A1B9A', 
        marginBottom: 5,
    },
    input: {
        height: 40,
        borderColor: '#6A1B9A', 
        borderWidth: 1,
        borderRadius: 5,
        paddingLeft: 10,
        marginBottom: 20,
    },
    button: {
        backgroundColor: "#9370DB",
        padding: 10,
        borderRadius: 5,
        alignItems: 'center',
    },
    buttonText: {
        color: '#FFFFFF', 
        fontSize: 16,
    },
    error: {
        color: 'red',
        textAlign: 'center',
        marginTop: 10,
    },
});