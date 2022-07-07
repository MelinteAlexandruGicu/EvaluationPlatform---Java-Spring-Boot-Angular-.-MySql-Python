package com.evaluation.service;

import com.evaluation.model.Student;
import com.evaluation.repository.StudentRepository;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class StudentService {
    private final StudentRepository studentRepository;

    public StudentService(StudentRepository studentRepository) {
        this.studentRepository = studentRepository;
    }

    public void saveStudent(Student student) {
        this.studentRepository.save(student);
    }

    public List<Student> getAllStudents() {
        return this.studentRepository.findAll();
    }

    public List<Student> getStudentsByEvaluation(String evaluationType) {
        return this.studentRepository.findStudentByEvaluationType(evaluationType);
    }

    public List<Student> getStudentsByEmail(String email) {
        return this.studentRepository.findStudentByEmail(email);
    }

    public Student getStudentByEmailAndEvaluationType(String email, String evaluationType) {
        return this.studentRepository.findStudentByEmailAndEvaluationType(email, evaluationType);
    }
}
