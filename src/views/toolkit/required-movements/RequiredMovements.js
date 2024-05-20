import React, { useEffect, useState } from 'react'
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
    CFormCheck
} from '@coreui/react'

import { movements } from "./movements"

const RequiredMovements = () => {
    const [classFilter, setClassFilter] = useState("")
    const [typeFilter, setTypeFilter] = useState("")

    let filteredMovements = movements

    if (classFilter !== "") {
        filteredMovements = filteredMovements.filter((movement) => movement.class === classFilter);
    }

    const types = filteredMovements.map(movement => movement.type);

    if (typeFilter !== "") {
        filteredMovements = filteredMovements.filter((movement) => movement.type === typeFilter);
    }

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
                                        onChange={(event) => {
                                            setClassFilter(event.target.value);
                                            setTypeFilter("");
                                        }}>
                                        <option value="">*</option>
                                        <option value="Optional Changquan, Daoshu, Jianshu, Qiangshu, Gungshu">Optional Changquan, Daoshu, Jianshu, Qiangshu, Gungshu</option>
                                        <option value="Optional Nanquan, Nandao, Nangun">Optional Nanquan, Nandao, Nangun</option>
                                        <option value="taichi">Optional Taijiquan, Taijijian</option>
                                        <option value="Duilian (Choreographed Sparring)">Duilian (Choreographed Sparring)</option>
                                        <option value="Jiti (Group Routine)">Jiti (Group Routine)</option>
                                    </CFormSelect>
                                </CInputGroup>
                            </CRow>
                            <CRow>
                                <CInputGroup className="mb-3">
                                    <CInputGroupText style={{ width: "75px" }}>Code: </CInputGroupText>
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
                                    style={{}}
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
            />
            <br></br>
            <hr></hr>
            <p style={{ fontSize: "12px" }}>Routine Content Requirements taken from the <a href="http://www.iwuf.org/wp-content/uploads/2019/03/Wushu-Taolu-Competition-Rules-Judging-Methods-Excerpt.pdf" target="_blank">2019 Wushu Taolu Competition Rules & Judging Methods (Excerpt)</a></p>
        </>
    )
}

const MovementCards = ({ filteredMovements }) => {
    return (
        <>
            {
                filteredMovements.map((movement) => (
                    <CRow key={movement.type}>
                        <CCol xs={12}>
                            <CCard className="mb-4">
                                <CCardHeader>
                                    <div><strong>Optional {movement.type}</strong> - Routine Content Requirements</div>
                                </CCardHeader>
                                <CCardBody>
                                    {movement.requirements.map((requirement, idx) => (
                                        <MovementWidget
                                            requirement={requirement}
                                            idx={`${idx}_${requirement.label}`}
                                        />
                                    ))}
                                </CCardBody>
                            </CCard>
                        </CCol>
                    </CRow>
                ))
            }
        </>
    );
}

const MovementWidget = ({ requirement, idx }) => {
    const [checklistState, setChecklistState] = useState(requirement.checklist);

    useEffect(() => {
        setChecklistState(requirement.checklist);
    }, [requirement.checklist]);

    const toggleItemState = (id) => {
        setChecklistState(checklistState.map(item => 
            item.label === id ? { ...item, state: !item.state } : item
        ));
    };

    return (
        <CWidgetStatsB
            key={idx}
            className="mb-3"
            color={ getProgress(checklistState) === 100 ? "primary" : "white" }
            inverse={ getProgress(checklistState) === 100 }
            progress={{ value: getProgress(checklistState) }}
            text={
                <div>
                    {checklistState.map((item) => (
                        <CFormCheck
                            key={item.label}
                            label={item.label}
                            defaultChecked={item.state}
                            onChange={() => toggleItemState(item.label)}
                        />
                    ))}
                </div>
            }
            title={requirement.title}
            value=""
        />
    )
}

function getProgress(checklist) {
    let checked = 0;
    let total = checklist.length;

    checklist.map((item) => {
        if (item.state) {
            checked++;
        }
    })

    return Math.round((checked / total) * 100)
}

export default RequiredMovements
