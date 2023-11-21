package com.iems.devicemanagementmicroservice.service;

import com.iems.devicemanagementmicroservice.model.DeviceModel;
import com.iems.devicemanagementmicroservice.repository.DeviceRepository;
import jakarta.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.web.client.HttpClientErrorException;
import org.springframework.web.client.RestTemplate;

import java.util.List;

@Service
public class DeviceService {

    private final DeviceRepository deviceRepository;

    private final RestTemplate restTemplate;

    @Autowired
    public DeviceService(DeviceRepository deviceRepository, RestTemplate restTemplate) {
        this.deviceRepository = deviceRepository;
        this.restTemplate = restTemplate;
    }

    public List<DeviceModel> getDevices() {
        return deviceRepository.findAll();
    }

    public List<DeviceModel> getDevices(Long userId) {
        return deviceRepository.findDeviceModelsByUserId(userId);
    }

    public void createDevice(DeviceModel deviceModel) {
        String url = "http://localhost:8081/users/" + deviceModel.getUserId();

        // Make an HTTP GET request to check if the user exists
        try {
            // Make an HTTP GET request to check if the user exists
            ResponseEntity<String> response = restTemplate.getForEntity(url, String.class);

            // Check if the response status code is OK (user exists)
            if (response.getStatusCode() == HttpStatus.OK) {
                deviceRepository.save(deviceModel);
            } else {
                throw new IllegalStateException("User with id = " + deviceModel.getUserId() + " does not exist");
            }
        } catch (HttpClientErrorException.NotFound e) {
            throw new IllegalStateException("User with id = " + deviceModel.getUserId() + " does not exist");
        }
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
}
