import { useState, useEffect } from "react";
import { Card, FormSelect } from "react-bootstrap";
import { useDispatch, useSelector } from 'react-redux';
import { formGeneralInfo, formSalesInfo } from '../redux/selectors';
import { setForm } from '../redux/actions';
import { STEP_SALES_INFO } from "../data";

const SalesInfoStep = () => {

    const dispatch = useDispatch();
    const form = useSelector(formSalesInfo);

    const [salesInfoForm, setSalesInfoForm] = useState(form);

    useEffect(function () {
        setSalesInfoForm(form);
    }, [form]);

    const setSalesInfo = (formValues: any) => {
        dispatch(setForm(STEP_SALES_INFO, formValues));
    };

    const setValue = (field: string) => (e: any) => {
        setSalesInfo({
            ...form,
            //@ts-ignore
            [field]: e.target.value
        });
    };

    const setCategories = (e: any) => {
        let categories = Array.from(e.target.selectedOptions, (option: any) => option.value);
        setSalesInfo({
            ...form,
            categories: categories
        });
    }

    return <>
        <Card>
            <Card.Title className="Card-title">
                <h4>Sales Information</h4>
            </Card.Title>
            <Card.Body>
                <div className="row mt-3">
                    <div className="col-6">
                        What product categories do you sell?
                    </div>
                    <div className="col-6">
                        <FormSelect multiple={true} value={salesInfoForm.categories} onChange={setCategories}>
                            <option value={"online_grocery"}>Online Grocery</option>
                            <option value={"door_to_door_delivery"}>Door to door delivery</option>
                        </FormSelect>
                    </div>
                </div>

                <div className="row mt-3">
                    <div className="col-6">
                        Primary Store Currency
                    </div>
                    <div className="col-6">
                        <FormSelect onChange={setValue("currency")} value={salesInfoForm.currency}>
                            <option value={""} disabled>Select Currency</option>
                            <option value={"SAR"}>SAR</option>
                            <option value={"AED"}>AED</option>
                        </FormSelect>
                    </div>
                </div>

            </Card.Body>
        </Card>
    </>
}

export default SalesInfoStep;