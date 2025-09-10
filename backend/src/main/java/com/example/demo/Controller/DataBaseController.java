package com.example.demo.Controller;

import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.SQLException;
import java.sql.Statement;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;

import com.example.demo.Model.DataBaseEntry;
import com.example.demo.Model.DataBaseRepository;
import com.example.demo.Model.MyAppUser;
import com.example.demo.Model.MyAppUserRepository;

@Controller
public class DataBaseController {

    @Autowired
    private DataBaseRepository dataBaseRepository;

    @Autowired
    private MyAppUserRepository userRepository;

    private final String pgUrl = "jdbc:postgresql://localhost:5432/postgres";
    private final String pgUser = "postgres";
    private final String pgPassword = "0884999440";

    @GetMapping("/")
    public String home(Authentication authentication, Model model) {
        MyAppUser user = userRepository.findByUsername(authentication.getName())
                .orElseThrow(() -> new RuntimeException("User not found"));

        List<DataBaseEntry> databases = dataBaseRepository.findByUserId(user.getId());
        model.addAttribute("databases", databases);

        return "index";
    }

    // Create dynamic data base
    @PostMapping("/db/create")
    @ResponseBody
    public ResponseEntity<String> createDatabase(@RequestParam String dbName, Authentication authentication) {
        try {
            MyAppUser user = userRepository.findByUsername(authentication.getName())
                    .orElseThrow(() -> new RuntimeException("User not found"));

            if (dataBaseRepository.findByDbName(dbName).isPresent()) {
                return ResponseEntity.badRequest().body("Базата вече съществува!");
            }

            // Creating the database itself
            try (Connection conn = DriverManager.getConnection(pgUrl, pgUser, pgPassword);
                 Statement stmt = conn.createStatement()) {
                stmt.executeUpdate("CREATE DATABASE \"" + dbName + "\"");
            }

            // Creating the tables in the new database
            String newDbUrl = "jdbc:postgresql://localhost:5432/" + dbName;
            try (Connection conn = DriverManager.getConnection(newDbUrl, pgUser, pgPassword);
                 Statement stmt = conn.createStatement()) {

                stmt.executeUpdate("""
                    CREATE TABLE portfolio (
                        id SERIAL PRIMARY KEY,
                        portfolio_name VARCHAR(50) NOT NULL,
                        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
                    )
                """);

                stmt.executeUpdate("""
                    CREATE TABLE accounts (
                        id SERIAL PRIMARY KEY,
                        acc_name VARCHAR(50) NOT NULL,
                        portfolio_id INT NOT NULL REFERENCES portfolio(id) ON DELETE CASCADE,
                        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
                    )
                """);

                stmt.executeUpdate("""
                    CREATE TABLE policy (
                        id SERIAL PRIMARY KEY,
                        percent DECIMAL(5,2) NOT NULL,
                        cost DECIMAL(10,2) NOT NULL,
                        account_id INT NOT NULL REFERENCES accounts(id) ON DELETE CASCADE,
                        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
                    )
                """);

                stmt.executeUpdate("""
                    CREATE TABLE locations (
                        id SERIAL PRIMARY KEY,
                        location VARCHAR(100) NOT NULL,
                        account_id INT NOT NULL REFERENCES accounts(id) ON DELETE CASCADE,
                        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
                    )
                """);
            }

            // Saving the database entry
            DataBaseEntry entry = new DataBaseEntry();
            entry.setDbName(dbName);
            entry.setUserId(user.getId());
            dataBaseRepository.save(entry);

            return ResponseEntity.ok("✅ Базата " + dbName + " е създадена успешно!");
        } catch (SQLException e) {
            return ResponseEntity.internalServerError().body("Грешка: " + e.getMessage());
        }
    }

    // Delete dynamic data base
    @PostMapping("/db/delete/{dbName}")
    @ResponseBody
    public ResponseEntity<String> deleteDatabase(@PathVariable String dbName, Authentication authentication) {
        try {
            MyAppUser user = userRepository.findByUsername(authentication.getName())
                    .orElseThrow(() -> new RuntimeException("User not found"));

            DataBaseEntry entry = dataBaseRepository.findByDbName(dbName)
                    .orElseThrow(() -> new RuntimeException("Database not found"));

            if (!entry.getUserId().equals(user.getId())) {
                return ResponseEntity.status(403).body("Нямате достъп!");
            }

            try (Connection conn = DriverManager.getConnection(pgUrl, pgUser, pgPassword);
                 Statement stmt = conn.createStatement()) {
                stmt.executeUpdate("DROP DATABASE IF EXISTS \"" + dbName + "\"");
            }

            dataBaseRepository.delete(entry);

            return ResponseEntity.ok("Базата " + dbName + " е изтрита!");
        } catch (SQLException e) {
            return ResponseEntity.internalServerError().body("Грешка: " + e.getMessage());
        }
    }
}
