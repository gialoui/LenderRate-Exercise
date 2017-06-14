/**
 * Created by KhangNDD on 6/14/2017.
 */
var Utils = function () {
};

/**
 * Parse the input string to Object
 * @param {Object} params
 * @param {String} params.inputString
 * @param callback
 */
Utils.prototype.parseString = function (params, callback) {
    var inputString = params.inputString,
        parsingObject = {};

    // Assume that the input string is in right format
    if (inputString && inputString.trim().length > 0) {
        var parsingData = inputString.split('\n');
        // If size of the square > 1000, then data is invalid
        var invalidSquareSize = !parsingData[0] || parsingData[0] > 1000;

        // If number of commands > 100, then data is invalid
        var invalidCommandNumber = !parsingData[1] || parseInt(parsingData[1]) > 100;

        // If number of queries > 100, then data is invalid
        var invalidQueryNumber = (!parsingData[1] && !parsingData[parseInt(parsingData[1]) + 2]) || (!parsingData[1] && parsingData[parseInt(parsingData[1]) + 2] > 100);

        // If exist any invalid data, then return callback with error
        if (invalidSquareSize || invalidQueryNumber || invalidCommandNumber) {
            return callback('Input data is not valid');
        }

        parsingObject.squareSize = parseInt(parsingData[0]);
        parsingObject.commandNumber = parseInt(parsingData[1]);
        parsingObject.queryNumber = parseInt(parsingData[parseInt(parsingData[1]) + 2]);

        // Pre-define empty command list
        parsingObject.commandList = [];

        // Pre-define empty query list
        parsingObject.queryList = [];

        // Parsing command data to Object
        for (var i = 2; i < parsingObject.commandNumber + 2; i++) {
            if (!parsingData[i]) {
                return callback('Data is empty at line: ' + (i + 1));
            } else {
                var currentLine = parsingData[i].split(' ');

                if (currentLine.length !== 3) {
                    return callback('Data is invalid at line: ' + (i + 1));
                } else {
                    currentLine[0] = parseInt(currentLine[0]);
                    currentLine[1] = parseInt(currentLine[1]);
                    currentLine[2] = parseInt(currentLine[2]);

                    // Validate constraint of number (a[i], b[i], d[i]) in command line
                    if (currentLine[0] < 1 || currentLine[1] < 1 || currentLine[2] < 0 || currentLine[2] > parsingObject.squareSize) {
                        return callback('Data is invalid at line: ' + (i + 1));
                    }

                    if ((i - 2) >= 1) {
                        var previousLine = parsingObject.commandList[i - 3];
                        if (isInValidNextLine({
                                previousLine: previousLine,
                                currentLine: currentLine,
                                index: 0
                            })) {
                            return callback('Data is invalid at line: ' + (i + 1));
                        }

                        if (isInValidNextLine({
                                previousLine: previousLine,
                                currentLine: currentLine,
                                index: 1
                            })) {
                            return callback('Data is invalid at line: ' + (i + 1));
                        }
                    }

                    // Push this valid command to commandList
                    parsingObject.commandList.push([parseInt(currentLine[0]), parseInt(currentLine[1]), parseInt(currentLine[2])]);
                }
            }
        }

        // Parsing query data to Object
        for (i = parsingObject.commandNumber + 3; i < parsingData.length; i++) {
            if (!parsingData[i]) {
                return callback('Data is empty at line: ' + (i + 1));
            } else {
                var query = parseInt(parsingData[i]);

                if (query < 0 || query >= Math.pow(parsingObject.squareSize, 2)) {
                    return callback('Data is invalid at line: ' + (i + 1));
                } else {
                    // Push this valid command to commandList
                    parsingObject.queryList.push(query);
                }
            }
        }

        callback(null, parsingObject);
    } else {
        callback('Input string is empty');
    }
};

/**
 * Get index of value in 2D Array
 * @param {Object} params
 * @param {Array} params.array
 * @param {Number} params.value
 * @returns {*}
 */
Utils.prototype.getIndexOfArray = function (params) {
    var array = params.array,
        value = params.value,
        arraySize = array.length,
        index = null;

    for (var i = 0; i < arraySize; i++) {
        for (var j = 0; j < arraySize; j++) {
            if (array[i][j] === value) {
                index = {
                    x: i,
                    y: j
                };

                return index;
            }
        }
    }

    return index;
};

/**
 * Check if next line of command is valid
 * @param {Object} params
 * @param {Array} params.previousLine
 * @param {Array} params.currentLine
 * @param {Number} params.index
 * @returns {boolean}
 */
function isInValidNextLine(params) {
    var previousLine = params.previousLine,
        currentLine = params.currentLine,
        index = params.index;

    return previousLine[index] > currentLine[index] || (currentLine[index] + currentLine[2]) > (previousLine[index] + previousLine[2]);
}

module.exports = new Utils();