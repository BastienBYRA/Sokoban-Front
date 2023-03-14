import { StatusBar } from 'expo-status-bar';
import { useEffect, useState } from 'react';
import { FlatList, StyleSheet, Text, View } from 'react-native';

export default function Board(props) {
  const [board, setBoard] = useState(null);

  //test
  useEffect(() => {
    console.log(props.route.params.url)
    getBoardGame();
  }, []);

  getBoardGame = async () => {
      //METTRE SON IP
      fetch(props.route.params.url + "/select?idBoard=" + props.route.params.id)
          .then((response) => response.json())
          .then((data) => {
              // Use the data from the server here
              setBoard(data)
              console.log(data)
          })
          .catch((error) => {
              // Handle any errors that occur
              console.error(error);
          });
  }

  console.log(props.route.params)
  return (
    <View>
    {board != null &&
      <Text>Test</Text>
    }

        {/* <FlatList
          data={this.state.dataSource}
          renderItem={({ item }) => (
            <View
              style={{
                flex: 1,
                flexDirection: 'column',
                margin: 1
              }}>
              <Image
                style={styles.imageThumbnail}
                source={{ uri: item.src }}
              />
            </View>
          )}
          //Setting the number of column
          numColumns={3}
          keyExtractor={(item, index) => index.toString()}
        /> */}
    </View>
  );
}
