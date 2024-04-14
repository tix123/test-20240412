import { createSlice } from "@reduxjs/toolkit";

export const priceSetupSlice = createSlice({
    name: "priceSetup",
    initialState: {
        priceSetupList: [
            {
                id: 1,
                startAge: 0,
                endAge: 20,
                price: "0",
                deletable: false,
                overlap: false,
            },
        ],
    },
    reducers: {
        addPriceSetup: (state, action) => {
            state.priceSetupList.push(action.payload);
        },
        deletePriceSetup: (state, action) => {
            state.priceSetupList = state.priceSetupList.filter(
                (item) => item.id !== action.payload
            );
        },
        editPrice: (state, action) => {
            state.priceSetupList = state.priceSetupList.map((item) => {
                if (item.id === action.payload.id) {
                    return {
                        ...item,
                        price: action.payload.price,
                    };
                }
                return item;
            });
        },
        editStartAge: (state, action) => {
            state.priceSetupList = state.priceSetupList.map((item) => {
                if (item.id === action.payload.id) {
                    return {
                        ...item,
                        startAge: action.payload.startAge,
                    };
                }
                return item;
            });
        },
        editEndAge: (state, action) => {
            state.priceSetupList = state.priceSetupList.map((item) => {
                if (item.id === action.payload.id) {
                    return {
                        ...item,
                        endAge: action.payload.endAge,
                    };
                }
                return item;
            });
        },
        editOverlap: (state, action) => {
            state.priceSetupList = state.priceSetupList.map((item) => {
                if (item.id === action.payload.id) {
                    return {
                        ...item,
                        overlap: action.payload.overlap,
                    };
                }
                return item;
            });
        },
        setAllOverlapFalse: (state, action) => {
            state.priceSetupList = state.priceSetupList.map((item) => {
                return {
                    ...item,
                    overlap: false,
                };
            });
        },
    },
});

export const {
    addPriceSetup,
    deletePriceSetup,
    editPrice,
    editStartAge,
    editEndAge,
    editOverlap,
    setAllOverlapFalse,
} = priceSetupSlice.actions;

export default priceSetupSlice.reducer;
