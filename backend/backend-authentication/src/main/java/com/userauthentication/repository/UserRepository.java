package com.userauthentication.repository;

import com.userauthentication.model.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface UserRepository extends JpaRepository<User, Long> {
    Optional<User> findByUsername(String username);
    Optional<User> findByEmail(String email);
    Optional<User> findByFirstname(String firstname);
    Optional<User> findByLastname(String lastname);
    Boolean existsByUsername(String username);
    Boolean existsByEmail(String email);
}
