package com.managefiles.model;

import lombok.*;
import org.springframework.boot.autoconfigure.EnableAutoConfiguration;

import javax.persistence.*;

@Entity
@Table(name = "quizzes")
@NoArgsConstructor
@Getter
@Setter
@ToString
@EnableAutoConfiguration
public class QuizStorage {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    @Column(unique=true)
    private String name;
    private String type;
    private String content;
    @Lob
    private byte[] data;

    /*
     *** Constructor
     */
    public QuizStorage(String name, String type, String content, byte[] data) {
        this.name = name;
        this.type = type;
        this.content = content;
        this.data = data;
    }
}