import React, { useState } from "react";
import "./MultiStepForm.css"; // Add your custom CSS for styling
import { FaHome, FaUsers, FaBriefcase, FaWallet, FaAddressBook, FaCommentDots } from "react-icons/fa";

const MultiStepForm = () => {
  const [currentStep, setCurrentStep] = useState(0);

  const [formData, setFormData] = useState({
    step1: {
      propertyAddress: "",
      firstName: "",
      middleName: "",
      lastName: "",
      birthDate: "",
      socialSecurity: "",
      emailAddress: "",
      phoneNumber: "",
      driversLicense: "",
    },
    step2: {
      occupants: [{ name: "", dob: "", relationship: "" }],
      housingVoucher: "",
      priorAddress: "",
      monthlyRent: "",
      startDate: "",
      endDate: "",
      reasonForMoving: "",
      ownerManagerName: "",
      ownerManagerPhone: "",
    },
    step3: {
      employers: [
        {
          employerName: "",
          occupation: "",
          employerAddress: "",
          employerPhone: "",
          startDate: "",
          monthlyPay: "",
          supervisorName: "",
        },
      ],
    },
    step4: {
      financialDetails: [{ type: "Checking Account", bank: "", balance: "" }],
    },
    step5: {
      references: [{ name: "", phone: "", relationship: "" }],
      backgroundInfo: {
        lateRent: "",
        lawsuit: "",
        smoke: "",
        pets: "",
      },
    },
    step6: {
      comments: "",
    },
  });

  // below for step 2
  const updateFormData = (section, field, value) => {
    setFormData((prev) => ({
      ...prev,
      [section]: { ...prev[section], [field]: value },
    }));
  };

  const handleOccupantChange = (index, field, value) => {
    setFormData((prev) => {
      const updatedOccupants = [...prev.step2.occupants];
      updatedOccupants[index][field] = value;
      return {
        ...prev,
        step2: { ...prev.step2, occupants: updatedOccupants },
      };
    });
  };

  const addOccupant = () => {
    setFormData((prev) => ({
      ...prev,
      step2: {
        ...prev.step2,
        occupants: [...prev.step2.occupants, { name: "", dob: "", relationship: "" }],
      },
    }));
  };

  const removeOccupant = (index) => {
    setFormData((prev) => {
      const updatedOccupants = prev.step2.occupants.filter((_, i) => i !== index);
      return {
        ...prev,
        step2: { ...prev.step2, occupants: updatedOccupants },
      };
    });
  };

  // above for step 2

  //  below for step 3

  const handleEmployerChange = (index, field, value) => {
    setFormData((prev) => {
      const updatedEmployers = [...prev.step3.employers];
      updatedEmployers[index][field] = value;
      return {
        ...prev,
        step3: { ...prev.step3, employers: updatedEmployers },
      };
    });
  };

  const addEmployer = () => {
    setFormData((prev) => ({
      ...prev,
      step3: {
        ...prev.step3,
        employers: [
          ...prev.step3.employers,
          {
            employerName: "",
            occupation: "",
            employerAddress: "",
            employerPhone: "",
            startDate: "",
            monthlyPay: "",
            supervisorName: "",
          },
        ],
      },
    }));
  };

  const removeEmployer = (index) => {
    setFormData((prev) => {
      const updatedEmployers = prev.step3.employers.filter((_, i) => i !== index);
      return {
        ...prev,
        step3: { ...prev.step3, employers: updatedEmployers },
      };
    });
  };

  // above for step 3

  // below for step 4

  const handleDetailChange = (index, field, value) => {
    setFormData((prev) => {
      const updatedDetails = [...prev.step4.financialDetails];
      updatedDetails[index][field] = value;
      return {
        ...prev,
        step4: { ...prev.step4, financialDetails: updatedDetails },
      };
    });
  };

  const addFinancialDetail = () => {
    setFormData((prev) => ({
      ...prev,
      step4: {
        ...prev.step4,
        financialDetails: [...prev.step4.financialDetails, { type: "Checking Account", bank: "", balance: "" }],
      },
    }));
  };

  const removeFinancialDetail = (index) => {
    setFormData((prev) => {
      const updatedDetails = prev.step4.financialDetails.filter((_, i) => i !== index);
      return {
        ...prev,
        step4: { ...prev.step4, financialDetails: updatedDetails },
      };
    });
  };

  // above for step 4

  // below for step 5

  const handleReferenceChange = (index, field, value) => {
    setFormData((prev) => {
      const updatedReferences = [...prev.step5.references];
      updatedReferences[index][field] = value;
      return {
        ...prev,
        step5: { ...prev.step5, references: updatedReferences },
      };
    });
  };

  const addReference = () => {
    setFormData((prev) => ({
      ...prev,
      step5: {
        ...prev.step5,
        references: [...prev.step5.references, { name: "", phone: "", relationship: "" }],
      },
    }));
  };

  const removeReference = (index) => {
    setFormData((prev) => {
      const updatedReferences = prev.step5.references.filter((_, i) => i !== index);
      return {
        ...prev,
        step5: { ...prev.step5, references: updatedReferences },
      };
    });
  };

  const handleBackgroundChange = (field, value) => {
    setFormData((prev) => ({
      ...prev,
      step5: { ...prev.step5, backgroundInfo: { ...prev.step5.backgroundInfo, [field]: value } },
    }));
  };

  // above for step 5

  // below for step 6
  const handleCommentsChange = (value) => {
    setFormData((prev) => ({
      ...prev,
      step6: { ...prev.step6, comments: value },
    }));
  };

  const prepareFormData = () => {
    const preparedData = { ...formData };

    // Convert monthlyRent to a number
    if (preparedData.step2.monthlyRent) {
      preparedData.step2.monthlyRent = parseFloat(preparedData.step2.monthlyRent);
    }

    // Convert balances in financialDetails to numbers
    preparedData.step4.financialDetails = preparedData.step4.financialDetails.map((detail) => ({
      ...detail,
      balance: parseFloat(detail.balance) || 0,
    }));

    return preparedData;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const preparedData = prepareFormData();

    try {
      console.log("Form data being sent:", preparedData);
      const response = await fetch("http://localhost:5000/api/submit-form", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(preparedData),
      });
      

      if (!response.ok) {
        throw new Error("Failed to submit form");
      }

      const result = await response.json();
      console.log("Form submitted successfully:", result);
      alert("Form submitted successfully!");
    } catch (error) {
      console.error("Error submitting form:", error);
      alert("Error submitting form. Please try again.");
    }
  };

 
  
  
  const steps = [
    { icon: <FaHome />, title: "Property & Personal Information" },
    { icon: <FaUsers />, title: "Occupants & Housing History" },
    { icon: <FaBriefcase />, title: "Employment Information" },
    { icon: <FaWallet />, title: "Financial Information" },
    { icon: <FaAddressBook />, title: "References & Background Information" },
    { icon: <FaCommentDots />, title: "Final Details & Comments" },
  ];

  const updateStep = (step) => {
    if (step >= 0 && step < steps.length) {
      setCurrentStep(step);
    }
  };

  const renderFormContent = () => {
    switch (currentStep) {
      case 0:
        return (
          <div className="form-content-property-info">
            <h2 className="form-title-property-info">Property & Personal Information</h2>

            <div className="form-row">
              {/* Property Address */}
              <label htmlFor="propertyAddress" className="form-label">
                Property Address
              </label>
              <input
                type="text"
                id="propertyAddress"
                name="propertyAddress"
                placeholder="Enter property address"
                className="form-input full-width"
                value={formData.step1.propertyAddress}
                onChange={(e) =>
                  setFormData((prev) => ({
                    ...prev,
                    step1: { ...prev.step1, propertyAddress: e.target.value },
                  }))
                }
              />
            </div>

            <div className="form-row">
              {/* First Name */}
              <div className="form-group">
                <label htmlFor="firstName" className="form-label">
                  First Name
                </label>
                <input
                  type="text"
                  id="firstName"
                  name="firstName"
                  placeholder="Enter first name"
                  className="form-input"
                  value={formData.step1.firstName}
                  onChange={(e) =>
                    setFormData((prev) => ({
                      ...prev,
                      step1: { ...prev.step1, firstName: e.target.value },
                    }))
                  }
                />
              </div>
              {/* Middle Name */}
              <div className="form-group">
                <label htmlFor="middleName" className="form-label">
                  Middle Name
                </label>
                <input
                  type="text"
                  id="middleName"
                  name="middleName"
                  placeholder="Enter middle name"
                  className="form-input"
                  value={formData.step1.middleName}
                  onChange={(e) =>
                    setFormData((prev) => ({
                      ...prev,
                      step1: { ...prev.step1, middleName: e.target.value },
                    }))
                  }
                />
              </div>
              {/* Last Name */}
              <div className="form-group">
                <label htmlFor="lastName" className="form-label">
                  Last Name
                </label>
                <input
                  type="text"
                  id="lastName"
                  name="lastName"
                  placeholder="Enter last name"
                  className="form-input"
                  value={formData.step1.lastName}
                  onChange={(e) =>
                    setFormData((prev) => ({
                      ...prev,
                      step1: { ...prev.step1, lastName: e.target.value },
                    }))
                  }
                />
              </div>
            </div>

            <div className="form-row">
              {/* Birth Date */}
              <div className="form-group">
                <label htmlFor="birthDate" className="form-label">
                  Birth Date
                </label>
                <input
                  type="date"
                  id="birthDate"
                  name="birthDate"
                  className="form-input"
                  value={formData.step1.birthDate || ""}
                  onChange={(e) =>
                    setFormData((prev) => ({
                      ...prev,
                      step1: { ...prev.step1, birthDate: e.target.value },
                    }))
                  }
                />
              </div>
              {/* Social Security */}
              <div className="form-group">
                <label htmlFor="socialSecurity" className="form-label">
                  Social Security #
                </label>
                <input
                  type="text"
                  id="socialSecurity"
                  name="socialSecurity"
                  placeholder="Enter SSN"
                  className="form-input"
                  value={formData.step1.socialSecurity || ""}
                  onChange={(e) =>
                    setFormData((prev) => ({
                      ...prev,
                      step1: { ...prev.step1, socialSecurity: e.target.value },
                    }))
                  }
                />
              </div>
              {/* Email */}
              <div className="form-group">
                <label htmlFor="emailAddress" className="form-label">
                  Email Address
                </label>
                <input
                  type="email"
                  id="emailAddress"
                  name="emailAddress"
                  placeholder="Enter email"
                  className="form-input"
                  value={formData.step1.emailAddress || ""}
                  onChange={(e) =>
                    setFormData((prev) => ({
                      ...prev,
                      step1: { ...prev.step1, emailAddress: e.target.value },
                    }))
                  }
                />
              </div>
            </div>

            <div className="form-row">
              {/* Phone Number */}
              <div className="form-group">
                <label htmlFor="phoneNumber" className="form-label">
                  Phone Number
                </label>
                <input
                  type="tel"
                  id="phoneNumber"
                  name="phoneNumber"
                  placeholder="Enter phone number"
                  className="form-input"
                  value={formData.step1.phoneNumber || ""}
                  onChange={(e) =>
                    setFormData((prev) => ({
                      ...prev,
                      step1: { ...prev.step1, phoneNumber: e.target.value },
                    }))
                  }
                />
              </div>
              {/* Driver's License */}
              <div className="form-group">
                <label htmlFor="driversLicense" className="form-label">
                  Driver's License #
                </label>
                <input
                  type="text"
                  id="driversLicense"
                  name="driversLicense"
                  placeholder="Enter license #"
                  className="form-input"
                  value={formData.step1.driversLicense || ""}
                  onChange={(e) =>
                    setFormData((prev) => ({
                      ...prev,
                      step1: { ...prev.step1, driversLicense: e.target.value },
                    }))
                  }
                />
              </div>
            </div>
          </div>
        );
      case 1:
        return (
          <div className="form-content-occupants-history">
            <h2 className="form-title-occupants-history">Occupants & Housing History</h2>

            {/* Dynamic Occupants Section */}
            <div className="form-section-occupants">
              <h3 className="form-subtitle-occupants">List of Occupants</h3>
              {formData.step2.occupants.map((occupant, index) => (
                <div key={index} className="occupant-entry">
                  <div className="occupant-row">
                    <label className="form-label">
                      Name
                      <input
                        type="text"
                        placeholder="Enter name"
                        value={occupant.name}
                        onChange={(e) => handleOccupantChange(index, "name", e.target.value)}
                        className="form-input"
                      />
                    </label>
                    <label className="form-label">
                      Date of Birth
                      <input
                        type="date"
                        value={occupant.dob}
                        onChange={(e) => handleOccupantChange(index, "dob", e.target.value)}
                        className="form-input"
                      />
                    </label>
                    <label className="form-label">
                      Relationship
                      <input
                        type="text"
                        placeholder="Enter relationship"
                        value={occupant.relationship}
                        onChange={(e) => handleOccupantChange(index, "relationship", e.target.value)}
                        className="form-input"
                      />
                    </label>
                    <button type="button" onClick={() => removeOccupant(index)} className="form-remove-btn">
                      Remove
                    </button>
                  </div>
                </div>
              ))}
              <button type="button" onClick={addOccupant} className="form-add-btn">
                Add Occupant
              </button>
            </div>

            {/* Housing Choice Voucher Program */}
            <div className="form-row">
              <label className="form-label">
                Participant in Housing Choice Voucher Program?
                <select
                  name="housingVoucher"
                  value={formData.step2.housingVoucher}
                  onChange={(e) => updateFormData("step2", e.target.name, e.target.value)}
                  className="form-select"
                >
                  <option value="yes">Yes</option>
                  <option value="no">No</option>
                </select>
              </label>
              <label className="form-label">
                Prior Address
                <input
                  type="text"
                  name="priorAddress"
                  placeholder="Enter prior address"
                  value={formData.step2.priorAddress}
                  onChange={(e) => updateFormData("step2", e.target.name, e.target.value)}
                  className="form-input"
                />
              </label>
            </div>

            {/* Monthly Rent */}
            <div className="form-row">
              <label className="form-label">
                Monthly Rent
                <input
                  type="number"
                  name="monthlyRent"
                  placeholder="Enter monthly rent"
                  value={formData.step2.monthlyRent}
                  onChange={(e) => updateFormData("step2", e.target.name, e.target.value)}
                  className="form-input"
                />
              </label>
              <label className="form-label">
                Start Date of Residency
                <input
                  type="date"
                  name="startDate"
                  value={formData.step2.startDate}
                  onChange={(e) => updateFormData("step2", e.target.name, e.target.value)}
                  className="form-input"
                />
              </label>
              <label className="form-label">
                End Date of Residency
                <input
                  type="date"
                  name="endDate"
                  value={formData.step2.endDate}
                  onChange={(e) => updateFormData("step2", e.target.name, e.target.value)}
                  className="form-input"
                />
              </label>
            </div>

            {/* Reason for Moving */}
            <div className="form-row">
              <label className="form-label">
                Reason for Moving
                <textarea
                  name="reasonForMoving"
                  placeholder="Enter reason for moving"
                  value={formData.step2.reasonForMoving}
                  onChange={(e) => updateFormData("step2", e.target.name, e.target.value)}
                  className="form-textarea"
                ></textarea>
              </label>
            </div>

            {/* Owner/Manager's Details */}
            <div className="form-row">
              <label className="form-label">
                Owner/Manager's Name
                <input
                  type="text"
                  name="ownerManagerName"
                  placeholder="Enter owner's/manager's name"
                  value={formData.step2.ownerManagerName}
                  onChange={(e) => updateFormData("step2", e.target.name, e.target.value)}
                  className="form-input"
                />
              </label>
              <label className="form-label">
                Phone Number
                <input
                  type="tel"
                  name="ownerManagerPhone"
                  placeholder="Enter phone number"
                  value={formData.step2.ownerManagerPhone}
                  onChange={(e) => updateFormData("step2", e.target.name, e.target.value)}
                  className="form-input"
                />
              </label>
            </div>
          </div>
        );
      case 2:
        return (
          <div className="form-content-employment-info">
            <h2 className="form-title-employment-info">Employment Information</h2>
            {formData.step3.employers.map((employer, index) => (
              <div key={index} className="employer-entry">
                <div className="form-row">
                  <label className="form-label">
                    Employer Name
                    <input
                      type="text"
                      placeholder="Enter employer name"
                      value={employer.employerName}
                      onChange={(e) => handleEmployerChange(index, "employerName", e.target.value)}
                      className="form-input"
                    />
                  </label>
                  <label className="form-label">
                    Occupation
                    <input
                      type="text"
                      placeholder="Enter occupation"
                      value={employer.occupation}
                      onChange={(e) => handleEmployerChange(index, "occupation", e.target.value)}
                      className="form-input"
                    />
                  </label>
                  <label className="form-label">
                    Employer Address
                    <input
                      type="text"
                      placeholder="Enter employer address"
                      value={employer.employerAddress}
                      onChange={(e) => handleEmployerChange(index, "employerAddress", e.target.value)}
                      className="form-input"
                    />
                  </label>
                </div>

                <div className="form-row">
                  <label className="form-label">
                    Employer Phone
                    <input
                      type="tel"
                      placeholder="Enter employer phone"
                      value={employer.employerPhone}
                      onChange={(e) => handleEmployerChange(index, "employerPhone", e.target.value)}
                      className="form-input"
                    />
                  </label>
                  <label className="form-label">
                    Start Date of Employment
                    <input
                      type="date"
                      value={employer.startDate}
                      onChange={(e) => handleEmployerChange(index, "startDate", e.target.value)}
                      className="form-input"
                    />
                  </label>
                  <label className="form-label">
                    Monthly Pay
                    <input
                      type="number"
                      placeholder="Enter monthly pay"
                      value={employer.monthlyPay}
                      onChange={(e) => handleEmployerChange(index, "monthlyPay", e.target.value)}
                      className="form-input"
                    />
                  </label>
                </div>

                <div className="form-row">
                  <label className="form-label">
                    Name of Supervisor
                    <input
                      type="text"
                      placeholder="Enter supervisor's name"
                      value={employer.supervisorName}
                      onChange={(e) => handleEmployerChange(index, "supervisorName", e.target.value)}
                      className="form-input"
                    />
                  </label>
                </div>

                {formData.step3.employers.length > 1 && (
                  <button type="button" onClick={() => removeEmployer(index)} className="form-remove-employer-btn">
                    Remove Employer
                  </button>
                )}
                <hr />
              </div>
            ))}

            <button type="button" onClick={addEmployer} className="form-add-employer-btn">
              Add Employer
            </button>
          </div>
        );
      case 3:
        return (
          <div className="form-content-financial-info">
            <h2 className="form-title-financial-info">Financial Information</h2>
            {formData.step4.financialDetails.map((detail, index) => (
              <div key={index} className="financial-detail-row">
                <div className="form-group">
                  <label htmlFor={`type-${index}`} className="form-label">
                    Financial Type
                  </label>
                  <select
                    id={`type-${index}`}
                    name={`type-${index}`}
                    value={detail.type}
                    onChange={(e) => handleDetailChange(index, "type", e.target.value)}
                    className="form-input"
                  >
                    <option value="Checking Account">Checking Account</option>
                    <option value="Savings Account">Savings Account</option>
                    <option value="Credit Card">Credit Card</option>
                    <option value="Auto Loan">Auto Loan</option>
                    <option value="Additional Debt">Additional Debt</option>
                  </select>
                </div>
                <div className="form-group">
                  <label htmlFor={`bank-${index}`} className="form-label">
                    Bank/Institution
                  </label>
                  <input
                    type="text"
                    id={`bank-${index}`}
                    name={`bank-${index}`}
                    placeholder="Enter bank/institution"
                    value={detail.bank}
                    onChange={(e) => handleDetailChange(index, "bank", e.target.value)}
                    className="form-input"
                  />
                </div>
                <div className="form-group">
                  <label htmlFor={`balance-${index}`} className="form-label">
                    Balance
                  </label>
                  <input
                    type="number"
                    id={`balance-${index}`}
                    name={`balance-${index}`}
                    placeholder="Enter balance"
                    value={detail.balance}
                    onChange={(e) => handleDetailChange(index, "balance", e.target.value)}
                    className="form-input"
                  />
                </div>
                {formData.step4.financialDetails.length > 1 && (
                  <button type="button" onClick={() => removeFinancialDetail(index)} className="form-remove-btn">
                    Remove
                  </button>
                )}
              </div>
            ))}
            <button type="button" onClick={addFinancialDetail} className="form-add-btn">
              Add Financial Detail
            </button>
          </div>
        );
      case 4:
        return (
          <div className="form-content-references">
            <h2 className="form-title-references">References & Background Information</h2>

            {/* References Section */}
            <div className="references-section">
              {formData.step5.references.map((reference, index) => (
                <div key={index} className="reference-entry">
                  <label className="form-label-reference-name">
                    Name
                    <input
                      type="text"
                      value={reference.name}
                      onChange={(e) => handleReferenceChange(index, "name", e.target.value)}
                      placeholder="Enter name"
                      className="form-input-reference-name"
                    />
                  </label>

                  <label className="form-label-reference-phone">
                    Phone
                    <input
                      type="text"
                      value={reference.phone}
                      onChange={(e) => handleReferenceChange(index, "phone", e.target.value)}
                      placeholder="Enter phone number"
                      className="form-input-reference-phone"
                    />
                  </label>

                  <label className="form-label-reference-relationship">
                    Relationship
                    <input
                      type="text"
                      value={reference.relationship}
                      onChange={(e) => handleReferenceChange(index, "relationship", e.target.value)}
                      placeholder="Enter relationship"
                      className="form-input-reference-relationship"
                    />
                  </label>

                  {formData.step5.references.length > 1 && (
                    <button type="button" onClick={() => removeReference(index)} className="btn-remove-reference">
                      Remove
                    </button>
                  )}
                </div>
              ))}
              <button type="button" onClick={addReference} className="btn-add-reference">
                Add Reference
              </button>
            </div>

            {/* Background Information Section */}
            <div className="background-info">
              <label className="form-label-late-rent">
                Have you ever been late or delinquent on rent?
                <div>
                  <label>
                    <input
                      type="radio"
                      name="lateRent"
                      value="Yes"
                      checked={formData.step5.backgroundInfo.lateRent === "Yes"}
                      onChange={(e) => handleBackgroundChange("lateRent", e.target.value)}
                    />
                    Yes
                  </label>
                  <label>
                    <input
                      type="radio"
                      name="lateRent"
                      value="No"
                      checked={formData.step5.backgroundInfo.lateRent === "No"}
                      onChange={(e) => handleBackgroundChange("lateRent", e.target.value)}
                    />
                    No
                  </label>
                </div>
              </label>

              <label className="form-label-lawsuit">
                Have you ever been party to a lawsuit?
                <div>
                  <label>
                    <input
                      type="radio"
                      name="lawsuit"
                      value="Yes"
                      checked={formData.step5.backgroundInfo.lawsuit === "Yes"}
                      onChange={(e) => handleBackgroundChange("lawsuit", e.target.value)}
                    />
                    Yes
                  </label>
                  <label>
                    <input
                      type="radio"
                      name="lawsuit"
                      value="No"
                      checked={formData.step5.backgroundInfo.lawsuit === "No"}
                      onChange={(e) => handleBackgroundChange("lawsuit", e.target.value)}
                    />
                    No
                  </label>
                </div>
              </label>

              <label className="form-label-smoke">
                Do you smoke?
                <div>
                  <label>
                    <input
                      type="radio"
                      name="smoke"
                      value="Yes"
                      checked={formData.step5.backgroundInfo.smoke === "Yes"}
                      onChange={(e) => handleBackgroundChange("smoke", e.target.value)}
                    />
                    Yes
                  </label>
                  <label>
                    <input
                      type="radio"
                      name="smoke"
                      value="No"
                      checked={formData.step5.backgroundInfo.smoke === "No"}
                      onChange={(e) => handleBackgroundChange("smoke", e.target.value)}
                    />
                    No
                  </label>
                </div>
              </label>

              <label className="form-label-pets">
                Do you have any pets?
                <div>
                  <label>
                    <input
                      type="radio"
                      name="pets"
                      value="Yes"
                      checked={formData.step5.backgroundInfo.pets === "Yes"}
                      onChange={(e) => handleBackgroundChange("pets", e.target.value)}
                    />
                    Yes
                  </label>
                  <label>
                    <input
                      type="radio"
                      name="pets"
                      value="No"
                      checked={formData.step5.backgroundInfo.pets === "No"}
                      onChange={(e) => handleBackgroundChange("pets", e.target.value)}
                    />
                    No
                  </label>
                </div>
              </label>
            </div>
          </div>
        );
      case 5:
        return (
          <div className="form-content-final-comments">
            <h2 className="form-title-final-comments">Final Details & Comments</h2>
            <label htmlFor="comments" className="form-label-comments">
              Additional Comments
            </label>
            <textarea
              id="comments"
              name="comments"
              placeholder="Enter any additional information"
              value={formData.step6.comments}
              onChange={(e) => handleCommentsChange(e.target.value)}
              className="form-textarea-comments"
            ></textarea>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div className="form-container-multi-step">
      {/* Stepper */}
      <div className="stepper-multi-step">
        {steps.map((step, index) => (
          <div
            key={index}
            className={`step-multi-step ${index <= currentStep ? "active-step" : ""}`}
            onClick={() => updateStep(index)}
          >
            <span className={`step-icon-${index}`}>{step.icon}</span> {/* Render the icon as a React component */}
          </div>
        ))}
      </div>

      {/* Form */}
      <form id="tenantForm" className="form-multi-step" onSubmit={handleSubmit}>
        <div className="form-step-content">{renderFormContent()}</div>

        <div className="form-navigation-multi-step">
          {currentStep > 0 && (
            <button type="button" className="btn-prev-multi-step" onClick={() => updateStep(currentStep - 1)}>
              Previous
            </button>
          )}
          {currentStep < steps.length - 1 ? (
            <button type="button" className="btn-next-multi-step" onClick={() => updateStep(currentStep + 1)}>
              Next
            </button>
          ) : (
            <button type="submit" className="btn-submit-multi-step">
              Submit
            </button>
          )}
        </div>
      </form>
    </div>
  );
};

export default MultiStepForm;
