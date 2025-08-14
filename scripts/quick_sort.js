

function Quick()
{
    c_delay=0;
    reset_bar_colors();
    update_current_step("Quick Sort: Starting divide-and-conquer algorithm using pivot-based partitioning...");

    quick_sort(0,array_size-1);

    update_current_step("Quick Sort Algorithm Complete! The array is now sorted in ascending order.");
    enable_buttons();
}

function quick_partition (start, end)
{
    update_current_step(`Partitioning subarray [${start}-${end}] using pivot element`);
    
    var i = start + 1;
    var piv = div_sizes[start]; //make the first element as pivot element.
    highlight_pivot(start, `Pivot element: ${piv} at position ${start}`);

    for(var j =start + 1; j <= end ; j++ )
    {
        //re-arrange the array by putting elements which are less than pivot on one side and which are greater that on other.
        increment_comparison();
        update_current_step(`Comparing element at position ${j} (${div_sizes[j]}) with pivot ${piv}`);
        
        if (div_sizes[ j ] < piv)
        {
            update_current_step(`Element ${div_sizes[j]} < pivot ${piv}, swapping with element at position ${i} (${div_sizes[i]})`);
            
            increment_swap();
            highlight_swapping(i, j, `Swapping elements: ${div_sizes[i]} and ${div_sizes[j]} (${div_sizes[j]} < pivot)`);

            var temp=div_sizes[i];
            div_sizes[i]=div_sizes[j];
            div_sizes[j]=temp;

            div_update(divs[i],div_sizes[i],"#dc3545", `Swapped: ${div_sizes[i]} and ${div_sizes[j]}`);
            div_update(divs[j],div_sizes[j],"#dc3545", `Swapped: ${div_sizes[i]} and ${div_sizes[j]}`);

            div_color_update(divs[i], "#6c757d", `Element ${div_sizes[i]} in left partition`);
            div_color_update(divs[j], "#6c757d", `Element ${div_sizes[j]} in right partition`);

            i += 1;
        }
        else {
            update_current_step(`Element ${div_sizes[j]} ≥ pivot ${piv}, keeping in right partition`);
            div_color_update(divs[j], "#6c757d", `Element ${div_sizes[j]} in right partition`);
        }
    }
    
    update_current_step(`Placing pivot ${piv} in its final position at index ${i-1}`);
    increment_swap();
    highlight_swapping(start, i-1, `Moving pivot ${piv} to its final position at index ${i-1}`);
    
    var temp=div_sizes[start];//put the pivot element in its proper place.
    div_sizes[start]=div_sizes[i-1];
    div_sizes[i-1]=temp;

    div_update(divs[start],div_sizes[start],"#dc3545", `Pivot ${piv} moved to position ${i-1}`);
    div_update(divs[i-1],div_sizes[i-1],"#dc3545", `Pivot ${piv} moved to position ${i-1}`);

    // Mark pivot as sorted
    mark_sorted(i-1, i-1, `Pivot ${piv} is now in its final sorted position at index ${i-1}`);

    update_current_step(`Partition complete: pivot ${piv} at position ${i-1}, left partition [${start}-${i-2}], right partition [${i}-${end}]`);

    return i-1;//return the position of the pivot
}

function quick_sort (start, end )
{
    if( start < end )
    {
        update_current_step(`Quick sorting subarray [${start}-${end}]`);
        
        //stores the position of pivot element
        var piv_pos = quick_partition (start, end ) ;     
        
        update_current_step(`Pivot ${div_sizes[piv_pos]} at position ${piv_pos}, now sorting left subarray [${start}-${piv_pos-1}]`);
        quick_sort (start, piv_pos -1);//sorts the left side of pivot.
        
        update_current_step(`Left subarray sorted, now sorting right subarray [${piv_pos+1}-${end}]`);
        quick_sort (piv_pos +1, end) ;//sorts the right side of pivot.
    }
    else {
        update_current_step(`Base case: subarray [${start}-${end}] has 0 or 1 elements, already sorted`);
    }
 }
