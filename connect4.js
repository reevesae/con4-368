document.addEventListener("DOMContentLoaded",() =>{
     var gameBoard;
     let redTurn = true;
     let plays = 0;
     let firstPlay = true;
     let gameWin = false;

     document.getElementById('col1Button').addEventListener("click", function(){addCol(0);});
     document.getElementById('col2Button').addEventListener("click", function(){addCol(1);});
     document.getElementById('col3Button').addEventListener("click", function(){addCol(2);});
     document.getElementById('col4Button').addEventListener("click", function(){addCol(3);});
     document.getElementById('col5Button').addEventListener("click", function(){addCol(4);});
     document.getElementById('col6Button').addEventListener("click", function(){addCol(5);});
     document.getElementById('col7Button').addEventListener("click", function(){addCol(6);});
     document.getElementById('resetButton').addEventListener("click", function(){reset();});

     if(firstPlay)
     {
         document.getElementById('playerTurns').innerHTML = "Press start to begin!";
     }


     function addCol(numCol)
     {
         console.log(numCol);
         if(plays >= 42)
         {
             document.getElementById('playerTurns').innerHTML = "Max turns reached, please restart!";
         }
         else if(!gameWin)    //Makes sure players are not able to take turns after a win
         {
             let foundRow = false;
             let searchRow = 0;
             for(x = 5; x >= 0; x--)  //Find the next open spot for the chosen column
             {
                 if(gameBoard[x][numCol] == 0 && !foundRow)
                 {
                    searchRow = x;
                    console.log(searchRow);
                    foundRow = true;
                 }
             }

             if(foundRow)
             {
                 if(redTurn)
                  {
                      gameBoard[searchRow][numCol] = 1    //Input into array
                      document.getElementById('spot'+searchRow+numCol).className = "red";
                      if(checkWin(1))    //Checks all possible win combos before allowing next turn
                      {
                          gameWin = true;
                          document.getElementById('playerTurns').innerHTML = "Red Wins!";
                      }
                      else
                      {
                          document.getElementById('playerTurns').innerHTML = "Yellow's Turn";
                      }
                  }
                  else
                  {
                      gameBoard[searchRow][numCol] = 2;    //Input into array
                      document.getElementById('spot'+searchRow+numCol).className = "yellow";
                      if(checkWin(2))    //Checks all possible win combos before allowing next turn
                      {
                          gameWin = true;
                          document.getElementById('playerTurns').innerHTML = "Yellow Wins!";
                      }
                      else
                      {
                          document.getElementById('playerTurns').innerHTML = "Red's Turn";
                      }
                  }
                  plays++;    //Increment play count to not go over maximum
                  console.log(plays);
                  redTurn = !redTurn;    //Swap turn bool value
             }
         }
     }


     function checkWin(player)
     {
         //check vert
         for(x = 0; x < 7; x++)
         {
            for(y = 0; y < 3; y++)
            {
                if(gameBoard[y][x] == player && gameBoard[y+1][x] == player && gameBoard[y+2][x] == player && gameBoard[y+3][x] == player)
                    return true;
            }
         }


         //check horiz
         for(y = 0; y < 6; y++)
         {
            for(x = 0; x < 4; x++)
            {
                if(gameBoard[y][x] == player && gameBoard[y][x+1] == player && gameBoard[y][x+2] == player && gameBoard[y][x+3] == player)
                    return true;
            }
         }

         //check diag NE
         for(x = 0; x < 4; x++)
         {
            for(y = 3; y < 6; y++)
            {
                if(gameBoard[y][x] == player && gameBoard[y-1][x+1] == player && gameBoard[y-2][x+2] == player && gameBoard[y-3][x+3] == player)
                    return true;
            }
         }

         //check diag NW
         for(x = 3; x < 7; x++)
         {
            for(y = 3; y < 6; y++)
            {
                if(gameBoard[y][x] == player && gameBoard[y-1][x-1] == player && gameBoard[y-2][x-2] == player && gameBoard[y-3][x-3] == player)
                    return true;
            }
         }

     }

     function reset()    //Resets all values and array to start a completely new game without refreshing
     {
         gameWin = false;
         firstPlay = false;
         gameBoard = [];
         for(x = 0; x <= 5; x++)
         {
            for(y = 0; y<= 6; y++)
                document.getElementById('spot'+x+y).className = "spot";    //Changes all spots on the page back to white
            gameBoard.push([0,0,0,0,0,0,0]);    //Empties array
         }
         redTurn = true;
         plays = 0;
         document.getElementById('playerTurns').innerHTML = "Red's Turn";
     }

 });