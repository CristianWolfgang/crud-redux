import { configureStore } from "@reduxjs/toolkit";
import crudSlice from "../features/crud/crud-slice";
import ActiveUpdatingSlice  from "../features/crud/active-updating-slice";

const store = configureStore({
    reducer:{
        crud:crudSlice,
        toggle:ActiveUpdatingSlice
    }
})
export {store}
export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch