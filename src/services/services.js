import { AGE_MIN, AGE_MAX } from "../config/setting";

export const addComma = (price) => {
    let priceStr = price.toString();
    const regex = /(\d)(?=(\d{3})+(?!\d))(?<!\.\d*)/g;
    let formattedPrice = priceStr.replace(regex, "$1,");
    return formattedPrice;
};

export const removeComma = (price) => {
    let originalPrice = price.toString().split(",").join("");
    return originalPrice;
};

export const getNumberIntervals = (ageGroup) => {
    // Create an array with all ages
    let ageList = [];
    for (let i = AGE_MIN; i <= AGE_MAX; i++) {
        ageList.push(i);
    }

    const checkRepeat = (list, subgroup) => {
        for (let i = 0; i < list.length; i++) {
            let count = 0;
            for (let j = 0; j < list[i].length; j++) {
                if (list[i][j] === subgroup[j]) {
                    count++;
                }
                if (count === list[i].length) {
                    return true;
                }
            }
        }
        return false;
    };

    let overlap = [];

    for (let i = 0; i < ageGroup.length; i++) {
        // Generate overlap
        for (let j = i + 1; j < ageGroup.length; j++) {
            let temp = [];
            if (
                ageGroup[i][0] <= ageGroup[j][0] &&
                ageGroup[i][1] <= ageGroup[j][1] &&
                ageGroup[i][1] >= ageGroup[j][0]
            ) {
                temp = [ageGroup[j][0], ageGroup[i][1]];
                if (!checkRepeat(overlap, temp)) {
                    overlap.push(temp);
                }
            }
            if (
                ageGroup[i][0] >= ageGroup[j][0] &&
                ageGroup[i][1] >= ageGroup[j][1] &&
                ageGroup[i][0] <= ageGroup[j][1]
            ) {
                temp = [ageGroup[i][0], ageGroup[j][1]];
                if (!checkRepeat(overlap, temp)) {
                    overlap.push(temp);
                }
            }
        }

        // Remove ageGroup from ageList
        for (let j = ageGroup[i][0]; j <= ageGroup[i][1]; j++) {
            ageList = ageList.filter((n) => n !== j);
        }
    }

    // Generate notInclude group from ageList
    let notInclude = [];
    let notIncludeSubArray = [];

    for (let i = 0; i < ageList.length; i++) {
        notIncludeSubArray.push(ageList[i]);
        let seriesEnd = -1;
        while (i < ageList.length - 1 && ageList[i + 1] - ageList[i] === 1) {
            seriesEnd = ageList[i + 1];
            i++;
        }

        if (seriesEnd === -1) {
            notIncludeSubArray.push(ageList[i]);
        } else {
            notIncludeSubArray.push(seriesEnd);
        }

        notInclude.push(notIncludeSubArray);
        notIncludeSubArray = [];
    }

    let result = {
        overlap: overlap,
        notInclude: notInclude,
    };

    return result;
};

export const generateAgeGroup = (list) => {
    let result = [];
    for (let i = 0; i < list.length; i++) {
        let temp = [list[i].startAge, list[i].endAge];
        result.push(temp);
    }
    return result;
};

export const generateResult = (list) => {
    let result = [];
    for (let i = 0; i < list.length; i++) {
        let obj = {};
        obj.ageGroup = [list[i].startAge, list[i].endAge];
        obj.price = list[i].price;
        result.push(obj);
    }
    return result;
};
