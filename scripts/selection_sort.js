

function Selection_sort()
{
    c_delay=0;
    reset_bar_colors();
    update_current_step("Selection Sort: Starting to sort by finding the minimum element and placing it at the beginning...");

    for(var i=0;i<array_size-1;i++)
    {
        update_current_step(`Selection Sort: Pass ${i+1} - Finding the minimum element in the unsorted portion starting from position ${i}...`);
        
        div_color_update(divs[i], "#17a2b8", `Current position ${i} (${div_sizes[i]}) - looking for minimum element...`);

        index_min=i;

        for(var j=i+1;j<array_size;j++)
        {
            increment_comparison();
            highlight_comparing(j, index_min, `Comparing element at position ${j} (${div_sizes[j]}) with current minimum at position ${index_min} (${div_sizes[index_min]})`);

            if(div_sizes[j]<div_sizes[index_min])
            {
                if(index_min!=i)
                {
                    div_color_update(divs[index_min], "#6c757d", `New minimum found: ${div_sizes[j]} < ${div_sizes[index_min]}`);
                }
                index_min=j;
                div_color_update(divs[index_min], "#dc3545", `New minimum element: ${div_sizes[index_min]} at position ${index_min}`);
            }
            else
            {
                div_color_update(divs[j], "#6c757d", `Element ${div_sizes[j]} is not smaller than current minimum ${div_sizes[index_min]}`);
            }
        }
        
        if(index_min!=i)
        {
            increment_swap();
            update_current_step(`Swapping minimum element ${div_sizes[index_min]} from position ${index_min} with element ${div_sizes[i]} at position ${i}`);
            
            var temp=div_sizes[index_min];
            div_sizes[index_min]=div_sizes[i];
            div_sizes[i]=temp;

            div_update(divs[index_min],div_sizes[index_min],"#dc3545", `Swapped: ${div_sizes[index_min]} and ${div_sizes[i]}`);
            div_update(divs[i],div_sizes[i],"#dc3545", `Swapped: ${div_sizes[index_min]} and ${div_sizes[i]}`);
            div_color_update(divs[index_min], "#6c757d", `Element ${div_sizes[index_min]} moved to position ${index_min}`);
        }
        else {
            update_current_step(`No swap needed: element at position ${i} (${div_sizes[i]}) is already the minimum`);
        }
        
        mark_sorted(i, i, `Pass ${i+1} complete. Element ${div_sizes[i]} is now in its final position at index ${i}.`);
    }
    
    // Mark the last element as sorted
    mark_sorted(array_size-1, array_size-1, "Selection Sort complete! All elements are now sorted.");
    update_current_step("Selection Sort Algorithm Complete! The array is now sorted in ascending order.");

    enable_buttons();
}

