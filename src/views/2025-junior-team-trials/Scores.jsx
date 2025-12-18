import React from 'react'
import {
    CCard,
    CCardBody,
    CCardHeader,
    CCol,
    CRow,
    CAlert,
} from '@coreui/react'

import { useSportdata } from '../sportdataComponents/context/SportdataContext.jsx';

import SportdataFilters from '../sportdataComponents/components/filters/SportdataFilters.jsx';
import StandingsTable from './components/StandingsTable.jsx';

import { getAthletesByGender, divideAthletesByGroup } from './utils/categorizeAthleteData.js'

const Juniors2025Standings = () => {
    const sportdataContext = useSportdata();
    const { data, filters } = sportdataContext

    const { athleteData, date, isLoading, error } = data

    if (isLoading) {
        return <div>Loading...</div>;
    }

    if (error) {
        return (
            <CAlert color="danger">
                An error has occurred getting scores, refresh this page. If this problem continues to persist, contact Khai Nguyen.
            </CAlert>
        )
    }

    const genderKey = window.location.hash.includes("female") ? "Female" : "Male";

    const genderAthletes = getAthletesByGender(athleteData, genderKey)

    const { aGroup, bGroup, cGroup } = divideAthletesByGroup(genderAthletes);

    const groupData = [
        {
            group: "A",
            data: aGroup,
        },
        {
            group: "B",
            data: bGroup,
        },
        {
            group: "C",
            data: cGroup
        }
    ];

    const standingTables = (
        groupData.map((dataObj) => (
            <CRow key={`${genderKey}_${dataObj.group}_Group`}>
                <CCol xs={12}>
                    <StandingsTable gender={genderKey} group={dataObj.group} data={dataObj.data} />
                </CCol>
            </CRow>
        ))
    );

    return (
        <>
            <CRow>
                <CCol xs={12}>
                    <CAlert color="info">Standings as of {date}. To update scores, refresh this page or wait 1 minute.</CAlert>
                </CCol>
            </CRow>
            {/* <CRow>
                <CCol xs={12}>
                    <CCard className="mb-4">
                        <CCardHeader>
                            <strong>Standing Filters</strong>
                        </CCardHeader>
                        <CCardBody>
                            <SportdataFilters
                                showGenderFilter={false}
                                showCategoryFilter={true}
                                showEventFilter={false}
                                showAthleteFilter={false}
                            />
                        </CCardBody>
                    </CCard>
                </CCol>
            </CRow> */}
            {standingTables}
        </>
    )
}

export default Juniors2025Standings
