package com.example.demo.Controller;

import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.PreparedStatement;
import java.sql.SQLException;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/policy")
public class PolicyController {

    private final String pgUser = "postgres";
    private final String pgPassword = "0884999440";

    @PostMapping("/create")
    public ResponseEntity<String> createPolicy(
            @RequestParam String dbName,
            @RequestParam int accountId,
            @RequestParam double percent,
            @RequestParam double cost) {
        String dbUrl = "jdbc:postgresql://localhost:5432/" + dbName;
        try (Connection conn = DriverManager.getConnection(dbUrl, pgUser, pgPassword);
             PreparedStatement stmt = conn.prepareStatement(
                     "INSERT INTO policy (percent, cost, account_id) VALUES (?, ?, ?)")) {
            stmt.setDouble(1, percent);
            stmt.setDouble(2, cost);
            stmt.setInt(3, accountId);
            stmt.executeUpdate();
            return ResponseEntity.ok("✅ Полица е добавена!");
        } catch (SQLException e) {
            return ResponseEntity.badRequest().body("Грешка: " + e.getMessage());
        }
    }

    @PostMapping("/delete/{dbName}/{id}")
    public ResponseEntity<String> deletePolicy(@PathVariable String dbName, @PathVariable int id) {
        String dbUrl = "jdbc:postgresql://localhost:5432/" + dbName;
        try (Connection conn = DriverManager.getConnection(dbUrl, pgUser, pgPassword);
             PreparedStatement stmt = conn.prepareStatement("DELETE FROM policy WHERE id=?")) {
            stmt.setInt(1, id);
            stmt.executeUpdate();
            return ResponseEntity.ok("❌ Полица е изтрита!");
        } catch (SQLException e) {
            return ResponseEntity.badRequest().body("Грешка: " + e.getMessage());
        }
    }
}
