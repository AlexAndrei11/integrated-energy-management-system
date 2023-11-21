import axios from "axios";

const DEVICES_API_BASE_URL = "http://localhost:8082/devices";

class DeviceService {

    getDevices() {
        return axios.get(DEVICES_API_BASE_URL);
    }

    getDevicesByUserId(userId) {
        return axios.get(`${DEVICES_API_BASE_URL}?userId=${userId}`);
    }

    createDevice(device) {
        return axios.post(DEVICES_API_BASE_URL, device);
    }

    updateDevice(device) {
        return axios.put(DEVICES_API_BASE_URL, device);
    }

    deleteDevice(deviceId) {
        return axios.delete(`${DEVICES_API_BASE_URL}/${deviceId}`);
    }
}

export default new DeviceService()