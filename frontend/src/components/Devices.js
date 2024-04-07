import React, { useEffect, useState } from 'react';
import axios from 'axios';

export default function Devices() {
  const [allDevices, setAllDevices] = useState([]);

  const [newDevice, setNewDevice] = useState({
    serialNumber: '',
    type: '',
    image: null,
    status: '',
  });

  function retrieveDevices() {
    axios.get('http://localhost:3001/api/devices/')
      .then((result) => {
        console.log(result);
        if (result.status === 200) {
          setAllDevices(result.data);
        } else {
          console.log(result.data.message);
        }
      })
      .catch((error) => {
        console.log(error);
      })
  }

  useEffect(() => {
    retrieveDevices();
  }, []);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setNewDevice({ ...newDevice, [name]: value });
  };

  const handleFileUpload = (e) => {
    const file = e.target.files[0];
    if (!file.type.startsWith('image/')) {
      alert('Only image files are allowed!');
      e.target.value = null; // Clear the input field
      return;
    }
    // Check if the file size is within the limit (2 MB)
    const fileSizeLimit = 2 * 1024 * 1024; // 2 MB in bytes
    if (file.size > fileSizeLimit) {
      alert('File size must be less than 2 MB.');
      e.target.value = null; // Clear the input field
      return;
    }
    setNewDevice({ ...newDevice, image: file });;
  }

  const handleSubmit = (event) => {
    event.preventDefault();

    const formData = new FormData();
    formData.append('image', newDevice.image);
    formData.append('serialNumber', newDevice.serialNumber);
    formData.append('type', newDevice.type);
    if (newDevice.status)
      formData.append('status', newDevice.status);

    console.log(formData);

    axios.post('http://localhost:3001/api/devices/add', formData, {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    })
      .then((res) => {
        if (res.status === 201) {
          alert("Device added successfully!");
          retrieveDevices();
        }
      })
      .catch((error) => {
        alert(error.response.data.message);
        console.log(error);
      })
  }

  return (
    <div>
      <div className="container">
        <div className="row justify-content-center mt-5">
          <div className="col-md-6">
            <div className="card border shadow rounded">
              <div className="card-body">
                <h2 className="card-title text-center mb-4">Add New Device</h2>
                <form onSubmit={handleSubmit}>
                  <div className="mb-3">
                    <label htmlFor="serialNumber" className="form-label">Serial Number:</label>
                    <input
                      type="text"
                      className="form-control"
                      id="serialNumber"
                      name="serialNumber"
                      value={newDevice.serialNumber}
                      onChange={handleChange}
                      required
                    />
                  </div>
                  <div className="row mb-3">
                    <div className="col">
                      <label htmlFor="type" className="form-label">Device Type:</label>
                      <select
                        className="form-select"
                        id="type"
                        name="type"
                        value={newDevice.type}
                        onChange={handleChange}
                        required
                      >
                        <option value="">Select Type</option>
                        <option value="pos">POS</option>
                        <option value="kisok">Kiosk</option>
                        <option value="signage">Signage</option>
                      </select>
                    </div>
                    <div className="col">
                      <label htmlFor="image" className="form-label">Image:</label>
                      <input
                        type="file"
                        className="form-control"
                        id="image"
                        name="image"
                        accept="image/*"
                        onChange={handleFileUpload}
                        required
                      />
                    </div>
                  </div>
                  <div className="mb-3" style={{ textAlign: 'center' }}>
                    <label className="form-check-label" style={{ fontWeight: 'bold' }}>Status:&nbsp;&nbsp;</label>
                    <input
                      className="form-check-input"
                      type="radio"
                      name="status"
                      id="active"
                      value="active"
                      checked={newDevice.status === 'active'}
                      onChange={handleChange}
                    />
                    <label className="form-check-label">&nbsp;Active &nbsp;&nbsp;</label>

                    <input
                      className="form-check-input"
                      type="radio"
                      name="status"
                      id="inactive"
                      value="inactive"
                      checked={newDevice.status === 'inactive'}
                      onChange={handleChange}
                    />
                    <label className="form-check-label">&nbsp;Inactive</label>
                  </div>
                  <div className="d-grid">
                    <button type="submit" className="btn btn-primary" style={{ fontWeight: 'bold' }}>Add Device</button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
      <br />
      <hr />
      <br />
      {allDevices ? (
        <div className="row row-cols-md-6 g-3" style={{ marginLeft: '15px', marginRight: '15px' }}>
          {allDevices.map((device, index) => (
            <div className="col mb-3" key={index}>
              <div className="card shadow" style={{ minHeight: '325px' }} >
                <img src={`data:image;base64,${device.image}`} className="card-img-top img-fluid rounded-start" style={{ maxHeight: '175px', objectFit: 'contain' }} alt={device.serialNumber} />
                <div className="card-body" style={{ textAlign: 'center' }}>
                  <label className="card-text">Serial Number: </label><h5 className="card-title">{device.serialNumber}</h5>
                  <div className='d-flex justify-content-between align-items-center' style={{ marginBottom: '10px' }}>
                    <label className="card-text" style={{ marginLeft: 'auto' }}>Device Type:&nbsp;&nbsp;&nbsp;</label>
                    <p className="card-text" style={{ marginRight: 'auto', fontWeight: 'bold' }}>{device.type.toUpperCase()}</p>
                  </div>
                  <span className={`badge bg-${device.status === 'active' ? 'success' : 'danger'}`}>{device.status.toUpperCase()}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <p>No Data...</p>
      )}
    </div>
  );

}
