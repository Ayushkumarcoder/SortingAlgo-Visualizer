function Bubble()
{
    c_delay=0;
    reset_bar_colors();
    update_current_step("Bubble Sort: Starting to sort the array by repeatedly comparing adjacent elements...");

    for(var i=0;i<array_size-1;i++)
    {
        update_current_step(`Bubble Sort: Pass ${i+1} - Comparing adjacent elements and bubbling up the largest element...`);
        
        for(var j=0;j<array_size-i-1;j++)
        {
            increment_comparison();
            highlight_comparing(j, j+1, `Comparing elements at positions ${j} (${div_sizes[j]}) and ${j+1} (${div_sizes[j+1]})`);

            if(div_sizes[j]>div_sizes[j+1])
            {
                increment_swap();
                highlight_swapping(j, j+1, `Swapping elements: ${div_sizes[j]} and ${div_sizes[j+1]} (${div_sizes[j]} > ${div_sizes[j+1]})`);

                var temp=div_sizes[j];
                div_sizes[j]=div_sizes[j+1];
                div_sizes[j+1]=temp;

                div_update(divs[j],div_sizes[j], "#dc3545", `Swapped: ${div_sizes[j]} and ${div_sizes[j+1]}`);
                div_update(divs[j+1],div_sizes[j+1], "#dc3545", `Swapped: ${div_sizes[j]} and ${div_sizes[j+1]}`);
            }
            else {
                update_current_step(`No swap needed: ${div_sizes[j]} ≤ ${div_sizes[j+1]}`);
            }
            
            div_color_update(divs[j], "#6c757d", `Moving to next comparison...`);
        }
        
        // Mark the last element of this pass as sorted
        mark_sorted(array_size-i-1, array_size-i-1, `Pass ${i+1} complete. Element at position ${array_size-i-1} (${div_sizes[array_size-i-1]}) is now in its final position.`);
    }
    
    // Mark the first element as sorted (it's the smallest)
    mark_sorted(0, 0, "Bubble Sort complete! All elements are now sorted.");
    update_current_step("Bubble Sort Algorithm Complete! The array is now sorted in ascending order.");

    enable_buttons();
}