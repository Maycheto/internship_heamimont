package com.example.demo.Model;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

public interface DataBaseRepository extends JpaRepository<DataBaseEntry, Long> {
    Optional<DataBaseEntry> findByDbName(String dbName);

    List<DataBaseEntry> findByUserId(Long userId); 
}
