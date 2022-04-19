import { Form } from "./redux/reducer";

export interface ProfileComponentField {
    label: string;
    checkValidity: (form: Form) => boolean;
}

export interface ProfileComponent {
    id: number;
    label: string;
    fields: ProfileComponentField[]
};

export type ProfileComponents = ProfileComponent[];