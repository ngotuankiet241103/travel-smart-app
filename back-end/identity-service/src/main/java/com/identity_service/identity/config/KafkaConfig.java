package com.identity_service.identity.config;

import org.apache.kafka.clients.admin.NewTopic;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.kafka.config.TopicBuilder;

@Configuration
public class ConfigTopic {
    @Bean
    public NewTopic orders() {

        return TopicBuilder.name("users")
                .partitions(3)
                .build();
    }

    @Bean
    public NewTopic paymentTopic() {
        return TopicBuilder.name("profile-users")
                .partitions(3)
                .build();
    }

    @Bean
    public NewTopic stockTopic() {
        return TopicBuilder.name("email-users")
                .partitions(3)
                .build();
    }
}