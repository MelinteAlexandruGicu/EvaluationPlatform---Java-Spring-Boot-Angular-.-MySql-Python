package com.evaluation.controller;

import com.evaluation.model.Student;
import com.evaluation.response.ResponseMessage;
import com.evaluation.service.StudentService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@CrossOrigin(origins = "*", maxAge = 3600)
@RestController
@RequestMapping("/api/evaluation")
public class StudentController {
    private final StudentService studentService;

    public StudentController(StudentService studentService) {
        this.studentService = studentService;
    }

    @PostMapping("/add-student")
    public ResponseEntity<?> addStudent(@RequestBody Student student) {
        studentService.saveStudent(student);
        return ResponseEntity.ok(new ResponseMessage("Student " + student.getFirstname() + " " + student.getLastname()
                + " with grade " + student.getGrade() + " at evaluation " + student.getEvaluationType() + " was added successfully!"));
    }

    @GetMapping("/get-students")
    public ResponseEntity<List<Student>> allStudents() {
        try {
            List<Student> students = studentService.getAllStudents();
            if (students.isEmpty()) {
                return new ResponseEntity<>(HttpStatus.NO_CONTENT);
            }
            return new ResponseEntity<>(students, HttpStatus.OK);
        } catch (Exception e) {
            return new ResponseEntity<>(null, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
    @GetMapping("/student-eval-type/{evaluationType}")
    public ResponseEntity<List<Student>> findByEvaluationType(@PathVariable String evaluationType) {
        try {
            List<Student> students = studentService.getStudentsByEvaluation(evaluationType);
            if (students.isEmpty()) {
                return new ResponseEntity<>(HttpStatus.NO_CONTENT);
            }
            return new ResponseEntity<>(students, HttpStatus.OK);
        } catch (Exception e) {
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }



}
