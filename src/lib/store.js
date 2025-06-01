import { configureStore } from "@reduxjs/toolkit";
import AuthReducer from "./slice/authslice";
import SiteSettingReducer from "./slice/sitesSetting";

export const store = configureStore({
  reducer: {
    auth: AuthReducer,
    siteSetting:SiteSettingReducer
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false, // Disable serializable check
    }),
});