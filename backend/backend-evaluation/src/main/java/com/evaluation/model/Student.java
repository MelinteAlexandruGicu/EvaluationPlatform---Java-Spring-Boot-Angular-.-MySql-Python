package com.evaluation.model;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;
import org.hibernate.annotations.GenericGenerator;
import org.springframework.boot.autoconfigure.EnableAutoConfiguration;

import javax.persistence.*;

@Entity
@Table(name = "students", uniqueConstraints={@UniqueConstraint(columnNames = {"email", "evaluationType"})})
@NoArgsConstructor
@Getter
@Setter
@ToString
@EnableAutoConfiguration
public class Student {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private Double grade;
    private String firstname;
    private String lastname;
    private String email;
    private String evaluationType;

    /*
     *** Constructor
     */
    public Student(Double grade, String firstname, String lastname, String email, String evaluationType) {
        this.grade = grade;
        this.firstname = firstname;
        this.lastname = lastname;
        this.email = email;
        this.evaluationType = evaluationType;
    }
}
