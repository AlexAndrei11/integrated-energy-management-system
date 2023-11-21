import React, {Component} from 'react';

class CreateDeviceModal extends Component {
    constructor(props) {
        super(props);
        this.state = this.props.isEditMode && this.props.currentDevice ? {
            ...this.props.currentDevice,
            errors: {}
        } : {
            description: '',
            address: '',
            maximumHourlyEnergyConsumption: '',
            userId: '',
            errors: {}
        };
    }

    validateDescription = (description) => {
        return description.length > 5 ? '' : 'Description must be longer than 5 letters.';
    }

    validateAddress = (address) => {
        return address.length > 5 ? '' : 'Address must be longer than 5 letters.';
    }

    validateMaximumHourlyEnergyConsumption = (consumption) => {
        const num = parseFloat(consumption);
        return num > 0 ? '' : 'Maximum hourly energy consumption must be a positive number.';
    }

    validateUserId = (userId) => {
        const num = parseFloat(userId);
        return !isNaN(num) && Number.isInteger(num) ? '' : 'User ID must be a number.';
    }

    handleInputChange = (event) => {
        const { name, value } = event.target;
        const errors = {...this.state.errors};

        switch (name) {
            case 'description':
                errors.description = this.validateDescription(value);
                break;
            case 'address':
                errors.address = this.validateAddress(value);
                break;
            case 'maximumHourlyEnergyConsumption':
                errors.maximumHourlyEnergyConsumption = this.validateMaximumHourlyEnergyConsumption(value);
                break;
            case 'userId':
                errors.userId = this.validateUserId(value);
                break;
            default:
                break;
        }

        this.setState({ [name]: value, errors });
    }

    handleSubmit = (event) => {
        event.preventDefault();
        const formErrors = this.validateForm();

        if (Object.keys(formErrors).every(key => formErrors[key] === '')) {
            this.props.onSubmit(this.state);
            this.resetForm();
        } else {
            this.setState({ errors: formErrors });
        }
    }

    resetForm = () => {
        this.setState({
            description: '',
            address: '',
            maximumHourlyEnergyConsumption: '',
            userId: '',
            errors: {}
        });
    }

    validateForm = () => {
        const { description, address, maximumHourlyEnergyConsumption, userId } = this.state;
        return {
            description: this.validateDescription(description),
            address: this.validateAddress(address),
            maximumHourlyEnergyConsumption: this.validateMaximumHourlyEnergyConsumption(maximumHourlyEnergyConsumption),
            userId: this.validateUserId(userId)
        };
    }

    componentDidUpdate(prevProps, prevState) {
        if (this.props.isEditMode !== prevProps.isEditMode || this.props.currentDevice !== prevProps.currentDevice) {
            if (this.props.isEditMode && this.props.currentDevice) {
                this.setState({
                    ...this.props.currentDevice,
                    errors: {}
                });
            } else {
                // The additional check ensures that this only happens when transitioning from edit mode to add mode
                if (prevProps.isEditMode && !this.props.isEditMode) {
                    this.resetForm();
                }
            }
        }
    }

    render() {
        if (!this.props.show) {
            return null;
        }

        return (
            <div className="modal-overlay">
                <div className="modal-dialog" role="document">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title">Add Device</h5>
                        </div>
                        <form onSubmit={this.handleSubmit}>
                            <div className="modal-body">
                                <div className="form-group">
                                    <label>Description:</label>
                                    <input type="text" className="form-control" name="description" onChange={this.handleInputChange} value={this.state.description} />
                                    {this.state.errors.description && <div className="error">{this.state.errors.description}</div>}
                                </div>

                                <div className="form-group">
                                    <label>Address:</label>
                                    <input type="text" className="form-control" name="address" onChange={this.handleInputChange} value={this.state.address} />
                                    {this.state.errors.address && <div className="error">{this.state.errors.address}</div>}
                                </div>

                                <div className="form-group">
                                    <label>Maximum Hourly Energy Consumption:</label>
                                    <input type="number" className="form-control" name="maximumHourlyEnergyConsumption" onChange={this.handleInputChange} value={this.state.maximumHourlyEnergyConsumption} />
                                    {this.state.errors.maximumHourlyEnergyConsumption && <div className="error">{this.state.errors.maximumHourlyEnergyConsumption}</div>}
                                </div>

                                <div className="form-group">
                                    <label>User ID:</label>
                                    <input type="number" className="form-control" name="userId" onChange={this.handleInputChange} value={this.state.userId} />
                                    {this.state.errors.userId && <div className="error">{this.state.errors.userId}</div>}
                                </div>
                            </div>

                            <div className="modal-footer">
                                <button type="submit" className="btn btn-success">Save</button>
                                <button type="button" className="btn btn-danger" onClick={this.props.onClose}>Close</button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        );
    }

}

export default CreateDeviceModal;