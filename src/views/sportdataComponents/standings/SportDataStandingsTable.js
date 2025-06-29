import React from 'react'
import {
    CCard,
    CCardBody,
    CCardHeader,
    CCol,
    CRow,
    CAlert,
} from '@coreui/react'

import { useSportdata } from '../context/SportdataContext.jsx';

import { CATEGORY_MAP } from "../lookups/categoryMap.js"

import SportdataFilters from '../components/filters/SportdataFilters.jsx';
import StandingsTable from '../components/StandingsTable.jsx';

const SportDataStandingsTable = () => {
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

    const genderKey = window.location.hash.includes("female") ? "FEMALES" : "MALES"

    const dataMap = {
        CQ_DS_GS: athleteData[genderKey].CQ_DS_GS,
        CQ_JS_QS: athleteData[genderKey].CQ_JS_QS,
        NQ_ND_NG: athleteData[genderKey].NQ_ND_NG,
        TQ_TJ: athleteData[genderKey].TQ_TJ,
    };

    const filteredCategories = filters.categoryFilter
        ? [filters.categoryFilter]
        : Object.keys(CATEGORY_MAP);

    const standingTables = (
        filteredCategories.map((key) => (
            <CRow key={key}>
                <CCol xs={12}>
                    <StandingsTable gender={window.location.hash.includes("female") ? "Female" : "Male"} category={CATEGORY_MAP[key]} data={dataMap[key]} />
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
            <CRow>
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
            </CRow>
            {standingTables}
        </>
    )
}

export default SportDataStandingsTable
