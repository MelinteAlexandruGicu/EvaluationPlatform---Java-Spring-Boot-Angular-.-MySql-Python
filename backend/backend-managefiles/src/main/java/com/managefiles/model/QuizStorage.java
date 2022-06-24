package com.managefiles.model;

import lombok.*;
import org.hibernate.Hibernate;
import org.hibernate.annotations.GenericGenerator;
import org.springframework.boot.autoconfigure.EnableAutoConfiguration;

import javax.persistence.*;
import java.util.Objects;

@Entity
@Table(name = "quizzes")
@NoArgsConstructor
@Getter
@Setter
@ToString
@EnableAutoConfiguration
public class QuizStorage {
    @Id
    @GeneratedValue(generator = "uuid")
    @GenericGenerator(name = "uuid", strategy = "uuid2")
    private String id;
    private String name;
    private String type;

    @Lob
    private byte[] data;

    public QuizStorage(String name, String type, byte[] data) {
        this.name = name;
        this.type = type;
        this.data = data;
    }
}