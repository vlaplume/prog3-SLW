import React, { Component } from 'react';
import { View, Text, TextInput, FlatList, StyleSheet } from 'react-native';
import { db } from "../firebase/config";

class Search extends Component {
  constructor(props) {
    super(props);
    this.state = {
      allUsers: [],
      users: null,
      username: ''
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
        allUsers: allUsers
      })
    })
  }

  buscarUser() {
    let users = this.state.allUsers.filter(user => {
      return user.data().Username.includes(this.state.username)
    })
    this.setState({
      users: users
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
      <View style={styles.container}>
        <Text>Buscar por usuario</Text>
        <TextInput
          style={styles.input}

          keyboardType='default'
          placeholder='Ingrese el nombre de usuario'
          onChangeText={text => this.setState({ username: text })}
          value={this.state.username}
        />
        <Text style={styles.resultsHeader}>Resultados de búsqueda</Text>
        {
          this.state.username !== '' ?
            this.state.users === null ?
              <Text style={styles.loadingText}>Cargando...</Text> :
              this.state.users.length === 0 ?
                <Text style={styles.noResultsText}>No hay usuarios</Text> :
                <FlatList
                  data={this.state.users}
                  renderItem={({ item }) => <Text style={styles.userItem}>{item.data().Username}</Text>}
                  keyExtractor={item => item.id}
                />
            : null
        }
      </View>
    )
  }
}

export default Search;


const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: "#E6E6FA",
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#6A1B9A',
    marginBottom: 20,
  },
  input: {
    height: 40,
    borderColor: '#6200EA',
    borderWidth: 1,
    borderRadius: 5,
    paddingHorizontal: 10,
    marginBottom: 20,
  },
  resultsHeader: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 10,
  },
  loadingText: {
    fontSize: 16,
    color: '#333',
  },
  noResultsText: {
    fontSize: 16,
    color: '#666',
    textAlign: 'center',
    marginTop: 20,
  },
  userItem: {
    fontSize: 16,
    color: '#6A1B9A',
    paddingVertical: 10,
  },
});