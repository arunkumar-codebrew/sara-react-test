import React, { memo } from 'react';
import { Button } from 'react-bootstrap';
import { useSelector } from 'react-redux';
import './App.css';
import { profileComponents, stepTitles, STEP_CUSTOMERS, STEP_GENERAL_INFO, STEP_SALES_INFO } from './data';
import { getStep } from './redux/selectors';
import CustomersInfoStep from './steps/CustomersInfo';
import GeneralInfoStep from './steps/GeneralInfo';
import SalesInfoStep from './steps/SalesInfo';
import Footer from './views/Footer';
import SideBar from './views/SideBar';

function App() {
  const step = useSelector(getStep);

  const StepComponent = memo(({ step }: { step: number }): JSX.Element => {
    switch (step) {
      case STEP_GENERAL_INFO:
        return <GeneralInfoStep />;
      case STEP_SALES_INFO:
        return <SalesInfoStep />;
      case STEP_CUSTOMERS:
        return <CustomersInfoStep />;
      default:
        return <></>;
    }
  });

  return (
    <div className="container-fluid App">
      <h2>User Profile</h2>

      <div className="row mt-4">
        <div className="col-6">
          <div className="row">
            {stepTitles.map(stepDetail => <div className="col-2" key={stepDetail.label}>
              <Button className={`Step-button ${step === stepDetail.step ? "Step-button-active" : ""}`}>{`${stepDetail.step}. ${stepDetail.label}`}</Button>
            </div>)}
          </div>
        </div>
      </div>

      <div className="row h-100 mt-4">
        <div className="col-8 h-100">
          <StepComponent step={step} />
          <Footer profileComponents={profileComponents} />
        </div>
        <div className="col-4">
          <SideBar profileComponents={profileComponents} />
        </div>
      </div>
    </div>
  );
}

export default App;
