const Forgetpassword = () =>{
    return(
        <>
          <div classname="container" id="form-container">
        <div classname="row justify-content-center">
            <div classname="col-md-6">
                <div classname="form-card">
                    <h3 classname="text-center">Forgot Password</h3>
                    <form id="forgot-password-form">
                        <div classname="form-group">
                            <label for="mobile">Enter Mobile Number</label>
                            <input type="text" classname="form-control" id="mobile" required/>
                        </div>
                        <div classname="form-group d-none" id="otp-section">
                            <label for="otp">Enter OTP</label>
                            <input type="text" classname="form-control" id="otp" required/>
                        </div>
                        <div classname="text-center">
                            <button type="submit" classname="btn-save" id="submit-btn">Send OTP</button>
                        </div>
                    </form>
                    <div classname="text-center mt-3">
                        <a href="signin.html">Back to Sign In</a>
                    </div>
                </div>
            </div>
        </div>
    </div>
        </>
    )
}
export default Forgetpassword;