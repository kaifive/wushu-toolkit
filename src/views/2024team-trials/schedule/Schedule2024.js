import React, { useState, useEffect } from 'react'
import {
  CCard,
  CCardBody,
  CCardHeader,
  CCol,
  CRow,
  CTable,
  CTableBody,
  CTableDataCell,
  CTableHead,
  CTableHeaderCell,
  CTableRow,
  CAlert,
  CAlertLink,
  CInputGroup,
  CInputGroupText,
  CFormSelect,
  CButton,
} from '@coreui/react'

import { getSchedule } from './getSchedule.js'


const Schedule2024 = () => {
  const [dayFilter, setDayFilter] = useState("Mon");
  const [ringFilter, setRingFilter] = useState("")

  const [scheduleState, setScheduleState] = useState({ schedules: [], loading: true, error: null });

  useEffect(() => {
    const urls = [
      'https://bowuu.com/v1/schedule/ring/167',
      'https://bowuu.com/v1/schedule/ring/166',
      'https://bowuu.com/v1/schedule/ring/170',
      'https://bowuu.com/v1/schedule/ring/169'
    ];

    getSchedule(urls)
      .then((scheduleData) => {
        setScheduleState(scheduleData);
      })
      .catch((error) => {
        setScheduleState({ schedules: [], loading: false, error: error });
      });
  }, [setScheduleState]);

  const { schedules, loading, error, syncDate } = scheduleState;

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return (
      <CAlert color="danger">
        An error has occurred getting schedules, refresh this page. If this problem continues to persist, check the <CAlertLink href="https://bowuu.com/schedule" target="_blank">Official Schedule</CAlertLink>.
      </CAlert>
    )
  }

  return (
    <>
      <CRow>
        <CCol xs={12}>
          <CAlert color="info">Schedule as of {syncDate}. To update schedule, refresh this page.</CAlert>
        </CCol>
      </CRow>
      <CRow>
        <CCol xs={12}>
          <CCard className="mb-4">
            <CCardHeader>
              <strong>Schedule Filters</strong>
            </CCardHeader>
            <CCardBody>
              <CRow>
                <CInputGroup className="mb-3">
                  <CInputGroupText style={{ width: "75px" }}>Day: </CInputGroupText>
                  <CFormSelect
                    value={dayFilter}
                    onChange={(event) => setDayFilter(event.target.value)}>
                    <option value="">*</option>
                    <option value="Sun">Sunday</option>
                    <option value="Mon">Monday</option>
                  </CFormSelect>
                </CInputGroup>
              </CRow>
              <CRow>
                <CInputGroup className="mb-3">
                  <CInputGroupText style={{ width: "75px" }}>Ring: </CInputGroupText>
                  <CFormSelect
                    value={ringFilter}
                    onChange={(event) => setRingFilter(event.target.value)}>
                    <option value="">*</option>
                    <option value="Ring8">Ring 8</option>
                    <option value="Ring9">Ring 9</option>
                  </CFormSelect>
                </CInputGroup>
              </CRow>
              <div className="d-grid gap-2 d-md-flex justify-content-md-end">
                <CButton
                  style={{}}
                  color="primary"
                  onClick={() => {
                    setDayFilter("");
                    setRingFilter("");
                  }}>
                  Reset Filters
                </CButton>
              </div>
            </CCardBody>
          </CCard>
        </CCol>
      </CRow>
      <CRow>
        <CCol xs={12}>
          {schedules.map((schedule) => {
            if (schedule.ring.includes(dayFilter) && schedule.ring.includes(ringFilter)) {
              return (
                <CCard key={schedule.ring} className="mb-4">
                  <CCardHeader>
                    <strong>Ring {schedule.ring.slice(4, 5)} Schedule</strong> - {schedule.ring.slice(6, 9)}day
                  </CCardHeader>
                  <CCardBody>
                    <CTable striped hover responsive>
                      <CTableHead>
                        <CTableRow>
                          <CTableHeaderCell scope="col">Day</CTableHeaderCell>
                          <CTableHeaderCell scope="col">Event</CTableHeaderCell>
                          <CTableHeaderCell scope="col">Group</CTableHeaderCell>
                          <CTableHeaderCell scope="col">Gender</CTableHeaderCell>
                          <CTableHeaderCell scope="col">~Start Time</CTableHeaderCell>
                        </CTableRow>
                      </CTableHead>
                      <CTableBody>
                        {schedule.schedule.map((event) => (
                          <CTableRow key={event.competitionEventId}>
                            <CTableDataCell>{schedule.ring.slice(6, 9)}day</CTableDataCell>
                            <CTableDataCell>{event.eventName}</CTableDataCell>
                            <CTableDataCell>{event.ageGroupName}</CTableDataCell>
                            <CTableDataCell>{event.gender}</CTableDataCell>
                            <CTableDataCell>
                              {!event.isComplete ? (event.startTime ? event.startTime : "In Progress") : "Completed"}
                            </CTableDataCell>
                          </CTableRow>
                        ))}
                      </CTableBody>
                    </CTable>
                  </CCardBody>
                </CCard>
              )
            }
          })}
        </CCol>
      </CRow>
    </>
  )
}

export default Schedule2024
