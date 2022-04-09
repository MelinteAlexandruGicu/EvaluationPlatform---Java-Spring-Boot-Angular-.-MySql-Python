package com.managefiles.repository;

import com.managefiles.model.AppStorage;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface AppsStorageRepository extends JpaRepository<AppStorage, String> {
}
