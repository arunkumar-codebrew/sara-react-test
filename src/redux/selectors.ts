import { STEP_CUSTOMERS, STEP_GENERAL_INFO, STEP_SALES_INFO } from "../data";
import { RootState } from "./store";

export const getStep = (state: RootState) => state.step;
export const formData = (state: RootState) => state.form;
export const formGeneralInfo = (state: RootState) => state.form[STEP_GENERAL_INFO];
export const formSalesInfo = (state: RootState) => state.form[STEP_SALES_INFO];
export const formCustomerInfo = (state: RootState) => state.form[STEP_CUSTOMERS];