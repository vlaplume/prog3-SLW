// Formulario de creación del posteo
import React, { Component } from 'react';
import { View, Text } from 'react-native';
import { db } from '../firebase/config';

class NewPost extends Component {
    constructor(props) {
        super(props);
        this.state = {  };
    }

    createPost() {
        db.collection("posts").add({
            title: "Titulo del post",
            description: "Descripción del post",
            image: "https://via.placeholder.com/150",
            owner: ""
        })
    }

    render() {
        return (
            <View>
                <Text>NewPost</Text>
            </View>
        )
    }
}

export default NewPost;