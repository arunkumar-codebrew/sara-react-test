import { useState, useEffect } from "react";
import { Card, FormSelect } from "react-bootstrap";
import { useDispatch, useSelector } from 'react-redux';
import { formGeneralInfo } from '../redux/selectors';
import { setForm } from '../redux/actions';
import { STEP_GENERAL_INFO } from "../data";

const GeneralInfoStep = () => {

    const dispatch = useDispatch();
    const form = useSelector(formGeneralInfo);

    const [generalInfoForm, setGeneralInfoForm] = useState(form);

    useEffect(function () {
        setGeneralInfoForm(form);
    }, [form]);

    const setGeneralInfo = (formValues: any) => {

        dispatch(setForm(STEP_GENERAL_INFO, formValues));
    }

    const handleAddBranch = () => {
        setGeneralInfo({
            ...form,
            branches: [
                ...form.branches,
                {
                    city: "",
                    name: "",
                    notes: ""
                }
            ]
        });
    };

    const setBranchData = (idx: number, data: any) => {
        setGeneralInfo({
            ...form,
            branches: form.branches.map((branch, branchIdx) => idx === branchIdx ? data : branch),
        });
    }

    const handleRemoveBranch = (branchIndex: number) => {
        const newBranches = form.branches.filter((branch: any, index: number) => branchIndex != index);
        setGeneralInfo({
            ...form,
            branches: newBranches
        });
    };

    const setValue = (field: string) => (e: any) => {
        setGeneralInfo({
            ...form,
            //@ts-ignore
            [field]: e.target.value
        });
    };

    return <>
        <Card>
            <Card.Title className="Card-title">
                <h4>General Information</h4>
            </Card.Title>
            <Card.Body>
                <div className="row mt-3">
                    <div className="col-6">
                        Company Name
                    </div>
                    <div className="col-6">
                        <input type="text" className={"form-control"} onChange={setValue("companyName")} value={form.companyName} />
                    </div>
                </div>

                <div className="row mt-3">
                    <div className="col-6">
                        Company Description
                    </div>
                    <div className="col-6">
                        <textarea className={"form-control"} onChange={setValue("companyDescription")} value={form.companyDescription} />
                    </div>
                </div>

                <hr />

                <div className="row mt-3">
                    <div className="col-6">
                        <h5>Branches</h5>
                    </div>
                </div>

                {generalInfoForm.branches.map((branch: any, idx: number) => <Branch
                    setBranchData={setBranchData}
                    idx={idx}
                    data={branch}
                    handleRemoveBranch={handleRemoveBranch}
                    showDeleteBtn={generalInfoForm.branches.length > 1}
                    key={idx}
                />)}

                <a onClick={handleAddBranch}>Add another branch</a>

            </Card.Body>
        </Card>
    </>
}

interface BranchProps {
    handleRemoveBranch: (branchIndex: number) => void;
    idx: number;
    showDeleteBtn: boolean;
    data: any;
    setBranchData: (idx: number, data: any) => void;
};

const Branch = ({ handleRemoveBranch, idx, showDeleteBtn, data, setBranchData }: BranchProps) => {

    const handleBranchData = (field: string) => (e: any) => {
        setBranchData(idx, {
            ...data,
            [field]: e.target.value
        })
    };

    return <>
        <div className="row mt-3">
            <div className="col-6">
                City
            </div>
            <div className="col-5">
                <FormSelect value={data.city} onChange={handleBranchData("city")}>
                    <option value={""}>Select City</option>
                    <option value={"Makkah"}>Makkah</option>
                    <option value={"Medinnah"}>Medinnah</option>
                </FormSelect>
            </div>
            {showDeleteBtn && <div className="col-1" onClick={() => handleRemoveBranch(idx)}>X</div>}
        </div>

        <div className="row mt-3">
            <div className="col-6">
                Name
            </div>
            <div className="col-5">
                <input type="text" className={"form-control"} value={data.name} onChange={handleBranchData("name")} />
            </div>
        </div>

        <div className="row mt-3">
            <div className="col-6">
                Notes
            </div>
            <div className="col-5">
                <textarea className={"form-control"} value={data.notes} onChange={handleBranchData("notes")}>{data.notes}</textarea>
            </div>
        </div>

        <hr />
    </>;
}

export default GeneralInfoStep;