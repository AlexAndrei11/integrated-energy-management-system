import axios from "axios";

const DEVICES_API_BASE_URL = "http://localhost:8082/devices";

class DeviceService {

    getDevices() {
        return axios.get(DEVICES_API_BASE_URL);
    }
}

export default new DeviceService()