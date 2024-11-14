type MultiDimensionalArray = (number | MultiDimensionalArray)[];

var flat = function (arr: MultiDimensionalArray, n: number): MultiDimensionalArray {
    // Helper function to flatten array with depth tracking
    function flattenHelper(inputArr: MultiDimensionalArray, depth: number): MultiDimensionalArray {
        let result: MultiDimensionalArray = [];
        
        for (let element of inputArr) {
            if (Array.isArray(element) && depth < n) {
                // If depth is less than n, flatten this sub-array further
                //Use result.push(...flattenHelper(...)) to add all elements in the flattened array to result
                result.push(...flattenHelper(element, depth + 1));
            } else {
                // If depth >= n or element is not an array, add it to the result as is
                result.push(element);
            }
        }
        
        return result;
    }
    
    return flattenHelper(arr, 0);
};
// Example test cases:

// Test case 1: Flatten to depth 0 (no flattening)
const arr1 = [1, 2, 3, [4, 5, 6], [7, 8, [9, 10, 11], 12], [13, 14, 15]];
const result1 = flat(arr1, 0);
console.log("Test 1 (n=0):", result1);

// Test case 2: Flatten to depth 1
const arr2 = [1, 2, 3, [4, 5, 6], [7, 8, [9, 10, 11], 12], [13, 14, 15]];
const result2 = flat(arr2, 1);
console.log("Test 2 (n=1):", result2);

// Test case 3: Flatten to depth 2
const arr3 = [[1, 2, 3], [4, 5, 6], [7, 8, [9, 10, 11], 12], [13, 14, 15]];
const result3 = flat(arr3, 2);
console.log("Test 3 (n=2):", result3);