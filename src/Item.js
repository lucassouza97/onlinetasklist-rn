import React, { Component } from 'react'
import { Text, View, StyleSheet, TouchableHighlight, Button, TouchableOpacity } from 'react-native'

export default class Item extends Component {


    constructor(props){
        super(props);
        this.state={
            done:(this.props.data.done=='1')? styles.done : styles.undone
        };
        this.mark = this.mark.bind(this);
        this.excluir = this.excluir.bind(this);
    }

    mark(){
        let s = this.state;
        let done = 'sim';

        if(s.done == styles.undone) {
            s.done = styles.done;  
            done = 'sim';
        }else {
            s.done = styles.undone;
            done = 'nao';
        }

        fetch(this.props.url+'/'+this.props.data.id,  {
            method:'PUT',
            headers:{
              'Accept':'application/json',
              'Content-Type':'application/json'
            },
            body:JSON.stringify({
              done:done
            })
      })
    
            .then((r)=>r.json())
            .then((json)=>{})

        this.setState(s);
    }

    excluir(){

        fetch(this.props.url+'/'+this.props.data.id,  {
            method:'DELETE',
            headers:{
              'Accept':'application/json',
              'Content-Type':'application/json'
            }
      })
    
            .then((r)=>r.json())
            .then((json)=>{
                alert("Item excluído com sucesso!");
                this.props.loadFunction();
            })
    }


    render() {
        return (
            <View style={styles.area}>
                <TouchableHighlight style={[styles.markArea, this.state.done]} onPress={this.mark}>
                    <View>

                    </View>
                </TouchableHighlight>
                <Text style={styles.styleText}>{this.props.data.item}</Text>
                {/* <Button style={styles.botao}title="X" onPress={this.excluir}/> */}
                <TouchableOpacity onPress={this.excluir}>
                    <Text style={styles.excluirButton}>Excluir </Text>
                </TouchableOpacity>
                  
            </View>      
        )
    }
}

const styles = StyleSheet.create({
    area:{
        paddingTop:10,
        paddingBottom: 10,
        borderBottomWidth: 1,
        borderColor: '#CCCCCC',
        flex:1,
        flexDirection: 'row',
        alignItems: 'center'
    },
    markArea:{
        width:25,
        height:25,
        backgroundColor: '#CCCCCC',
        marginRight: 10,
        marginLeft: 10
    },
    undone:{
        backgroundColor:'#CCCCCC' 
    },
    done:{
        backgroundColor: 'black'
    },
    botao:{
        width: 15,
        height: 15,
        marginRight: 10
        
    },
    excluirButton:{
    paddingLeft: 10,
    fontSize: 10,
    color: 'red'
    },

    styleText:{
        justifyContent:'center',
        alignItems: 'center',
        flex:1
    }
})


