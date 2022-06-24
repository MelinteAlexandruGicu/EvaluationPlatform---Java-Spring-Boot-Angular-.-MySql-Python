package com.managefiles.repository;

import com.managefiles.model.QuizStorage;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface QuizzesStorageRepository extends JpaRepository<QuizStorage, String> {
}
