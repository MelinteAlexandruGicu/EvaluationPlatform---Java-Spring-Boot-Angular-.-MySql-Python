package com.evaluation.service;

import com.evaluation.model.Student;
import com.evaluation.repository.StudentRepository;
import org.springframework.stereotype.Service;

import java.util.stream.Stream;

@Service
public class StudentService {
    private final StudentRepository studentRepository;

    public StudentService(StudentRepository studentRepository) {
        this.studentRepository = studentRepository;
    }

    public void saveStudent(Student student) {
        this.studentRepository.save(student);
    }

    public Stream<Student> getAllStudents() {
        return this.studentRepository.findAll().stream();
    }

    public Stream<Student> getStudentsByEvaluation(String evaluationType) {
        return this.studentRepository.findStudentByEvaluationType(evaluationType).stream();
    }
}
