import React, { useState } from 'react'
import {
    CRow,
    CInputGroup,
    CInputGroupText,
    CFormSelect,
} from '@coreui/react'

import { useAdults2025 } from '../../context/Adults2025Context';

const CategoryFilterRow = () => {
    const adults25Context = useAdults2025();

    const { filters, setFilters } = adults25Context;

    const handleCategoryFilterChange = (e) => {
        setFilters((prev) => ({ ...prev, categoryFilter: e.target.value }));
    }

    return (
        <CRow>
            <CInputGroup className="mb-3">
                <CInputGroupText style={{ width: "100px" }}>Category: </CInputGroupText>
                <CFormSelect
                    
                    value={filters.categoryFilter}
                    onChange={handleCategoryFilterChange}>
                    <option value="">*</option>
                    <option value="CQ_DS_GS">Changquan, Daoshu, Gunshu Group</option>
                    <option value="CQ_JS_QS">Changquan, Jianshu, Qiangshu Group</option>
                    <option value="NQ_ND_NG">Nanquan, Nandao, Nangun Group</option>
                    <option value="TQ_TJ_TS">Taijiquan, Taijijian, Taijishan Group</option>
                </CFormSelect>
            </CInputGroup>
        </CRow>
    )
}

export default CategoryFilterRow;
