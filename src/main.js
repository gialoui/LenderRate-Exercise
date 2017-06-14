/**
 * Created by KhangNDD on 6/14/2017.
 */
var SquareService = require('./SquareService');
var Utils = require('./Utils');

function main() {
    var exampleData = "7\n2\n1 2 4\n2 3 3\n2\n11\n24";
    var parsedData = {};

    // Parse the input string to a readable Object
    Utils.parseString({
        inputString: exampleData
    }, function (err, returnedData) {
        if (err) {
            console.error(err);
            return;
        } else {
            parsedData = returnedData;
            console.log(JSON.stringify(parsedData));

            var initialArray = SquareService.createSquareBySize({
                size: parsedData.squareSize
            });

            console.log(JSON.stringify(initialArray));

            // Rotate inner square by input commands
            for (var i = 0; i < parsedData.commandNumber; i++) {
                initialArray = SquareService.rotateInnerSquareByNinetyToRight({
                    array: initialArray,
                    topLeftPosition: {
                        x: parsedData.commandList[i][1] - 1,
                        y: parsedData.commandList[i][0] - 1
                    },
                    bottomRightPosition: {
                        x: (parsedData.commandList[i][1] + parsedData.commandList[i][2]) - 1,
                        y: (parsedData.commandList[i][0] + parsedData.commandList[i][2]) - 1
                    }
                });

                console.log('Rotated square: ' + JSON.stringify(initialArray));
            }

            console.log('Final rotated square: ' + JSON.stringify(initialArray));

            // Get final position of number in final rotated array
            var finalPosition = {};
            for (i = 0; i < parsedData.queryNumber; i++) {
                finalPosition = Utils.getIndexOfArray({
                    array: initialArray,
                    value: parsedData.queryList[i]
                });

                console.log('Final position of ' + parsedData.queryList[i] + ': ' + (finalPosition.x + 1) +
                    ' ' + (finalPosition.y + 1));
            }
        }
    });
}

main();