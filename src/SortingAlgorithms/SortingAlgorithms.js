export function getMergeSortAnimations(array) {
  const animations = [];
  if (array.length <= 1) return array;
  const auxArray = array.slice();
  mergeSortHelper(array, 0, array.length - 1, auxArray, animations);
  return animations;
}

function mergeSortHelper(mainArray, startIndx, endIndx, auxArray, animations) {
  if (startIndx === endIndx) return;
  const mid = Math.floor((startIndx + endIndx) / 2);

  mergeSortHelper(auxArray, startIndx, mid, mainArray, animations);
  mergeSortHelper(auxArray, mid + 1, endIndx, mainArray, animations);
  doMerge(mainArray, startIndx, mid, endIndx, auxArray, animations);
}

function doMerge(mainArray, startIndx, mid, endIndx, auxArray, animations) {
  let k = startIndx;
  let i = startIndx;
  let j = mid + 1;

  while (i <= mid && j <= endIndx) {
    // These are the values that we're comparing; we push them once
    // to change their color.
    animations.push([i, j]);
    // These are the values that we're comparing; we push them a second
    // time to revert their color.
    animations.push([i, j]);

    if (auxArray[i] <= auxArray[j]) {
      // We overwrite the value at index k in the original array with the
      // value at index i in the auxiliary array.
      animations.push([k, auxArray[i]]);
      mainArray[k++] = auxArray[i++];
    } else {
      / We overwrite the value at index k in the original array with the
      // value at index j in the auxiliary array.
      animations.push([k, auxArray[j]]);
      mainArray[k++] = auxArray[j++];
    }
  }

  while (i <= mid) {
    // These are the values that we're comparing; we push them once
    // to change their color.
    animations.push([i, i]);
    // We overwrite the value at index k in the original array with the
    // value at index i in the auxiliary array.
    animations.push([i, i]);
    // We overwrite the value at index k in the original array with the
    // value at index i in the auxiliary array.
    animations.push([k, auxArray[i]]);
    mainArray[k++] = auxArray[i++];
  }

  while (j <= endIndx) {
    animations.push([j, j]);
    animations.push([j, j]);
    animations.push([k, auxArray[j]]);
    mainArray[k++] = auxArray[j++];
  }
}
