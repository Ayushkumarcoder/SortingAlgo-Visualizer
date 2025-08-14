function Heap()
{
    c_delay=0;
    reset_bar_colors();
    update_current_step("Heap Sort: Starting heap-based sorting algorithm - building max heap and extracting elements...");

    heap_sort();
    
    update_current_step("Heap Sort Algorithm Complete! The array is now sorted in ascending order.");
    enable_buttons();
}

function swap(i,j)
{
    increment_swap();
    update_current_step(`Swapping elements at positions ${i} (${div_sizes[i]}) and ${j} (${div_sizes[j]})`);
    
    highlight_swapping(i, j, `Swapping: ${div_sizes[i]} and ${div_sizes[j]}`);

    var temp=div_sizes[i];
    div_sizes[i]=div_sizes[j];
    div_sizes[j]=temp;

    div_update(divs[i],div_sizes[i],"#dc3545", `Swapped: ${div_sizes[i]} and ${div_sizes[j]}`);
    div_update(divs[j],div_sizes[j],"#dc3545", `Swapped: ${div_sizes[i]} and ${div_sizes[j]}`);

    div_color_update(divs[i], "#6c757d", `Element ${div_sizes[i]} in new position`);
    div_color_update(divs[j], "#6c757d", `Element ${div_sizes[j]} in new position`);
}

function max_heapify(n,i)
{
    update_current_step(`Heapifying subtree rooted at position ${i} (${div_sizes[i]}) with heap size ${n}`);
    
    var largest=i;
    var l=2*i+1;
    var r=2*i+2;

    // Check left child
    if(l<n)
    {
        increment_comparison();
        update_current_step(`Comparing left child at position ${l} (${div_sizes[l]}) with current largest at position ${largest} (${div_sizes[largest]})`);
        
        if(div_sizes[l]>div_sizes[largest])
        {
            if(largest!=i)
            {
                div_color_update(divs[largest], "#6c757d", `New largest found: ${div_sizes[l]} > ${div_sizes[largest]}`);
            }

            largest=l;
            div_color_update(divs[largest], "#ffc107", `New largest element: ${div_sizes[largest]} at position ${largest}`);
        }
        else {
            update_current_step(`Left child ${div_sizes[l]} is not larger than current largest ${div_sizes[largest]}`);
        }
    }

    // Check right child
    if(r<n)
    {
        increment_comparison();
        update_current_step(`Comparing right child at position ${r} (${div_sizes[r]}) with current largest at position ${largest} (${div_sizes[largest]})`);
        
        if(div_sizes[r]>div_sizes[largest])
        {
            if(largest!=i)
            {
                div_color_update(divs[largest], "#6c757d", `New largest found: ${div_sizes[r]} > ${div_sizes[largest]}`);
            }

            largest=r;
            div_color_update(divs[largest], "#ffc107", `New largest element: ${div_sizes[largest]} at position ${largest}`);
        }
        else {
            update_current_step(`Right child ${div_sizes[r]} is not larger than current largest ${div_sizes[largest]}`);
        }
    }

    if(largest!=i)
    {
        update_current_step(`Largest element ${div_sizes[largest]} at position ${largest} is greater than root ${div_sizes[i]} at position ${i}, swapping...`);
        swap(i,largest);
        update_current_step(`Recursively heapifying subtree rooted at position ${largest}`);
        max_heapify(n,largest);
    }
    else {
        update_current_step(`Max heap property satisfied at position ${i}: ${div_sizes[i]} is the largest in its subtree`);
    }
}

function heap_sort()
{
    update_current_step("Phase 1: Building max heap from the array...");
    
    // Build max heap
    for(var i=Math.floor(array_size/2)-1;i>=0;i--)
    {
        update_current_step(`Building max heap: heapifying subtree rooted at position ${i} (${div_sizes[i]})`);
        max_heapify(array_size,i);
    }
    
    update_current_step("Max heap built successfully! Phase 2: Extracting elements one by one...");

    // Extract elements from heap one by one
    for(var i=array_size-1;i>0;i--)
    {
        update_current_step(`Extracting maximum element ${div_sizes[0]} from root and placing it at position ${i}`);
        
        swap(0,i);
        mark_sorted(i, i, `Element ${div_sizes[i]} is now in its final sorted position at index ${i}`);
        
        update_current_step(`Heapifying the remaining heap of size ${i} after extraction`);
        max_heapify(i,0);
    }
    
    // Mark the root (now at position 0) as sorted
    mark_sorted(0, 0, `Final element ${div_sizes[0]} is now in its sorted position`);
}