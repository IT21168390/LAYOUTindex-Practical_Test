import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom';
import axios from 'axios';

export default function SingleLocation() {
    const { id } = useParams();
    const [locationData, setLocationData] = useState();
    const [assignedDevices, setAssignedDevices] = useState([]);
    const [availableDevices, setAvailableDevices] = useState([]);
    const [selectedDevice, setSelectedDevice] = useState('');
    const [newlyAddedDevices, setnewlyAddedDevices] = useState([]);

    const getDevicesIdAndSerial = () => {
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

    useEffect(() => {
        function getLocation() {
            if (id) {
                axios.get(`http://localhost:3001/api/locations/${id}`)
                    .then((response) => {
                        if (response.status === 200) {
                            setLocationData(response.data);
                            setAssignedDevicesIDs(response.data.devices);
                            console.log(response.data);
                        } else
                            console.log(response.data.nessage);
                    })
                    .catch((error) => {
                        console.log(error);
                    })
            }
        }
        getLocation();
        getDevicesIdAndSerial();
    }, [id]);

    function setAssignedDevicesIDs(assignedDevicesData) {
        setAssignedDevices(() =>
            assignedDevicesData.map((device) =>
                device._id
            )
        )
    }

    const handleAddDevice = () => {
        if (selectedDevice) {
            if (!newlyAddedDevices.includes(selectedDevice) && !assignedDevices.includes(selectedDevice)) {
                setnewlyAddedDevices([...newlyAddedDevices, selectedDevice]);
            }
            setSelectedDevice(''); // Clear selected device after adding
        }
    };

    const handleRemoveDevice = (deviceId) => {
        setAssignedDevices((prevAssignedDevices) =>
            prevAssignedDevices.filter((device) => device !== deviceId)
        );
        setLocationData((prevLocationData) => {
            return {
                ...prevLocationData,
                devices: prevLocationData.devices.filter((device) => device._id !== deviceId),
            };
        });
    };

    function modifyAssignedDevices() {
        const modifiedDevicesList = {
            devices: [...assignedDevices, ...newlyAddedDevices]
        };
        console.log(modifiedDevicesList);
        axios.put(`http://localhost:3001/api/locations/update/${id}/devices`, modifiedDevicesList)
            .then((response) => {
                if (response.status === 201) {
                    setLocationData(response.data);
                    setAssignedDevicesIDs(response.data.devices);
                    setnewlyAddedDevices([]);
                } else
                    console.log(response.data);
            })
            .catch((error) => {
                console.log(error);
            })
    }

    return (
        <div>
            <div className='container mt-3'>
                {locationData ?
                    <div className="card shadow p-3 mb-5 bg-white rounded">
                        <div className="row">
                            <div className="col-md-6">
                                <h5 className='text-primary'><b>{locationData.name}</b></h5>
                                <p><b>Address :</b> {locationData.address}</p>
                                <p><b>Phone :</b> {locationData.phone}</p>
                            </div>

                            <div className="col-md-6">
                                <label className="form-label"><b>Add New Devices :</b></label>
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
                                    <button type="button" className="btn btn-outline-danger" onClick={() => setnewlyAddedDevices([])}>
                                        Clear All
                                    </button>
                                </div>
                                {newlyAddedDevices.length > 0 && (
                                    <div className="row row-cols-md-2"> {/* Use row-cols-md-2 for two columns */}
                                        {newlyAddedDevices.map((deviceId) => (
                                            <div className="col mb-2" key={deviceId}>
                                                <li className="list-group-item">{availableDevices.find(device => device._id === deviceId)?.serialNumber}</li>
                                            </div>
                                        ))}
                                    </div>
                                )}
                            </div>
                        </div>

                        <div className="row mt-5">
                            {locationData.devices.map((device) => (
                                <div className="col-md-auto" key={device._id}>
                                    <div className="card shadow rounded mb-2" style={{ minWidth: "350px" }}>
                                        <img
                                            src={`data:image;base64,${device.image}`}
                                            className="card-img-top p-2"
                                            alt={device.serialNumber}
                                            style={{ maxHeight: "275px", maxWidth: "350px", alignSelf: 'center', objectFit: 'contain' }}
                                        />
                                        <div className="card-body">
                                            <center>
                                                <p className="card-text m-0">
                                                    <b>Serial Number:</b> {device.serialNumber}
                                                </p>
                                                <p className="card-text m-0">
                                                    <b>Type:</b> {device.type}
                                                </p>
                                            </center>
                                            <p className={`m-2 badge bg-${device.status === 'active' ? 'success' : 'dark'}`} style={{ marginTop: '10px' }}>
                                                {device.status?.toUpperCase()}
                                            </p>
                                            <button className="btn btn-danger float-end" onClick={() => handleRemoveDevice(device._id)}>Remove</button>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>

                        <div className="text-center">
                            <button className="btn btn-primary" style={{ marginTop: '15px' }} onClick={modifyAssignedDevices}>SAVE CHANGES</button>
                        </div>
                    </div>
                    : <p style={{ fontWeight: 'bold', textAlign: 'center' }}>No Data</p>}
            </div>
        </div>
    )
}
