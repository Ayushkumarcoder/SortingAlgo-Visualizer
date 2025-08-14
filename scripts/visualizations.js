

var speed=1000;

inp_aspeed.addEventListener("input",vis_speed);

function vis_speed()
{
    var array_speed=inp_aspeed.value;
    switch(parseInt(array_speed))
    {
        case 1: speed=1;
                break;
        case 2: speed=10;
                break;
        case 3: speed=100;
                break;
        case 4: speed=1000;
                break;
        case 5: speed=10000;
                break;
    }
    
    delay_time=10000/(Math.floor(array_size/10)*speed);        //Decrease numerator to increase speed.
}

var delay_time=10000/(Math.floor(array_size/10)*speed);        //Decrease numerator to increase speed.
var c_delay=0;//This is updated ov every div change so that visualization is visible.

// Enhanced div update function with better color coding and educational features
function div_update(cont,height,color,step_description="")
{
    window.setTimeout(function(){
        // Update the bar height and color
        cont.style=" margin:0% 0.1%; width:" + (100/array_size-0.2) + "%; height:" + height + "%; background-color:" + color + ";";
        
        // Update the value label
        var value_label = cont.querySelector('.array-bar-value');
        if (value_label) {
            value_label.textContent = height;
        }
        
        // Update step description if provided
        if (step_description) {
            update_current_step(step_description);
        }
    },c_delay+=delay_time);
}

// Enhanced color update function
function div_color_update(cont, color, step_description="")
{
    window.setTimeout(function(){
        cont.style.backgroundColor = color;
        
        // Update step description if provided
        if (step_description) {
            update_current_step(step_description);
        }
    },c_delay+=delay_time);
}

// Function to mark bars as sorted
function mark_sorted(start_index, end_index, step_description="")
{
    window.setTimeout(function(){
        for(let i = start_index; i <= end_index; i++) {
            if(divs[i]) {
                divs[i].style.backgroundColor = "#28a745"; // Green for sorted
                divs[i].classList.add("bar-sorted");
            }
        }
        
        if (step_description) {
            update_current_step(step_description);
        }
    },c_delay+=delay_time);
}

// Function to highlight comparing elements
function highlight_comparing(index1, index2, step_description="")
{
    window.setTimeout(function(){
        if(divs[index1]) {
            divs[index1].style.backgroundColor = "#ffc107"; // Yellow for comparing
            divs[index1].classList.add("bar-comparing");
        }
        if(divs[index2]) {
            divs[index2].style.backgroundColor = "#ffc107"; // Yellow for comparing
            divs[index2].classList.add("bar-comparing");
        }
        
        if (step_description) {
            update_current_step(step_description);
        }
    },c_delay+=delay_time);
}

// Function to highlight swapping elements
function highlight_swapping(index1, index2, step_description="")
{
    window.setTimeout(function(){
        if(divs[index1]) {
            divs[index1].style.backgroundColor = "#dc3545"; // Red for swapping
            divs[index1].classList.add("bar-swapping");
        }
        if(divs[index2]) {
            divs[index2].style.backgroundColor = "#dc3545"; // Red for swapping
            divs[index2].classList.add("bar-swapping");
        }
        
        if (step_description) {
            update_current_step(step_description);
        }
    },c_delay+=delay_time);
}

// Function to highlight pivot element (for Quick Sort)
function highlight_pivot(index, step_description="")
{
    window.setTimeout(function(){
        if(divs[index]) {
            divs[index].style.backgroundColor = "#17a2b8"; // Blue for pivot
            divs[index].classList.add("bar-pivot");
        }
        
        if (step_description) {
            update_current_step(step_description);
        }
    },c_delay+=delay_time);
}

// Function to highlight merge elements (for Merge Sort)
function highlight_merge(index, step_description="")
{
    window.setTimeout(function(){
        if(divs[index]) {
            divs[index].style.backgroundColor = "#fd7e14"; // Orange for merge
            divs[index].classList.add("bar-merge");
        }
        
        if (step_description) {
            update_current_step(step_description);
        }
    },c_delay+=delay_time);
}

// Function to reset bar colors to unsorted state
function reset_bar_colors()
{
    for(let i = 0; i < divs.length; i++) {
        if(divs[i]) {
            divs[i].style.backgroundColor = "#6c757d"; // Gray for unsorted
            divs[i].classList.remove("bar-comparing", "bar-swapping", "bar-sorted", "bar-pivot", "bar-merge");
            divs[i].classList.add("bar-unsorted");
        }
    }
}

function enable_buttons()
{
    window.setTimeout(function(){
        for(var i=0;i<butts_algos.length;i++)
        {
            butts_algos[i].classList=[];
            butts_algos[i].classList.add("butt_unselected");

            butts_algos[i].disabled=false;
            inp_as.disabled=false;
            inp_gen.disabled=false;
            inp_aspeed.disabled=false;
            inp_compare.disabled=false;
        }
        
        // Store algorithm results for comparison
        const current_algorithm = document.querySelector('.butt_selected');
        if (current_algorithm) {
            const algo_name = current_algorithm.innerHTML;
            console.log("Storing results for algorithm:", algo_name);
            console.log("Current comparison count:", window.comparison_count);
            console.log("Current swap count:", window.swap_count);
            
            // Make sure algorithm_results is accessible
            if (typeof window.algorithm_results === 'undefined') {
                window.algorithm_results = {};
            }
            
            window.algorithm_results[algo_name] = {
                comparisons: window.comparison_count,
                swaps: window.swap_count,
                time_complexity: window.algorithm_info && window.algorithm_info[algo_name] ? window.algorithm_info[algo_name].time_complexity : "Unknown"
            };
            
            console.log("Algorithm results stored:", window.algorithm_results);
        }
        
        update_current_step("Sorting completed! Try another algorithm or generate a new array.");
    },c_delay+=delay_time);
}

