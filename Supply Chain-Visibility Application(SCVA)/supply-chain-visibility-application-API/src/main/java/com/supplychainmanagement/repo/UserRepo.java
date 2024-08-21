package com.supplychainmanagement.repo;

import com.supplychainmanagement.model.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface UserRepo extends JpaRepository<User, Long> {

    // Additional query methods can be defined here
    User findByUsername(String username);
    User findByEmail(String email);
}
