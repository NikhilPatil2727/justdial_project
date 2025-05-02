export const validateBusinessForm = (formData, step) => {
    let errors = {};
  
    if (step === 1) {
      if (!formData.bs_business_name.trim()) {
        errors.businessName = "Business Name is required";
      }
      if (!formData.bs_owner_name.trim()) {
        errors.ownerName = "Owner Name is required";
      }
      if (!formData.bs_business_phone.match(/^\d{10}$/)) {
        errors.businessPhone = "Enter a valid 10-digit phone number";
      }
      if (!formData.bs_email.match(/^\S+@\S+\.\S+$/)) {
        errors.email = "Enter a valid email address";
      }
      
      if (!formData.bs_password.match(/^\d{6}$/)) {
        errors.password = "Enter a valid 6-digit password";
      }
      if (!formData.bs_pincode.match(/^\d{6}$/)) {
        errors.pincode = "Enter a valid 6-digit pincode";
      }
      if (!formData.bs_building_name.trim()) {
        errors.buildingName = "Building  Name is required";
      }
      if (!formData.bs_colony_name.trim()) {
        errors.colonyName = "Colony Name is required";
      }
     
      if (!formData.bs_area.trim()) {
        errors.area = "Area Name is required";
      }
      if (!formData.bs_landmark.trim()) {
        errors.landmark = "Area Name is required";
      }
     
      if (!formData.bs_city.trim()) {
        errors.city = "City is required";
      }
      if (!formData.bs_state.trim()) {
        errors.state = "State is required";
      }
      if (!formData.bs_desc || formData.bs_desc.trim().length < 10) {
        errors.bs_desc = "Description must be at least 10 characters";
      }
  
      if (!formData.bs_image || typeof formData.bs_image !== "string") {
        errors.bs_image = "Business image is required";
      }
      
      
    }
  
    if (step === 2) {
      if (!formData.bs_contact_person.trim()) {
        errors.contactPerson = "Contact Person is required";
      }
      if (!formData.bs_whatsapp_number.match(/^\d{10}$/)) {
        errors.whatsAppNumber = "Enter a valid 10-digit WhatsApp number";
      }
    }
  
    if (step === 3) {
      if (!formData.bs_business_type.trim()) {
        errors.bs_business_type = "Business Type is required";
      }
      if (!formData.bs_business_category.trim()) {
        errors.bs_business_category = "Business Category is required";
      }
      if (!formData.bs_business_sub_category.trim()) {
        errors.bs_business_sub_category = "Business SubCategory is required";
      }
    }
    
    
  
    return errors;
  };
  