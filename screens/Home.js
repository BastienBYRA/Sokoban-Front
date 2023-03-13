import { StatusBar } from 'expo-status-bar';
import { useEffect, useState } from 'react';
import { FlatList, StyleSheet, Text, View } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';

export default function Home({ navigation }) {
    const [board, setBoard] = useState(null);

    useEffect(() => {
        getAllBoards();
    }, []);

    getAllBoards = async () => {
        var json = JSON.parse('[{"id": 1,"name": "Simple board"}, {"id": 2,"name": "Simple board 2"}]')
        // const response = await fetch('http://127.0.0.1:36987/board');
        setBoard(json);
    }

  return (
    <View>
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
                        onPress={() => navigation.navigate('Board', {id: item.id})}
                        >
                            <Text>
                                {item.name}
                            </Text>
                        </TouchableOpacity>

                    </View>
                )}
                //Setting the number of column
                numColumns={3}
                keyExtractor={(item, index) => index.toString()}
                />
        }
    </View>
  );
}
