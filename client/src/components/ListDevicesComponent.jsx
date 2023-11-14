import React, {Component} from 'react';
import DeviceService from "../services/DeviceService";

class ListDevicesComponent extends Component {

    constructor(props) {
        super(props);

        this.state = {
            devices: []
        }
    }

    componentDidMount() {
        DeviceService.getDevices().then((res) => {
            this.setState({ devices: res.data });
        });
    }

    render() {
        return (
            <div>
                <h2 className="text-center">Devices List</h2>
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
                                    </tr>
                                )
                            }
                        </tbody>
                    </table>
                </div>
            </div>
        );
    }
}

export default ListDevicesComponent;