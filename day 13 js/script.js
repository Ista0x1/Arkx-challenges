function selectionSort(arr) {
    let n = arr.length;

    for(let i = 0; i < n - 1; i++) {
        let minIndex = i;

        for(let j = i + 1; j < n; j++) {
            if(arr[j] < arr[minIndex]) {
                minIndex = j;
            }
        }
        if(minIndex !== i) {
            let temp = arr[i];
            arr[i] = arr[minIndex];
            arr[minIndex] = temp;
        }
    }

    return arr;
}

const numbers = [64, 34, 25, 12, 22, 11, 90];
console.log(selectionSort(numbers)); 



function bubbleSort(arr) {
    let n = arr.length;
    let swapped;

    do {
        swapped = false;
        for(let i = 0; i < n - 1; i++) {
            // If the element on the left is greater than the one on the right, swap them
            if(arr[i] > arr[i + 1]) {
                let temp = arr[i];
                arr[i] = arr[i + 1];
                arr[i + 1] = temp;
                swapped = true; // Indicates that a swap occurred
            }
        }
        n--; // Decrease n since the highest element in the sequence is now correctly positioned
    } while(swapped); // If no two elements were swapped by the inner loop, the array is sorted

    return arr;
}

// Test
const numbers2 = [64, 34, 25, 12, 22, 11, 90];
console.log(bubbleSort(numbers2)); // Output: [11, 12, 22, 25, 34, 64, 90]


function insertionSort(arr) {
    for(let i = 1; i < arr.length; i++) {
        let key = arr[i];
        let j = i - 1;
        
        while(j >= 0 && arr[j] > key) {
            arr[j + 1] = arr[j];
            j--;
        }
        arr[j + 1] = key;
    }

    return arr;
}

const numbers1 = [64, 34, 25, 12, 22, 11, 90];
console.log(insertionSort(numbers1));  // [11, 12, 22, 25, 34, 64, 90]

function linearSearch(arr, target) {
    for(let i = 0; i < arr.length; i++) {
        if(arr[i] === target) {
            return i; // Return the position of the element in the array
        }
    }
    return -1; // Return -1 if the element is not found
}

const numbers0 = [64, 34, 25, 12, 22, 11, 90];
const target = 22;
const result = linearSearch(numbers0, target);
if(result !== -1) {
    console.log(`Element found at position: ${result}`);
} else {
    console.log('Element not found.');
}
function countZeros(matrix) {
    let count = 0;
    for(let i = 0; i < matrix.length; i++) {
        for(let j = 0; j < matrix[i].length; j++) {
            if(matrix[i][j] === 0) {
                count++;
            }
        }
    }
    return count;
}

const matrix = [
    [1, 0, 2, 0, 3],
    [0, 4, 0, 5, 0],
    [6, 0, 7, 8, 0]
];

console.log(`Number of zeros in the matrix: ${countZeros(matrix)}`);

