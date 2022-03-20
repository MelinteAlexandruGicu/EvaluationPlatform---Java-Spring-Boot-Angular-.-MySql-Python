package com.managefiles.service;

import com.managefiles.model.FileStorage;
import com.managefiles.repository.FileStorageRepository;
import org.springframework.stereotype.Service;
import org.springframework.util.StringUtils;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.Objects;
import java.util.stream.Stream;

@Service
public class FileStorageService {
    private final FileStorageRepository fileStorageRepository;

    public FileStorageService(FileStorageRepository fileStorageRepository) {
        this.fileStorageRepository = fileStorageRepository;
    }

    public FileStorage store(MultipartFile file) throws IOException {
        String fileName = StringUtils.cleanPath(Objects.requireNonNull(file.getOriginalFilename()));
        FileStorage FileDB = new FileStorage(fileName, file.getContentType(), file.getBytes());
        return fileStorageRepository.save(FileDB);
    }
    public FileStorage getFile(String id) {
        return fileStorageRepository.findById(id).orElse(null);
    }

    public Stream<FileStorage> getAllFiles() {
        return fileStorageRepository.findAll().stream();
    }
}
