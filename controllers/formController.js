// Import required modules
const FormData = require("../models/Form");
const sendEmail = require("../utils/sendEmail");

// Function to handle form submission
const submitForm = async (req, res) => {
  try {
    // Step 1: Create a new FormData instance from the request body
    const formData = new FormData(req.body);

    // Step 2: Save form data to MongoDB
    const savedData = await formData.save();

    // Step 3: Function to generate HTML content for the email
    const generateEmailContent = (data) => `
    <div style="font-family: Arial, sans-serif; max-width: 700px; margin: auto; padding: 20px; border: 1px solid #ddd; border-radius: 10px; background: #fefefe;">
      <!-- Header Section -->
      <header style="background: #6a11cb; color: white; text-align: center; padding: 15px; border-radius: 10px 10px 0 0;">
        <h1 style="margin: 0; font-size: 24px;">Rent Application Summary</h1>
      </header>
      
      <!-- Personal Information Section -->
      <section style="padding: 20px; border-bottom: 1px solid #ddd;">
        <h2 style="color: #6a11cb; margin-bottom: 10px;">Personal Information</h2>
        <p><strong>Property Address:</strong> ${data.step1.propertyAddress}</p>
        <p><strong>StreetAddressAbbreviation:</strong> ${data.step1.streetAddressAbbreviation}</p>
        <p><strong>City:</strong> ${data.step1.city}</p>
        <p><strong>State:</strong> ${data.step1.state}</p>
        <p><strong>Zip Code:</strong> ${data.step1.zipCode}</p>
        <p><strong>Full Name:</strong> ${data.step1.firstName} ${data.step1.middleName || ""} ${data.step1.lastName}</p>
        <p><strong>Date of Birth:</strong> ${new Date(data.step1.birthDate).toLocaleDateString()}</p>
        <p><strong>Social Security:</strong> ${data.step1.socialSecurity}</p>
        <p><strong>Email:</strong> ${data.step1.emailAddress}</p>
        <p><strong>Phone:</strong> ${data.step1.phoneNumber}</p>
        <p><strong>Driver's License:</strong> ${data.step1.driversLicense}</p>
      </section>
  
      <!-- Housing Information Section -->
      <section style="padding: 20px; border-bottom: 1px solid #ddd;">
        <h2 style="color: #6a11cb; margin-bottom: 10px;">Housing Information</h2>
        <p><strong>Prior Address:</strong> ${data.step2.priorAddress || "N/A"}</p>
        <p><strong>Monthly Rent:</strong> ${data.step2.monthlyRent || "N/A"}</p>
        <p><strong>Start Date:</strong> ${data.step2.startDate ? new Date(data.step2.startDate).toLocaleDateString() : "N/A"}</p>
        <p><strong>End Date:</strong> ${data.step2.endDate ? new Date(data.step2.endDate).toLocaleDateString() : "N/A"}</p>
        <p><strong>Reason for Moving:</strong> ${data.step2.reasonForMoving || "N/A"}</p>
      </section>
  
      <!-- Employment Information Section -->
      <section style="padding: 20px; border-bottom: 1px solid #ddd;">
        <h2 style="color: #6a11cb; margin-bottom: 10px;">Employment Information</h2>
        ${data.step3.employers.map((employer, index) => `
          <div style="margin-bottom: 10px; padding: 10px; border: 1px solid #eee; border-radius: 8px; background: #f9f9f9;">
            <p><strong>Employer ${index + 1}:</strong> ${employer.employerName}</p>
            <p><strong>Occupation:</strong> ${employer.occupation}</p>
            <p><strong>Address:</strong> ${employer.employerAddress}</p>
            <p><strong>Phone:</strong> ${employer.employerPhone}</p>
            <p><strong>Monthly Pay:</strong> ${employer.monthlyPay}</p>
          </div>
        `).join("")}
      </section>
  
      <!-- Financial Details Section -->
      <section style="padding: 20px; border-bottom: 1px solid #ddd;">
        <h2 style="color: #6a11cb; margin-bottom: 10px;">Financial Details</h2>
        ${data.step4.financialDetails.map((financial, index) => `
          <div style="margin-bottom: 10px; padding: 10px; border: 1px solid #eee; border-radius: 8px; background: #f9f9f9;">
            <p><strong>Type:</strong> ${financial.type}</p>
            <p><strong>Bank:</strong> ${financial.bank}</p>
            <p><strong>Balance:</strong> ${financial.balance}</p>
          </div>
        `).join("")}
      </section>
  
      <!-- References and Background Section -->
      <section style="padding: 20px; border-bottom: 1px solid #ddd;">
        <h2 style="color: #6a11cb; margin-bottom: 10px;">References and Background</h2>
        ${data.step5.references.map((reference, index) => `
          <div style="margin-bottom: 10px; padding: 10px; border: 1px solid #eee; border-radius: 8px; background: #f9f9f9;">
            <p><strong>Reference ${index + 1}:</strong> ${reference.name}</p>
            <p><strong>Phone:</strong> ${reference.phone}</p>
            <p><strong>Relationship:</strong> ${reference.relationship}</p>
          </div>
        `).join("")}
        <p><strong>Late Rent History:</strong> ${data.step5.backgroundInfo.lateRent}</p>
        <p><strong>Smoke:</strong> ${data.step5.backgroundInfo.smoke}</p>
        <p><strong>Pets:</strong> ${data.step5.backgroundInfo.pets}</p>
      </section>
  
      <!-- Additional Comments Section -->
      <section style="padding: 20px;">
        <h2 style="color: #6a11cb; margin-bottom: 10px;">Additional Comments</h2>
        <p>${data.step6.comments || "No additional comments provided."}</p>
        <p>${data.step6.moveReason || "No Move Reason provided."}</p>
        <p>${data.step6.creditCheckComments || "No creditCheckComments provided."}</p>
      </section>
  
      <!-- Footer Section -->
      <footer style="background: #6a11cb; color: white; text-align: center; padding: 15px; border-radius: 0 0 10px 10px;">
        <p style="font-size: 12px; margin: 0;">This is an automated email. Please do not reply.</p>
      </footer>
    </div>

  
    `;

    // Step 4: Prepare email options
    const emailOptions = {
      email:'rahulgawadee@gmail.com', // Replace with recipient's email
      subject: 'Tenant Form Submission',
      html: generateEmailContent(savedData),
    };

    // Step 5: Send email
    await sendEmail(emailOptions);

    // Step 6: Respond with success message
    res.status(201).json({
      message: "Form submitted and email sent successfully!",
      data: savedData,
    });

  } catch (error) {
    // Error handling
    console.error("Error submitting form or sending email:", error);
    res.status(500).json({ message: "Failed to submit form or send email", error: error.message });
  }
};

// Export the submitForm function
module.exports = { submitForm };
