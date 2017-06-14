/**
 * Created by KhangNDD on 6/14/2017.
 */
var SquareService = function () {
};

/**
 * Create square array by input size
 * @param params
 * @returns {Array}
 */
SquareService.prototype.createSquareBySize = function (params) {
    var size = params.size;
    var initialArray = new Array(size);
    var initialValue = 0;

    for (var i = 0; i < size; i++) {
        initialArray[i] = new Array(size);

        for (var j = 0; j < size; j++) {
            initialArray[i][j] = initialValue++;
        }
    }

    return initialArray;
};

SquareService.prototype.swapRows = function (params) {
    var array = params.array;

    for (var i = 0, k = array.length - 1; i < k; ++i, --k) {
        var x = array[i];
        array[i] = array[k];
        array[k] = x;
    }

    return array;
};

SquareService.prototype.transpose = function (params) {
    var array = params.array;

    for (var i = 0; i < array.length; i++) {
        for (var j = i; j < array[0].length; j++) {
            var x = array[i][j];
            array[i][j] = array[j][i];
            array[j][i] = x;
        }
    }

    return array;
};

/**
 * Rotate square (array) by ninety clockwise
 * @param {Object} params
 * @param {Array} params.array
 * @returns {Array}
 */
SquareService.prototype.rotateByNinetyToRight = function (params) {
    var self = this;
    var array = params.array;

    array = self.swapRows({
        array: array
    });

    array = self.transpose({
        array: array
    });

    return array;
};

/**
 * Get inner square by top-left position and bottom-right position
 * @param {Object} params
 * @param {Array} params.array
 * @param {Object} params.topLeftPosition
 * @param {Object} params.bottomRightPosition
 * @returns {Array}
 */
SquareService.prototype.getInnerSquare = function (params) {
    var array = params.array,
        topLeftPosition = params.topLeftPosition,
        bottomRightPosition = params.bottomRightPosition,
        innerSquareSize = (bottomRightPosition.y - topLeftPosition.y) + 1,
        innerSquare = new Array(innerSquareSize);

    for (var i = 0; i < innerSquareSize; i++) {
        innerSquare[i] = new Array(innerSquareSize);

        for (var j = 0; j < innerSquareSize; j++) {
            innerSquare[i][j] = array[i + topLeftPosition.y][j + topLeftPosition.x];
        }
    }

    return innerSquare;
};

/**
 * Set inner-square back to bigger array
 * @param {Object} params
 * @param {Array} params.array
 * @param {Object} params.topLeftPosition
 * @param {Object} params.bottomRightPosition
 * @param {Array} params.innerSquare
 * @returns {Array}
 */
SquareService.prototype.setInnerSquareBackToArray = function (params) {
    var array = params.array,
        topLeftPosition = params.topLeftPosition,
        bottomRightPosition = params.bottomRightPosition,
        innerSquareSize = (bottomRightPosition.y - topLeftPosition.y) + 1,
        innerSquare = params.innerSquare;

    for (var i = 0; i < innerSquareSize; i++) {
        for (var j = 0; j < innerSquareSize; j++) {
            array[i + topLeftPosition.y][j + topLeftPosition.x] = innerSquare[i][j];
        }
    }

    return array;
};

/**
 * Rotate inner-square by ninety to right
 * @param {Object} params
 * @param {Array} params.array
 * @param {Object} params.topLeftPosition
 * @param {Object} params.bottomRightPosition
 * @returns {Array}
 */
SquareService.prototype.rotateInnerSquareByNinetyToRight = function (params) {
    var self = this,
        array = params.array,
        topLeftPosition = params.topLeftPosition,
        bottomRightPosition = params.bottomRightPosition;

    var innerSquare = self.getInnerSquare({
        array: array,
        topLeftPosition: topLeftPosition,
        bottomRightPosition: bottomRightPosition
    });

    innerSquare = self.rotateByNinetyToRight({
        array: innerSquare
    });

    array = self.setInnerSquareBackToArray({
        array: array,
        topLeftPosition: topLeftPosition,
        bottomRightPosition: bottomRightPosition,
        innerSquare: innerSquare
    });

    return array;
};

module.exports = new SquareService();