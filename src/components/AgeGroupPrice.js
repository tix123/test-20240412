import { useState, useEffect } from "react";
import AgeGroupSelect from "./AgeGroupSelect";
import PriceInput from "./PriceInput";
import { useSelector, useDispatch } from "react-redux";
import {
    deletePriceSetup,
    editPrice,
    editStartAge,
    editEndAge,
    editOverlap,
    setAllOverlapFalse,
} from "../store/priceSetupSlice";
import { generateAgeGroup, getNumberIntervals } from "../services/services";

const AgeGroupPrice = (props) => {
    const [price, setPrice] = useState(props.price);
    const [startAge, setStartAge] = useState(0);
    const [endAge, setEndAge] = useState(20);

    const priceSetupList = useSelector(
        (state) => state.priceSetup.priceSetupList
    );
    const dispatch = useDispatch();

    // Store to redux when change
    useEffect(() => {
        let obj = {};
        obj.id = props.id;
        obj.price = price;
        dispatch(editPrice(obj));
    }, [price]);

    useEffect(() => {
        // make a deep copy
        let tempList = JSON.parse(JSON.stringify(priceSetupList));
        for (let i = 0; i < tempList.length; i++) {
            if (tempList[i].id === props.id) {
                tempList[i].startAge = startAge;
            }
        }

        let ageGroup = generateAgeGroup(tempList);
        let resultObj = getNumberIntervals(ageGroup);
        let overlap = resultObj.overlap;
        let notInclude = resultObj.notInclude;

        // Update overlap flag
        if (overlap.length === 0) {
            dispatch(setAllOverlapFalse());
        } else {
            for (let i = 0; i < tempList.length; i++) {
                for (let j = 0; j < overlap.length; j++) {
                    let obj = {};
                    obj.id = tempList[i].id;
                    obj.overlap = false;
                    for (let k = 0; k < overlap[j].length; k++) {
                        if (
                            tempList[i].startAge === overlap[j][k] ||
                            tempList[i].endAge === overlap[j][k]
                        ) {
                            obj.overlap = true;
                        }
                    }
                    dispatch(editOverlap(obj));
                }
            }
        }

        // display add button if still have age not include
        if (notInclude.length === 0) {
            props.setDisplayAdd("none");
        } else {
            props.setDisplayAdd("flex");
        }

        // update redux store
        let obj = {};
        obj.id = props.id;
        obj.startAge = Number(startAge);
        dispatch(editStartAge(obj));
    }, [startAge]);

    useEffect(() => {
        // make a deep copy
        let tempList = JSON.parse(JSON.stringify(priceSetupList));
        for (let i = 0; i < tempList.length; i++) {
            if (tempList[i].id === props.id) {
                tempList[i].endAge = endAge;
            }
        }

        let ageGroup = generateAgeGroup(tempList);
        let resultObj = getNumberIntervals(ageGroup);
        let overlap = resultObj.overlap;
        let notInclude = resultObj.notInclude;

        // Update overlap flag
        if (overlap.length === 0) {
            dispatch(setAllOverlapFalse());
        } else {
            for (let i = 0; i < tempList.length; i++) {
                for (let j = 0; j < overlap.length; j++) {
                    let obj = {};
                    obj.id = tempList[i].id;
                    obj.overlap = false;
                    for (let k = 0; k < overlap[j].length; k++) {
                        if (
                            tempList[i].startAge === overlap[j][k] ||
                            tempList[i].endAge === overlap[j][k]
                        ) {
                            obj.overlap = true;
                        }
                    }
                    dispatch(editOverlap(obj));
                }
            }
        }

        // display add button if still have age not include
        if (notInclude.length === 0) {
            props.setDisplayAdd("none");
        } else {
            props.setDisplayAdd("flex");
        }

        // update redux store
        let obj = {};
        obj.id = props.id;
        obj.endAge = Number(endAge);
        dispatch(editEndAge(obj));
    }, [endAge]);

    const index = props.index + 1;

    const handleDelete = () => {
        dispatch(deletePriceSetup(props.id));
    };

    return (
        <>
            <div className="title-container">
                <div className="group-title">價格設定-{index}</div>
                <button
                    type="button"
                    className="delete-button"
                    onClick={() => handleDelete()}
                    style={{ display: props.deletable ? "flex" : "none" }}
                >
                    <div className="delete-icon">×</div>
                    <div className="delete-string">移除</div>
                </button>
            </div>

            <div className="age-price-container">
                <div>
                    <AgeGroupSelect
                        startAge={startAge}
                        setStartAge={setStartAge}
                        endAge={endAge}
                        setEndAge={setEndAge}
                        overlap={props.overlap}
                    />
                </div>
                <div>
                    <PriceInput price={price} setPrice={setPrice} />
                </div>
            </div>
        </>
    );
};

export default AgeGroupPrice;
