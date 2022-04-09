package com.managefiles.repository;

import com.managefiles.model.CoursesStorage;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface CoursesStorageRepository extends JpaRepository<CoursesStorage, String> {
}
