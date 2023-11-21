import React, {Component} from 'react';
import DeviceService from "../services/DeviceService";
import CreateDeviceModal from "../modals/CreateDeviceModal";
import UserService from "../services/UserService";

class ListDevicesComponent extends Component {
    constructor(props) {
        super(props);

        this.state = {
            devices: [],
            showCreateModal: false,
            isEditMode: false,
            currentDevice: null
        }
    }

    componentDidMount() {
        DeviceService.getDevices().then((res) => {
            this.setState({ devices: res.data });
        });
    }

    openCreateModal = () => {
        this.setState({
            isEditMode: false,
            currentDevice: null,
            showCreateModal: true
        });
    }

    closeCreateModal = () => {
        this.setState({
            isEditMode: false,
            currentDevice: null,
            showCreateModal: false
        });
    }

    openEditModal = (device) => {
        this.setState({
            isEditMode: true,
            currentDevice: device,
            showCreateModal: true
        });
    }

    handleCreateModalSubmit = (deviceData) => {
        if (this.state.isEditMode) {
            // If in edit mode, update the device
            DeviceService.updateDevice(deviceData).then(() => {
                this.refreshDeviceList();
            }).catch(error => {
                console.error("There was an error updating the device:", error);
                // Handle errors here, such as displaying a message to the user
            });
        } else {
            // If not in edit mode, create a new device
            DeviceService.createDevice(deviceData).then(() => {
                this.refreshDeviceList();
            }).catch(error => {
                console.error("There was an error creating the device:", error);
                // Handle errors here, such as displaying a message to the user
            });
        }
        this.closeCreateModal();
    }

    handleDeleteDevice = (deviceId) => {
        if (window.confirm("Are you sure you want to delete this device?")) {
            DeviceService.deleteDevice(deviceId).then(response => {
                this.refreshDeviceList();
            }).catch(error => {
                console.error("Error deleting device:", error);
                // Handle errors here
            });
        }
    }

    refreshDeviceList = () => {
        DeviceService.getDevices().then((res) => {
            this.setState({ devices: res.data });
        });
    }

    render() {
        return (
            <div>
                <h2 className="text-center">Devices List</h2>
                <div className="row">
                    <button className="btn btn-primary" onClick={this.openCreateModal}> Add Device </button>
                </div>
                <div className="row">
                    <table className="table table-striped table-bordered">
                        <thead>
                            <tr>
                                <th> Id </th>
                                <th> Description </th>
                                <th> Address </th>
                                <th> Maximum Hourly Energy Consumption </th>
                                <th> User Id </th>
                                <th> Actions </th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                this.state.devices.map(
                                    device =>
                                    <tr key={device.id}>
                                        <td> { device.id } </td>
                                        <td> { device.description } </td>
                                        <td> { device.address } </td>
                                        <td> { device.maximumHourlyEnergyConsumption } </td>
                                        <td> { device.userId } </td>
                                        <td>
                                            <button className="btn btn-info" onClick={() => this.openEditModal(device)}> Edit </button>
                                            <button className="btn btn-danger" onClick={() => this.handleDeleteDevice(device.id)}> Delete </button>
                                        </td>
                                    </tr>
                                )
                            }
                        </tbody>
                    </table>
                </div>
                <CreateDeviceModal
                    show={this.state.showCreateModal}
                    onClose={this.closeCreateModal}
                    onSubmit={this.handleCreateModalSubmit}
                    isEditMode={this.state.isEditMode}
                    currentDevice={this.state.currentDevice}
                />
            </div>
        );
    }
}

export default ListDevicesComponent;