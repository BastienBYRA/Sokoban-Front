import {SafeAreaView, Text, TextInput, View, StyleSheet} from "react-native";
import React from "react";

const Admin = () => {

    const [ligneOne, setLigneOne] = React.useState('');
    const [ligneTwo, setLigneTwo] = React.useState('');
    const [ligneThree, setLigneThree] = React.useState('');


    return (
        <View>
            <Text>créer un niveau</Text>

            <SafeAreaView>
                <TextInput
                    style={styles.input}
                    setLigneOne={setLigneOne}
                    value={ligneOne}
                />
                <TextInput
                    style={styles.input}
                    setLigneTwo={setLigneTwo}
                    value={ligneTwo}
                    placeholder="placer votre blocs"

                /><TextInput
                    style={styles.input}
                    setLigneThree={setLigneThree}
                    value={ligneThree}
                    placeholder="placer votre blocs"

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