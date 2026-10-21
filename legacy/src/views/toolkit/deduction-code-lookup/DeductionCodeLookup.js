import React, { useState, useEffect } from 'react'
import {
    CCard,
    CCardBody,
    CCardHeader,
    CCol,
    CRow,
    CAlert,
    CInputGroup,
    CInputGroupText,
    CFormSelect,
    CFormInput,
    CButton,
    CWidgetStatsB,
    CAccordion,
    CAccordionItem,
    CAccordionHeader,
    CAccordionBody
} from '@coreui/react'

import { northernCodes } from './northernCodes'
import { southernCodes } from './southernCodes'
import { taichiCodes } from './taichiCodes'
import { duilianCodes } from './duilianCodes'
import { jitiCodes } from './jitiCodes'
import { otherCodes } from './otherCodes'

const otherStandards = [
    "Sway: A sway is defined an athlete’s upper body is displaced (sways) in 2 different directions. For example, the athlete loses his center of balance and leans his or her upper body to maintain his balance, either left or right, forward and backwards, or inacircular motion ending upright, it is regarded as a sway.",
    "Shuffle: This refers to a situation when standing or landing on both feet or on a singlefoot or on one foot and one leg. Should any supporting foot move or be displaced laterally it is considered as a shuffle.",
    "Skip: This refers to a situation when standing or landing on both feet or on a single foot. Should any supporting foot leave the carpet in a skip or hop it is considered a skip.",
    "Additional Support: Should an athlete during his/her performance, either when moving or in a set posture, lose balance and make use of a hand, elbow, knee, non- supporting leg (during a single leg posture) or the weapon as an additional support it isconsidered as an additional support. (Note: should the weapon hit the floor during the course of a movement without any force applied to it as additional support it should be considered as a weapon hitting the body or floor and be deducted for accordingly).",
    "Fall: Should an athlete during his/her performance, either when moving or in a set posture, lose balance and make use of both hands, the head, the upper arm (above the elbow), shoulder, torso, buttocks; or should any two or more parts of the body simultaneously make contact with the floor, or one part of the body and the weapon (the weapon is considered an extension of the arm), it is considered as a fall. (Note: In Choreographed Sparring events, intentional falls to the ground are neither considered as nor deducted for as falls).",
    "Weapon-Touching-Body: Should an athlete during a technique with a weapon strike, tap or touch any part of his/her body, it will be considered as weapon-touching-body and be deducted accordingly.",
    "Weapon Deformed: This refers to when the weapon has been deformed to degree in excess of 45° from its original intended shape.",
    "Out-of-bounds: Should an athlete during his/her performance, touch the floor outsideof the boundary line of the competition arena with any part of his/her body, it is considered as out-of-bounds. Should the weapon touch the floor outside of the boundary line of the competition arena; or if any part of the performer’s body is extended beyond the boundary line of the competition arena but does not make contact with the floor it is not considered as out-of-bounds.",
    "Balance Technique Static/Motionless Timing: Calculation of time begins when the movement first stops in a static or motionless state. This applies to Changquan, Jianshu, Daoshu, Qiangshu & Gunshu events only.",
    "Forgetting: Should an athlete during his/her performance have a lapse of memory and be interrupted and pause unconventionally or have chaotic movements, it is considered as forgetting.",
    "Should during a single technique, more than one <other error> occur, they will be deducted in a cumulative manner",
    "Other Errors will be deducted as they occur in a cumulative manner."
]

const codeCards = {
    northern: {
        title: "Changquan, Jianshu, Daoshu, Qiangshu & Gunshu",
        standards: [
            "Within a single technique, should there be 1 or more errors, 0.1 will be deducted once.",
            "Within a single group of movements, should there be 2 or more occurrences of the same weapon technique errors, 0.1 will only be deducted once.",
            "For balance techniques held for less than 2 seconds, 0.1 will be deducted once.",
            "No obvious vertical circle formed/No obvious horizontal circle formed refers to the tip of the sword/cudgel/spear tip rotating at an angle of 45° or more off of the vertical/horizontal plane.",
            ...otherStandards
        ],
        codes: [...northernCodes, ...otherCodes],
    },
    southern: {
        title: "Nanquan, Nandao & Nangun",
        standards: [
            "Within a single technique, should there be 1 or more errors, 0.1 will only be deducted once.",
            "Within a single group of movements, should there be 2 or more occurrences of the same weapon technique errors, 0.1 will only be deducted once.",
            "It is permitted to not slap the kicking foot during Téng Kōng Way Bǎi Tuǐ (Jumping Lotus Kick).",
            ...otherStandards
        ],
        codes: [...southernCodes, ...otherCodes],
    },
    taichi: {
        title: "Taijiquan & Taijijian",
        standards: [
            "Within a single technique, should there be 1 or more errors, 0.1 will only be deducted once.",
            "Within a single group of movements, should there be 2 or more occurrences of the same weapon technique errors, 0.1 will only be deducted once.",
            "Within a single group of movements, should there be 2 or more occurrences of the same footwork error, 0.1 will only be deducted once.",
            "Within a single group of movements, should there be 2 or more occurrences of the same stance errors, 0.1 will only be deducted once. 'Single group of movements' refers to same position, hand technique, leg technique, footwork or weapon technique executed once, twice or more times in a sequence.",
            "Within a single routine, deductions for Quán (Fist), Zhǎng (Palm), Jiàn Zhǐ (Sword Fingers), Hand Technique, and Body Posture may be deducted at most three (3) times for each one respectively.",
            "Deductions will be made for the above each time they occur; however, the electronic scoring system (or score keeper for non-electronic scoring systems) will enforce a deduction limit of 0.3 for each technique.",
            "'Knee and toes of supporting leg misaligned' refers to the knee-tip of the supporting leg being drawn in and surpassing the vertical line of the medial portion of the supporting foot when stepping.",
            ...otherStandards
        ],
        codes: [...taichiCodes, ...otherCodes],
    },
    duilian: {
        title: "Duilian (Choreographed Sparring)",
        standards: [
            "For each technical error 0.10 will be deducted.",
            "Technical errors will be deducted as they occur in a cumulative manner.",
            ...otherStandards
        ],
        codes: [...otherCodes, ...duilianCodes],
    },
    jiti: {
        title: "Jiti (Group Routine)",
        standards: [
            "For each technical error 0.10 will be deducted.",
            "Technical errors will be deducted as they occur in a cumulative manner.",
            ...otherStandards
        ],
        codes: [...otherCodes, ...jitiCodes],
    },
}

const DeductionCodeLookup = () => {
    const [classFilter, setClassFilter] = useState("")
    const [codeFilter, setCodeFilter] = useState("")

    useEffect(() => {
        const hash = window.location.hash;
        const [pathAndHash, searchParams] = hash.split('?');

        const params = new URLSearchParams(searchParams);
        setCodeFilter(params.get('code') || '');
    }, []);

    const updateQueryParam = (key, value) => {
        const hash = window.location.hash;
        const [pathAndHash, searchParams] = hash.split('?');
        const params = new URLSearchParams(searchParams);
    
        if (value) {
            params.set(key, value);
        } else {
            params.delete(key);
        }
    
        const newHash = `${pathAndHash}?${params.toString()}`;
        const newUrl = `${window.location.pathname}${newHash}`;
        window.history.replaceState({}, '', newUrl);
    };

    const handleCodeChange = (event) => {
        const value = event.target.value;
        setCodeFilter(value);
        updateQueryParam('code', value);
    };

    return (
        <>
            <CRow>
                <CCol xs={12}>
                    <CCard className="mb-4">
                        <CCardHeader>
                            <strong>Deduction Code Lookup Filters</strong>
                        </CCardHeader>
                        <CCardBody>
                            <CRow>
                                <CInputGroup className="mb-3">
                                    <CInputGroupText style={{ width: "75px" }}>Class: </CInputGroupText>
                                    <CFormSelect
                                        value={classFilter}
                                        onChange={(event) => setClassFilter(event.target.value)}>
                                        <option value="">*</option>
                                        <option value="northern">Changquan, Jianshu, Daoshu, Qiangshu & Gunshu</option>
                                        <option value="southern">Nanquan, Nandao & Nangun</option>
                                        <option value="taichi">Taijiquan & Taijijian</option>
                                        <option value="duilian">Duilian (Choreographed Sparring)</option>
                                        <option value="jiti">Jiti (Group Routine)</option>
                                    </CFormSelect>
                                </CInputGroup>
                            </CRow>
                            <CRow>
                                <CInputGroup className="mb-3">
                                    <CInputGroupText style={{ width: "75px" }}>Code: </CInputGroupText>
                                    <CFormInput
                                        min={0}
                                        value={codeFilter}
                                        type='number'
                                        inputMode='numeric'
                                        placeholder='Enter Code Number'
                                        onChange={handleCodeChange}
                                    />
                                </CInputGroup>
                            </CRow>
                            <div className="d-grid gap-2 d-md-flex justify-content-md-end">
                                <CButton
                                    style={{}}
                                    color="primary"
                                    onClick={() => {
                                        setClassFilter("");
                                        setCodeFilter("");
                                        updateQueryParam('code', null)
                                    }}>
                                    Reset Filters
                                </CButton>
                            </div>
                        </CCardBody>
                    </CCard>
                </CCol>
            </CRow>
            <CodeCards
                codeCards={codeCards}
                classFilter={classFilter}
                codeFilter={codeFilter}
            />
            <br></br>
            <hr></hr>
            <p style={{ fontSize: "12px" }}>
                Routine Content Requirements taken from the <a href="https://www.iwuf.org/xhimg/soft/240912/WUSHU-TAOLU-COMPETITION-RULES-AND-JUDGING-METHODS-2024.pdf" target="_blank">
                    WUSHU TAOLU COMPETITION RULES AND
                    JUDGING METHODS (2024)
                </a>
            </p>
        </>
    )
}

const CodeCards = ({ codeCards, classFilter, codeFilter }) => {
    return (
        <>
            {
                Object.entries(codeCards).map(([key, card]) => {
                    const filteredCodes = card.codes.filter(code => code.code.includes(codeFilter));

                    return (
                        key.includes(classFilter) && (
                            <CRow key={key}>
                                <CCol xs={12}>
                                    <CCard className="mb-4">
                                        <CCardHeader>
                                            <div><strong>{card.title}</strong> - Deduction Codes</div>
                                        </CCardHeader>
                                        <CCardBody>
                                            <CRow>
                                                <CAccordion>
                                                    <CAccordionItem itemKey={1}>
                                                        <CAccordionHeader>Deduction Standards</CAccordionHeader>
                                                        <CAccordionBody>
                                                            {card.standards.map((standard, idx) => (
                                                                <li key={idx}>{standard}</li>
                                                            ))}
                                                        </CAccordionBody>
                                                    </CAccordionItem>
                                                </CAccordion>
                                            </CRow>
                                            <br />
                                            <CRow>
                                                <CCol>
                                                    {filteredCodes.length === 0 ? (
                                                        <CAlert color="danger">
                                                            No {card.title} deductions with code {codeFilter} found.
                                                        </CAlert>
                                                    ) : (
                                                        filteredCodes.map((code, idx) => (
                                                            <CWidgetStatsB
                                                                key={idx}
                                                                className="mb-3"
                                                                progress={{ value: 100 }}
                                                                text={
                                                                    <div>
                                                                        <div><strong>{code.category}:</strong></div>
                                                                        {code.content.map((c, idx) => (
                                                                            <li key={idx}>{c}</li>
                                                                        ))}
                                                                    </div>
                                                                }
                                                                title={code.english}
                                                                value={`${code.chinese} - ${code.code}`}
                                                            />
                                                        ))
                                                    )}
                                                </CCol>
                                            </CRow>
                                        </CCardBody>
                                    </CCard>
                                </CCol>
                            </CRow>
                        )
                    );
                })
            }
        </>
    );
}

export default DeductionCodeLookup
