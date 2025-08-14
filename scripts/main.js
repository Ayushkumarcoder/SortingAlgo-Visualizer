

//Variables (BE CAREFUL THESE MIGHT BE USED IN OTHER JS FILES TOO)
var inp_as=document.getElementById('a_size'),array_size=inp_as.value;
var inp_gen=document.getElementById("a_generate");
var inp_aspeed=document.getElementById("a_speed");
var inp_compare=document.getElementById("compare_algorithms");

//var array_speed=document.getElementById('a_speed').value;

var butts_algos=document.querySelectorAll(".algos button");

var div_sizes=[];
var divs=[];
var margin_size;
var cont=document.getElementById("array_container");
var bars_cont=document.getElementById("array_bars");
var labels_cont=document.getElementById("array_labels");

cont.style="flex-direction:column";

// Statistics tracking - make globally accessible
var comparison_count = 0;
var swap_count = 0;
var algorithm_results = {};

// Make statistics globally accessible
window.comparison_count = comparison_count;
window.swap_count = swap_count;
window.algorithm_results = algorithm_results;

// Algorithm information - make it globally accessible
window.algorithm_info = {
    "Bubble": {
        name: "Bubble Sort",
        description: "A simple sorting algorithm that repeatedly steps through the list, compares adjacent elements and swaps them if they are in the wrong order.",
        time_complexity: "O(n²)",
        space_complexity: "O(1)",
        best_case: "O(n) - when array is already sorted",
        worst_case: "O(n²) - when array is reverse sorted",
        stable: "Yes",
        in_place: "Yes"
    },
    "Selection": {
        name: "Selection Sort",
        description: "Divides the array into a sorted and unsorted region, repeatedly selects the smallest element from the unsorted region and places it at the end of the sorted region.",
        time_complexity: "O(n²)",
        space_complexity: "O(1)",
        best_case: "O(n²) - same as worst case",
        worst_case: "O(n²) - same as best case",
        stable: "No",
        in_place: "Yes"
    },
    "Insertion": {
        name: "Insertion Sort",
        description: "Builds the final sorted array one item at a time, by repeatedly inserting a new element into the sorted portion of the array.",
        time_complexity: "O(n²)",
        space_complexity: "O(1)",
        best_case: "O(n) - when array is already sorted",
        worst_case: "O(n²) - when array is reverse sorted",
        stable: "Yes",
        in_place: "Yes"
    },
    "Merge": {
        name: "Merge Sort",
        description: "A divide-and-conquer algorithm that recursively breaks down the array into smaller subarrays until each has only one element, then merges them back together in sorted order.",
        time_complexity: "O(n log n)",
        space_complexity: "O(n)",
        best_case: "O(n log n) - same as worst case",
        worst_case: "O(n log n) - same as best case",
        stable: "Yes",
        in_place: "No"
    },
    "Quick": {
        name: "Quick Sort",
        description: "A divide-and-conquer algorithm that picks a 'pivot' element and partitions the array around it, placing smaller elements to the left and larger to the right.",
        time_complexity: "O(n log n)",
        space_complexity: "O(log n)",
        best_case: "O(n log n) - when pivot divides array evenly",
        worst_case: "O(n²) - when pivot is always smallest/largest",
        stable: "No",
        in_place: "Yes"
    },
    "Heap": {
        name: "Heap Sort",
        description: "Uses a binary heap data structure to sort elements. First builds a max heap, then repeatedly extracts the maximum element and places it at the end.",
        time_complexity: "O(n log n)",
        space_complexity: "O(1)",
        best_case: "O(n log n) - same as worst case",
        worst_case: "O(n log n) - same as best case",
        stable: "No",
        in_place: "Yes"
    }
};

// Also make algorithm_results globally accessible
window.algorithm_results = algorithm_results;

//Array generation and updation.
inp_gen.addEventListener("click",generate_array);
inp_as.addEventListener("input",update_array_size);
inp_compare.addEventListener("click",compare_all_algorithms);

function generate_array()
{
    bars_cont.innerHTML="";
    labels_cont.innerHTML="";
    divs = [];
    div_sizes = [];

    for(var i=0;i<array_size;i++)
    {
        div_sizes[i]=Math.floor(Math.random() * 0.5*(inp_as.max - inp_as.min) ) + 10;
        
        // Create bar container
        var bar_container = document.createElement("div");
        bar_container.className = "array-bar";
        bar_container.style = "margin:0% 0.1%; width:" + (100/array_size-0.2) + "%; height:" + (div_sizes[i]) + "%; background-color:#6c757d;";
        
        // Create value label
        var value_label = document.createElement("div");
        value_label.className = "array-bar-value";
        value_label.textContent = div_sizes[i];
        
        bar_container.appendChild(value_label);
        bars_cont.appendChild(bar_container);
        divs[i] = bar_container;
    }
    
    // Update size display
    document.getElementById('size_value').textContent = array_size;
    
    // Reset statistics
    reset_statistics();
    update_algorithm_info("Select an algorithm to see how it works!");
    update_current_step("Ready to sort! Generate a new array or select an algorithm.");
}

function update_array_size()
{
    array_size=inp_as.value;
    document.getElementById('size_value').textContent = array_size;
    generate_array();
}

function update_speed_display()
{
    document.getElementById('speed_value').textContent = inp_aspeed.value;
}

// Statistics functions
function reset_statistics()
{
    window.comparison_count = 0;
    window.swap_count = 0;
    comparison_count = 0;
    swap_count = 0;
    update_statistics_display();
    console.log("Statistics reset");
}

function increment_comparison()
{
    window.comparison_count++;
    comparison_count++;
    update_statistics_display();
    console.log("Comparison incremented:", comparison_count);
}

function increment_swap()
{
    window.swap_count++;
    swap_count++;
    update_statistics_display();
    console.log("Swap incremented:", swap_count);
}

function update_statistics_display()
{
    document.getElementById('comparison_count').textContent = comparison_count;
    document.getElementById('swap_count').textContent = swap_count;
    console.log("Statistics updated - Comparisons:", comparison_count, "Swaps:", swap_count);
}

// Make statistics functions globally accessible
window.reset_statistics = reset_statistics;
window.increment_comparison = increment_comparison;
window.increment_swap = increment_swap;
window.update_statistics_display = update_statistics_display;

function update_algorithm_info(algorithm_name)
{
    console.log("Updating algorithm info for:", algorithm_name);
    const info_div = document.getElementById('algorithm_info');
    
    if (algorithm_name === "Select an algorithm to see how it works!") {
        info_div.innerHTML = "<p>" + algorithm_name + "</p>";
        document.getElementById('time_complexity').textContent = "-";
        document.getElementById('space_complexity').textContent = "-";
        return;
    }
    
    const info = window.algorithm_info[algorithm_name];
    console.log("Algorithm info found:", info);
    if (info) {
        info_div.innerHTML = `
            <p><strong>${info.name}</strong></p>
            <p>${info.description}</p>
            <p><strong>Time Complexity:</strong> ${info.time_complexity}</p>
            <p><strong>Space Complexity:</strong> ${info.space_complexity}</p>
            <p><strong>Best Case:</strong> ${info.best_case}</p>
            <p><strong>Worst Case:</strong> ${info.worst_case}</p>
            <p><strong>Stable:</strong> ${info.stable}</p>
            <p><strong>In-Place:</strong> ${info.in_place}</p>
        `;
        document.getElementById('time_complexity').textContent = info.time_complexity;
        document.getElementById('space_complexity').textContent = info.space_complexity;
        console.log("Algorithm info updated successfully");
    }
}

// Make it globally accessible
window.update_algorithm_info = update_algorithm_info;

function update_current_step(step_description)
{
    document.getElementById('current_step').innerHTML = "<p>" + step_description + "</p>";
}

// Make it globally accessible
window.update_current_step = update_current_step;

function compare_all_algorithms()
{
    if (Object.keys(window.algorithm_results).length === 0) {
        document.getElementById('comparison_results').innerHTML = "<p>Run individual algorithms first to see comparison data.</p>";
        return;
    }
    
    let table_html = `
        <table class="comparison-table">
            <tr>
                <th>Algorithm</th>
                <th>Comparisons</th>
                <th>Swaps</th>
                <th>Time Complexity</th>
            </tr>
    `;
    
    for (let algo in window.algorithm_results) {
        const result = window.algorithm_results[algo];
        table_html += `
            <tr>
                <td>${algo}</td>
                <td>${result.comparisons}</td>
                <td>${result.swaps}</td>
                <td>${result.time_complexity}</td>
            </tr>
        `;
    }
    
    table_html += "</table>";
    document.getElementById('comparison_results').innerHTML = table_html;
}

window.onload=function(){
    update_array_size();
    update_speed_display();
    inp_aspeed.addEventListener("input", update_speed_display);
    
    // Test that all enhanced features are working
    console.log("Enhanced Sorting Visualizer loaded successfully!");
    console.log("Global variables available:", {
        algorithm_info: !!window.algorithm_info,
        algorithm_results: !!window.algorithm_results,
        comparison_count: window.comparison_count,
        swap_count: window.swap_count
    });
    
    // Test that DOM elements exist
    console.log("DOM elements check:", {
        algorithm_info: !!document.getElementById('algorithm_info'),
        current_stats: !!document.getElementById('current_stats'),
        current_step: !!document.getElementById('current_step'),
        comparison_results: !!document.getElementById('comparison_results')
    });
};

//Running the appropriate algorithm.
for(var i=0;i<butts_algos.length;i++)
{
    butts_algos[i].addEventListener("click",runalgo);
}

function disable_buttons()
{
    for(var i=0;i<butts_algos.length;i++)
    {
        butts_algos[i].classList=[];
        butts_algos[i].classList.add("butt_locked");

        butts_algos[i].disabled=true;
        inp_as.disabled=true;
        inp_gen.disabled=true;
        inp_aspeed.disabled=true;
        inp_compare.disabled=true;
    }
}

function runalgo()
{
    disable_buttons();
    reset_statistics();
    
    const algorithm_name = this.innerHTML;
    update_algorithm_info(algorithm_name);
    update_current_step(`Starting ${algorithm_name} Sort...`);

    this.classList.add("butt_selected");
    switch(algorithm_name)
    {
        case "Bubble":Bubble();
                        break;
        case "Selection":Selection_sort();
                        break;
        case "Insertion":Insertion();
                        break;
        case "Merge":Merge();
                        break;
        case "Quick":Quick();
                        break;
        case "Heap":Heap();
                        break;
    }
}

