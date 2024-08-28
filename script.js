document.addEventListener("DOMContentLoaded", () => {
  // Initialize sorting sections
  initializeSort(document.querySelector(".bubble"), bubbleSort);
  initializeSort(document.querySelector(".insertion"), insertionSort);
  initializeSort(document.querySelector(".merge"), mergeSort);
  initializeSort(document.querySelector(".selection"), selectionSort);
});

function initializeSort(sortContainer, sortFunction) {
  const generateRandom = sortContainer.querySelector("#generateRandom");
  const start = sortContainer.querySelector("#start");

  generateRandomArray(sortContainer);
  generateRandom.addEventListener("click", () =>
    generateRandomArray(sortContainer)
  );
  start.addEventListener("click", () =>
    processInput(sortContainer, sortFunction)
  );
}

function generateRandomArray(sortContainer) {
  const numberInput = sortContainer.querySelector("#number-input").value;
  const number = parseInt(numberInput) || 10;
  const randomArray = Array.from(
    { length: number },
    () => Math.floor(Math.random() * 100) + 1
  );
  sortContainer.querySelector("#array-input").value = randomArray.join(", ");
  visualizeArray(randomArray, sortContainer);
}

function processInput(sortContainer, sortFunction) {
  const input = sortContainer.querySelector("#array-input").value;
  let array = parseInput(input);
  const ms = sortContainer.querySelector("#speed").value;
  visualizeArray(array, sortContainer);
  sortFunction(array, ms, sortContainer);
}

function parseInput(input) {
  return input
    .split(/[\s,]+/)
    .map(Number)
    .filter((n) => !isNaN(n));
}

function visualizeArray(arr, sortContainer) {
  const barContainer = sortContainer.querySelector(".bars");
  barContainer.innerHTML = "";

  // Function to set the dynamic height of the bar container
  function setDynamicHeight() {
    const viewportHeight = window.innerHeight;
    const containerHeight = viewportHeight - viewportHeight * 0.45; // Equivalent to calc(100dvh - 40%)
    barContainer.style.height = `${containerHeight}px`;
  }

  // Call setDynamicHeight on page load
  setDynamicHeight();

  // Update on window resize
  window.addEventListener("resize", setDynamicHeight);

  // Now calculate the width of the bars and maximum value
  const containerWidth = barContainer.clientWidth;
  const barWidth = (containerWidth - (arr.length - 1) * 4) / arr.length;
  const maxValue = Math.max(...arr);
  const maxHeight = parseFloat(getComputedStyle(barContainer).height);

  arr.forEach((value) => {
    const bar = document.createElement("div");
    bar.className = "bar";
    const barHeight = (value / maxValue) * maxHeight;

    bar.style.height = `${barHeight}px`;
    bar.style.width = `${barWidth}px`;
    bar.textContent = value;
    barContainer.appendChild(bar);
  });
}


function highlightElements(sortContainer, idx1, idx2) {
  const bars = sortContainer.querySelectorAll(".bar");
  if (bars[idx1]) bars[idx1].style.backgroundColor = "green";
  if (bars[idx2]) bars[idx2].style.backgroundColor = "green";
}

function unhighlightElements(sortContainer, idx1, idx2) {
  const bars = sortContainer.querySelectorAll(".bar");
  if (bars[idx1]) bars[idx1].style.backgroundColor = "black";
  if (bars[idx2]) bars[idx2].style.backgroundColor = "black";
}

function blinkAllBars(sortContainer) {
  const bars = sortContainer.querySelectorAll(".bar");
  let isGreen = false;
  const interval = setInterval(() => {
    bars.forEach(
      (bar) => (bar.style.backgroundColor = isGreen ? "green" : "black")
    );
    isGreen = !isGreen;
  }, 200);

  setTimeout(() => {
    clearInterval(interval);
    bars.forEach((bar) => (bar.style.backgroundColor = "black"));
  }, 1000);
}

// Bubble sort visualization
function bubbleSort(arr, ms, sortContainer) {
  let i = 0;
  let j = 0;

  function step() {
    if (i < arr.length - 1) {
      if (j < arr.length - 1 - i) {
        highlightElements(sortContainer, j, j + 1);

        setTimeout(() => {
          if (arr[j] > arr[j + 1]) {
            [arr[j], arr[j + 1]] = [arr[j + 1], arr[j]];
            visualizeArray(arr, sortContainer);
          }

          unhighlightElements(sortContainer, j, j + 1);
          j++;
          step();
        }, ms);
      } else {
        j = 0;
        i++;
        setTimeout(step, ms);
      }
    } else {
      sortContainer.querySelector("#array-input").value = arr.join(", ");
      blinkAllBars(sortContainer);
    }
  }

  step();
}

// Insertion sort visualization
function insertionSort(arr, ms, sortContainer) {
  let i = 1;
  let j = 0;

  function step() {
    if (i < arr.length) {
      if (j >= 0 && arr[j] > arr[j + 1]) {
        highlightElements(sortContainer, j, j + 1);

        setTimeout(() => {
          [arr[j], arr[j + 1]] = [arr[j + 1], arr[j]];
          visualizeArray(arr, sortContainer);

          unhighlightElements(sortContainer, j, j + 1);
          j--;
          step();
        }, ms);
      } else {
        i++;
        j = i - 1;
        setTimeout(step, ms);
      }
    } else {
      sortContainer.querySelector("#array-input").value = arr.join(", ");
      blinkAllBars(sortContainer);
    }
  }

  step();
}

//  Selection sort visualization
function selectionSort(arr, ms, sortContainer) {
  let i = 0;
  let minIndex = 0;

  function step() {
    if (i < arr.length - 1) {
      minIndex = i;

      let j = i + 1;

      function innerStep() {
        if (j < arr.length) {
          highlightElements(sortContainer, i, j);

          setTimeout(() => {
            if (arr[j] < arr[minIndex]) {
              minIndex = j;
            }

            unhighlightElements(sortContainer, j);

            // Continue with the next element
            j++;
            innerStep();
          }, ms);
        } else {
          highlightElements(sortContainer, minIndex);

          setTimeout(() => {
            // Swap the minimum element with the first unsorted element
            [arr[i], arr[minIndex]] = [arr[minIndex], arr[i]];
            visualizeArray(arr, sortContainer);

            unhighlightElements(sortContainer, minIndex);
            unhighlightElements(sortContainer, i);
            i++;
            step();
          }, ms);
        }
      }

      innerStep();
    } else {
      sortContainer.querySelector("#array-input").value = arr.join(", ");
      blinkAllBars(sortContainer);
    }
  }

  step();
}

//  Merge sort visualization
function mergeSort(arr, ms, sortContainer) {
  const auxiliaryArray = arr.slice();

  // Helper function to handle merging with delay for visualization
  function mergeSortHelper(start, end) {
    if (start >= end) return Promise.resolve();

    const mid = Math.floor((start + end) / 2);
    return mergeSortHelper(start, mid)
      .then(() => mergeSortHelper(mid + 1, end))
      .then(
        () =>
          new Promise((resolve) => {
            setTimeout(() => {
              merge(start, mid, end);
              resolve();
            }, ms * (end - start)); // Delay for visualization
          })
      );
  }

  function merge(start, mid, end) {
    let leftIndex = start;
    let rightIndex = mid + 1;
    const tempArray = [];
    let stepCount = 0;

    function processMergeStep() {
      if (leftIndex <= mid && rightIndex <= end) {
        highlightElements(sortContainer, leftIndex, rightIndex);

        setTimeout(() => {
          if (auxiliaryArray[leftIndex] <= auxiliaryArray[rightIndex]) {
            tempArray.push(auxiliaryArray[leftIndex++]);
          } else {
            tempArray.push(auxiliaryArray[rightIndex++]);
          }

          unhighlightElements(sortContainer, leftIndex - 1, rightIndex - 1);
          stepCount++;

          if (stepCount < mid - start + 1 + (end - mid)) {
            processMergeStep();
          } else {
            finalizeMerge();
          }
        }, ms);
      } else {
        finalizeMerge();
      }
    }

    function finalizeMerge() {
      while (leftIndex <= mid) {
        tempArray.push(auxiliaryArray[leftIndex++]);
      }

      while (rightIndex <= end) {
        tempArray.push(auxiliaryArray[rightIndex++]);
      }

      for (let i = start; i <= end; i++) {
        auxiliaryArray[i] = tempArray[i - start];
      }

      visualizeArray(auxiliaryArray, sortContainer);
    }

    processMergeStep();
  }

  // Start merge sort and handle the final visualization
  mergeSortHelper(0, arr.length - 1).then(() => {
    // Ensure final visualization after all sorting is complete
    setTimeout(() => {
      visualizeArray(auxiliaryArray, sortContainer);
      blinkAllBars(sortContainer);
      sortContainer.querySelector("#array-input").value =
        auxiliaryArray.join(", ");
    }, ms * arr.length); // Adjust the delay as needed
  });
}

// function call stack need to know after this from sir
