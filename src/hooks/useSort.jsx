import {useState, useEffect} from "react";
import {isTrue} from "#utils";

// Sorts an array of objects
export const useSort = (data) => {
	const [sortedData, setSortedData] = useState(data);
    const [sortId, setSortId] = useState(); // keys in object we're sorting by
    const [isAscending, setIsAscending] = useState(true); // sort direction, true = ascending, false = descending 

    
    const sortArray = (sortId, isAscending) => {
    	const sorted = [...data].sort((a, b) => a[sortId] - b[sortId]); // sorts ascending
        if (isTrue({input:isAscending})) {
    		setSortedData(sorted);
    	} else {
    		const reversedData = sorted.reverse();
    		setSortedData(reversedData)
    	}
        
    }

    useEffect(() => {
        sortArray(sortId, isAscending);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [sortId, isAscending]);


    return {sortedData, setSortedData, sortId, setSortId, isAscending, setIsAscending}
}

export default useSort;