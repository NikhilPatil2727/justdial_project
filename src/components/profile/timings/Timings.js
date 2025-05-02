import { useEffect, useState } from "react";
import timieImage from "../../../assets/profile/images/time3.jpg";
import Profilenav from "../profilenav/Profilenav";
import { addTimings, updateTiming, viewAllTimings, deleteTiming } from "./Service";
import { useParams } from "react-router-dom";

const Timings = () => {
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState(null);
  const [successMessage, setSuccessMessage] = useState(null);
  const [errors, setErrors] = useState({});
  const [timings, setTimings] = useState([]);
  const [editMode, setEditMode] = useState(false);
  const [selectedTimingId, setSelectedTimingId] = useState(null);


  const [formData, setFormData] = useState({
    bt_day: "",
    bt_from_time: "",
    bt_to_time: "",
  });




  useEffect(() => {
    const fetchAllTimings = async () => {
      try {
        const response = await viewAllTimings();
        if (response?.data) {
          setTimings(response.data.data);
        }
      } catch (error) {
        console.error("Error fetching business timings:", error);
        setErrorMessage("Failed to fetch business timings.");
      }
    };
    fetchAllTimings();
  }, []);


  const handleChange = (e) => {
    const { id, value } = e.target;
    setFormData({ ...formData, [id]: value });

    if (errors[id]) {
      setErrors((prevErrors) => ({ ...prevErrors, [id]: "" }));
    }
  };

  const handleDaySelection = (day) => {
    setFormData((prevForm) => ({ ...prevForm, bt_day: day }));

    if (errors.bt_day) {
      setErrors((prevErrors) => ({ ...prevErrors, bt_day: "" }));
    }
  };

  const validateForm = () => {
    const newErrors = {};

    if (!formData.bt_day) newErrors.bt_day = "Select a day.";
    if (!formData.bt_from_time) newErrors.bt_from_time = "Opening time is required.";
    if (!formData.bt_to_time) newErrors.bt_to_time = "Closing time is required.";

    return newErrors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setErrorMessage(null);
    setSuccessMessage(null);

    const validationErrors = validateForm();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      setLoading(false);
      return;
    }

    try {
      let response;
      if (editMode && selectedTimingId) {
        response = await updateTiming(selectedTimingId, formData);
        if (response?.status === 200) {
          setTimings((prevTimings) =>
            prevTimings.map((timing) =>
              timing._id === selectedTimingId ? { ...timing, ...formData } : timing
            )
          );
          alert("Business timings updated successfully!");
        } else {
          alert("Failed to update timings.");
        }
      } else {
        response = await addTimings(formData);
        if (response?.status === 200) {
          setTimings((prevTimings) => [...prevTimings, response.data]);
          alert("Business timing added successfully!");

          setTimeout(() => {
            window.location.reload();
          }, 1000);
        } else {
          alert("Failed to add timings.");
        }
      }

      setEditMode(false);
      setSelectedTimingId(null);
    } catch (error) {
      console.error("Error submitting timings:", error);
      setErrorMessage("Failed to update timings. Please try again.");
    } finally {
      setLoading(false);
    }
  };



  const handleView = (timing) => {
    setFormData({
      bt_day: timing.bt_day,
      bt_from_time: timing.bt_from_time,
      bt_to_time: timing.bt_to_time,
    });
    setEditMode(true);
    setSelectedTimingId(timing._id);
  };


  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this timing?")) return;

    try {
      const response = await deleteTiming(id);

      if (response.status === 200) {
        setTimings(timings.filter((timing) => timing._id !== id));
        alert("Timing deleted successfully!");
      } else {
        alert("Failed to delete timing.");
      }
    } catch (error) {
      console.error("Error deleting timing:", error);
      alert("An error occurred while deleting.");
    }
  };

  return (
    <>
      <Profilenav />
      <div className="container mt-4">
        <div className="row">
          <div className="col-md-4">
            <div className="image-side-time">
              <img src={timieImage} height="300px" alt="Business Premises" />
            </div>
          </div>

          <div className="col-md-8">
            <div className="card time-card">
              <div className="card-header-time" style={{backgroundColor:"#a071fd"}}>Update Business Timing</div>
              <div className="card-body">
                <form onSubmit={handleSubmit}>
                  <div className="form-group-time">
                    <label className="time-label">Select a Day:</label>
                    <div className="day-selector">
                      {["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"].map((day) => (
                        <div key={day}>
                          <input
                            type="radio"
                            id={day}
                            name="bt_day"
                            value={day}
                            checked={formData.bt_day === day}
                            onChange={() => handleDaySelection(day)}
                            style={{ display: "none" }}
                          />
                          <label
                            htmlFor={day}
                            style={{
                              backgroundColor: formData.bt_day === day ? "#a071fd" : "#ccc",
                              color: "white",
                              padding: "12px 20px",
                              fontSize: "16px",
                              userSelect: "none",
                              transition: "background-color 0.3s",
                              borderRadius: "8px",
                              cursor: "pointer",
                            }}
                          >
                            {day}
                          </label>
                        </div>
                      ))}
                    </div>
                    {errors.bt_day && <small className="text-danger">{errors.bt_day}</small>}
                  </div>

                  <div className="form-group-time">
                    <label className="time-label" htmlFor="bt_from_time">
                      Opening Time:
                    </label>
                    <input
                      className="time-input"
                      type="time"
                      id="bt_from_time"
                      value={formData.bt_from_time}
                      onChange={handleChange}
                      required
                    />
                    {errors.bt_from_time && <small className="text-danger">{errors.bt_from_time}</small>}
                  </div>

                  <div className="form-group-time">
                    <label className="time-label" htmlFor="bt_to_time">
                      Closing Time:
                    </label>
                    <input
                      className="time-input"
                      type="time"
                      id="bt_to_time"
                      value={formData.bt_to_time}
                      onChange={handleChange}
                      required
                    />
                    {errors.bt_to_time && <small className="text-danger">{errors.bt_to_time}</small>}
                  </div>

                  <div className="text-center">
                    <button type="submit" className="btn-save" style={{backgroundColor:"#a071fd"}} disabled={loading}>
                      {loading ? "Submitting..." : "Submit"}
                    </button>
                  </div>

                </form>
                {/* 
                {successMessage && <p className="text-success mt-2">{successMessage}</p>}
                {errorMessage && <p className="text-danger mt-2">{errorMessage}</p>} */}
              </div>
            </div>
          </div>
        </div>
<br></br><br></br>
        <div className="row mt-4">
          <div className="col-md-12">
            <h3 className="text-center">Business Timing Overview</h3>
            <table className="time-table">
              <thead>
                <tr>
                  <th>Day</th>
                  <th>Opening Time</th>
                  <th>Closing Time</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {timings.length > 0 ? (
                  timings.map((timing, index) => (
                    <tr key={index}>
                      <td>{timing.bt_day}</td>
                      <td>{timing.bt_from_time}</td>
                      <td>{timing.bt_to_time}</td>
                      <td>
                        <button
                          className="btn btn-lg"
                          style={{ marginRight: "10px" }}
                          onClick={() => handleView(timing)}
                        >
                           👁️
                        </button>
                        <button className="btn  btn-lg" onClick={() => handleDelete(timing._id)}>
                        🗑️
                        </button>
0
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="5" className="text-center">No timings available</td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>

      </div>
    </>
  );
};

export default Timings;
