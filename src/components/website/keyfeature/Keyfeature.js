import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { fetchKeyfeature } from "./Service";

const Keyfeature = () => {
  const { bs_id } = useParams();
  const [likeFeatures, setLikeFeatures] = useState([]);
  const [dislikeFeatures, setDislikeFeatures] = useState([]);
  const [likeCount, setLikeCount] = useState(0);
  const [dislikeCount, setDislikeCount] = useState(0);
  const [isVisible, setIsVisible] = useState(false);
  const [userVoted, setUserVoted] = useState(false);
  
  // Categorized like/dislike points with counts
  const [likeCategories, setLikeCategories] = useState([
    { name: "Excellent", icon: "fa-star", count: 0, color: "#4caf50" },
    { name: "Great", icon: "fa-thumbs-up", count: 0, color: "#2196f3" },
    { name: "Good", icon: "fa-check-circle", count: 0, color: "#00bcd4" },
    { name: "Better", icon: "fa-arrow-trend-up", count: 0, color: "#009688" },
    { name: "Nice", icon: "fa-heart", count: 0, color: "#8bc34a" }
  ]);
  
  const [dislikeCategories, setDislikeCategories] = useState([
    { name: "Worst", icon: "fa-face-angry", count: 0, color: "#f44336" },
    { name: "Bad", icon: "fa-thumbs-down", count: 0, color: "#ff5722" },
    { name: "Poor", icon: "fa-exclamation-circle", count: 0, color: "#ff9800" },
    { name: "Needs Work", icon: "fa-wrench", count: 0, color: "#ff7043" },
    { name: "Disappointing", icon: "fa-face-frown", count: 0, color: "#ff5252" }
  ]);

  const fetchKeyfeatureData = async () => {
    try {
      const response = await fetchKeyfeature(bs_id);
      const features = response.data.data;

      const likes = features
        .filter((feature) => feature.kf_title?.toLowerCase() === "like")
        .map((feature) => feature.kf_description);

      const dislikes = features
        .filter((feature) => feature.kf_title?.toLowerCase() === "dislike")
        .map((feature) => feature.kf_description);

      setLikeFeatures(likes);
      setDislikeFeatures(dislikes);
      
      // Set initial counts for demo purposes
      setLikeCount(Math.floor(Math.random() * 500) + 100);
      setDislikeCount(Math.floor(Math.random() * 100) + 10);
      
      // Set random counts for categories
      setLikeCategories(prev => 
        prev.map(cat => ({
          ...cat,
          count: Math.floor(Math.random() * 200) + 50
        }))
      );
      
      setDislikeCategories(prev => 
        prev.map(cat => ({
          ...cat,
          count: Math.floor(Math.random() * 80) + 10
        }))
      );
      
      setTimeout(() => {
        setIsVisible(true);
      }, 300);
    } catch (err) {
      console.error("Error fetching key features:", err);
    }
  };

  useEffect(() => {
    if (bs_id) {
      fetchKeyfeatureData();
    }
  }, [bs_id]);

  // Handle like/dislike actions
  const handleLike = (categoryIndex) => {
    if (userVoted) return;
    
    // Increase overall like count
    setLikeCount(prev => prev + 1);
    
    // Increase specific category count
    setLikeCategories(prev => 
      prev.map((cat, idx) => 
        idx === categoryIndex ? {...cat, count: cat.count + 1} : cat
      )
    );
    
    setUserVoted(true);
    
    // Add pulse animation to the button
    const btn = document.getElementById(`like-btn-${categoryIndex}`);
    btn.classList.add("pulse-animation");
    setTimeout(() => {
      btn.classList.remove("pulse-animation");
    }, 500);
  };
  
  const handleDislike = (categoryIndex) => {
    if (userVoted) return;
    
    // Increase overall dislike count
    setDislikeCount(prev => prev + 1);
    
    // Increase specific category count
    setDislikeCategories(prev => 
      prev.map((cat, idx) => 
        idx === categoryIndex ? {...cat, count: cat.count + 1} : cat
      )
    );
    
    setUserVoted(true);
    
    // Add pulse animation to the button
    const btn = document.getElementById(`dislike-btn-${categoryIndex}`);
    btn.classList.add("pulse-animation");
    setTimeout(() => {
      btn.classList.remove("pulse-animation");
    }, 500);
  };

  if (likeFeatures.length === 0 && dislikeFeatures.length === 0) {
    return <p className="text-center"></p>;
  }

  // Helper function to categorize features
  const categorizeFeature = (description) => {
    const lowercased = description.toLowerCase();
    if (lowercased.includes("excellent") || lowercased.includes("amazing") || lowercased.includes("best")) {
      return 0; // Excellent
    } else if (lowercased.includes("great")) {
      return 1; // Great
    } else if (lowercased.includes("good")) {
      return 2; // Good
    } else if (lowercased.includes("better")) {
      return 3; // Better
    } else if (lowercased.includes("nice")) {
      return 4; // Nice
    }
    return Math.floor(Math.random() * 5); // Random category if no match
  };

  // Helper function for dislike categories
  const categorizeDislikes = (description) => {
    const lowercased = description.toLowerCase();
    if (lowercased.includes("worst") || lowercased.includes("terrible") || lowercased.includes("awful")) {
      return 0; // Worst
    } else if (lowercased.includes("bad")) {
      return 1; // Bad
    } else if (lowercased.includes("poor")) {
      return 2; // Poor
    } else if (lowercased.includes("need") || lowercased.includes("improve")) {
      return 3; // Needs Work
    } else if (lowercased.includes("disappoint")) {
      return 4; // Disappointing
    }
    return Math.floor(Math.random() * 5); // Random category if no match
  };

  return (
    <div className="container-fluid py-5" style={{ background: "#f9f7ff" }}>
      <div className="container py-5">
        <div 
          className={`text-center mx-auto pb-5 ${isVisible ? 'animate-fade-in' : ''}`} 
          style={{ maxWidth: "700px", opacity: isVisible ? 1 : 0, transition: "all 0.8s ease" }}
        >
          <h2 className="display-4 mb-3" style={{ color: "#000000", fontWeight: "700" }}>Key Features</h2>
          <p className="text-secondary">What our users love and what we can improve</p>
          <div className="divider mx-auto my-4" style={{ width: "70px", height: "3px", background: "#7562d8" }}></div>
        </div>
        
        <div className="row g-4">
          {/* Likes Section */}
          <div 
            className="col-lg-6 mb-4" 
            style={{ 
              opacity: isVisible ? 1 : 0, 
              transform: isVisible ? "translateY(0)" : "translateY(20px)", 
              transition: "all 0.8s ease 0.2s" 
            }}
          >
            <div 
              className="feature-card rounded-lg shadow-lg overflow-hidden" 
              style={{ 
                background: "#ffffff", 
                borderRadius: "16px", 
                transition: "transform 0.3s ease, box-shadow 0.3s ease" 
              }}
              onMouseOver={(e) => {
                e.currentTarget.style.transform = "translateY(-5px)";
                e.currentTarget.style.boxShadow = "0 12px 25px rgba(117, 98, 216, 0.2)";
              }}
              onMouseOut={(e) => {
                e.currentTarget.style.transform = "translateY(0)";
                e.currentTarget.style.boxShadow = "0 5px 15px rgba(0, 0, 0, 0.1)";
              }}
            >
              <div className="card-header d-flex align-items-center px-4 py-3" style={{ background: "#7562d8" }}>
                <div className="feature-icon d-flex justify-content-center align-items-center rounded-circle bg-white me-3" style={{ 
                  width: "50px", 
                  height: "50px", 
                  minWidth: "50px", 
                  boxShadow: "0 4px 10px rgba(0, 0, 0, 0.1)" 
                }}>
                  <i className="fas fa-thumbs-up" style={{ color: "#7562d8", fontSize: "1.5rem" }}></i>
                </div>
                <div className="flex-grow-1">
                  <h3 className="m-0 fs-4 fw-bold text-white">What Users Love</h3>
                  <div className="d-flex align-items-center mt-1">
                    <span className="text-white opacity-90">{likeCount} people liked</span>
                    <div className="ms-2 bg-white text-dark px-2 py-1 rounded-pill" style={{ fontSize: "0.8rem" }}>
                      <i className="fas fa-chart-line me-1"></i> 
                      <span>+{Math.floor(likeCount/10)}</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Like Rating Categories */}
              <div className="card-body p-0">
                <div className="like-categories py-3 px-4" style={{ background: "#f3f0ff" }}>
                  <div className="d-flex flex-wrap justify-content-between">
                    {likeCategories.map((category, index) => (
                      <div key={index} className="like-category-item text-center mb-2 px-2" style={{ flex: "0 0 20%", minWidth: "80px" }}>
                        <button 
                          id={`like-btn-${index}`}
                          onClick={() => handleLike(index)} 
                          className={`btn rounded-circle mb-2 ${userVoted ? 'disabled' : ''}`}
                          style={{ 
                            background: category.color,
                            width: "50px", 
                            height: "50px",
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            color: "#ffffff",
                            margin: "0 auto",
                            transition: "all 0.3s ease"
                          }}
                          disabled={userVoted}
                        >
                          <i className={`fas ${category.icon}`} style={{ fontSize: "1.4rem" }}></i>
                        </button>
                        <h6 style={{ fontSize: "0.8rem", color: "#333", fontWeight: "600" }}>{category.name}</h6>
                        <p className="m-0" style={{ fontSize: "0.75rem", color: "#7562d8" }}>
                          <span className="fw-bold">{category.count}</span>
                        </p>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Like Features List */}
                <ul className="feature-list p-0 m-0" style={{ listStyleType: "none" }}>
                  {likeFeatures.length > 0 ? (
                    likeFeatures.map((desc, index) => {
                      const categoryIndex = categorizeFeature(desc);
                      const category = likeCategories[categoryIndex];
                      
                      return (
                        <li 
                          key={index} 
                          className="feature-item d-flex align-items-start p-4 border-bottom"
                          style={{
                            animation: `fadeIn 0.5s ease ${0.2 + index * 0.1}s forwards`,
                            opacity: 0
                          }}
                        >
                          <div 
                            className="feature-badge me-3 rounded-circle d-flex justify-content-center align-items-center"
                            style={{ 
                              minWidth: "36px", 
                              height: "36px", 
                              background: category.color,
                              color: "#ffffff",
                              fontSize: "1rem"
                            }}
                          >
                            <i className={`fas ${category.icon}`}></i>
                          </div>
                          <div className="flex-grow-1">
                            <div className="d-flex justify-content-between align-items-center mb-2">
                              <span className="badge rounded-pill" style={{ 
                                background: `${category.color}20`,
                                color: category.color,
                                padding: "5px 10px"
                              }}>
                                {category.name}
                              </span>
                              <span className="text-muted" style={{ fontSize: "0.8rem" }}>
                                <i className="fas fa-users me-1"></i>
                                {Math.floor(Math.random() * 80) + 20}%
                              </span>
                            </div>
                            <p className="m-0" style={{ color: "#333" }}>{desc}</p>
                          </div>
                        </li>
                      );
                    })
                  ) : (
                    <li className="p-4 text-center text-danger">No features to show</li>
                  )}
                </ul>
              </div>
            </div>
          </div>

          {/* Dislikes Section */}
          <div 
            className="col-lg-6 mb-4" 
            style={{ 
              opacity: isVisible ? 1 : 0, 
              transform: isVisible ? "translateY(0)" : "translateY(20px)", 
              transition: "all 0.8s ease 0.4s" 
            }}
          >
            <div 
              className="feature-card rounded-lg shadow-lg overflow-hidden" 
              style={{ 
                background: "#ffffff", 
                borderRadius: "16px", 
                transition: "transform 0.3s ease, box-shadow 0.3s ease" 
              }}
              onMouseOver={(e) => {
                e.currentTarget.style.transform = "translateY(-5px)";
                e.currentTarget.style.boxShadow = "0 12px 25px rgba(117, 98, 216, 0.2)";
              }}
              onMouseOut={(e) => {
                e.currentTarget.style.transform = "translateY(0)";
                e.currentTarget.style.boxShadow = "0 5px 15px rgba(0, 0, 0, 0.1)";
              }}
            >
              <div className="card-header d-flex align-items-center px-4 py-3" style={{ background: "#7562d8" }}>
                <div className="feature-icon d-flex justify-content-center align-items-center rounded-circle bg-white me-3" style={{ 
                  width: "50px", 
                  height: "50px", 
                  minWidth: "50px", 
                  boxShadow: "0 4px 10px rgba(0, 0, 0, 0.1)" 
                }}>
                  <i className="fas fa-thumbs-down" style={{ color: "#7562d8", fontSize: "1.5rem" }}></i>
                </div>
                <div className="flex-grow-1">
                  <h3 className="m-0 fs-4 fw-bold text-white">Areas for Improvement</h3>
                  <div className="d-flex align-items-center mt-1">
                    <span className="text-white opacity-90">{dislikeCount} people disliked</span>
                    <div className="ms-2 bg-white text-dark px-2 py-1 rounded-pill" style={{ fontSize: "0.8rem" }}>
                      <i className="fas fa-chart-line me-1"></i> 
                      <span>-{Math.floor(dislikeCount/5)}</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Dislike Rating Categories */}
              <div className="card-body p-0">
                <div className="dislike-categories py-3 px-4" style={{ background: "#f3f0ff" }}>
                  <div className="d-flex flex-wrap justify-content-between">
                    {dislikeCategories.map((category, index) => (
                      <div key={index} className="dislike-category-item text-center mb-2 px-2" style={{ flex: "0 0 20%", minWidth: "80px" }}>
                        <button 
                          id={`dislike-btn-${index}`}
                          onClick={() => handleDislike(index)} 
                          className={`btn rounded-circle mb-2 ${userVoted ? 'disabled' : ''}`}
                          style={{ 
                            background: category.color,
                            width: "50px", 
                            height: "50px",
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            color: "#ffffff",
                            margin: "0 auto",
                            transition: "all 0.3s ease"
                          }}
                          disabled={userVoted}
                        >
                          <i className={`fas ${category.icon}`} style={{ fontSize: "1.4rem" }}></i>
                        </button>
                        <h6 style={{ fontSize: "0.8rem", color: "#333", fontWeight: "600" }}>{category.name}</h6>
                        <p className="m-0" style={{ fontSize: "0.75rem", color: "#7562d8" }}>
                          <span className="fw-bold">{category.count}</span>
                        </p>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Dislike Features List */}
                <ul className="feature-list p-0 m-0" style={{ listStyleType: "none" }}>
                  {dislikeFeatures.length > 0 ? (
                    dislikeFeatures.map((desc, index) => {
                      const categoryIndex = categorizeDislikes(desc);
                      const category = dislikeCategories[categoryIndex];
                      
                      return (
                        <li 
                          key={index} 
                          className="feature-item d-flex align-items-start p-4 border-bottom"
                          style={{
                            animation: `fadeIn 0.5s ease ${0.2 + index * 0.1}s forwards`,
                            opacity: 0
                          }}
                        >
                          <div 
                            className="feature-badge me-3 rounded-circle d-flex justify-content-center align-items-center"
                            style={{ 
                              minWidth: "36px", 
                              height: "36px", 
                              background: category.color,
                              color: "#ffffff",
                              fontSize: "1rem"
                            }}
                          >
                            <i className={`fas ${category.icon}`}></i>
                          </div>
                          <div className="flex-grow-1">
                            <div className="d-flex justify-content-between align-items-center mb-2">
                              <span className="badge rounded-pill" style={{ 
                                background: `${category.color}20`,
                                color: category.color,
                                padding: "5px 10px"
                              }}>
                                {category.name}
                              </span>
                              <span className="text-muted" style={{ fontSize: "0.8rem" }}>
                                <i className="fas fa-users me-1"></i>
                                {Math.floor(Math.random() * 50) + 10}%
                              </span>
                            </div>
                            <p className="m-0" style={{ color: "#333" }}>{desc}</p>
                          </div>
                        </li>
                      );
                    })
                  ) : (
                    <li className="p-4 text-center text-danger">No issues to show</li>
                  )}
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      {/* Add CSS animation keyframes */}
      <style>
        {`
          @keyframes fadeIn {
            from {
              opacity: 0;
              transform: translateY(10px);
            }
            to {
              opacity: 1;
              transform: translateY(0);
            }
          }
          
          @keyframes pulse {
            0% {
              transform: scale(1);
            }
            50% {
              transform: scale(1.05);
            }
            100% {
              transform: scale(1);
            }
          }
          
          .pulse-animation {
            animation: pulse 0.5s ease;
          }
          
          .animate-fade-in {
            animation: fadeIn 0.8s ease forwards;
          }
          
          /* Hover effect for rating buttons */
          .btn:not(.disabled):hover {
            transform: scale(1.1);
            box-shadow: 0 5px 15px rgba(0, 0, 0, 0.2);
          }
          
          @media (max-width: 991px) {
            .like-category-item, .dislike-category-item {
              flex: 0 0 33.33% !important;
            }
          }
          
          @media (max-width: 768px) {
            .card-header {
              flex-direction: column;
              align-items: flex-start !important;
              text-align: left;
            }
            .feature-icon {
              margin-bottom: 10px;
            }
            .like-category-item, .dislike-category-item {
              flex: 0 0 50% !important;
            }
          }
          
          @media (max-width: 576px) {
            .feature-item {
              flex-direction: column;
            }
            .feature-badge {
              margin-bottom: 10px;
            }
          }
        `}
      </style>
    </div>
  );
};

export default Keyfeature;