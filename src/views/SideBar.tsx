import { Card } from "react-bootstrap";
import { useSelector } from "react-redux";
import { formData, getStep } from "../redux/selectors";
import { ProfileComponents } from "../types";

const SideBar = ({ profileComponents }: { profileComponents: ProfileComponents }) => {
    const step = useSelector(getStep);
    const form = useSelector(formData);

    const totalFields = profileComponents.reduce((totalCount: { total: number, valid: number }, component: any) => ({
        total: totalCount.total + component.fields.length,
        valid: totalCount.valid + component.fields.filter((field: any) => field.checkValidity(form)).length
    }), { total: 0, valid: 0 });

    const completionPercentage = Math.floor((totalFields.valid / totalFields.total) * 100);

    return <Card className="bg-grey">
        <Card.Title className="Card-title">
            <div className="row">
                <div className="col-10">
                    Profile Completion
                </div>
                <div className="col-2">
                    {completionPercentage}%
                </div>
            </div>
        </Card.Title>
        <Card.Body>
            {
                profileComponents.map((profileComponent) => {

                    const isSectionValid = profileComponent.fields.reduce((isValid: boolean, component) => isValid && component.checkValidity(form), true);

                    return <Card style={{ padding: "10px" }} key={profileComponent.id}>
                        <Card.Title><div className={`alert ${isSectionValid ? "alert-success" : "alert-danger"}`}>{isSectionValid ? "✓" : "X"} {profileComponent.label}</div></Card.Title>
                        {profileComponent.id === step && <Card.Body>
                            <ul>
                                {profileComponent.fields.map((field) => <li key={field.label}>{field.checkValidity(form) ? "✓" : "X"} {field.label}</li>)}
                            </ul>
                        </Card.Body>}
                    </Card>
                })
            }
        </Card.Body>
    </Card>
}

export default SideBar;