// Global variables
let array = [];
let arraySize = getResponsiveArraySize();
let isSorting = false;
let comparisonCount = 0;
let swapCount = 0;
let animationSpeed = 100;

// Function to get responsive array size based on screen width
function getResponsiveArraySize() {
    const screenWidth = window.innerWidth;
    if (screenWidth < 480) return 12; // Mobile
    if (screenWidth < 768) return 15; // Tablet
    if (screenWidth < 1024) return 18; // Small desktop
    return 20; // Large desktop
}

// Algorithm information
const algorithmInfo = {
    bubble: {
        name: "Bubble Sort",
        description: "A simple sorting algorithm that repeatedly steps through the list, compares adjacent elements and swaps them if they are in the wrong order. It gets its name from the way smaller elements 'bubble' to the top of the list.",
        timeComplexity: "O(n²)",
        spaceComplexity: "O(1)",
        bestCase: "O(n) - when array is already sorted",
        worstCase: "O(n²) - when array is reverse sorted",
        stable: "Yes",
        inPlace: "Yes"
    },
    selection: {
        name: "Selection Sort",
        description: "Divides the array into a sorted and unsorted region. Repeatedly selects the smallest element from the unsorted region and places it at the end of the sorted region. Simple but inefficient on large lists.",
        timeComplexity: "O(n²)",
        spaceComplexity: "O(1)",
        bestCase: "O(n²) - same as worst case",
        worstCase: "O(n²) - same as best case",
        stable: "No",
        inPlace: "Yes"
    },
    insertion: {
        name: "Insertion Sort",
        description: "Builds the final sorted array one item at a time. It is much less efficient on large lists than more advanced algorithms such as quicksort, heapsort, or merge sort.",
        timeComplexity: "O(n²)",
        spaceComplexity: "O(1)",
        bestCase: "O(n) - when array is already sorted",
        worstCase: "O(n²) - when array is reverse sorted",
        stable: "Yes",
        inPlace: "Yes"
    },
    merge: {
        name: "Merge Sort",
        description: "A divide-and-conquer algorithm that recursively breaks down the array into smaller subarrays until each has only one element, then merges them back together in sorted order.",
        timeComplexity: "O(n log n)",
        spaceComplexity: "O(n)",
        bestCase: "O(n log n) - same as worst case",
        worstCase: "O(n log n) - same as best case",
        stable: "Yes",
        inPlace: "No"
    },
    quick: {
        name: "Quick Sort",
        description: "A divide-and-conquer algorithm that picks a 'pivot' element and partitions the array around it, placing smaller elements to the left and larger to the right.",
        timeComplexity: "O(n log n)",
        spaceComplexity: "O(log n)",
        bestCase: "O(n log n) - when pivot divides array evenly",
        worstCase: "O(n²) - when pivot is always smallest/largest",
        stable: "No",
        inPlace: "Yes"
    },
    heap: {
        name: "Heap Sort",
        description: "Uses a binary heap data structure to sort elements. First builds a max heap, then repeatedly extracts the maximum element and places it at the end.",
        timeComplexity: "O(n log n)",
        spaceComplexity: "O(1)",
        bestCase: "O(n log n) - same as worst case",
        worstCase: "O(n log n) - same as best case",
        stable: "No",
        inPlace: "Yes"
    }
};

// DOM elements
const arrayContainer = document.getElementById('array-container');
const generateBtn = document.getElementById('generate-btn');
const algorithmButtons = document.querySelectorAll('.algo-btn');
const algorithmInfoDiv = document.getElementById('algorithm-info');
const comparisonCountSpan = document.getElementById('comparison-count');
const swapCountSpan = document.getElementById('swap-count');

// Initialize the application
function init() {
    generateArray();
    setupEventListeners();
    updateAlgorithmInfo('bubble');
    
    // Add resize listener for responsive design
    let resizeTimeout;
    window.addEventListener('resize', () => {
        clearTimeout(resizeTimeout);
        resizeTimeout = setTimeout(() => {
            const newArraySize = getResponsiveArraySize();
            if (newArraySize !== arraySize && !isSorting) {
                arraySize = newArraySize;
                generateArray();
            } else if (!isSorting) {
                renderArray();
            }
        }, 250); // Debounce resize events
    });
}

// Setup event listeners
function setupEventListeners() {
    generateBtn.addEventListener('click', generateArray);
    
    algorithmButtons.forEach(btn => {
        btn.addEventListener('click', () => {
            if (!isSorting) {
                const algorithm = btn.dataset.algorithm;
                selectAlgorithm(algorithm);
                startSorting(algorithm);
            }
        });
    });
}

// Generate a new random array
function generateArray() {
    if (isSorting) return;
    
    array = [];
    for (let i = 0; i < arraySize; i++) {
        array.push(Math.floor(Math.random() * 50) + 10);
    }
    
    renderArray();
    resetMetrics();
}

// Render the array as bars
function renderArray() {
    arrayContainer.innerHTML = '';
    
    // Calculate responsive bar width based on container size
    const containerWidth = arrayContainer.offsetWidth;
    const barWidth = Math.max(15, Math.min(50, (containerWidth - (arraySize * 2)) / arraySize));
    
    array.forEach((value, index) => {
        const bar = document.createElement('div');
        bar.className = 'array-bar';
        bar.style.height = `${value * 3}px`;
        bar.style.width = `${barWidth}px`;
        
        const valueLabel = document.createElement('div');
        valueLabel.className = 'array-bar-value';
        valueLabel.textContent = value;
        
        bar.appendChild(valueLabel);
        arrayContainer.appendChild(bar);
    });
}

// Select algorithm and update info
function selectAlgorithm(algorithm) {
    algorithmButtons.forEach(btn => btn.classList.remove('active'));
    document.querySelector(`[data-algorithm="${algorithm}"]`).classList.add('active');
    updateAlgorithmInfo(algorithm);
}

// Update algorithm information
function updateAlgorithmInfo(algorithm) {
    const info = algorithmInfo[algorithm];
    if (info) {
        algorithmInfoDiv.innerHTML = `
            <p><strong>${info.name}</strong></p>
            <p>${info.description}</p>
            <p><strong>Time Complexity:</strong> ${info.timeComplexity}</p>
            <p><strong>Space Complexity:</strong> ${info.spaceComplexity}</p>
            <p><strong>Best Case:</strong> ${info.bestCase}</p>
            <p><strong>Worst Case:</strong> ${info.worstCase}</p>
            <p><strong>Stable:</strong> ${info.stable}</p>
            <p><strong>In-Place:</strong> ${info.inPlace}</p>
        `;
        
        // timeComplexitySpan.textContent = info.timeComplexity; // Removed
        // spaceComplexitySpan.textContent = info.spaceComplexity; // Removed
    }
}

// Reset metrics
function resetMetrics() {
    comparisonCount = 0;
    swapCount = 0;
    updateMetrics();
}

// Update metrics display
function updateMetrics() {
    comparisonCountSpan.textContent = comparisonCount;
    swapCountSpan.textContent = swapCount;
}

// Start sorting
async function startSorting(algorithm) {
    if (isSorting) return;
    
    isSorting = true;
    generateBtn.disabled = true;
    algorithmButtons.forEach(btn => btn.disabled = true);
    
    resetMetrics();
    
    switch (algorithm) {
        case 'bubble':
            await bubbleSort();
            break;
        case 'selection':
            await selectionSort();
            break;
        case 'insertion':
            await insertionSort();
            break;
        case 'merge':
            await mergeSort();
            break;
        case 'quick':
            await quickSort();
            break;
        case 'heap':
            await heapSort();
            break;
    }
    
    isSorting = false;
    generateBtn.disabled = false;
    algorithmButtons.forEach(btn => btn.disabled = false);
}

// Utility functions for visualization
function getBar(index) {
    return arrayContainer.children[index];
}

function updateBar(index, value, className = '') {
    const bar = getBar(index);
    bar.style.height = `${value * 3}px`;
    bar.className = `array-bar ${className}`;
    bar.querySelector('.array-bar-value').textContent = value;
}

function compareBars(index1, index2) {
    comparisonCount++;
    updateMetrics();
    
    getBar(index1).classList.add('comparing');
    getBar(index2).classList.add('comparing');
    
    return new Promise(resolve => {
        setTimeout(() => {
            getBar(index1).classList.remove('comparing');
            getBar(index2).classList.remove('comparing');
            resolve();
        }, animationSpeed);
    });
}

function swapBars(index1, index2) {
    swapCount++;
    updateMetrics();
    
    const temp = array[index1];
    array[index1] = array[index2];
    array[index2] = temp;
    
    getBar(index1).classList.add('swapping');
    getBar(index2).classList.add('swapping');
    
    return new Promise(resolve => {
        setTimeout(() => {
            updateBar(index1, array[index1]);
            updateBar(index2, array[index2]);
            getBar(index1).classList.remove('swapping');
            getBar(index2).classList.remove('swapping');
            resolve();
        }, animationSpeed);
    });
}

function markSorted(index) {
    getBar(index).classList.add('sorted');
}

// Sorting Algorithms

// Bubble Sort
async function bubbleSort() {
    for (let i = 0; i < array.length - 1; i++) {
        for (let j = 0; j < array.length - i - 1; j++) {
            await compareBars(j, j + 1);
            
            if (array[j] > array[j + 1]) {
                await swapBars(j, j + 1);
            }
        }
        markSorted(array.length - i - 1);
    }
    markSorted(0);
}

// Selection Sort
async function selectionSort() {
    for (let i = 0; i < array.length - 1; i++) {
        let minIndex = i;
        
        for (let j = i + 1; j < array.length; j++) {
            await compareBars(minIndex, j);
            
            if (array[j] < array[minIndex]) {
                minIndex = j;
            }
        }
        
        if (minIndex !== i) {
            await swapBars(i, minIndex);
        }
        markSorted(i);
    }
    markSorted(array.length - 1);
}

// Insertion Sort
async function insertionSort() {
    for (let i = 1; i < array.length; i++) {
        let key = array[i];
        let j = i - 1;
        
        while (j >= 0) {
            await compareBars(j, j + 1);
            
            if (array[j] > key) {
                array[j + 1] = array[j];
                updateBar(j + 1, array[j + 1], 'swapping');
                await new Promise(resolve => setTimeout(resolve, animationSpeed));
                j--;
            } else {
                break;
            }
        }
        
        array[j + 1] = key;
        updateBar(j + 1, key);
        
        // Mark all elements up to i as sorted
        for (let k = 0; k <= i; k++) {
            markSorted(k);
        }
    }
}

// Merge Sort
async function mergeSort() {
    await mergeSortHelper(0, array.length - 1);
}

async function mergeSortHelper(start, end) {
    if (start < end) {
        const mid = Math.floor((start + end) / 2);
        
        await mergeSortHelper(start, mid);
        await mergeSortHelper(mid + 1, end);
        await merge(start, mid, end);
    }
}

async function merge(start, mid, end) {
    const left = array.slice(start, mid + 1);
    const right = array.slice(mid + 1, end + 1);
    
    let i = 0, j = 0, k = start;
    
    while (i < left.length && j < right.length) {
        comparisonCount++;
        updateMetrics();
        
        if (left[i] <= right[j]) {
            array[k] = left[i];
            updateBar(k, left[i], 'merge');
            i++;
        } else {
            array[k] = right[j];
            updateBar(k, right[j], 'merge');
            j++;
        }
        
        await new Promise(resolve => setTimeout(resolve, animationSpeed));
        k++;
    }
    
    while (i < left.length) {
        array[k] = left[i];
        updateBar(k, left[i], 'merge');
        await new Promise(resolve => setTimeout(resolve, animationSpeed));
        i++;
        k++;
    }
    
    while (j < right.length) {
        array[k] = right[j];
        updateBar(k, right[j], 'merge');
        await new Promise(resolve => setTimeout(resolve, animationSpeed));
        j++;
        k++;
    }
    
    // Mark merged section as sorted
    for (let m = start; m <= end; m++) {
        markSorted(m);
    }
}

// Quick Sort
async function quickSort() {
    await quickSortHelper(0, array.length - 1);
}

async function quickSortHelper(start, end) {
    if (start < end) {
        const pivotIndex = await partition(start, end);
        await quickSortHelper(start, pivotIndex - 1);
        await quickSortHelper(pivotIndex + 1, end);
    }
}

async function partition(start, end) {
    const pivot = array[start];
    getBar(start).classList.add('pivot');
    
    let i = start + 1;
    let j = end;
    
    while (i <= j) {
        while (i <= j && array[i] <= pivot) {
            await compareBars(start, i);
            i++;
        }
        
        while (i <= j && array[j] > pivot) {
            await compareBars(start, j);
            j--;
        }
        
        if (i < j) {
            await swapBars(i, j);
        }
    }
    
    await swapBars(start, j);
    getBar(j).classList.remove('pivot');
    markSorted(j);
    
    return j;
}

// Heap Sort
async function heapSort() {
    // Build max heap
    for (let i = Math.floor(array.length / 2) - 1; i >= 0; i--) {
        await heapify(array.length, i);
    }
    
    // Extract elements from heap one by one
    for (let i = array.length - 1; i > 0; i--) {
        await swapBars(0, i);
        markSorted(i);
        await heapify(i, 0);
    }
    markSorted(0);
}

async function heapify(n, i) {
    let largest = i;
    const left = 2 * i + 1;
    const right = 2 * i + 2;
    
    if (left < n) {
        await compareBars(largest, left);
        if (array[left] > array[largest]) {
            largest = left;
        }
    }
    
    if (right < n) {
        await compareBars(largest, right);
        if (array[right] > array[largest]) {
            largest = right;
        }
    }
    
    if (largest !== i) {
        await swapBars(i, largest);
        await heapify(n, largest);
    }
}

// Initialize the application when the page loads
document.addEventListener('DOMContentLoaded', init);
