import { useState, useEffect } from "react";
import { Card } from "react-bootstrap";
import { useDispatch, useSelector } from 'react-redux';
import { formCustomerInfo } from '../redux/selectors';
import { setForm } from '../redux/actions';
import { ageGroups, countries, genders, STEP_CUSTOMERS } from "../data";

const CustomersInfoStep = () => {

    const dispatch = useDispatch();
    const form = useSelector(formCustomerInfo);

    const [customersInfoForm, setCustomersInfoForm] = useState(form);

    useEffect(function () {
        setCustomersInfoForm(form);
    }, [form]);

    const setCustomersInfo = (formValues: any) => {
        dispatch(setForm(STEP_CUSTOMERS, formValues));
    };

    const setValue = (field: string) => (e: any) => {
        setCustomersInfo({
            ...form,
            //@ts-ignore
            [field]: e.target.value
        });
    };

    const setCheckboxes = (field: string) => (e: any) => {
        //@ts-ignore
        const newValues = e.target.checked ? [...form[field], e.target.value] : form[field].filter(fieldValue => fieldValue !== e.target.value);

        setCustomersInfo({
            ...form,
            [field]: newValues
        });
    }

    return <>
        <Card>
            <Card.Title className="Card-title">
                <h4>Customers & Locale</h4>
            </Card.Title>
            <Card.Body>
                <div className="row mt-3">
                    <div className="col-6">
                        What gender does your store focus?
                    </div>
                    <div className="col-6">
                        {genders.map(field => <div>
                            <input type={"radio"} value={field.value} checked={customersInfoForm.gender === field.value} onClick={setValue("gender")} />
                            <span className="ml-2">{field.label}</span>
                        </div>)
                        }
                    </div>
                </div>

                <div className="row mt-3">
                    <div className="col-6">
                        What age groups do you target?
                    </div>
                    <div className="col-6">
                        <div className="row">
                            {ageGroups.map(ageGroup => <div className="col-4">
                                <Card>
                                    <Card.Title><input type={"checkbox"} value={ageGroup.value} onClick={setCheckboxes("ageGroups")} checked={!!customersInfoForm.ageGroups.find(group => group === ageGroup.value)} /> {ageGroup.label}</Card.Title>
                                    <Card.Subtitle>{ageGroup.ageRange}</Card.Subtitle>
                                </Card>
                            </div>)}
                        </div>
                    </div>
                </div>

                <div className="row mt-3">
                    <div className="col-6">
                        What countries do you serve?
                    </div>
                    <div className="col-6">
                        <div className="row">
                            {countries.map(country => <div>
                                <input type={"checkbox"} value={country.value} checked={!!customersInfoForm.countries.find(c => c === country.value)} onClick={setCheckboxes("countries")} />
                                <span className="ml-2">{country.label}</span>
                            </div>)
                            }
                        </div>
                    </div>
                </div>

            </Card.Body>
        </Card>
    </>
}

export default CustomersInfoStep;