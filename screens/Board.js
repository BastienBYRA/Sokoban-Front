import { StatusBar } from 'expo-status-bar';
import { useEffect, useState } from 'react';
import { Button, FlatList, StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function Board(props) {
  const [board, setBoard] = useState(null);
  const [baseBoard, setBaseBoard] = useState(null);
  const [boardNoObject, setBoardNoObject] = useState(null);
  const [boardOnlyObject, setBoardOnlyObject] = useState(null);
  const [updateBoard, setUpdateBoard] = useState(0)

  useEffect(() => {
    // console.log(props.route.params.url)
    getBoardGame();
  }, []);

  useEffect(() => {
    setBoard(board)
  }, updateBoard)

  function move(direction) {

    console.log(direction)
    
    for (var line = 0; line < board.length; line++) {
      for (var col = 0; col < board[0].length; col++) {
        if(board[line][col] == "P") {

          if(direction == "TOP") {
            if(board[line-1][col] != "#") {
              board[line-1][col] = "P"

              if(baseBoard[line-1][col] != "P") {
                board[line][col] = baseBoard[line-1][col]
              }else{
                board[line][col] = "."
              }

              setUpdateBoard(updateBoard + 1)
            }
          }else if(direction == "LEFT") {

            if(board[line][col-1] != "#") {
              board[line][col-1] = "P"

              if(baseBoard[line][col-1] != "P") {
                board[line][col] = baseBoard[line][col-1]
              }else{
                board[line][col] = "."
              }

              console.log(baseBoard)
              console.log(board)

              setUpdateBoard(updateBoard + 1)
            }
          }
        }
      }
    }
  }

  function movementTop() {

  }

  getBoardGame = async () => {
      //METTRE SON IP
      fetch(props.route.params.url + "/select?idBoard=" + props.route.params.id)
          .then((response) => response.json())
          .then((data) => {
              // setBoard(data)
              // setBaseBoard(data)

              setBoard([...data])
              setBaseBoard([...data])
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
