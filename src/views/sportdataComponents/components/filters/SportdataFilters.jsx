import React, { useEffect, useState } from 'react';
import {
  CRow,
  CInputGroup,
  CInputGroupText,
  CFormSelect,
  CButton,
} from '@coreui/react';

import { useSportdata } from '../../context/SportdataContext';
import { EVENT_ABBREVIATIONS } from '../../lookups/eventAbbreviations';
import { CATEGORY_MAP } from '../../lookups/categoryMap';

const SportdataFilters = ({
  showGenderFilter,
  showCategoryFilter,
  showEventFilter,
  showAthleteFilter,
}) => {
  const { data, filters, setFilters } = useSportdata();
  const { athleteData = {}, isLoading } = data;

  const [eventValues, setEventValues] = useState([]);
  const [athleteValues, setAthleteValues] = useState([]);

  // Update event list when category or athlete changes
  useEffect(() => {
    if (filters.athleteFilter) {
      const athleteEvents = [];

      for (const gender of Object.keys(athleteData)) {
        for (const category of Object.keys(athleteData[gender])) {
          const competitors = athleteData[gender][category];
          if (filters.athleteFilter in competitors) {
            competitors[filters.athleteFilter].events.forEach(e => {
              const parts = e.event.split(' ');
              athleteEvents.push(parts[parts.length - 1]);
            });
          }
        }
      }

      const uniqueEvents = [...new Set(athleteEvents)];
      setEventValues([
        <option key="*" value="">*</option>,
        ...uniqueEvents.map((event, idx) => (
          <option key={idx} value={event}>{event}</option>
        ))
      ]);

      if (!uniqueEvents.includes(filters.eventFilter)) {
        setFilters({ ...filters, eventFilter: "" });
      }

    } else if (filters.categoryFilter) {
      const categoryEvents = CATEGORY_MAP[filters.categoryFilter]?.split(",").map(e => e.trim()) || [];
      setEventValues([
        <option key="*" value="">*</option>,
        ...categoryEvents.map((event, idx) => (
          <option key={idx} value={event}>{event}</option>
        ))
      ]);

      if (!categoryEvents.includes(filters.eventFilter)) {
        setFilters({ ...filters, eventFilter: "" });
      }

    } else {
      const allEvents = Object.keys(EVENT_ABBREVIATIONS);
      setEventValues([
        <option key="*" value="">*</option>,
        ...allEvents.map((event, idx) => (
          <option key={idx} value={event}>{event}</option>
        ))
      ]);
    }
  }, [filters.categoryFilter, filters.athleteFilter]);

  // Update athlete list based on filters
  useEffect(() => {
    if (!athleteData || isLoading) return;

    const { genderFilter, categoryFilter, eventFilter } = filters;

    let filtered = JSON.parse(JSON.stringify(athleteData)); // deep clone

    if (genderFilter) {
      filtered = { [genderFilter]: filtered[genderFilter] || {} };
    }

    Object.entries(filtered).forEach(([gender, categories]) => {
      if (categoryFilter) {
        filtered[gender] = { [categoryFilter]: categories[categoryFilter] || {} };
      }

      Object.entries(filtered[gender]).forEach(([category, competitors]) => {
        Object.entries(competitors).forEach(([name, registration]) => {
          if (eventFilter && !registration.events.some(e => e.event.includes(eventFilter))) {
            delete filtered[gender][category][name];
          }
        });
      });
    });

    const names = Object.values(filtered).flatMap(categoryObj =>
      Object.values(categoryObj).flatMap(competitors =>
        Object.keys(competitors)
      )
    );

    const uniqueNames = [...new Set(names)].sort();

    setAthleteValues([
      <option value="" key="all">*</option>,
      ...uniqueNames.map((name, idx) => (
        <option key={idx} value={name}>{name}</option>
      ))
    ]);

    if (!uniqueNames.includes(filters.athleteFilter)) {
      setFilters({ ...filters, athleteFilter: "" });
    }

  }, [athleteData, filters.genderFilter, filters.categoryFilter, filters.eventFilter]);

  const resetFilters = () => {
    setFilters({
      genderFilter: showGenderFilter ? "" : filters.genderFilter,
      categoryFilter: showCategoryFilter ? "" : filters.categoryFilter,
      eventFilter: showEventFilter ? "" : filters.eventFilter,
      athleteFilter: showAthleteFilter ? "" : filters.athleteFilter,
    });
  };

  return (
    <>
      {showGenderFilter && (
        <CRow>
          <CInputGroup className="mb-3">
            <CInputGroupText style={{ width: "100px" }}>Gender:</CInputGroupText>
            <CFormSelect
              value={filters.genderFilter}
              onChange={(e) => setFilters({ ...filters, genderFilter: e.target.value })}
            >
              <option value="">*</option>
              <option value="MALES">Male</option>
              <option value="FEMALES">Female</option>
            </CFormSelect>
          </CInputGroup>
        </CRow>
      )}

      {showCategoryFilter && (
        <CRow>
          <CInputGroup className="mb-3">
            <CInputGroupText style={{ width: "100px" }}>Category:</CInputGroupText>
            <CFormSelect
              value={filters.categoryFilter}
              onChange={(e) => setFilters({ ...filters, categoryFilter: e.target.value })}
            >
              <option value="">*</option>
              <option value="CQ_DS_GS">Changquan, Daoshu, Gunshu</option>
              <option value="CQ_JS_QS">Changquan, Jianshu, Qiangshu</option>
              <option value="NQ_ND_NG">Nanquan, Nandao, Nangun</option>
              <option value="TQ_TJ">Taijiquan, Taijijian</option>
            </CFormSelect>
          </CInputGroup>
        </CRow>
      )}

      {showEventFilter && (
        <CRow>
          <CInputGroup className="mb-3">
            <CInputGroupText style={{ width: "100px" }}>Event:</CInputGroupText>
            <CFormSelect
              value={filters.eventFilter}
              onChange={(e) => setFilters({ ...filters, eventFilter: e.target.value })}
            >
              {eventValues}
            </CFormSelect>
          </CInputGroup>
        </CRow>
      )}

      {showAthleteFilter && (
        <CRow>
          <CInputGroup className="mb-3">
            <CInputGroupText style={{ width: "100px" }}>Athlete:</CInputGroupText>
            <CFormSelect
              value={filters.athleteFilter}
              onChange={(e) => setFilters({ ...filters, athleteFilter: e.target.value })}
            >
              {athleteValues}
            </CFormSelect>
          </CInputGroup>
        </CRow>
      )}

      <div className="d-grid gap-2 d-md-flex justify-content-md-end">
        <CButton color="primary" onClick={resetFilters}>
          Reset
        </CButton>
      </div>
    </>
  );
};

export default SportdataFilters;
