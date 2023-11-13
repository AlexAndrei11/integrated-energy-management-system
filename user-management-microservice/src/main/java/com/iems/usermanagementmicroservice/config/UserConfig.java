package com.iems.usermanagementmicroservice.config;

import com.iems.usermanagementmicroservice.model.UserModel;
import com.iems.usermanagementmicroservice.repository.UserRepository;
import org.springframework.boot.CommandLineRunner;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

import java.time.LocalDate;
import java.time.Month;
import java.util.List;

@Configuration
public class UserConfig {

    @Bean
    CommandLineRunner commandLineRunner(UserRepository userRepository) {
        return args -> {
            UserModel user01 = new UserModel("Alex", "Mintas", "alex.mintas@yahoo.com", "password", LocalDate.of(2002, Month.JUNE, 20));
            UserModel user02 = new UserModel("Oana", "Morar", "oana.morar@yahoo.com", "password", LocalDate.of(2001, Month.MARCH, 26));
            UserModel user03 = new UserModel("Mihai", "Mic", "mihai.mic@yahoo.com", "password", LocalDate.of(1998, Month.FEBRUARY, 18));

            userRepository.saveAll(List.of(user01, user02, user03));
        };
    }
}
