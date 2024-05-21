import React, { useState, useEffect } from 'react';
import {
    CCard,
    CCardBody,
    CCardHeader,
    CCol,
    CRow,
    CInputGroup,
    CInputGroupText,
    CFormSelect,
    CButton,
    CWidgetStatsB,
    CFormCheck,
    CProgress
} from '@coreui/react';

import { movements } from "./movements";

const RequiredMovements = () => {
    const [classFilter, setClassFilter] = useState("");
    const [typeFilter, setTypeFilter] = useState("");
    const [filteredMovements, setFilteredMovements] = useState(movements);

    useEffect(() => {
        let filtered = movements;

        if (classFilter !== "") {
            filtered = filtered.filter((movement) => movement.class === classFilter);
        }

        if (typeFilter !== "") {
            filtered = filtered.filter((movement) => movement.type === typeFilter);
        }

        setFilteredMovements(filtered);
    }, [classFilter, typeFilter]);

    const updateChecklistState = (movementIdx, requirementIdx, label) => {
        setFilteredMovements(prevMovements => {
            const newMovements = [...prevMovements];
            const requirement = newMovements[movementIdx].requirements[requirementIdx];
            requirement.checklist = requirement.checklist.map(item =>
                item.label === label ? { ...item, state: !item.state } : item
            );
            return newMovements;
        });
    };

    const types = [...new Set(filteredMovements.map(movement => movement.type))];

    return (
        <>
            <CRow>
                <CCol xs={12}>
                    <CCard className="mb-4">
                        <CCardHeader>
                            <strong>Routine Content Requirements Filters</strong>
                        </CCardHeader>
                        <CCardBody>
                            <CRow>
                                <CInputGroup className="mb-3">
                                    <CInputGroupText style={{ width: "75px" }}>Class: </CInputGroupText>
                                    <CFormSelect
                                        value={classFilter}
                                        onChange={(event) => setClassFilter(event.target.value)}>
                                        <option value="">*</option>
                                        <option value="Optional Changquan, Daoshu, Jianshu, Qiangshu, Gungshu">Optional Changquan, Daoshu, Jianshu, Qiangshu, Gungshu</option>
                                        <option value="Optional Nanquan, Nandao, Nangun">Optional Nanquan, Nandao, Nangun</option>
                                        <option value="Optional Taijiquan, Taijijian">Optional Taijiquan, Taijijian</option>
                                        <option value="Duilian (Choreographed Sparring)">Duilian (Choreographed Sparring)</option>
                                        <option value="Jiti (Group Routine)">Jiti (Group Routine)</option>
                                    </CFormSelect>
                                </CInputGroup>
                            </CRow>
                            <CRow>
                                <CInputGroup className="mb-3">
                                    <CInputGroupText style={{ width: "75px" }}>Type: </CInputGroupText>
                                    <CFormSelect
                                        value={typeFilter}
                                        onChange={(event) => setTypeFilter(event.target.value)}>
                                        <option value="">*</option>
                                        {types.map((type) => (
                                            <option key={type} value={type}>{type}</option>
                                        ))}
                                    </CFormSelect>
                                </CInputGroup>
                            </CRow>
                            <div className="d-grid gap-2 d-md-flex justify-content-md-end">
                                <CButton
                                    color="primary"
                                    onClick={() => {
                                        setClassFilter("");
                                        setTypeFilter("");
                                    }}>
                                    Reset Filters
                                </CButton>
                            </div>
                        </CCardBody>
                    </CCard>
                </CCol>
            </CRow>
            <MovementCards
                filteredMovements={filteredMovements}
                updateChecklistState={updateChecklistState}
            />
            <br />
            <hr />
            <p style={{ fontSize: "12px" }}>Routine Content Requirements taken from the <a href="http://www.iwuf.org/wp-content/uploads/2019/03/Wushu-Taolu-Competition-Rules-Judging-Methods-Excerpt.pdf" target="_blank">2019 Wushu Taolu Competition Rules & Judging Methods (Excerpt)</a></p>
        </>
    );
};

const MovementCards = ({ filteredMovements, updateChecklistState }) => {
    const groupedByType = filteredMovements.reduce((acc, movement) => {
        if (!acc[movement.type]) {
            acc[movement.type] = [];
        }
        acc[movement.type].push(movement);
        return acc;
    }, {});

    return (
        <>
            {Object.keys(groupedByType).map((type, idx) => (
                <CRow key={idx}>
                    <CCol xs={12}>
                        <CCard className="mb-4">
                            <CCardHeader>
                                <div><strong>Optional {type}</strong> - Routine Content Requirements</div>
                                <div>Overall Progress: {getTypeProgress(groupedByType[type])}%</div>
                                <CProgress value={getTypeProgress(groupedByType[type])}>{getTypeProgress(groupedByType[type])}%</CProgress>
                            </CCardHeader>
                            <CCardBody>
                                {groupedByType[type].map((movement, movementIdx) => (
                                    movement.requirements.map((requirement, requirementIdx) => (
                                        <MovementWidget
                                            key={`${movementIdx}_${requirementIdx}`}
                                            requirement={requirement}
                                            movementIdx={filteredMovements.indexOf(movement)}
                                            requirementIdx={requirementIdx}
                                            updateChecklistState={updateChecklistState}
                                        />
                                    ))
                                ))}
                            </CCardBody>
                        </CCard>
                    </CCol>
                </CRow>
            ))}
        </>
    );
};

const MovementWidget = ({ requirement, movementIdx, requirementIdx, updateChecklistState }) => {
    const [checklistState, setChecklistState] = useState(requirement.checklist);

    useEffect(() => {
        setChecklistState(requirement.checklist);
    }, [requirement.checklist]);

    return (
        <CWidgetStatsB
            key={requirementIdx}
            className="mb-3"
            progress={{ value: getProgress(checklistState) }}
            text={
                <div>
                    {checklistState.map((item) => (
                        <CFormCheck
                            key={item.label}
                            label={item.label}
                            defaultChecked={item.state}
                            onChange={() => {
                                updateChecklistState(movementIdx, requirementIdx, item.label);
                                setChecklistState(checklistState.map(i =>
                                    i.label === item.label ? { ...i, state: !i.state } : i
                                ));
                            }}
                        />
                    ))}
                </div>
            }
            title={requirement.title}
            value=""
        />
    );
};

function getProgress(checklist) {
    const total = checklist.length;
    const checked = checklist.filter(item => item.state).length;
    return Math.round((checked / total) * 100);
}

function getTypeProgress(movements) {
    let totalItems = 0;
    let checkedItems = 0;

    movements.forEach(movement => {
        movement.requirements.forEach(requirement => {
            requirement.checklist.forEach(item => {
                totalItems++;
                if (item.state) {
                    checkedItems++;
                }
            });
        });
    });

    return Math.round((checkedItems / totalItems) * 100);
}

export default RequiredMovements;
