package com.evaluation.controller;

import com.evaluation.model.Student;
import com.evaluation.response.ResponseMessage;
import com.evaluation.service.StudentService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;

import java.util.List;
import java.util.stream.Collectors;
import java.util.stream.Stream;

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
    public ResponseEntity<?> getAllStudents() {
        Stream<Student> students = studentService.getAllStudents();
        return ResponseEntity.status(HttpStatus.OK).body(students.collect(Collectors.toList()));
    }


}
