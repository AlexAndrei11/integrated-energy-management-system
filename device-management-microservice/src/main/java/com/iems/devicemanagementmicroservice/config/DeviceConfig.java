package com.iems.devicemanagementmicroservice.config;

import com.iems.devicemanagementmicroservice.model.DeviceModel;
import com.iems.devicemanagementmicroservice.repository.DeviceRepository;
import org.springframework.boot.CommandLineRunner;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

import java.util.List;

@Configuration
public class DeviceConfig {

    @Bean
    CommandLineRunner commandLineRunner(DeviceRepository deviceRepository) {
        return args -> {
            DeviceModel device01 = new DeviceModel("Gaz", "Frunzisului", 25F, 2L);
            DeviceModel device02 = new DeviceModel("Curent", "Frunzisului", 102F, 2L);
            DeviceModel device03 = new DeviceModel("Apa", "Campului", 6.3F, 1L);

            deviceRepository.saveAll(List.of(device01, device02, device03));
        };
    }
}
