import React, { useState } from 'react';

const AcceptedRequest = () => {
  const [previewImage, setPreviewImage] = useState(null);

  const handleImageChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      const imageUrl = URL.createObjectURL(file);
      setPreviewImage(imageUrl);
    }
  };

  return (
    <div className="container mt-5">
      <div className="row justify-content-center">
        <div className="col-md-6">
          <div className="card shadow-lg">
            <div className="card-body">
              <div className="text-center mb-4">
                <label htmlFor="profileImage" className="profile-image-label">
                  {previewImage ? (
                    <img
                      id="previewImage"
                      src={previewImage}
                      alt="Profile Preview"
                      className="profile-image"
                    />
                  ) : (
                    <div className="profile-image-placeholder">
                        <i class="fas fa-camera-retro"></i>
                    </div>
                  )}
                  <input
                    type="file"
                    className="d-none"
                    id="profileImage"
                    name="profileImage"
                    accept="image/*"
                    onChange={handleImageChange}
                    required
                  />
                </label>
              </div>
              <h4 className="card-title mb-4">New User Registration</h4>
              <form id="AcceptedRequest" encType="multipart/form-data">
                {/* Other form fields */}
                <div className="d-grid mt-4">
                  <button type="submit" className="btn btn-primary btn-block">
                    Register
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AcceptedRequest;
