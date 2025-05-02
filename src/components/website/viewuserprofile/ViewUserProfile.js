import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import Image4 from "../../../assets/website/img/p1.jpg";

import { getProfile, updateProfile } from './Service';
import Profilenav from '../../profile/profilenav/Profilenav';

const UserProfile = () => {
  const [profile, setProfile] = useState(null);
  const [error, setError] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [updatedProfile, setUpdatedProfile] = useState({});
  const { userId } = useParams();

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const data = await getProfile(userId);
        setProfile(data.user);
      } catch (err) {
        setError('Failed to fetch profile');
        console.error(err.message);
      }
    };

    fetchProfile();
  }, [userId]);

  const handleEditClick = () => {
    setIsEditing(true);
    setUpdatedProfile({
      us_reg_name: profile.us_reg_name,
      us_email: profile.us_email,
      us_phone_number: profile.us_phone_number,
    });
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUpdatedProfile((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSave = async () => {
    try {
      const updatedData = await updateProfile(userId, updatedProfile);
      setProfile(updatedData.user);
      setIsEditing(false);
    } catch (err) {
      setError('Failed to update profile');
      console.error(err.message);
    }
  };

  if (!profile) {
    return <div>Loading...</div>;
  }

  return (
    <>
      <Profilenav />
      <div style={styles.container}>
        <h2 style={styles.heading}>User Profile</h2>
        <div style={styles.profileContainer}>
          <div className="about-item-image-content">
            <img
              src={Image4}
              alt="Profile"
              style={styles.profileImage}
            />
          </div>

          {isEditing ? (
            <div style={styles.formContainer}>
              <div style={styles.formGroup}>
                <label>Name:</label>
                <input
                  type="text"
                  name="us_reg_name"
                  value={updatedProfile.us_reg_name}
                  onChange={handleChange}
                  style={styles.input}
                />
              </div>
              <div style={styles.formGroup}>
                <label>Email:</label>
                <input
                  type="email"
                  name="us_email"
                  value={updatedProfile.us_email}
                  onChange={handleChange}
                  style={styles.input}
                />
              </div>
              <div style={styles.formGroup}>
                <label>Phone:</label>
                <input
                  type="text"
                  name="us_phone_number"
                  value={updatedProfile.us_phone_number}
                  onChange={handleChange}
                  style={styles.input}
                  maxLength={10}
                  pattern="\d{10}"
                  required
                />
              </div>

              <button onClick={handleSave} style={styles.saveButton}>
                Save Changes
              </button>
            </div>
          ) : (
            <div style={styles.profileDetails}>
              <p><strong>Name:</strong> {profile.us_reg_name}</p>
              <p><strong>Email:</strong> {profile.us_email}</p>
              <p><strong>Phone:</strong> {profile.us_phone_number}</p>
              <button onClick={handleEditClick} style={styles.editButton}>
                Update
              </button>
            </div>
          )}
        </div>
        {error && <div style={styles.error}>{error}</div>}
      </div>
    </>
  );
};

const styles = {
  container: {
    padding: '20px',
    maxWidth: '800px',
    margin: '0 auto',
    fontFamily: 'Arial, sans-serif',
    backgroundColor: '#f4f4f9',
    borderRadius: '10px',
    boxShadow: '0 4px 8px rgba(0,0,0,0.1)',
  },
  heading: {
    textAlign: 'center',
    marginBottom: '30px',
    fontSize: '30px',
    color: '#333',
    fontWeight: 'bold',
  },
  profileContainer: {
    textAlign: 'center',
    padding: '30px',
    borderRadius: '8px',
    backgroundColor: '#fff',
    boxShadow: '0 4px 8px rgba(0,0,0,0.1)',
  },
  profileImage: {
    borderRadius: '50%',    
    width: '100px',        
    height: '100px',      
    objectFit: 'cover',    
    marginBottom: '20px', 
  },
  profileDetails: {
    marginTop: '20px',
  },
  editButton: {
    backgroundColor: '#4CAF50',
    color: 'white',
    border: 'none',
    padding: '8px 16px',    
    cursor: 'pointer',
    borderRadius: '8px',
    marginTop: '10px',
    fontSize: '14px',      
    transition: 'background-color 0.3s ease',
    display: 'block',
    marginLeft: 'auto',
    marginRight: 'auto',     
  },
  formContainer: {
    textAlign: 'left',
    display: 'flex',
    flexDirection: 'column',
    gap: '20px',
  },
  formGroup: {
    marginBottom: '15px',
  },
  input: {
    width: '100%',
    padding: '12px',
    borderRadius: '8px',
    border: '1px solid #ddd',
    fontSize: '16px',
    marginTop: '5px',
    backgroundColor: '#f9f9f9',
  },
  saveButton: {
    backgroundColor: '#4CAF50',
    color: 'white',
    border: 'none',
    padding: '8px 16px',   
    cursor: 'pointer',
    borderRadius: '8px',
    fontSize: '14px',        
    transition: 'background-color 0.3s ease',
    display: 'block',
    marginLeft: 'auto',
    marginRight: 'auto',  
    marginTop: '20px',
  },
  error: {
    color: 'red',
    marginTop: '20px',
    textAlign: 'center',
  },
};

export default UserProfile;
