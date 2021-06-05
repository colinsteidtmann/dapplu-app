import React, { useEffect } from "react";
// component imports
import ViewAgreementsCard from "./ViewAgreementsCard";
import ViewAgreementsHeader from "./ViewAgreementsHeader";
// other imports
import {useSort, useAllAgreements} from "#hooks";
import {isEmpty} from "#utils";



export const ViewAgreements = (props) => {
    let usersAgreements = useAllAgreements();

    const {sortedData, setSortedData, sortId, setSortId, isAscending, setIsAscending} = useSort(usersAgreements); 
    
    useEffect(() => {
        setSortedData(usersAgreements);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [usersAgreements])


    return ( 
        <>
            <ViewAgreementsHeader sortId={sortId} setSortId={setSortId} isAscending={isAscending} setIsAscending={setIsAscending} />
            {sortedData.map((userAgreement, id) => (
                <ViewAgreementsCard key={id} userAgreement={userAgreement}  />
            ))}
            {isEmpty({input:sortedData}) && 
                <p className="mt-3"> None created ... <u className="text-success"><strong>yet</strong></u> </p>
            }
        </>
    );
}

export default ViewAgreements;