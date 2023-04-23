import {SafeAreaView, Text, TextInput, View, StyleSheet} from "react-native";
import React from "react";

const Admin = () => {
    const url = 'https://sokoban-back.herokuapp.com'

    const [ligneOne, setLigneOne] = React.useState('');
    const [ligneTwo, setLigneTwo] = React.useState('');
    const [ligneThree, setLigneThree] = React.useState('');
    const [ligneFour, setLigneFour] = React.useState('');
    const [ligneFive, setLigneFive] = React.useState('');
    const [boardTitle, setBoardTitle] = React.useState('');

    const payload = {
        ligneOne,
        ligneTwo,
        ligneThree,
        ligneFour,
        ligneFive,
        boardTitle
    }
    const data = new FormData();
    data.append("json", JSON.stringify({payload}));

    const newBoard = () => {
        fetch(url + '/newBoard', {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: data
        })
            .then(response => response.json)
            .catch((error) => {
                    console.error(error)
                }
            )
    }

    return (
        <View>
            <Text>créer un niveau</Text>
            <SafeAreaView>
                <TextInput
                    style={styles.input}
                    setLigneOne={setBoardTitle}
                    value={boardTitle}
                    placeholder="Titre"
                />
                <TextInput
                    style={styles.input}
                    setLigneOne={setLigneOne}
                    value={ligneOne}
                    placeholder="placer vos blocs"
                />
                <TextInput
                    style={styles.input}
                    setLigneTwo={setLigneTwo}
                    value={ligneTwo}
                    placeholder="placer vos blocs"
                />
                <TextInput
                    style={styles.input}
                    setLigneThree={setLigneThree}
                    value={ligneThree}
                    placeholder="placer vos blocs"
                />
                <TextInput
                    style={styles.input}
                    setLigneFour={setLigneFour}
                    value={ligneFour}
                    placeholder="placer vos blocs"
                />
                <TextInput
                    style={styles.input}
                    setLigneFive={setLigneFive}
                    value={ligneFive}
                    placeholder="placer vos blocs"
                />
            </SafeAreaView>
        </View>
    )
};

const styles = StyleSheet.create({
    input: {
        height: 40,
        margin: 12,
        borderWidth: 1,
        padding: 10,
    },
});

export default Admin;