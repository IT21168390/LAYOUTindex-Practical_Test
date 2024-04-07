import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom';

function Locations() {
  const [name, setName] = useState('');
  const [address, setAddress] = useState('');
  const [phone, setPhone] = useState('');
  const [devices, setDevices] = useState([]);
  const [selectedDevice, setSelectedDevice] = useState('');
  const [availableDevices, setAvailableDevices] = useState([]);
  const [locations, setLocations] = useState([]);

  useEffect(() => {
    fetchDevicesData();
    fetchLocations();
  }, []);

  const fetchDevicesData = () => {
    axios.get('http://localhost:3001/api/devices/identities/all')
      .then((result) => {
        if (result.status === 200)
          setAvailableDevices(result.data);
        else
          console.log(result.data.message);
      })
      .catch(error => {
        console.log(error);
      });
  }

  const fetchLocations = () => {
    axios.get('http://localhost:3001/api/locations/')
      .then((result) => {
        if (result.status === 200)
          setLocations(result.data);
        else
          console.log(result.data.message);
      })
      .catch(error => {
        console.log(error);
      });
  }

  const handleAddDevice = () => {
    if (selectedDevice) {
      if (!devices.includes(selectedDevice))
        setDevices([...devices, selectedDevice]);
      setSelectedDevice(''); // Clear selected device after adding
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!name) {
      alert("Name is Required!");
      return;
    } else if(phone && phone.length!==10){
      alert("Enter a valid Phone number!");
      return;
    }
    const data = {
      name,
      address,
      phone,
      devices
    }
    axios.post("http://localhost:3001/api/locations/add", data)
      .then((response) => {
        if (response.status === 201) {
          alert("Location successfully added!");
          fetchLocations();
          setDevices([]);
        } else
          console.log(response.data.message);
      })
      .catch((error) => {
        alert(error.response.data.message);
        console.log(error);
      })
    console.log('Submitted location data:', { name, address, phone, devices });
  };

  return (
    <div>
      <div className="container">
        <div className="row justify-content-center mt-5">
          <div className="col-md-10">
            <div className="card border shadow rounded">
              <div className="card-body">
                <center><h2>Add New Location</h2></center><br />
                <form onSubmit={handleSubmit} className="row g-3">
                  <div className="col-md-6">
                    <label className="form-label">Location Name :</label>
                    <input
                      type="text"
                      className="form-control"
                      id="name"
                      name="name"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      required
                    />
                  </div>
                  <div className="col-md-6">
                    <label className="form-label">Address (optional) :</label>
                    <input
                      type="text"
                      className="form-control"
                      id="address"
                      name="address"
                      value={address}
                      onChange={(e) => setAddress(e.target.value)}
                    />
                  </div>
                  <div className="col-md-6">
                    <label className="form-label">Phone Number (optional) :</label>
                    <input
                      type="number"
                      maxLength={10}
                      className="form-control"
                      id="phone"
                      name="phone"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                    />
                  </div>
                  <div className="col-md-6">
                    <label className="form-label">Add Device :</label>
                    <div className="input-group mb-3">
                      <select
                        className="form-select"
                        id="device"
                        // value={selectedDevice}
                        onChange={(e) => setSelectedDevice(e.target.value)}
                      >
                        <option value="">Select Device</option>
                        {availableDevices.map((device) => (
                          <option value={device._id} key={device._id}>{device.serialNumber}</option>
                        ))}
                      </select>
                      <button type="button" className="btn btn-outline-primary" onClick={handleAddDevice}>
                        Add
                      </button>
                      <button type="button" className="btn btn-outline-danger" onClick={() => setDevices([])}>
                        Clear All
                      </button>
                    </div>
                    {devices.length > 0 && (
                      <div className="row row-cols-md-2"> {/* Use row-cols-md-2 for two columns */}
                        {devices.map((deviceId) => (
                          <div className="col mb-2" key={deviceId}>
                            <li className="list-group-item">{availableDevices.find(device => device._id === deviceId)?.serialNumber}</li>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                  <div className="col-md-12">
                    <button type="submit" className="btn btn-primary float-end">
                      Add Location
                    </button>
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

      <center><h3>EXISTING LOCATIONS</h3></center><br />
      <div className='container'>
        <table className="table table-hover table-bordered" >
          <thead className="table-dark">
            <tr>
              <th scope="col"></th>
              <th scope="col" style={{ textAlign: 'center' }}>Location ID</th>
              <th scope="col" style={{ textAlign: 'center' }}>Name</th>
              <th scope="col" style={{ textAlign: 'center' }}>Address</th>
              <th scope="col" style={{ textAlign: 'center' }}>Phone</th>
              <th scope="col" style={{ textAlign: 'center' }}>Assigned Devices</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {locations.map((location, index) => (

              <tr key={location._id}>

                <td><b>{index + 1}</b></td>
                <td style={{ textAlign: 'center' }}>{location._id}</td>
                <td style={{ textAlign: 'center' }}>{location.name}</td>
                <td style={{ maxWidth: '200px', wordWrap: 'break-word' }}>{location.address}</td>
                <td style={{ textAlign: 'center' }}>{location.phone}</td>
                <td style={{ textAlign: 'center' }}>
                  {location.devices.map((id) => (
                    <div key={id}>
                      <p>
                        <span style={{ fontWeight: 'bold' }}>ID:</span> {id} <br />
                        <span style={{ fontWeight: 'bold' }}>Serial Number:</span> {availableDevices.find(device => device._id === id)?.serialNumber}
                      </p>
                      <hr />
                    </div>
                  ))}
                </td>
                <td style={{ alignContent: 'center', textAlign: 'center' }}>
                  <Link to={`/locations/view/${location._id}`}><button type="button" name="viewLocation" className="btn btn-warning">VIEW</button></Link>
                </td>

              </tr>

            ))}
          </tbody>
        </table>
      </div>
      <br />
    </div>
  )
}

export default Locations