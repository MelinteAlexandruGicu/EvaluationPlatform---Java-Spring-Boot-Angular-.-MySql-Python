package com.managefiles.controller;

import com.managefiles.payload.ResponseFile;
import com.managefiles.payload.ResponseFileQuiz;
import com.managefiles.payload.ResponseMessage;
import com.managefiles.model.AppStorage;
import com.managefiles.model.CoursesStorage;
import com.managefiles.service.FileStorageService;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;

import java.nio.charset.StandardCharsets;
import java.util.Base64;
import java.util.List;
import java.util.stream.Collectors;

@CrossOrigin(origins = "*", maxAge = 3600)
@RestController
@RequestMapping("/api/fileStorage")
public class FileController {
    private final FileStorageService fileStorageService;

    public FileController(FileStorageService fileStorageService) {
        this.fileStorageService = fileStorageService;
    }

    /*
    *** POST method which upload an app
    * @Parameter - file -> RequestParam of MultipartFile type
     */
    @PostMapping("/upload-app")
    public ResponseEntity<ResponseMessage> uploadApp(@RequestParam("file") MultipartFile file) {
        String message;
        try {
            fileStorageService.storeApp(file);
            message = "Your application (" + file.getOriginalFilename() + " has been uploaded)!";
            return ResponseEntity.status(HttpStatus.OK).body(new ResponseMessage(message));
        } catch (Exception e) {
            message = "Error -- application (" + file.getOriginalFilename() + ") has not been saved! The file already exist";
            return ResponseEntity.status(HttpStatus.EXPECTATION_FAILED).body(new ResponseMessage(message));
        }
    }

    /*
     *** POST method which upload a course
     * @Parameter - file -> RequestParam of MultipartFile type
     */
    @PostMapping("/upload-course")
    public ResponseEntity<ResponseMessage> uploadCourse(@RequestParam("file") MultipartFile file) {
        String message;
        try {
            fileStorageService.storeCourses(file);
            message = "Your course (" + file.getOriginalFilename() + ") has been uploaded!";
            return ResponseEntity.status(HttpStatus.OK).body(new ResponseMessage(message));
        } catch (Exception e) {
            message = "Error -- course (" + file.getOriginalFilename() + ") has not been saved! The file already exist";
            return ResponseEntity.status(HttpStatus.EXPECTATION_FAILED).body(new ResponseMessage(message));
        }
    }

    /*
     *** POST method which upload a quiz
     * @Parameter - file -> RequestParam of MultipartFile type
     * @Parameter - content -> String which contains the content of the quiz created on front-end
     */
    @PostMapping("/upload-quiz")
    public ResponseEntity<ResponseMessage> uploadQuiz(@RequestParam("file") MultipartFile file, @RequestParam String content) {
        String message;
        try {
            System.out.println(content );
            String encoded = new String(Base64.getEncoder().encode(content.getBytes(StandardCharsets.UTF_8)));
            System.out.println(encoded);
            fileStorageService.storeQuizzes(file, encoded);

            message = "Your Quiz (" + file.getOriginalFilename() + " has been saved)!";
            return ResponseEntity.status(HttpStatus.OK).body(new ResponseMessage(message));
        } catch (Exception e) {
            message = "Error -- quiz (" + file.getOriginalFilename() + ") has not been saved! The file already exist";
            return ResponseEntity.status(HttpStatus.EXPECTATION_FAILED).body(new ResponseMessage(message));
        }
    }

    /*
     *** GET method which retrieve all apps and help with download
     * Not original
     */
    @GetMapping("/files-app")
    public ResponseEntity<List<ResponseFile>> getListApp() {
        List<ResponseFile> files = fileStorageService.getAllApps().map(appStorage -> {
            String fileDownloadUri = ServletUriComponentsBuilder
                    .fromCurrentContextPath()
                    .path("/api/fileStorage/files-app/")
                    .path(appStorage.getId())
                    .toUriString();
            return new ResponseFile(
                    appStorage.getName(),
                    fileDownloadUri,
                    appStorage.getType(),
                    appStorage.getData().length);
        }).collect(Collectors.toList());
        return ResponseEntity.status(HttpStatus.OK).body(files);
    }

    /*
     *** GET method which retrieves all courses and help with download
     * Not original
     */
    @GetMapping("/files-course")
    public ResponseEntity<List<ResponseFile>> getListCourse() {
        List<ResponseFile> files = fileStorageService.getAllCourses().map(courseStorage -> {
            String fileDownloadUri = ServletUriComponentsBuilder
                    .fromCurrentContextPath()
                    .path("/api/fileStorage/files-course/")
                    .path(courseStorage.getId())
                    .toUriString();
            return new ResponseFile(
                    courseStorage.getName(),
                    fileDownloadUri,
                    courseStorage.getType(),
                    courseStorage.getData().length);
        }).collect(Collectors.toList());
        return ResponseEntity.status(HttpStatus.OK).body(files);
    }

    /*
     *** GET method which retrieves all quizzes and help with download
     * Not original
     */
    @GetMapping("/files-quizzes")
    public ResponseEntity<List<ResponseFileQuiz>> getListQuizzes() {
        List<ResponseFileQuiz> files = fileStorageService.getAllQuizzes().map(quizStorage -> {
            String fileDownloadUri = ServletUriComponentsBuilder
                    .fromCurrentContextPath()
                    .path("/api/fileStorage/files-quizzes/")
                    .path(quizStorage.getId().toString())
                    .toUriString();
            return new ResponseFileQuiz(
                    quizStorage.getId(),
                    quizStorage.getName(),
                    fileDownloadUri,
                    quizStorage.getType(),
                    quizStorage.getContent(),
                    quizStorage.getData().length);
        }).collect(Collectors.toList());
        return ResponseEntity.status(HttpStatus.OK).body(files);
    }

    /*
     *** DELETE method which delete a quiz
     * @Parameter - id -> The id of the quiz
     */
    @DeleteMapping("/files-quizzes/{id}")
    public ResponseEntity<HttpStatus> deleteQuiz(@PathVariable("id") Long id) {
        try {
            fileStorageService.deleteQuiz(id);
            return new ResponseEntity<>(HttpStatus.NO_CONTENT);
        } catch (Exception e) {
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    /*
     *** GET method which retrieves an app
     * @Parameter - id -> The id of the app
     */
    @GetMapping("/files-app/{id}")
    public ResponseEntity<byte[]> getApp(@PathVariable String id) {
        AppStorage appStorage = fileStorageService.getApp(id);
        return ResponseEntity.ok()
                .header(HttpHeaders.CONTENT_DISPOSITION, "attachment; filename=\"" + appStorage.getName() + "\"")
                .body(appStorage.getData());
    }

    /*
     *** GET method which retrieves a course
     * @Parameter - id -> The id of the course
     */
    @GetMapping("/files-course/{id}")
    public ResponseEntity<byte[]> getCourse(@PathVariable String id) {
        CoursesStorage coursesStorage = fileStorageService.getCourse(id);
        return ResponseEntity.ok()
                .header(HttpHeaders.CONTENT_DISPOSITION, "attachment; filename=\"" + coursesStorage.getName() + "\"")
                .body(coursesStorage.getData());
    }

    /*
     *** DELETE method which delete an app
     * @Parameter - id -> The id of the app
     */
    @DeleteMapping(value = "/files-app/{id}")
    public ResponseEntity<?> deleteApp(@PathVariable String id) {
        fileStorageService.deleteApp(id);
        return ResponseEntity.noContent().build();
    }

    /*
     *** GET method which delete a course
     * @Parameter - id -> The id of the course
     */
    @DeleteMapping(value = "/files-course/{id}")
    public ResponseEntity<?> deleteCourse(@PathVariable String id) {
        fileStorageService.deleteCourse(id);
        return ResponseEntity.noContent().build();
    }

}
