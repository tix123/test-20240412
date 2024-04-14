import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import AgeGroupPrice from "./AgeGroupPrice";
import {
    addPriceSetup,
    editOverlap,
    setAllOverlapFalse,
} from "../store/priceSetupSlice";
import {
    generateAgeGroup,
    getNumberIntervals,
    generateResult,
} from "../services/services";

const AgeGroupPriceList = (props) => {
    const [displayAdd, setDisplayAdd] = useState("flex");

    const priceSetupList = useSelector(
        (state) => state.priceSetup.priceSetupList
    );
    const dispatch = useDispatch();

    // Update ovelap & notInclude when add or remove a group
    useEffect(() => {
        let ageGroup = generateAgeGroup(priceSetupList);
        let resultObj = getNumberIntervals(ageGroup);
        let overlap = resultObj.overlap;
        let notInclude = resultObj.notInclude;

        // Update overlap flag
        if (overlap.length === 0) {
            dispatch(setAllOverlapFalse());
        } else {
            for (let i = 0; i < priceSetupList.length; i++) {
                for (let j = 0; j < overlap.length; j++) {
                    let obj = {};
                    obj.id = priceSetupList[i].id;
                    obj.overlap = false;
                    for (let k = 0; k < overlap[j].length; k++) {
                        if (
                            priceSetupList[i].startAge === overlap[j][k] ||
                            priceSetupList[i].endAge === overlap[j][k]
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
            setDisplayAdd("none");
        } else {
            setDisplayAdd("flex");
        }
    }, [priceSetupList.length]);

    const handleAdd = () => {
        let newId = priceSetupList[priceSetupList.length - 1].id + 1;
        let initState = {
            id: newId,
            startAge: 0,
            endAge: 20,
            price: "0",
            deletable: true,
            overlap: false,
        };
        dispatch(addPriceSetup(initState));
    };

    props.onChange(generateResult(priceSetupList));

    return (
        <div className="ui-wrap">
            <div>
                {priceSetupList.map((item, index) => {
                    return (
                        <div key={index}>
                            {index > 0 ? <hr /> : <></>}
                            <AgeGroupPrice
                                index={index}
                                id={item.id}
                                startAge={item.startAge}
                                endAge={item.endAge}
                                price={item.price}
                                deletable={item.deletable}
                                overlap={item.overlap}
                                setDisplayAdd={setDisplayAdd}
                            />
                        </div>
                    );
                })}
            </div>
            <div>
                <button
                    style={{ display: displayAdd }}
                    type="button"
                    className="add-button"
                    onClick={() => handleAdd()}
                >
                    <div className="add-icon">+</div>
                    <div className="add-string">新增價格設定</div>
                </button>
            </div>
        </div>
    );
};

export default AgeGroupPriceList;
