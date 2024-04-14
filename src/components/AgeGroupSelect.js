import { useState, useEffect } from "react";
import {
    AGE_MIN,
    AGE_MAX,
    ERROR_MSG_OVERLAP,
    BORDER_STYLE_ERROR,
    BORDER_STYLE_NORMAL,
} from "../config/setting";

const AgeGroupSelect = (props) => {
    const [displayErr, setDisplayErr] = useState("none");
    const [errorMsg, setErrorMsg] = useState("");
    const [inputBorder, setInputBorder] = useState(BORDER_STYLE_NORMAL);

    const [startAgeMax, setStartAgeMax] = useState(AGE_MAX);
    const [startAgeList, setStartAgeList] = useState([]);

    const [endAgeMin, setEndAgeMin] = useState(AGE_MIN);
    const [endAgeList, setEndAgeList] = useState([]);

    // Update range of start age list
    useEffect(() => {
        let temp = [];
        for (let i = AGE_MIN; i <= startAgeMax; i++) {
            temp.push(Number(i));
        }
        setStartAgeList(temp);
    }, [startAgeMax]);

    // Update range of end age list
    useEffect(() => {
        let temp = [];
        for (let i = endAgeMin; i <= AGE_MAX; i++) {
            temp.push(Number(i));
        }
        setEndAgeList(temp);
    }, [endAgeMin]);

    // Update overlap alert
    useEffect(() => {
        if (props.overlap) {
            setDisplayErr("block");
            setErrorMsg(ERROR_MSG_OVERLAP);
            setInputBorder(BORDER_STYLE_ERROR);
        } else {
            setDisplayErr("none");
            setInputBorder(BORDER_STYLE_NORMAL);
        }
    }, [props.overlap]);

    const handleStartAgeChange = (value) => {
        setEndAgeMin(value);
        props.setStartAge(value);
    };

    const handleEndAgeChange = (value) => {
        setStartAgeMax(value);
        props.setEndAge(value);
    };

    return (
        <table>
            <tbody>
                <tr>
                    <td>
                        <div>年齡</div>
                    </td>
                </tr>

                <tr>
                    <td>
                        <div className="input-container">
                            <div>
                                <label>
                                    <select
                                        name="startAge"
                                        className="right-age-selector"
                                        value={props.startAge}
                                        onChange={(e) =>
                                            handleStartAgeChange(e.target.value)
                                        }
                                        style={inputBorder}
                                    >
                                        {startAgeList.map((age, index) => {
                                            return (
                                                <option value={age} key={index}>
                                                    {age}
                                                </option>
                                            );
                                        })}
                                    </select>
                                </label>
                            </div>
                            <div className="tilde-block">~</div>
                            <div>
                                <label>
                                    <select
                                        name="endAge"
                                        className="left-age-selector"
                                        value={props.endAge}
                                        onChange={(e) =>
                                            handleEndAgeChange(e.target.value)
                                        }
                                        style={inputBorder}
                                    >
                                        {endAgeList.map((age, index) => {
                                            return (
                                                <option value={age} key={index}>
                                                    {age}
                                                </option>
                                            );
                                        })}
                                    </select>
                                </label>
                            </div>
                        </div>
                    </td>
                </tr>

                <tr>
                    <td>
                        <div
                            className="error-message"
                            style={{ display: displayErr }}
                        >
                            {errorMsg}
                        </div>
                    </td>
                </tr>
            </tbody>
        </table>
    );
};

export default AgeGroupSelect;
