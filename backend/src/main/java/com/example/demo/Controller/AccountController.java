package com.example.demo.Controller;

import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.sql.Statement;
import java.util.ArrayList;
import java.util.LinkedHashMap;
import java.util.List;
import java.util.Map;

import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;

@Controller
@RequestMapping("/db/{dbName}/portfolio/{portfolioId}/account/{accountId}")
public class AccountController {

    private final String pgUser = "postgres";
    private final String pgPassword = "0884999440";

    // Преглед на акаунта с локации и полиси
    @GetMapping("/view")
    public String viewAccount(@PathVariable String dbName,
                              @PathVariable int portfolioId,
                              @PathVariable int accountId,
                              Model model) {
        String dbUrl = "jdbc:postgresql://localhost:5432/" + dbName;

        List<Map<String,Object>> locations = new ArrayList<>();
        List<Map<String,Object>> policies = new ArrayList<>();

        try (Connection conn = DriverManager.getConnection(dbUrl, pgUser, pgPassword);
             Statement stmt = conn.createStatement()) {

            // Локации
            try (ResultSet rs = stmt.executeQuery("SELECT * FROM locations WHERE account_id=" + accountId)) {
                while (rs.next()) {
                    Map<String,Object> loc = new LinkedHashMap<>();
                    loc.put("id", rs.getInt("id"));
                    loc.put("location", rs.getString("location"));
                    locations.add(loc);
                }
            }

            // Полиси
            try (ResultSet rs = stmt.executeQuery("SELECT * FROM policy WHERE account_id=" + accountId)) {
                while (rs.next()) {
                    Map<String,Object> pol = new LinkedHashMap<>();
                    pol.put("id", rs.getInt("id"));
                    pol.put("percent", rs.getDouble("percent"));
                    pol.put("cost", rs.getDouble("cost"));
                    policies.add(pol);
                }
            }

        } catch (SQLException e) {
            throw new RuntimeException(e);
        }

        model.addAttribute("dbName", dbName);
        model.addAttribute("portfolioId", portfolioId);
        model.addAttribute("accountId", accountId);
        model.addAttribute("locations", locations);
        model.addAttribute("policies", policies);

        return "account-view"; // Thymeleaf template
    }

    // Добавяне на локация
    @PostMapping("/location/add")
    @ResponseBody
    public ResponseEntity<String> addLocation(@PathVariable String dbName,
                                              @PathVariable int accountId,
                                              @RequestParam String location) {
        String dbUrl = "jdbc:postgresql://localhost:5432/" + dbName;

        try (Connection conn = DriverManager.getConnection(dbUrl, pgUser, pgPassword);
             Statement stmt = conn.createStatement()) {

            stmt.executeUpdate("INSERT INTO locations (location, account_id) VALUES ('" + location + "', " + accountId + ")");
            return ResponseEntity.ok("✅ Локацията е добавена успешно!");
        } catch (SQLException e) {
            return ResponseEntity.badRequest().body("Грешка: " + e.getMessage());
        }
    }

    // Изтриване на локация
    @PostMapping("/location/delete/{locationId}")
    @ResponseBody
    public ResponseEntity<String> deleteLocation(@PathVariable String dbName,
                                                 @PathVariable int accountId,
                                                 @PathVariable int locationId) {
        String dbUrl = "jdbc:postgresql://localhost:5432/" + dbName;

        try (Connection conn = DriverManager.getConnection(dbUrl, pgUser, pgPassword);
             Statement stmt = conn.createStatement()) {

            stmt.executeUpdate("DELETE FROM locations WHERE id=" + locationId);
            return ResponseEntity.ok("✅ Локацията е изтрита успешно!");
        } catch (SQLException e) {
            return ResponseEntity.badRequest().body("Грешка: " + e.getMessage());
        }
    }

    // Добавяне на полис
    @PostMapping("/policy/add")
    @ResponseBody
    public ResponseEntity<String> addPolicy(@PathVariable String dbName,
                                            @PathVariable int accountId,
                                            @RequestParam double percent,
                                            @RequestParam double cost) {
        String dbUrl = "jdbc:postgresql://localhost:5432/" + dbName;

        try (Connection conn = DriverManager.getConnection(dbUrl, pgUser, pgPassword);
             Statement stmt = conn.createStatement()) {

            stmt.executeUpdate("INSERT INTO policy (percent, cost, account_id) VALUES (" + percent + ", " + cost + ", " + accountId + ")");
            return ResponseEntity.ok("✅ Полисът е добавен успешно!");
        } catch (SQLException e) {
            return ResponseEntity.badRequest().body("Грешка: " + e.getMessage());
        }
    }

    // Изтриване на полис
    @PostMapping("/policy/delete/{policyId}")
    @ResponseBody
    public ResponseEntity<String> deletePolicy(@PathVariable String dbName,
                                               @PathVariable int accountId,
                                               @PathVariable int policyId) {
        String dbUrl = "jdbc:postgresql://localhost:5432/" + dbName;

        try (Connection conn = DriverManager.getConnection(dbUrl, pgUser, pgPassword);
             Statement stmt = conn.createStatement()) {

            stmt.executeUpdate("DELETE FROM policy WHERE id=" + policyId);
            return ResponseEntity.ok("✅ Полисът е изтрит успешно!");
        } catch (SQLException e) {
            return ResponseEntity.badRequest().body("Грешка: " + e.getMessage());
        }
    }
}
