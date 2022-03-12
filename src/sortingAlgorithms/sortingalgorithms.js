export function getMergeSortAnimations(array) {
    const animations = [];
    if (array.length <= 1) return array;
    const auxilArray = array.slice();
    mergeSortHelper(array, 0, array.length - 1, auxilArray, animations);
    return animations;
}

function mergeSortHelper(mainArray, startIndex, endIndex, auxilArray, animations) {
    if (startIndex === endIndex) return;
    const midIndex = Math.floor((startIndex + endIndex) / 2);
    mergeSortHelper(auxilArray, startIndex, midIndex, mainArray, animations);
    mergeSortHelper(auxilArray, midIndex + 1, endIndex, mainArray, animations);
    doMerge(mainArray, startIndex, midIndex, endIndex, auxilArray, animations);
}

function doMerge(mainArray, startIndex, midIndex, endIndex, auxilArray, animations) {
    let k = startIndex;
    let i = startIndex;
    let j = midIndex + 1;
    while (i <= midIndex && j <= endIndex) {
        animations.push([i, j]);
        animations.push([i, j]);
        if (auxilArray[i] <= auxilArray[j]) {
            animations.push([k, auxilArray[i]]);
            mainArray[k++] = auxilArray[i++];
        } else {
            animations.push([k, auxilArray[j]]);
            mainArray[k++] = auxilArray[j++];
        }
    }
    while (i <= midIndex) {
        animations.push([i, i]);
        animations.push([i, i]);
        animations.push([k, auxilArray[i]]);
        mainArray[k++] = auxilArray[i++];
    }
    while (j <= endIndex) {
        animations.push([j, j]);
        animations.push([j, j]);
        animations.push([k, auxilArray[j]]);
        mainArray[k++] = auxilArray[j++];
    }
}