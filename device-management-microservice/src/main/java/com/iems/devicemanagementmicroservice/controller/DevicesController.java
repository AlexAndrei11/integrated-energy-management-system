package com.iems.devicemanagementmicroservice.controller;

import com.iems.devicemanagementmicroservice.model.DeviceModel;
import com.iems.devicemanagementmicroservice.service.DeviceService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@CrossOrigin(origins = "http://localhost:3000")
@RestController
@RequestMapping(path = "/devices")
public class DevicesController {

    private final DeviceService deviceService;

    @Autowired
    public DevicesController(DeviceService deviceService) {
        this.deviceService = deviceService;
    }

    @GetMapping
    public List<DeviceModel> getDevices(@RequestParam(required = false) Long userId) {
        if (userId != null) {
            return deviceService.getDevices(userId);
        } else {
            return deviceService.getDevices();
        }
    }

    @PostMapping
    public void createDevice(@RequestBody DeviceModel deviceModel) {
        deviceService.createDevice(deviceModel);
    }

    @DeleteMapping(path = "/{deviceId}")
    public void deleteDevice(@PathVariable("deviceId") Long deviceId) {
        deviceService.deleteDevice(deviceId);
    }

    @DeleteMapping
    public void deleteDevicesForUser(@RequestParam(required = true) Long userId) {
        deviceService.deleteDevicesForUser(userId);
    }

    @PutMapping
    public void updateDevice(@RequestBody DeviceModel deviceModel) {
        deviceService.createDevice(deviceModel);
    }
}
