import { Form } from "./redux/reducer";
import { ProfileComponents } from "./types";

export const STEP_GENERAL_INFO = 1;
export const STEP_SALES_INFO = 2;
export const STEP_CUSTOMERS = 3;

export const stepTitles = [
    {
        step: STEP_GENERAL_INFO,
        label: "General Info"
    }, {
        step: STEP_SALES_INFO,
        label: "Sales Info"
    }, {
        step: STEP_CUSTOMERS,
        label: "Customers"
    }
];

export const profileComponents: ProfileComponents = [{
    id: STEP_GENERAL_INFO,
    label: "General Company Info",
    fields: [
        {
            label: "Company Name",
            checkValidity: (form: Form) => !!form[STEP_GENERAL_INFO].companyName
        },
        {
            label: "Company Description",
            checkValidity: (form: Form) => !!form[STEP_GENERAL_INFO].companyDescription
        },
        {
            label: "Branches",
            checkValidity: (form: Form) => !!form[STEP_GENERAL_INFO].branches.length && form[STEP_GENERAL_INFO].branches.reduce((prevVal: boolean, branch) => prevVal && (!!branch.name && !!branch.city && !!branch.notes), true)
        }
    ]
}, {
    id: STEP_SALES_INFO,
    label: "Sales Info",
    fields: [
        {
            label: "Categories",
            checkValidity: (form: Form) => { return (!!form[STEP_SALES_INFO].categories.length) }
        },
        {
            label: "Currency",
            checkValidity: (form: Form) => !!form[STEP_SALES_INFO].currency
        }
    ]
}, {
    id: STEP_CUSTOMERS,
    label: "Customers & Locale",
    fields: [
        {
            label: "Gender",
            checkValidity: (form: Form) => !!form[STEP_CUSTOMERS].gender
        },
        {
            label: "Age Groups",
            checkValidity: (form: Form) => !!form[STEP_CUSTOMERS].ageGroups.length
        },
        {
            label: "Countries",
            checkValidity: (form: Form) => !!form[STEP_CUSTOMERS].countries.length
        }
    ]
}];


export const genders = [
    { label: "Male", value: "male" },
    { label: "Female", value: "female" },
    { label: "Both", value: "both" },
];

export const ageGroups = [{
    label: "Tween",
    ageRange: "9-12",
    value: "tween"
}, {
    label: "Early Youth",
    ageRange: "18-24",
    value: "early_youth"
}];

export const countries = [
    { label: "Saudi Arabia", value: "SAD" },
    { label: "United Arab Emirates", value: "UAE" },
    { label: "Kuwait", value: "KUW" },
];