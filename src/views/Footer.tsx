import { Button } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { STEP_CUSTOMERS, STEP_GENERAL_INFO } from "../data";
import { setStep } from "../redux/actions";
import { formData, getStep } from "../redux/selectors";
import { ProfileComponents } from "../types";

const Footer = ({ profileComponents }: { profileComponents: ProfileComponents }) => {
    const dispatch = useDispatch();
    const form = useSelector(formData);
    const step = useSelector(getStep);
    const isCurrentStepComplete = profileComponents[step - 1].fields.reduce((isValid: boolean, field) => field.checkValidity(form), true);

    const totalFields = profileComponents.reduce((totalCount: { total: number, valid: number }, component: any) => ({
        total: totalCount.total + component.fields.length,
        valid: totalCount.valid + component.fields.filter((field: any) => field.checkValidity(form)).length
    }), { total: 0, valid: 0 });

    const isFormComplete = totalFields.total === totalFields.valid;

    const handleNextStep = () => {
        dispatch(setStep(step + 1));
    }

    const handlePreviousStep = () => {
        dispatch(setStep(step - 1));
    }

    return <>
        <Button className="m-2" disabled={step == STEP_GENERAL_INFO} onClick={handlePreviousStep}>Back</Button>
        <Button className="m-2" disabled={step == STEP_CUSTOMERS || !isCurrentStepComplete} onClick={handleNextStep}>Next</Button>
        <Button className="m-2" disabled={!isFormComplete}>Save Updates</Button>
    </>;
}

export default Footer;