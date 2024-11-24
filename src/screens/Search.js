import React, { Component } from 'react';
import { View, Text, TextInput, FlatList } from 'react-native';

class Search extends Component {
    constructor(props) {
        super(props);
        this.state = {
            allUsers : [],
            users : null,
            username : ''
          };
    }
    componentDidMount() {
        db.collection("users").onSnapshot(doc => {
          let allUsers = [];
          doc.forEach(user => {
            console.log(user.data())
            allUsers.push(user)
          })
          this.setState({
            allUsers : allUsers
          })
        })
      }
    
      buscarUser() {
        let users = this.state.allUsers.filter(user => {
          return user.data().Username.includes(this.state.username)
        })
          this.setState({
            users : users
          })
      }
    
      componentDidUpdate(prevProps, prevState) {
        if (prevState.username !== this.state.username) {
          console.log("Buscando...")
          this.buscarUser();
        }
      }
    render() {
        return (
            <View>
                <Text>Buscar por usuario</Text>
        <TextInput
          style=''
          keyboardType='default'
          placeholder='Ingrse el nombre de usuario'
          onChangeText={text => this.setState({ username: text })}
          value={this.state.username}
        />
        <Text>Resultados de búsqueda</Text>
        {
          this.state.username !== '' ?
            this.state.users === null ?
              <Text>Cargando...</Text> :
              this.state.users.length === 0 ?
                <Text>No hay usuarios</Text> :
                <FlatList
                  data={this.state.users}
                  renderItem={({ item }) => <Text>{item.data().Username}</Text>}
                  keyExtractor={item => item.id}
                />
            : null
        }
            </View>
        )
    }
}

export default Search;
