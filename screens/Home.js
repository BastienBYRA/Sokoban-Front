import { StatusBar } from 'expo-status-bar';
import { useEffect, useState } from 'react';
import { FlatList, StyleSheet, Text, View } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
// import localhost from 'react-native-localhost';

export default function Home({ navigation }) {
    const [board, setBoard] = useState(null);
    //Mettre SON IP ADDRESS
    const url = 'http://192.168.160.58:8000'

    useEffect(() => {
        getAllBoards();
    }, []);

    getAllBoards = async () => {
        //METTRE SON IP
        fetch(url + "/board")
            .then((response) => response.json())
            .then((data) => {
                // Use the data from the server here
                setBoard(data)

            })
            .catch((error) => {
                // Handle any errors that occur
                console.error(error);
            });
    
    }

  return (
    <View>
    {/* <Text>{localhost}</Text> */}
        {board != null &&
            <FlatList
                data={board}
                renderItem={({ item }) => (
                    <View
                        style={{
                            flex: 1,
                            flexDirection: 'column',
                            justifyContent: 'center',
                            alignItems: 'center',
                            margin: 1
                        }}>
                        <TouchableOpacity
                        onPress={() => navigation.navigate('Board', {id: item.id, nbCol: item.nbCol, nbRow: item.nbRow, url: url})}
                        >
                            <Text>
                                {item.name}
                            </Text>
                        </TouchableOpacity>

                    </View>
                )}
                //Setting the number of column
                numColumns={2}
                keyExtractor={(item, index) => index.toString()}
                />
        }
    </View>
  );
}
