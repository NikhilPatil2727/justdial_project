export const validateContactsForm = (formData) => {
    let errors = {};
  
    
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
    
  
  
      if (!formData.bs_contact_person.trim()) {
        errors.contactPerson = "Contact Person is required";
      }
      if (!formData.bs_whatsapp_number.match(/^\d{10}$/)) {
        errors.whatsAppNumber = "Enter a valid 10-digit WhatsApp number";
      }
    
  
  
      if (!formData.bs_business_type) {
        errors.businessType = "Business Type is required";
      }
      if (!formData.bs_business_category.trim()) {
        errors.businessCategory = "Business Category is required";
      }
      if (!formData.bs_business_sub_category.trim()) {
        errors.businessSubCategory = "Business Category is required";
      }
   
  
    return errors;
  };
  