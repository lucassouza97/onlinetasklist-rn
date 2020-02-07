import React, { Component } from 'react'
import { Text, View, StyleSheet, FlatList, TextInput, Button } from 'react-native'
import Item from './src/Item'


export default class App extends Component {

  constructor(props){
    super(props);
    this.state={
      lista:[],
      input:''
    };

    this.url = 'https://b7web.com.br/todo/44491';

      this.loadLista = this.loadLista.bind(this);
      this.addTarefa = this.addTarefa.bind(this);
    
      this.loadLista();
  }

  loadLista(){
    fetch (this.url) //get data

      .then((r)=> r.json())
      .then((json)=>{
            let state = this.state;
            state.lista = json.todo;
            this.setState(state);
      });
  }

  addTarefa(){
    let texto = this.state.input;
    let state = this.state;
    state.input = '';
    this.setState(state);
    

    fetch(this.url,  {
        method:'POST',
        headers:{
          'Accept':'application/json',
          'Content-Type':'application/json'
        },
        body:JSON.stringify({
          item:texto
        })
  })

        .then((r)=>r.json())
        .then((json)=>{
          alert("Item inserido com sucesso!");
          this.loadLista();
        })
  }

  render() {
    return (
      <View style={styles.container}>
        <View style={styles.inputArea}>
          <Text style={styles.addTexto}>Adicionar tarefa:</Text>
             <TextInput style={styles.input} onChangeText={(text)=>{
               let s = this.state;
               s.input = text;
               this.setState(s);
             }} value={this.state.input} />
             <Button title="Adicionar" onPress={this.addTarefa}/>
        </View>
        <FlatList 
            data={this.state.lista} 
            renderItem={({item}) => <Item data={item} url={this.url} loadFunction={this.loadLista}/>} //index.toString()
            keyExtractor={(item,index) => item.id}/> 
      </View>
    )
  }
}

const styles=StyleSheet.create({
    container:{
      marginTop: 10,
      flex:1
    },
    inputArea:{
      marginBottom: 20,
      backgroundColor: '#DDDDDD',
    },
    input:{
      height: 38,
      backgroundColor: 'white',
      marginLeft: 20,
      marginRight: 20,
      paddingLeft: 10,
      paddingRight: 10,
      marginBottom: 8
    },
    addTexto:{
      fontSize: 16,
      textAlign: 'center',
      marginBottom: 10,
      paddingTop: 10
    }
})
