package com.evaluation.service;

import com.evaluation.model.Student;
import com.evaluation.repository.StudentRepository;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class StudentService {
    private final StudentRepository studentRepository;

    /*
     *** Constructor
     */
    public StudentService(StudentRepository studentRepository) {
        this.studentRepository = studentRepository;
    }

    /*
     *** Method which saves a student
     * @Paramater - Student
     */
    public void saveStudent(Student student) {
        this.studentRepository.save(student);
    }

    /*
     *** Method which retrieves all students
     */
    public List<Student> getAllStudents() {
        return this.studentRepository.findAll();
    }

    /*
     *** Method which retrieves a student by evaluation type
     * @Parameter - String
     */
    public List<Student> getStudentsByEvaluation(String evaluationType) {
        return this.studentRepository.findStudentByEvaluationType(evaluationType);
    }

    /*
     *** Method which retrieves a student by email
     * @Parameter - String
     */
    public List<Student> getStudentsByEmail(String email) {
        return this.studentRepository.findStudentByEmail(email);
    }

    /*
     *** Method which retrieves a student by evaluation type and email
     * @Parameter - String
     * @Parameter - String
     */
    public Student getStudentByEmailAndEvaluationType(String email, String evaluationType) {
        return this.studentRepository.findStudentByEmailAndEvaluationType(email, evaluationType);
    }
}
