/*           _
   ___  ___ | |_   _____ _ __ ___
  / __|/ _ \| \ \ / / _ \ '__/ __|
  \__ \ (_) | |\ V /  __/ |  \__ \
  |___/\___/|_| \_/ \___|_|  |___/

*/

// hint: you'll need to do a full-search of all possible arrangements of pieces!
// (There are also optimizations that will allow you to skip a lot of the dead search space)
// take a look at solversSpec.js to see what the tests are expecting


// return a matrix (an array of arrays) representing a single nxn chessboard, 
// with n rooks placed such that none of them can attack each other

window.findNRooksSolution = function(n) {
  var solution = new Board({'n':n});
  for (var rook = 0; rook < n; rook++) {
    solution.togglePiece(rook,rook)
  }



  console.log('Single solution for ' + n + ' rooks:', JSON.stringify(solution));
  var result = [];
  for (var rows = 0; rows < n; rows++) {
    result.push(solution.get(rows));
  }
  return result;
};



// return the number of nxn chessboards that exist, with n rooks placed such that none of them can attack each other
window.countNRooksSolutions = function(n, board, rowIndex) {
  var solutionCount = 0;
  board = board || new Board({'n': n});
  rowIndex = rowIndex || 0;

  for (var columnIndex = 0; columnIndex < n; columnIndex++) {
    board.togglePiece(rowIndex, columnIndex);

    if (!board.hasAnyRooksConflicts()) {
      if (rowIndex === n - 1) {
        solutionCount += 1;
      } else {
        solutionCount += countNRooksSolutions(n, board, rowIndex + 1);        
      }
    }

    board.togglePiece(rowIndex, columnIndex);
  }

  if (rowIndex === 0) {
    console.log('Number of solutions for ' + n + ' rooks:', solutionCount);
  }
  return solutionCount;
};



// return a matrix (an array of arrays) representing a single nxn chessboard, with n queens placed such that none of them can attack each other
window.findNQueensSolution = function(n) {
  if(n === 0) {
    return [];
  }
  var board = new Board({'n': n});

  var queenSolutionFinder = function(rowIndex) {
    rowIndex = rowIndex || 0;
    for(var colIndex = 0; colIndex < n; colIndex++) {
      if (colIndex > 0) {
        board.togglePiece(rowIndex, colIndex-1);
      }
      board.togglePiece(rowIndex, colIndex);
      if (rowIndex === n - 1 && !board.hasAnyQueenConflictsOn(rowIndex, colIndex)) { //rook in each row and no conflicts tally a solution
        var result = [];
          for (var rows = 0; rows < n; rows++) {
            result.push(board.get(rows));
          }
        return result;
      }
      if (rowIndex < n - 1 && !board.hasAnyQueenConflictsOn(rowIndex, colIndex)) {   //Search deeper on rows before the last AND huge optimization
        queenSolutionFinder(rowIndex+1);
      }
      if (colIndex === n - 1) {
        board.togglePiece(rowIndex, colIndex);
      }
    }
  }
  queenSolutionFinder(0);
};


// return the number of nxn chessboards that exist, with n queens placed such that none of them can attack each other
window.countNQueensSolutions = function(n, board, rowIndex) {
  var solutionCount = n === 0 ? 1 : 0;
  board = board || new Board({n: n});
  rowIndex = rowIndex || 0;

  for (var columnIndex = 0; columnIndex < n; columnIndex++) {
    board.togglePiece(rowIndex, columnIndex);

    if (!board.hasAnyQueenConflictsOn(rowIndex, columnIndex)) {
      if (rowIndex === n - 1) {
        solutionCount += 1;
      } else {
        solutionCount += countNQueensSolutions(n, board, rowIndex + 1);        
      }
    }

    board.togglePiece(rowIndex, columnIndex);
  }

  if (rowIndex === 0) {
    console.log('Number of solutions for ' + n + ' queens:', solutionCount);
  }
  
  return solutionCount;
};
