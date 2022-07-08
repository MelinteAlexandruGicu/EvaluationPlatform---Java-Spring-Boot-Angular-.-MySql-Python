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

    /*
    *** Constructor
     */

    public FileStorageService(AppsStorageRepository appsStorageRepository, CoursesStorageRepository coursesStorageRepository, QuizzesStorageRepository quizzesStorageRepository) {
        this.appsStorageRepository = appsStorageRepository;
        this.coursesStorageRepository = coursesStorageRepository;
        this.quizzesStorageRepository = quizzesStorageRepository;
    }

    /*
     *** Method which store an app
     * @Parameter - MultipartFile
     */
    public void storeApp(MultipartFile file) throws IOException {
        String fileName = StringUtils.cleanPath(Objects.requireNonNull(file.getOriginalFilename()));
        AppStorage FileDB = new AppStorage(fileName, file.getContentType(), file.getBytes());
        appsStorageRepository.save(FileDB);
    }

    /*
     *** Method which store a course
     * @Parameter - MultipartFile
     */
    public void storeCourses(MultipartFile file) throws IOException {
        String fileName = StringUtils.cleanPath(Objects.requireNonNull(file.getOriginalFilename()));
        CoursesStorage FileDB = new CoursesStorage(fileName, file.getContentType(), file.getBytes());
        coursesStorageRepository.save(FileDB);
    }

    /*
     *** Method which store a quiz
     * @Parameter - MultipartFile
     * @Parameter - String
     */
    public void storeQuizzes(MultipartFile file, String content) throws IOException {
        String fileName = StringUtils.cleanPath(Objects.requireNonNull(file.getOriginalFilename()));
        QuizStorage FileDB = new QuizStorage(fileName, file.getContentType(), content, file.getBytes());
        quizzesStorageRepository.save(FileDB);
    }

    /*
     *** Method which retrieves an app
     * @Parameter - String
     */
    public AppStorage getApp(String id) {
        return appsStorageRepository.findById(id).orElse(null);
    }

    /*
     *** Method which retrieves a course
     * @Parameter - String
     */
    public CoursesStorage getCourse(String id) {
        return coursesStorageRepository.findById(id).orElse(null);
    }

    /*
     *** Method which delete an app
     * @Parameter - String
     */
    public void deleteApp(String id) {
        appsStorageRepository.deleteById(id);
    }

    /*
     *** Method which delete a course
     * @Parameter - String
     */
    public void deleteCourse(String id) {
        coursesStorageRepository.deleteById(id);
    }

    /*
     *** Method which delete a quiz
     * @Parameter - String
     */
    public void deleteQuiz(Long id) {
        quizzesStorageRepository.deleteById(id);
    }

    /*
     *** Method which retrieves all apss
     */
    public Stream<AppStorage> getAllApps() {
        return appsStorageRepository.findAll().stream();
    }

    /*
     *** Method which retrieves all courses
     */
    public Stream<CoursesStorage> getAllCourses() {
        return coursesStorageRepository.findAll().stream();
    }

    /*
     *** Method which retrieves all quizzes
     */
    public Stream<QuizStorage> getAllQuizzes() {
        return quizzesStorageRepository.findAll().stream();
    }
}
