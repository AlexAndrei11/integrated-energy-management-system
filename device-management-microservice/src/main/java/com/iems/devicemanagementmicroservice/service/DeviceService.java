package com.iems.devicemanagementmicroservice.service;

import com.iems.devicemanagementmicroservice.model.DeviceModel;
import com.iems.devicemanagementmicroservice.repository.DeviceRepository;
import jakarta.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class DeviceService {

    private final DeviceRepository deviceRepository;

    @Autowired
    public DeviceService(DeviceRepository deviceRepository) {
        this.deviceRepository = deviceRepository;
    }

    public List<DeviceModel> getDevices() {
        return deviceRepository.findAll();
    }

    public List<DeviceModel> getDevices(Long userId) {
        return deviceRepository.findDeviceModelsByUserId(userId);
    }

    public void createDevice(DeviceModel deviceModel) {
        deviceRepository.save(deviceModel);
    }

    public void deleteDevice(Long deviceId) {
        if (!deviceRepository.existsById(deviceId)) {
            throw new IllegalStateException("Device with id = " + deviceId + " does not exist");
        }
        deviceRepository.deleteById(deviceId);
    }

    @Transactional
    public void deleteDevicesForUser(Long userId) {
        deviceRepository.deleteDeviceModelsByUserId(userId);
    }

    public void updateDevice(DeviceModel deviceModel) {
        deviceRepository.save(deviceModel);
    }
}
