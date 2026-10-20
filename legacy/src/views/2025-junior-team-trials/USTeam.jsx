import {
    CCol,
    CRow,
    CAlert,
} from '@coreui/react'

import { useSportdata } from '../sportdataComponents/context/SportdataContext.jsx';

import { getAthletesByGender, divideAthletesByGroup } from './utils/categorizeAthleteData.js'
import USTeamTable from './components/USTeamTable.jsx';

const Juniors2025USTeam = () => {
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

    return (
        <>
            <CRow>
                <CCol xs={12}>
                    <CAlert color="info">Standings as of {date}. To update scores, refresh this page or wait 1 minute.</CAlert>
                </CCol>
            </CRow>
            <GenderGroupTable gender={genderKey} group="A" data={aGroup} />
            <GenderGroupTable gender={genderKey} group="B" data={bGroup} />
            <GenderGroupTable gender={genderKey} group="C" data={cGroup} />
        </>
    )
}

const GenderGroupTable = ({
    gender,
    group,
    data
}) => {
    return (
        <CRow>
            <CCol xs={12}>
                <USTeamTable gender={gender} group={group} data={data} />
            </CCol>
        </CRow>
    );
}

export default Juniors2025USTeam
