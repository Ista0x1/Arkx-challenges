function countOccurrences(arr, element) {
    let count = 0;
    for (let i = 0; i < arr.length; i++) {
        if (arr[i] === element) {
            count++;
        }
    }
    return count;
}

const numbers = [1, 2, 3, 4, 2, 2, 5];
console.log(countOccurrences(numbers, 2));  // Outputs: 3


function findMinMax(arr) {
    if (arr.length === 0) {
        return "The array is empty!";
    }

    let max = arr[0];
    let min = arr[0];

    for (let i = 1; i < arr.length; i++) {
        if (arr[i] > max) {
            max = arr[i];
        }
        if (arr[i] < min) {
            min = arr[i];
        }
    }

    return {
        max: max,
        min: min
    };
}

// Example usage:
const numbers = [3, 7, 2, 1, 9, 4, 5];
const result = findMinMax(numbers);
console.log(`Max number: ${result.max}`);
console.log(`Min number: ${result.min}`);
