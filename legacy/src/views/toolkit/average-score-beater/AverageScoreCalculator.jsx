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

/**
 * Calculates the lowest possible score(s) needed for a 3-score average to strictly beat a target value.
 *
 * It takes the target average and up to three known scores. It determines the values for any missing scores.
 *
 * - If 3 known scores are provided, it's a verification (result indicates if average is beaten).
 * - If 2 known scores are provided, it calculates the 3rd score.
 * - If 1 known score is provided, it calculates the minimum for the other 2 scores (assumed equal).
 * - If 0 known scores are provided, it calculates the minimum for all 3 scores (assumed equal).
 *
 * @param {number} targetAverage The average score that needs to be strictly beaten.
 * @param {number[]} knownScores An array containing 0, 1, 2, or 3 known scores. All scores are non-negative.
 * @returns {string} A string representing the calculated lowest score(s) needed, rounded to 3 decimal places,
 * or a descriptive message if the average is already beaten, or if invalid input is detected.
 */
function getMinScoreForThree(targetAverage, knownScores) {
    if (typeof targetAverage !== 'number' || isNaN(targetAverage)) {
        return "Invalid 'Average to Beat' value. Please enter a number.";
    }

    if (knownScores.length > 3) {
        return "Error: Too many scores provided. Max 3 scores allowed for the average.";
    }

    for (const score of knownScores) {
        if (typeof score !== 'number' || isNaN(score)) {
            return "Invalid score detected. Please enter numbers for all scores.";
        }
    }

    const numberOfScoresInAverage = 3;
    const currentSum = knownScores.reduce((sum, score) => sum + score, 0);

    // Calculate the absolute minimum sum required for the 3 scores to strictly beat the targetAverage.
    const minTargetSum = (targetAverage * numberOfScoresInAverage) + (Number.EPSILON * numberOfScoresInAverage);

    const scoresToFind = numberOfScoresInAverage - knownScores.length;

    let result = "";

    if (scoresToFind === 0) {
        // All 3 scores are known. Just check if the average is already beaten.
        const currentAverage = currentSum / numberOfScoresInAverage;
        if (currentAverage > targetAverage) {
            result = `Average ${currentAverage.toFixed(3)} already beats ${targetAverage}.`;
        } else {
            // If all 3 scores are known and don't beat the average, it's impossible to "find" a score.
            result = `Average ${currentAverage.toFixed(3)} does not beat ${targetAverage}. Adjust known scores to meet the average.`;
        }
    } else {
        const sumNeededFromMissingScores = minTargetSum - currentSum;

        if (scoresToFind === 1) {
            // One score is missing. Calculate that specific score.
            const neededScore = sumNeededFromMissingScores;
            result = `Needed score: ${Math.max(0, neededScore).toFixed(3)}`;
        } else if (scoresToFind === 2) {
            // Two scores are missing. Assume they must be equal to find the minimum for each.
            const neededScorePerMissing = sumNeededFromMissingScores / 2;
            result = `Needed for each of 2 scores: ${Math.max(0, neededScorePerMissing).toFixed(3)}`;
        } else if (scoresToFind === 3) {
            // All three scores are missing. Assume they must be equal.
            const neededScorePerMissing = sumNeededFromMissingScores / 3;
            result = `Needed for each of 3 scores: ${Math.max(0, neededScorePerMissing).toFixed(3)}`;
        }

        // Check if the current sum already makes it impossible to beat the average even with perfect scores
        if (sumNeededFromMissingScores <= 0 && scoresToFind > 0) {
            // This means the 'knownScores' are already so high that the sum needed from missing scores is 0 or negative.
            // So, 0 is the minimal score, and the average would be beaten.
            result = `Average would be beaten with 0 for remaining score(s).`;
        }
    }

    return result;
}

const AverageScoreCalculator = () => {
    const [targetValue, setTargetValue] = useState("")
    const [barehandScore, setBarehandScore] = useState("")
    const [weapon1Score, setWeapon1Score] = useState("")
    const [weapon2Score, setWeapon2Score] = useState("")

    const [minNeededScoreResult, setMinNeededScoreResult] = useState("");
    useEffect(() => {
        // Clear previous result
        setMinNeededScoreResult("");

        const parsedTargetValue = parseFloat(targetValue);

        // Don't calculate if targetValue is empty or invalid
        if (targetValue === "" || isNaN(parsedTargetValue)) {
            setMinNeededScoreResult("Enter an average to beat to calculate.");
            return;
        }

        // Collect all potential scores, parsing them. Treat blank or invalid inputs as NaN initially.
        const allPotentialScores = [barehandScore, weapon1Score, weapon2Score].map(s => {
            const parsed = parseFloat(s);
            return isNaN(parsed) ? NaN : parsed;
        });

        // Filter out NaN values to get only the valid known scores
        const knownScores = allPotentialScores.filter(s => !isNaN(s));

        // Call the new, consolidated function
        const calculationResult = getMinScoreForThree(parsedTargetValue, knownScores);
        setMinNeededScoreResult(calculationResult);

    }, [targetValue, barehandScore, weapon1Score, weapon2Score]); // Dependency array


    return (
        <>
            <CRow>
                <CCol xs={12}>
                    <CCard className="mb-4">
                        <CCardHeader>
                            <strong>Average Score Calculator</strong>
                        </CCardHeader>
                        <CCardBody>
                            <CRow>
                                <CInputGroup className="mb-3">
                                    <CInputGroupText style={{ width: "175px" }}>Average to Beat: </CInputGroupText>
                                    <CFormInput
                                        min={0}
                                        step="any"
                                        value={targetValue}
                                        type='number'
                                        inputMode='decimal'
                                        placeholder='Enter Average Score to Beat'
                                        onChange={(e) => setTargetValue(e.target.value)}
                                    />
                                </CInputGroup>
                            </CRow>
                            <hr style={{ marginTop: 0 }} />
                            <CRow>
                                <CInputGroup className="mb-3">
                                    <CInputGroupText style={{ width: "175px" }}>Barehand Score: </CInputGroupText>
                                    <CFormInput
                                        min={0}
                                        step="any"
                                        value={barehandScore}
                                        type='number'
                                        inputMode='decimal'
                                        placeholder='Enter Barehand Score'
                                        onChange={(e) => setBarehandScore(e.target.value)}
                                    />
                                </CInputGroup>
                            </CRow>
                            <CRow>
                                <CInputGroup className="mb-3">
                                    <CInputGroupText style={{ width: "175px" }}>Weapon 1 Score: </CInputGroupText>
                                    <CFormInput
                                        min={0}
                                        step="any"
                                        value={weapon1Score}
                                        type='number'
                                        inputMode='decimal'
                                        placeholder='Enter Weapon 1 Score'
                                        onChange={(e) => setWeapon1Score(e.target.value)}
                                    />
                                </CInputGroup>
                            </CRow>
                            <CRow>
                                <CInputGroup className="mb-3">
                                    <CInputGroupText style={{ width: "175px" }}>Weapon 2 Score: </CInputGroupText>
                                    <CFormInput
                                        min={0}
                                        step="any"
                                        value={weapon2Score}
                                        type='number'
                                        inputMode='decimal'
                                        placeholder='Enter Weapon 2 Score'
                                        onChange={(e) => setWeapon2Score(e.target.value)}
                                    />
                                </CInputGroup>
                            </CRow>
                            {targetValue.length > 0 && (
                                <>
                                    <hr style={{ marginTop: 0 }} />
                                    <p><strong>Minimum Needed Score: </strong>{minNeededScoreResult}</p>
                                </>
                            )}
                            <div className="d-grid gap-2 d-md-flex justify-content-md-end">
                                <CButton
                                    color="primary"
                                    onClick={() => {
                                        setTargetValue("");
                                        setBarehandScore("");
                                        setWeapon1Score("");
                                        setWeapon2Score("");
                                        setMinNeededScoreResult("");
                                    }}>
                                    Reset
                                </CButton>
                            </div>
                        </CCardBody>
                    </CCard>
                </CCol>
            </CRow>
        </>
    )
}

export default AverageScoreCalculator
