import { StatusBar } from 'expo-status-bar';
import { useEffect, useState } from 'react';
import { Button, FlatList, StyleSheet, Text, View, Image } from 'react-native';
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

    // console.log(direction)

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
    console.log(boardEachTurn[boardEachTurn.length - 1])
    var newBoard = JSON.parse(JSON.stringify(board));

    if(board[line+lineDirection][col+colDirection] != "#") {

      if(newBoard[line+lineDirection][col+colDirection] == "C") {
        
        // console.log("CASE 1")
        if(newBoard[line+lineDirection+lineDirection][col+colDirection+colDirection] != "C" && newBoard[line+lineDirection+lineDirection][col+colDirection+colDirection] != "#") {
          
          // console.log("CASE 2")

          newBoard[line+lineDirection+lineDirection][col+colDirection+colDirection] = "C"
          newBoard[line+lineDirection][col+colDirection] = "P"

          if(baseBoard[line][col] != "P" && baseBoard[line][col] != "C") {
            // console.log("CASE 3")
            newBoard[line][col] = baseBoard[line][col]
          }else{
            // console.log("CASE 4")
            newBoard[line][col] = "."
          }

        }else{
          //Deplacement impossible
          newBoard[line][col] = "P"
          // console.log("CASE 5")
        }
      }else{
        newBoard[line+lineDirection][col+colDirection] = "P"
        // console.log("CASE 6")
        if(baseBoard[line][col] != "P" && baseBoard[line][col] != "C") {
          // console.log("CASE 7")
          console.log(boardEachTurn[boardEachTurn.length - 1])
          newBoard[line][col] = baseBoard[line][col]
          console.log(boardEachTurn[boardEachTurn.length - 1])
        }else{
          // console.log("CASE 8")
          newBoard[line][col] = "."
        }
      }


      save(newBoard)
      // console.log(boardEachTurn.length)



      // setUpdateBoard(updateBoard + 1)
      // setBoard(newBoard)
    }
  }

  function save(newBoard) {
    setBoard(newBoard)

    var newBoardEachTurn = JSON.parse(JSON.stringify(boardEachTurn));

    if(boardEachTurn.length > 0) {
      var isequals = equals(newBoard, newBoardEachTurn[newBoardEachTurn.length - 1])

      if(isequals === false) {
        console.log("DIFFERENT")
        // console.log(newBoardEachTurn[newBoardEachTurn.length - 1])
        newBoardEachTurn.push(newBoard);
        // console.log(newBoardEachTurn[newBoardEachTurn.length - 1])
        setBoardEachTurn(newBoardEachTurn)
      }else{
        console.log("EQUALSSSSS")
      }
    }
  }

  function precedentTurn() {
    console.log(boardEachTurn.length)
    if(boardEachTurn.length > 1) {

      var newBoardEachTurn = boardEachTurn;
      newBoardEachTurn.pop();
      // console.log(newBoardEachTurn)
      setBoardEachTurn(newBoardEachTurn)
      // console.log(newBoardEachTurn.slice(-1)[0])
      setBoard(newBoardEachTurn.slice(-1)[0]);
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

  const equals = (a, b) => JSON.stringify(a) === JSON.stringify(b);
  const buttonSize = 80; // Taille des boutons en pixels


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
              {/* <Text>{item}</Text> */}
              {item === 'C' && (
                <Image
                style={{ width: 30, height: 30 }}
                  source={require('../assets/image/board/caisse.png')}/>)
              }
              {item === '#' && (
                <Image
                style={{ width: 30, height: 30 }}
                  source={require('../assets/image/board/mur.png')}/>)
              }
              {item === '.' && (
                <Image
                style={{ width: 30, height: 30 }}
                  source={require('../assets/image/board/sol.png')}/>)
              }
              {item === 'x' && (
                <Image
                style={{ width: 30, height: 30 }}
                  source={require('../assets/image/board/croix.jpg')}/>)
              }
              {item === 'P' && (
                <Image
                style={{ width: 30, height: 30 }}
                  source={require('../assets/image/board/personnage.jpg')}/>)
              }
                
            </View>
          )}
          //Setting the number of column
          numColumns={props.route.params.nbCol}
          keyExtractor={(item, index) => index.toString()}
        />)
      })}
       </View>
      }

      <View style={{ flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
        <View style={{ flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }}>
          <View style={{ width: buttonSize, height: buttonSize }}>
            <Button
              onPress={() => move("TOP")}
              title="TOP"
              color="#841584"
              accessibilityLabel="Learn more about this purple button"
            />
        </View>
      </View>

      <View style={{ flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }}>
        <View style={{ width: buttonSize, height: buttonSize }}>
          <Button
            onPress={() => move("LEFT")}
            title="LEFT"
            color="#841584"
            accessibilityLabel="Learn more about this purple button"
          />
        </View>
        <View style={{ width: buttonSize, height: buttonSize }}>
          <Button
            onPress={() => move("RIGHT")}
            title="RIGHT"
            color="#841584"
            accessibilityLabel="Learn more about this purple button"
          />
        </View>
      </View>

      <View style={{ flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }}>
        <View style={{ width: buttonSize, height: buttonSize }}>
          <Button
            onPress={() => move("BOTTOM")}
            title="BOTTOM"
            color="#841584"
            accessibilityLabel="Learn more about this purple button"
          />
        </View>
      </View>
    </View>

      <Button
        onPress={() => console.log(boardEachTurn.length)}
        title="LOG NB TURN"
        color="#841584"
        accessibilityLabel="Learn more about this purple button"
      />
      <Button
        onPress={() => precedentTurn()}
        title="Retour"
        color="#841584"
        accessibilityLabel="Learn more about this purple button"
      />
    </View>
  );
}
