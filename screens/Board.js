import {StatusBar} from 'expo-status-bar';
import {useEffect, useState} from 'react';
import {Button, FlatList, StyleSheet, Text, View, Image, Dimensions} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';

export default function Board(props) {
    const [board, setBoard] = useState(null);
    const [baseBoard, setBaseBoard] = useState(null);
    const [boardEachTurn, setBoardEachTurn] = useState(null);
    const [completed, setCompleted] = useState(false);

    useEffect(() => {
        getBoardGame();
    }, []);

    /**
     * Traverse le board et chercher l'emplacement du Joueur
     * Effectue le mouvement choisi.
     * @param {string} direction
     * @returns
     */
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

    /**
     * Change la position du Joueur en fonction de la position desiré.
     * Verifie si l'utilisateur peut réaliser le mouvement, et les caisses qu'il bouge.
     * @param {number} line
     * @param {number} col
     * @param {number} lineDirection
     * @param {number} colDirection
     */
    function movementAction(line, col, lineDirection, colDirection) {

        //Copie le BOARD sans prendre sa référence.
        let newBoard = JSON.parse(JSON.stringify(board));

        //Si la case sur laquelle veut se déplacer l'utilisateur n'est pas un mur
        if (board[line + lineDirection][col + colDirection] !== "#") {

            //Vérifie s'il y a une caisse ou non
            if (newBoard[line + lineDirection][col + colDirection] === "C") {

                // Verifie que, en face de la direction de la caisse, ne se trouve pas une autre caisse ou un mur
                if (newBoard[line + lineDirection + lineDirection][col + colDirection + colDirection] !== "C" && newBoard[line + lineDirection + lineDirection][col + colDirection + colDirection] !== "#") {

                    //Si pas d'autre caisse / mur, avance le joueur et la caisse
                    newBoard[line + lineDirection + lineDirection][col + colDirection + colDirection] = "C"
                    newBoard[line + lineDirection][col + colDirection] = "P"

                    if (baseBoard[line][col] !== "P" && baseBoard[line][col] !== "C") {
                        newBoard[line][col] = baseBoard[line][col]
                    } else {
                        newBoard[line][col] = "."
                    }
                } else {
                    //Déplacement impossible
                    newBoard[line][col] = "P"
                }

                //Si l'utilisateur se déplace, et qu'il n'y a pas de caisse en face de lui.
            } else {
                newBoard[line + lineDirection][col + colDirection] = "P"

                if (baseBoard[line][col] !== "P" && baseBoard[line][col] !== "C") {
                    newBoard[line][col] = baseBoard[line][col]
                } else {
                    newBoard[line][col] = "."
                }
            }

            save(newBoard)
            checkGameIsComplete(newBoard)
        }
    }

    /**
     * Sauvegarde le Board, et l'ajoute a la liste des Boards permettant de revenir un tour en arrière.
     * @param {Array[Array[]]} newBoard
     */
    function save(newBoard) {
        setBoard(newBoard)

        let newBoardEachTurn = JSON.parse(JSON.stringify(boardEachTurn));

        if (boardEachTurn.length > 0) {
            let isequals = equals(newBoard, newBoardEachTurn[newBoardEachTurn.length - 1])

            //Si le board de ce tour est DIFFERENT de celui du précédent tour, on l'enregistre.
            if (isequals === false) {
                newBoardEachTurn.push(newBoard);
                setBoardEachTurn(newBoardEachTurn)
            }
        }
    }

    /**
     * Réalise un retour en arrière
     */
    function precedentTurn() {
        if (boardEachTurn.length > 1) {
            let newBoardEachTurn = boardEachTurn;
            newBoardEachTurn.pop();
            setBoardEachTurn(newBoardEachTurn)
            setBoard(newBoardEachTurn.slice(-1)[0]);
        }
    }

    const getBoardGame = async () => {

        fetch(props.route.params.url + "/select?idBoard=" + props.route.params.id)
            .then((response) => response.json())
            .then((data) => {

                //Récupère les données, sans prendre leurs références
                //POUR EVITER QUE QUAND ON MODIFIE UN BOARD, IL MODIFIE LES AUTRES
                //Pourquoi [...data] ne résoud pas le problème de référence ? Je ne sais pas...
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

    /**
     * Vérifie à la fin de chaque tour si les cases "x" du tableau de base sont des "C" dans le tableau de jeu en cours
     * @param {Array[Array[]]} board
     */
    const checkGameIsComplete = (board) => {
        let isComplete = true;

        for (let line = 0; line < board.length; line++) {
            for (let col = 0; col < board[0].length; col++) {

                //Si case "x", vérifie s'il y a une caisse ou non dans le board du jeu en cours.
                if (baseBoard[line][col] === "x") {
                    if (board[line][col] === "C") {
                        //Continue
                    } else {
                        isComplete = false;
                        break;
                    }
                }
            }
        }

        if (isComplete === true) {
            setCompleted(true);
        }
    }

    const equals = (a, b) => JSON.stringify(a) === JSON.stringify(b);
    const buttonSize = 80; // Taille des boutons en pixels
    const imageWidth = Dimensions.get('window').width / props.route.params.nbCol;
    const imageHeight = imageWidth;

    return (
        <SafeAreaView style={styles.container}>
            {board != null &&
                <View>
                    {boardEachTurn != null && <Text>Nombre de tour : {boardEachTurn.length}</Text>}
                    {board.map((row, index) => {
                        return (
                            <FlatList
                                key={row.toString + index}
                                data={row}
                                renderItem={({item}) => (
                                    <View>
                                        {item === 'C' && (
                                            <Image
                                                style={{...styles.image, width: imageWidth, height: imageHeight}}
                                                source={require('../assets/image/board/caisse.png')}/>)
                                        }
                                        {item === '#' && (
                                            <Image
                                                style={{...styles.image, width: imageWidth, height: imageHeight}}
                                                source={require('../assets/image/board/mur.png')}/>)
                                        }
                                        {item === '.' && (
                                            <Image
                                                style={{...styles.image, width: imageWidth, height: imageHeight}}
                                                source={require('../assets/image/board/sol.png')}/>)
                                        }
                                        {item === 'x' && (
                                            <Image
                                                style={{...styles.image, width: imageWidth, height: imageHeight}}
                                                source={require('../assets/image/board/croix.jpg')}/>)
                                        }
                                        {item === 'P' && (
                                            <Image
                                                style={{...styles.image, width: imageWidth, height: imageHeight}}
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


            {completed === false &&
                <>
                    <View style={{
                        flexDirection: 'column',
                        justifyContent: 'center',
                        alignItems: 'center',
                        marginTop: 20
                    }}>
                        <View style={{width: buttonSize, height: buttonSize}}>
                            <Button
                                onPress={() => move("TOP")}
                                title="HAUT"
                                color="#841584"
                                accessibilityLabel="Learn more about this purple button"
                            />
                        </View>
                        <View style={{flexDirection: 'row', justifyContent: 'center', alignItems: 'center', height: 0}}>
                            <View style={{width: buttonSize, height: buttonSize, marginRight: 5}}>
                                <Button
                                    onPress={() => move("LEFT")}
                                    title="GAUCHE"
                                    color="#841584"
                                    accessibilityLabel="Learn more about this purple button"
                                />
                            </View>
                            <View style={{width: buttonSize, height: buttonSize}}>
                                <Button
                                    onPress={() => move("RIGHT")}
                                    title="DROITE"
                                    color="#841584"
                                    accessibilityLabel="Learn more about this purple button"
                                />
                            </View>
                        </View>

                        <View style={{width: buttonSize, height: buttonSize}}>
                            <Button
                                onPress={() => move("BOTTOM")}
                                title="BAS"
                                color="#841584"
                                accessibilityLabel="Learn more about this purple button"
                            />
                        </View>
                    </View>

                    <Button
                        onPress={() => precedentTurn()}
                        title="COUP PRECEDENT"
                        color="#841584"
                        accessibilityLabel="Learn more about this purple button"
                    />
                </>
            }

            {completed === true &&
                <Text style={styles.completed}>REUSSI ! :D</Text>
            }
        </SafeAreaView>
    );
}


const styles = StyleSheet.create({
    completed: {
        // flex:1,
        marginTop: 20,
        textAlign: 'center',
        // color: 'blue',
        fontWeight: 'bold',
        fontSize: 30,
    },
    container: {
        flex: 1,
        backgroundColor: 'white',
    },
    image: {
        justifyContent: 'center',
        alignItems: 'center',
    },
});
