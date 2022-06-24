package com.managefiles.service;

import com.managefiles.model.AppStorage;
import com.managefiles.model.CoursesStorage;
import com.managefiles.model.QuizStorage;
import com.managefiles.repository.AppsStorageRepository;
import com.managefiles.repository.CoursesStorageRepository;
import com.managefiles.repository.QuizzesStorageRepository;
import org.springframework.stereotype.Service;
import org.springframework.util.StringUtils;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.Objects;
import java.util.stream.Stream;

@Service
public class FileStorageService {
    private final AppsStorageRepository appsStorageRepository;
    private final CoursesStorageRepository coursesStorageRepository;
    private final QuizzesStorageRepository quizzesStorageRepository;

    public FileStorageService(AppsStorageRepository appsStorageRepository, CoursesStorageRepository coursesStorageRepository, QuizzesStorageRepository quizzesStorageRepository) {
        this.appsStorageRepository = appsStorageRepository;
        this.coursesStorageRepository = coursesStorageRepository;
        this.quizzesStorageRepository = quizzesStorageRepository;
    }

    public void storeApp(MultipartFile file) throws IOException {
        String fileName = StringUtils.cleanPath(Objects.requireNonNull(file.getOriginalFilename()));
        AppStorage FileDB = new AppStorage(fileName, file.getContentType(), file.getBytes());
        appsStorageRepository.save(FileDB);
    }

    public void storeCourses(MultipartFile file) throws IOException {
        String fileName = StringUtils.cleanPath(Objects.requireNonNull(file.getOriginalFilename()));
        CoursesStorage FileDB = new CoursesStorage(fileName, file.getContentType(), file.getBytes());
        coursesStorageRepository.save(FileDB);
    }

    public void storeQuizzes(MultipartFile file) throws IOException {
        String fileName = StringUtils.cleanPath(Objects.requireNonNull(file.getOriginalFilename()));
        QuizStorage FileDB = new QuizStorage(fileName, file.getContentType(), file.getBytes());
        quizzesStorageRepository.save(FileDB);
    }

    public AppStorage getApp(String id) {
        return appsStorageRepository.findById(id).orElse(null);
    }

    public CoursesStorage getCourse(String id) {
        return coursesStorageRepository.findById(id).orElse(null);
    }

    public void deleteApp(String id) {
        appsStorageRepository.deleteById(id);
    }

    public void deleteCourse(String id) {
        coursesStorageRepository.deleteById(id);
    }

    public Stream<AppStorage> getAllApps() {
        return appsStorageRepository.findAll().stream();
    }

    public Stream<CoursesStorage> getAllCourses() {
        return coursesStorageRepository.findAll().stream();
    }

    public Stream<QuizStorage> getAllQuizzes() {
        return quizzesStorageRepository.findAll().stream();
    }
}
