import { configureStore } from "@reduxjs/toolkit";

import priceSetupReducer from "./priceSetupSlice";

export default configureStore({
    reducer: {
        priceSetup: priceSetupReducer,
    },
});
