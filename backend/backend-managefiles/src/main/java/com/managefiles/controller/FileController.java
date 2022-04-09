package com.managefiles.controller;

import com.managefiles.message.ResponseFile;
import com.managefiles.message.ResponseMessage;
import com.managefiles.model.AppStorage;
import com.managefiles.model.CoursesStorage;
import com.managefiles.service.FileStorageService;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;

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

    @PostMapping("/upload-app")
    public ResponseEntity<ResponseMessage> uploadApp(@RequestParam("file") MultipartFile file) {
        String message;
        try {
            fileStorageService.storeApp(file);
            message = "Your application (" + file.getOriginalFilename() + " has been uploaded)!";
            return ResponseEntity.status(HttpStatus.OK).body(new ResponseMessage(message));
        } catch (Exception e) {
            message = "Error -- application (" + file.getOriginalFilename() + ") has not been uploaded!";
            return ResponseEntity.status(HttpStatus.EXPECTATION_FAILED).body(new ResponseMessage(message));
        }
    }

    @PostMapping("/upload-course")
    public ResponseEntity<ResponseMessage> uploadCourse(@RequestParam("file") MultipartFile file) {
        String message;
        try {
            fileStorageService.storeCourses(file);
            message = "Your course (" + file.getOriginalFilename() + ") has been uploaded!";
            return ResponseEntity.status(HttpStatus.OK).body(new ResponseMessage(message));
        } catch (Exception e) {
            message = "Error -- course (" + file.getOriginalFilename() + ") has not been uploaded!";
            return ResponseEntity.status(HttpStatus.EXPECTATION_FAILED).body(new ResponseMessage(message));
        }
    }

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

    @GetMapping("/files-app/{id}")
    public ResponseEntity<byte[]> getApp(@PathVariable String id) {
        AppStorage appStorage = fileStorageService.getApp(id);
        return ResponseEntity.ok()
                .header(HttpHeaders.CONTENT_DISPOSITION, "attachment; filename=\"" + appStorage.getName() + "\"")
                .body(appStorage.getData());
    }

    @GetMapping("/files-course/{id}")
    public ResponseEntity<byte[]> getCourse(@PathVariable String id) {
        CoursesStorage coursesStorage = fileStorageService.getCourse(id);
        return ResponseEntity.ok()
                .header(HttpHeaders.CONTENT_DISPOSITION, "attachment; filename=\"" + coursesStorage.getName() + "\"")
                .body(coursesStorage.getData());
    }

    @DeleteMapping(value = "/files-app/{id}")
    public ResponseEntity<?> deleteApp(@PathVariable String id) {
        fileStorageService.deleteApp(id);
        return ResponseEntity.noContent().build();
    }

    @DeleteMapping(value = "/files-course/{id}")
    public ResponseEntity<?> deleteCourse(@PathVariable String id) {
        fileStorageService.deleteCourse(id);
        return ResponseEntity.noContent().build();
    }

}
