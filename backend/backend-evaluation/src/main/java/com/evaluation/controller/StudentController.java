package com.evaluation.controller;

import com.evaluation.model.Student;
import com.evaluation.payload.response.ResponseMessage;
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

    /*
     *** Constructor
     */
    public StudentController(StudentService studentService) {
        this.studentService = studentService;
    }

    /*
     *** POST method which add a student and calculate the grade
     * @Parameter - Student - student
     * @Parameter - Integer - number of correct questions
     * @Parameter - Integer - number of wrong questions
     */
    @PostMapping("/add-student/{correct}/{wrong}")
    public ResponseEntity<?> addStudent(@RequestBody Student student, @PathVariable Integer correct, @PathVariable Integer wrong) {
        Double grade = Double.valueOf(correct * 9 / (correct + wrong) + 1);
        student.setGrade(grade);
        studentService.saveStudent(student);
        return ResponseEntity.ok(new ResponseMessage("Student " + student.getFirstname() + " " + student.getLastname()
                + " with grade " + student.getGrade() + " at evaluation " + student.getEvaluationType() + " was added successfully!"));
    }

    /*
     *** GET method which retrieves all students
     */
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

    /*
     *** GET method which retrieves all students which completed an evaluation
     * @Parameter - String - type of evaluation
     */
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

    /*
     *** GET method which retrieves all students filtered by email
     * @Parameter - String - email
     */
    @GetMapping("/student-email/{email}")
    public ResponseEntity<Double> findByEmail(@PathVariable String email) {
        try {
            List<Student> students = studentService.getStudentsByEmail(email);
            if (students.isEmpty()) {
                return new ResponseEntity<>(HttpStatus.NO_CONTENT);
            }
            double finalGrade = 0;
            if(students.size() == 3) {
                for(Student student : students) {
                    finalGrade += student.getGrade();
                }
                finalGrade = finalGrade / students.size();
            }
            System.out.println("FinalGrade: " + finalGrade);
            return new ResponseEntity<>(finalGrade, HttpStatus.OK);

        } catch (Exception e) {
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    /*
     *** GET method which retrieves all students filtered by email and evaluation type
     * @Paramater - String - email
     * @Parameter - String - type of evaluation
     */
    @GetMapping("/student-email/{email}/{evaluationType}")
    public ResponseEntity<Double> getGrade(@PathVariable String email, @PathVariable String evaluationType) {
        try {
            Student student = studentService.getStudentByEmailAndEvaluationType(email, evaluationType);
            if (student == null) {
                return new ResponseEntity<>(HttpStatus.NO_CONTENT);
            }
            return new ResponseEntity<>(student.getGrade(), HttpStatus.OK);

        } catch (Exception e) {
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
}
