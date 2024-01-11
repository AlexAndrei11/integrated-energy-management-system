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
            DeviceModel device04 = new DeviceModel("Curent", "Zorilor", 18.9F, 3L);
            DeviceModel device05 = new DeviceModel("Telefon", "Manastur", 87F, 3L);
            DeviceModel device06 = new DeviceModel("Masina", "Cluj-Napoca", 55.5F, 2L);

            deviceRepository.saveAll(List.of(device01, device02, device03, device04, device05, device06));
        };
    }
}
