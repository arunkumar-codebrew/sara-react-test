import { SET_FORM, SET_STEP } from "./types";

export const setForm = (field: number, value: any) => {
    return ({
        type: SET_FORM,
        data: {
            [field]: value
        }
    })
};

export const setStep = (step: number) => {
    return ({
        type: SET_STEP,
        data: { step }
    })
};