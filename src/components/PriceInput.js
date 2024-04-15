import { useState, useEffect } from "react";
import { addComma, removeComma } from "../services/services";
import {
    ERROR_MSG_EMPTY,
    ERROR_MSG_REGEX,
    BORDER_STYLE_ERROR,
    BORDER_STYLE_NORMAL,
} from "../config/setting";

const PriceInput = (props) => {
    const [displayErr, setDisplayErr] = useState("none");
    const [errorMsg, setErrorMsg] = useState("");
    const [inputBorder, setInputBorder] = useState(BORDER_STYLE_NORMAL);

    const regex = /^-?(?!0\d+)\d*(,\d*)*(\.\d+)?$/g;

    // Update format when price change
    useEffect(() => {
        if (props.price.length === 0) {
            setDisplayErr("block");
            setErrorMsg(ERROR_MSG_EMPTY);
            setInputBorder(BORDER_STYLE_ERROR);
        } else if (!props.price.toString().match(regex)) {
            setDisplayErr("block");
            setErrorMsg(ERROR_MSG_REGEX);
            setInputBorder(BORDER_STYLE_ERROR);
        } else {
            let originalPrice = removeComma(props.price);
            let formattedPrice = addComma(originalPrice);
            props.setPrice(formattedPrice);
            setDisplayErr("none");
            setInputBorder(BORDER_STYLE_NORMAL);
        }
    }, [props.price]);

    return (
        <table>
            <tbody>
                <tr>
                    <td>
                        <div>入住費用(每人每晚)</div>
                    </td>
                </tr>

                <tr>
                    <td>
                        <div className="input-container">
                            <div className="currency-block">TWD</div>
                            <div>
                                <label>
                                    <input
                                        type="text"
                                        id="price"
                                        name="price"
                                        value={props.price}
                                        placeholder="請輸入費用"
                                        // onChange={e => handleChange(e.target.value)}
                                        onChange={(e) =>
                                            props.setPrice(e.target.value)
                                        }
                                        style={inputBorder}
                                    />
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

                <tr>
                    <td>
                        <div className="hint">輸入0表示免費</div>
                    </td>
                </tr>
            </tbody>
        </table>
    );
};

export default PriceInput;
