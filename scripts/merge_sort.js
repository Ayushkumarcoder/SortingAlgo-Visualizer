
function Merge()
{
    c_delay=0;
    reset_bar_colors();
    update_current_step("Merge Sort: Starting divide-and-conquer algorithm - breaking array into smaller subarrays...");

    merge_partition(0,array_size-1);

    update_current_step("Merge Sort Algorithm Complete! The array is now sorted in ascending order.");
    enable_buttons();
}

function merge_sort(start,mid,end)
{
    update_current_step(`Merging sorted subarrays: [${start}-${mid}] and [${mid+1}-${end}]`);
    
    var p=start,q=mid+1;
    var Arr=[],k=0;

    for(var i=start; i<=end; i++)
    {
        if(p>mid)
        {
            Arr[k++]=div_sizes[q++];
            highlight_merge(q-1, `Taking element ${div_sizes[q-1]} from right subarray (left subarray exhausted)`);
        }
        else if(q>end)
        {
            Arr[k++]=div_sizes[p++];
            highlight_merge(p-1, `Taking element ${div_sizes[p-1]} from left subarray (right subarray exhausted)`);
        }
        else if(div_sizes[p]<div_sizes[q])
        {
            increment_comparison();
            Arr[k++]=div_sizes[p++];
            highlight_merge(p-1, `Taking ${div_sizes[p-1]} from left subarray (${div_sizes[p-1]} < ${div_sizes[q]})`);
        }
        else
        {
            increment_comparison();
            Arr[k++]=div_sizes[q++];
            highlight_merge(q-1, `Taking ${div_sizes[q-1]} from right subarray (${div_sizes[q-1]} ≤ ${div_sizes[p-1]})`);
        }
    }

    update_current_step(`Copying merged result back to original array positions ${start} to ${end}`);
    
    for(var t=0;t<k;t++)
    {
        div_sizes[start++]=Arr[t];
        div_update(divs[start-1],div_sizes[start-1],"#28a745", `Merged element ${div_sizes[start-1]} placed at position ${start-1}`);
    }
    
    update_current_step(`Merge complete: subarray [${start-k}-${start-1}] is now sorted`);
}

function merge_partition(start,end)
{
    if(start < end)
    {
        var mid=Math.floor((start + end) / 2);
        update_current_step(`Dividing subarray [${start}-${end}] at midpoint ${mid}`);
        highlight_pivot(mid, `Midpoint element: ${div_sizes[mid]} at position ${mid}`);

        merge_partition(start,mid);
        update_current_step(`Left subarray [${start}-${mid}] sorted, now processing right subarray [${mid+1}-${end}]`);
        merge_partition(mid+1,end);

        merge_sort(start,mid,end);
    }
    else {
        update_current_step(`Base case: single element at position ${start} (${div_sizes[start]}) is already sorted`);
    }
}
