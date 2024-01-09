package com.iems.usermanagementmicroservice.config;

import com.iems.usermanagementmicroservice.model.Role;
import com.iems.usermanagementmicroservice.model.UserModel;
import com.iems.usermanagementmicroservice.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.boot.CommandLineRunner;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.crypto.password.PasswordEncoder;

import java.time.LocalDate;
import java.time.Month;
import java.util.List;

@Configuration
@RequiredArgsConstructor
public class UserConfig {

    private final PasswordEncoder passwordEncoder;
    @Bean
    CommandLineRunner commandLineRunner(UserRepository userRepository) {
        return args -> {
            UserModel user01 = new UserModel("Alex", "Mintas", "alex.mintas@yahoo.com", passwordEncoder.encode("password"), LocalDate.of(2002, Month.JUNE, 20), Role.USER);
            UserModel user02 = new UserModel("Oana", "Morar", "oana.morar@yahoo.com", passwordEncoder.encode("password"), LocalDate.of(2001, Month.MARCH, 26), Role.USER);
            UserModel user03 = new UserModel("Mihai", "Mic", "mihai.mic@yahoo.com", passwordEncoder.encode("password"), LocalDate.of(1998, Month.FEBRUARY, 18), Role.USER);
            UserModel admin01 = new UserModel("Alex", "Mintas", "admin@yahoo.com", passwordEncoder.encode("admin"), LocalDate.of(1900, Month.JANUARY, 1), Role.ADMIN);

            userRepository.saveAll(List.of(user01, user02, user03, admin01));
        };
    }
}
