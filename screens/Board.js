import { StatusBar } from 'expo-status-bar';
import { useEffect, useState } from 'react';
import { Button, FlatList, StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function Board(props) {
  const [board, setBoard] = useState(null);
  const [baseBoard, setBaseBoard] = useState(null);

  useEffect(() => {
    // console.log(props.route.params.url)
    getBoardGame();
  }, []);

  function move(direction) {
    
    console.log(direction)
  }

  getBoardGame = async () => {
      //METTRE SON IP
      fetch(props.route.params.url + "/select?idBoard=" + props.route.params.id)
          .then((response) => response.json())
          .then((data) => {
            // console.log(data)
            data.map(function(row) {
              // console.log(row)
              // console.log(row[4])
            })
              // Use the data from the server here
              setBoard(data)
              // console.log(data)
          })
          .catch((error) => {
              // Handle any errors that occur
              console.error(error);
          });
  }

  return (

    <View>
    {board != null &&
    <View style={{borderColor: 'black', borderWidth: 1}}>
      {board.map((row) => {
        return (<FlatList
          data={row}
          renderItem={({ item }) => (
            <View
              style={{
                flex: 1,
                flexDirection: 'column',
                margin: 1
              }}>
              <Text>{item}</Text>
            </View>
          )}
          //Setting the number of column
          numColumns={props.route.params.nbCol}
          keyExtractor={(item, index) => index.toString()}
        />)
      })}
       </View>
      }

      <Button
        onPress={() => move("TOP")}
        title="TOP"
        color="#841584"
        accessibilityLabel="Learn more about this purple button"
      />

      <Button
        onPress={() => move("LEFT")}
        title="LEFT"
        color="#841584"
        accessibilityLabel="Learn more about this purple button"
      />

      <Button
        onPress={() => move("RIGHT")}
        title="RIGHT"
        color="#841584"
        accessibilityLabel="Learn more about this purple button"
      />

      <Button
        onPress={() => move("BOTTOM")}
        title="BOTTOM"
        color="#841584"
        accessibilityLabel="Learn more about this purple button"
      />
    </View>
  );
}
