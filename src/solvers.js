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
  var solution = new Board({'n':n}); //fixme
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
window.countNRooksSolutions = function(n) {
  var solutionCount = 0; //fixme
  var board = new Board({'n': n});

  var rookSolutionFinder = function(rowIndex) {
    rowIndex = rowIndex || 0;
    for(var colIndex = 0; colIndex < n; colIndex++) {
      if (colIndex > 0) {
        board.togglePiece(rowIndex, colIndex-1);
      }
      board.togglePiece(rowIndex, colIndex);
      if (rowIndex === n - 1 && !board.hasAnyRooksConflicts()) { //rook in each row and no conflicts tally a solution
        solutionCount += 1;
      }
      if (rowIndex < n - 1 && !board.hasAnyRooksConflicts()) {   //Search deeper on rows before the last
        rookSolutionFinder(rowIndex+1);
      }
    }
  }
  rookSolutionFinder(0);
  console.log('Number of solutions for ' + n + ' rooks:', solutionCount);
  return solutionCount;
};



// return a matrix (an array of arrays) representing a single nxn chessboard, with n queens placed such that none of them can attack each other
window.findNQueensSolution = function(n) {
  var solution = undefined; //fixme

  console.log('Single solution for ' + n + ' queens:', JSON.stringify(solution));
  return solution;
};


// return the number of nxn chessboards that exist, with n queens placed such that none of them can attack each other
window.countNQueensSolutions = function(n) {
  var solutionCount = undefined; //fixme

  console.log('Number of solutions for ' + n + ' queens:', solutionCount);
  return solutionCount;
};
