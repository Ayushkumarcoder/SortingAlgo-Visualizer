function Insertion()
{
    c_delay=0;
    reset_bar_colors();
    update_current_step("Insertion Sort: Starting to sort by building a sorted array one element at a time...");

    for(var j=0;j<array_size;j++)
    {
        update_current_step(`Insertion Sort: Processing element at position ${j} (${div_sizes[j]}) - inserting it into the sorted portion...`);
        
        div_color_update(divs[j], "#ffc107", `Current element to insert: ${div_sizes[j]} at position ${j}`);

        var key= div_sizes[j];
        var i=j-1;
        
        while(i>=0 && div_sizes[i]>key)
        {
            increment_comparison();
            update_current_step(`Comparing ${div_sizes[i]} (position ${i}) with key ${key} - ${div_sizes[i]} > ${key}, so shifting ${div_sizes[i]} to the right`);
            
            increment_swap();
            highlight_swapping(i, i+1, `Shifting element ${div_sizes[i]} from position ${i} to position ${i+1}`);

            div_sizes[i+1]=div_sizes[i];

            div_update(divs[i],div_sizes[i],"#dc3545", `Shifted: ${div_sizes[i]} moved from position ${i} to ${i+1}`);
            div_update(divs[i+1],div_sizes[i+1],"#dc3545", `Shifted: ${div_sizes[i]} moved from position ${i} to ${i+1}`);
    
            div_color_update(divs[i], "#6c757d", `Position ${i} now available for insertion`);
            if(i==(j-1))
            {
                div_color_update(divs[i+1], "#ffc107", `Key element ${key} temporarily at position ${i+1}`);
            }
            else
            {
                div_color_update(divs[i+1], "#6c757d", `Element ${div_sizes[i+1]} in sorted position`);
            }
            i-=1;
        }
        
        div_sizes[i+1]=key;
        update_current_step(`Inserting key ${key} into its correct position at index ${i+1}`);

        // Mark all elements up to j as sorted
        for(var t=0;t<=j;t++)
        {
            mark_sorted(t, t, `Element ${div_sizes[t]} is now in its sorted position`);
        }
        
        update_current_step(`Pass ${j+1} complete. Elements from 0 to ${j} are now sorted.`);
    }
    
    update_current_step("Insertion Sort Algorithm Complete! The array is now sorted in ascending order.");

    enable_buttons();
}