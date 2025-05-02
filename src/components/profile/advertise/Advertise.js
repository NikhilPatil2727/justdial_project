import { useEffect, useState } from "react";
import { viewSubscriptions, saveSubscription, getSubscriptionHistory } from "./Service";
import Profilenav from "../profilenav/Profilenav";

const Advertise = () => {
  const [data, setData] = useState([]);
  const [subscriptionStatus, setSubscriptionStatus] = useState(null);
  const [subscriptionData, setSubscriptionData] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Fetch subscription packages
        const response = await viewSubscriptions();
        setData(response.data?.data);

        // Fetch subscription history
        const subHistory = await getSubscriptionHistory();
        if (subHistory?.data?.status) {
          if (subHistory.data.message === "ONGOING") {
            setSubscriptionStatus("Active");
            setSubscriptionData(subHistory.data.data);
          } else if (subHistory.data.message === "EXPIRED") {
            setSubscriptionStatus("Expired");
            setSubscriptionData(subHistory.data.data);
          } else {
            setSubscriptionStatus("Not Subscribed");
          }
        }
      } catch (error) {
        console.log("Error fetching data:", error);
      }
    };
    fetchData();
  }, []);

  const packageColors = {
    Basic: "#737882",
    Standard: "#f38016",
    Premium: "#17a2b8",
  };

  const handlePayment = async (amount, duration) => {
    console.log("handlePayment called with:", { amount, duration });
    try {
      const options = {
        key: "rzp_test_aKbqVbQ3Ciq9KZ",
        amount: 100 * amount,
        currency: "INR",
        name: "Just Dial",
        description: "Advertisement Purchase",
        handler: async function (response) {
          console.log("Payment Success:", response);

          const startDate = new Date();
          const endDate = new Date();
          endDate.setMonth(endDate.getMonth() + duration);

          const subscriptionData = {
            sub_his_transaction_id: response.razorpay_payment_id,
            sub_his_duration: duration,
            sub_his_amount: amount,
            sub_his_start_date: startDate,
            sub_his_end_date: endDate,
          };

          await saveSubscription(subscriptionData);
          alert("Payment successful! Subscription saved.");
        },
        prefill: {
          name: "User Name",
          email: "user@example.com",
          contact: "9999999999",
        },
        theme: { color: "#3399cc" },
      };

      const rzp1 = new window.Razorpay(options);
      rzp1.open();
    } catch (error) {
      console.log("Payment error:", error);
    }
  };

  return (
    <>
      <Profilenav />
      <div className="container advertise-section">
        {/* Subscription Status Cards */}
        <div className="subscription-status-cards" style={{ display: "flex", gap: "10px", justifyContent: "center", marginBottom: "20px" }}>
          {subscriptionStatus === "Not Subscribed" && (
            <div className="status-card" style={{ backgroundColor: "#737882", color: "white", padding: "10px", borderRadius: "8px", textAlign: "center", width: "250px" }}>
              <h4 style={{ textAlign: "center" }}>Not Subscribed</h4>
              <p>No active plan</p>
            </div>
          )}
          {subscriptionStatus === "Active" && subscriptionData && (
            <div className="status-card" style={{ backgroundColor: "#28a745", color: "white", padding: "10px", borderRadius: "8px", textAlign: "center", width: "250px" }}>
              <h4 style={{ textAlign: "center" }}>Plan Subscribed</h4>
              <p>Active Plan: {subscriptionData.sub_his_name}</p>
              <p>Duration: {subscriptionData.sub_his_duration} months</p>
              <p>From: {new Date(subscriptionData.sub_his_start_date).toLocaleDateString()}</p>
              <p>To: {new Date(subscriptionData.sub_his_end_date).toLocaleDateString()}</p>
            </div>
          )}
          {subscriptionStatus === "Expired" && subscriptionData && (
            <div className="status-card" style={{ backgroundColor: "#dc3545", color: "white", padding: "10px", borderRadius: "8px", textAlign: "center", width: "250px" }}>
              <h4 style={{ textAlign: "center" }}>Plan Expired</h4>
              <p>Previous Plan: {subscriptionData.sub_his_name}</p>
              <p>Duration: {subscriptionData.sub_his_duration} months</p>
              <p>From: {new Date(subscriptionData.sub_his_start_date).toLocaleDateString()}</p>
              <p>To: {new Date(subscriptionData.sub_his_end_date).toLocaleDateString()}</p>
            </div>
          )}
        </div>

        <div className="advertise-header">
          <h2>Advertise with Us</h2>
          <p>Reach a wider audience and grow your business through our advertising options.</p>
        </div>

        <div className="advertise-packages-container">
          {data.map((sub, index) => {
            const packageColor = packageColors[sub.sub_name] || "#737882";
            return (
              <div key={index} className="advertise-package-wrapper">
                <div className="advertise-package">
                  <h4 style={{ color: packageColor }}>{sub.sub_name || "No Name Available"}</h4>
                  <div className="price">
                    <span>₹</span><span>{sub.sub_price || "N/A"}</span>
                    <p>per {sub.sub_duration} month</p>
                  </div>
                  <p>Features:</p>
                  <ul>
                    {sub.sub_desc
                      ? sub.sub_desc.split(",").map((feature, i) => (
                          <li key={i}>{feature.trim()}</li>
                        ))
                      : null}
                  </ul>
                  <button
                    className="btn btn-buy"
                    style={{ backgroundColor: packageColor }}
                    onClick={() => handlePayment(sub.sub_price, sub.sub_duration)}
                  >
                    Buy Now
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </>
  );
};

export default Advertise;
