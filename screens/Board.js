import {useEffect, useState} from 'react';
import {Button, FlatList, Text, View} from 'react-native';


export default function Board(props) {
    const [board, setBoard] = useState(null);
    const [baseBoard, setBaseBoard] = useState(null);
    const [boardEachTurn, setBoardEachTurn] = useState(null);

    useEffect(() => {
        getBoardGame();
    }, []);

    function move(direction) {
        for (let line = 0; line < board.length; line++) {
            for (let col = 0; col < board[0].length; col++) {
                if (board[line][col] === "P") {

                    if (direction === "TOP") {
                        movementAction(line, col, -1, 0)
                    } else if (direction === "BOTTOM") {
                        movementAction(line, col, 1, 0)
                    } else if (direction === "LEFT") {
                        movementAction(line, col, 0, -1)
                    } else {
                        movementAction(line, col, 0, 1)
                    }
                    return;
                }
            }
        }
    }

    function movementAction(line, col, lineDirection, colDirection) {
        console.log(boardEachTurn[boardEachTurn.length - 1])
        let newBoard = JSON.parse(JSON.stringify(board));

        if (board[line + lineDirection][col + colDirection] !== "#") {

            if (newBoard[line + lineDirection][col + colDirection] === "C") {

                if (newBoard[line + lineDirection + lineDirection][col + colDirection + colDirection] !== "C" && newBoard[line + lineDirection + lineDirection][col + colDirection + colDirection] !== "#") {

                    newBoard[line + lineDirection + lineDirection][col + colDirection + colDirection] = "C"
                    newBoard[line + lineDirection][col + colDirection] = "P"

                    if (baseBoard[line][col] !== "P" && baseBoard[line][col] !== "C") {
                        newBoard[line][col] = baseBoard[line][col]
                    } else {
                        newBoard[line][col] = "."
                    }

                } else {
                    //Deplacement impossible
                    newBoard[line][col] = "P"
                }
            } else {
                newBoard[line + lineDirection][col + colDirection] = "P"
                if (baseBoard[line][col] !== "P" && baseBoard[line][col] !== "C") {
                    console.log(boardEachTurn[boardEachTurn.length - 1])
                    newBoard[line][col] = baseBoard[line][col]
                    console.log(boardEachTurn[boardEachTurn.length - 1])
                } else {
                    newBoard[line][col] = "."
                }
            }
            save(newBoard)
        }
    }

    function save(newBoard) {
        setBoard(newBoard)

        let newBoardEachTurn = JSON.parse(JSON.stringify(boardEachTurn));

        if (boardEachTurn.length > 0) {
            let isequals = equals(newBoard, newBoardEachTurn[newBoardEachTurn.length - 1])

            if (isequals === false) {
                console.log("DIFFERENT")
                newBoardEachTurn.push(newBoard);
                setBoardEachTurn(newBoardEachTurn)
            } else {
                console.log("EQUALSSSSS")
            }
        }
    }

    function precedentTurn() {
        console.log(boardEachTurn.length)
        if (boardEachTurn.length > 1) {

            let newBoardEachTurn = boardEachTurn;
            newBoardEachTurn.pop();
            setBoardEachTurn(newBoardEachTurn)
            setBoard(newBoardEachTurn.slice(-1)[0]);
        }
    }

    const getBoardGame = async () => {
        //METTRE SON IP
        fetch(props.route.params.url + "/select?idBoard=" + props.route.params.id)
            .then((response) => response.json())
            .then((data) => {
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


    return (

        <View>
            {board != null &&
                <View style={{borderColor: 'black', borderWidth: 1}}>
                    {board.map((row, index) => {
                        return (<FlatList
                            key={row.toString + index}
                            data={row}
                            renderItem={({item}) => (
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
            <Button
                onPress={() => precedentTurn()}
                title="Retour"
                color="#841584"
                accessibilityLabel="Learn more about this purple button"
            />
        </View>
    );
}
