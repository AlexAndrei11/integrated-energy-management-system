package com.iems.devicemanagementmicroservice.repository;

import com.iems.devicemanagementmicroservice.model.DeviceModel;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface DeviceRepository extends JpaRepository<DeviceModel, Long> {

    List<DeviceModel> findDeviceModelsByUserId(Long userId);

    void deleteDeviceModelsByUserId(Long userId);
}
