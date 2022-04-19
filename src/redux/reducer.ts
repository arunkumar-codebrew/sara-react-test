import { SET_FORM, SET_STEP } from "./types";

interface Branch {
    city: string;
    name: string;
    notes: string;
}

export interface Form {
    1: {
        companyName: string;
        companyDescription: string;
        branches: Branch[];
    },
    2: {
        categories: string[];
        currency: string;
    },
    3: {
        gender: string;
        ageGroups: string[];
        countries: string[];
    }
}

interface State {
    form: Form;
    step: number;
}

const initialState: State = {
    step: 1,
    form: {
        1: {
            companyName: "",
            companyDescription: "",
            branches: [
                {
                    city: "",
                    name: "",
                    notes: ""
                }
            ]
        },
        2: {
            categories: [],
            currency: ""
        },
        3: {
            gender: "",
            ageGroups: [],
            countries: []
        }
    }
};

export default function (state = initialState, action: any) {
    switch (action.type) {
        case SET_FORM:
            return {
                ...state,
                form: {
                    ...state.form,
                    ...action.data
                }
            };
        case SET_STEP:
            return {
                ...state,
                step: action.data.step
            }
        default:
            return state;
    }
}