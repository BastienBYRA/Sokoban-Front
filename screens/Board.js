import { StatusBar } from 'expo-status-bar';
import { useEffect, useState } from 'react';
import { Button, FlatList, StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function Board(props) {
  const [board, setBoard] = useState(null);
  const [baseBoard, setBaseBoard] = useState(null);
  // const [boardNoObject, setBoardNoObject] = useState(null);
  // const [boardOnlyObject, setBoardOnlyObject] = useState(null);
  // const [updateBoard, setUpdateBoard] = useState(0)
  const [boardEachTurn, setBoardEachTurn] = useState(null);

  useEffect(() => {
    // console.log(props.route.params.url)
    getBoardGame();
  }, []);

  // useEffect(() => {
  //   console.log("---------------------------------------------------------------------------")
  //   setBoard(board)
  // }, updateBoard)

  function move(direction) {

    console.log(direction)

    for (var line = 0; line < board.length; line++) {
      for (var col = 0; col < board[0].length; col++) {
        if(board[line][col] == "P") {

          // if(direction == "TOP")
          //   movementAction(line, col, -1, 0)
          // else if(direction == "BOTTOM")
          //   movementAction(line, col, 1, 0)
          // else if(direction == "LEFT")
          //   movementAction(line, col, 0, -1)
          // else
          //   movementAction(line, col, 0, 1)

          if(direction == "TOP") {
            movementAction(line, col, -1, 0)
          }
          else if(direction == "BOTTOM") {
            movementAction(line, col, 1, 0)
          }
          else if(direction == "LEFT") {
            movementAction(line, col, 0, -1)
          }
          else {
            movementAction(line, col, 0, 1)
          }

          return;
        
          // if(direction == "TOP") {
          //   if(board[line-1][col] != "#") {
          //     newBoard[line-1][col] = "P"

          //     if(baseBoard[line][col] != "P") {
          //       newBoard[line][col] = baseBoard[line][col]
          //     }else{
          //       newBoard[line][col] = "."
          //     }

          //     // setUpdateBoard(updateBoard + 1)
          //     setBoard(newBoard)
          //   }
          // }else if(direction == "LEFT") {

          //   // console.log(baseBoard)
          //   // console.log(line)
          //   // console.log(col)
          //   // console.log(baseBoard[line][col])

          //   if(board[line][col-1] != "#") {
          //     newBoard[line][col-1] = "P"

          //     if(baseBoard[line][col] != "P") {
          //       console.log("PASSE")
          //       newBoard[line][col] = baseBoard[line][col]
          //     }else{
          //       console.log("PASSE 2")
          //       newBoard[line][col] = "."
          //     }

          //     // setUpdateBoard(updateBoard + 1)
          //     setBoard(newBoard)
          //   }
          // }
        }
      }
    }
  }

  function movementAction(line, col, lineDirection, colDirection) {
    var newBoard = [...board];
    
    if(board[line+lineDirection][col+colDirection] != "#") {
      // newBoard[line+lineDirection][col+colDirection] = "P"

      // if(baseBoard[line][col] != "P") {
      //   newBoard[line][col] = baseBoard[line][col]
      // }else{
      //   newBoard[line][col] = "."
      // }

      if(newBoard[line+lineDirection][col+colDirection] == "C") {
        
        if(newBoard[line+lineDirection+lineDirection][col+colDirection+colDirection] != "C" && newBoard[line+lineDirection+lineDirection][col+colDirection+colDirection] != "#") {
          
          newBoard[line+lineDirection+lineDirection][col+colDirection+colDirection] = "C"
          newBoard[line+lineDirection][col+colDirection] = "P"

          if(baseBoard[line][col] != "P") {
            newBoard[line][col] = baseBoard[line][col]
          }else{
            newBoard[line][col] = "."
          }

        }else{
          //Deplacement impossible
          newBoard[line][col] = "P"
        }
      }else{
        newBoard[line+lineDirection][col+colDirection] = "P"

        console.log(line)
        console.log(col)

        if(baseBoard[line][col] != "P") {
          newBoard[line][col] = baseBoard[line][col]
        }else{
          newBoard[line][col] = "."
        }
      }

      save(newBoard)



      // setUpdateBoard(updateBoard + 1)
      // setBoard(newBoard)
    }
  }

  function save(newBoard) {
    setBoard(newBoard)

    var newBoardEachTurn = boardEachTurn;
    // console.log(newBoardEachTurn)
    newBoardEachTurn.push(newBoard);

    if(boardEachTurn.length > 0) {
      if(newBoard != boardEachTurn[boardEachTurn.length - 1])
      
        setBoardEachTurn(newBoardEachTurn)
    }else{
      setBoardEachTurn(newBoardEachTurn)
    }

  }

  getBoardGame = async () => {
      //METTRE SON IP
      fetch(props.route.params.url + "/select?idBoard=" + props.route.params.id)
          .then((response) => response.json())
          .then((data) => {
              // setBoard(data)
              // setBaseBoard(data)

              const boardCopy = JSON.parse(JSON.stringify(data))
              const baseBoardCopy = JSON.parse(JSON.stringify(data))
              const boardEachTurnCopy = JSON.parse(JSON.stringify(data))
              setBoard(boardCopy)
              setBaseBoard(baseBoardCopy)
              setBoardEachTurn([boardEachTurnCopy])


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
      {board.map((row, index) => {
        return (<FlatList
        key={row.toString + index}
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

      <Button
        onPress={() => console.log(boardEachTurn.length)}
        title="LOG NB TURN"
        color="#841584"
        accessibilityLabel="Learn more about this purple button"
      />
    </View>
  );
}
