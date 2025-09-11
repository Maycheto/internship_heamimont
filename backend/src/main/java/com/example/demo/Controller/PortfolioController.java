package com.example.demo.Controller;

import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.ResultSet;
import java.sql.ResultSetMetaData;
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
@RequestMapping("/db/{dbName}/portfolio")
public class PortfolioController {

    private final String pgUser = "postgres";
    private final String pgPassword = "0884999440";

    // List portfolios
    @GetMapping
    public String listPortfolios(@PathVariable String dbName, Model model) {
        String dbUrl = "jdbc:postgresql://localhost:5432/" + dbName;
        List<Map<String, Object>> portfolios = new ArrayList<>();

        try (Connection conn = DriverManager.getConnection(dbUrl, pgUser, pgPassword);
            Statement stmt = conn.createStatement();
            ResultSet rs = stmt.executeQuery("SELECT * FROM portfolio ORDER BY id")) {

            ResultSetMetaData meta = rs.getMetaData();
            int colCount = meta.getColumnCount();

            while (rs.next()) {
                Map<String, Object> row = new LinkedHashMap<>();
                for (int i = 1; i <= colCount; i++) {
                    row.put(meta.getColumnName(i), rs.getObject(i));
                }
                portfolios.add(row);
            }
        } catch (SQLException e) {
            throw new RuntimeException(e);
        }

        model.addAttribute("dbName", dbName);
        model.addAttribute("portfolios", portfolios);
        return "db-view"; 
    }

    @GetMapping("/view/{portfolioId}")
    public String viewPortfolioDetails(@PathVariable String dbName,
                                      @PathVariable int portfolioId,
                                      Model model) {
        String dbUrl = "jdbc:postgresql://localhost:5432/" + dbName;
        List<Map<String, Object>> accounts = new ArrayList<>();

        try (Connection conn = DriverManager.getConnection(dbUrl, pgUser, pgPassword);
            Statement stmt = conn.createStatement();
            ResultSet rs = stmt.executeQuery("SELECT * FROM accounts WHERE portfolio_id=" + portfolioId)) {

            ResultSetMetaData meta = rs.getMetaData();
            int colCount = meta.getColumnCount();

            while (rs.next()) {
                Map<String, Object> row = new LinkedHashMap<>();
                for (int i = 1; i <= colCount; i++) {
                    row.put(meta.getColumnName(i), rs.getObject(i));
                }
                accounts.add(row);
            }
        } catch (SQLException e) {
            throw new RuntimeException(e);
        }

        model.addAttribute("dbName", dbName);
        model.addAttribute("portfolioId", portfolioId);
        model.addAttribute("accounts", accounts);
        return "portfolio-view"; 
    }



    // Add new portfolio
    @PostMapping("/add")
    @ResponseBody
    public ResponseEntity<String> addPortfolio(@PathVariable String dbName,
                                               @RequestParam String portfolioName) {
        String dbUrl = "jdbc:postgresql://localhost:5432/" + dbName;
        try (Connection conn = DriverManager.getConnection(dbUrl, pgUser, pgPassword);
             Statement stmt = conn.createStatement()) {

            try (ResultSet rs = stmt.executeQuery("SELECT COUNT(*) FROM portfolio WHERE portfolio_name='" + portfolioName + "'")) {
                rs.next();
                if (rs.getInt(1) > 0) {
                    return ResponseEntity.badRequest().body("❌ Портфолио с това име вече съществува!");
                }
            }

            stmt.executeUpdate("INSERT INTO portfolio (portfolio_name) VALUES ('" + portfolioName + "')");
            return ResponseEntity.ok("✅ Портфолиото е добавено успешно!");
        } catch (SQLException e) {
            return ResponseEntity.badRequest().body("Грешка: " + e.getMessage());
        }
    }

    // Delete portfolio
    @PostMapping("/delete/{portfolioId}")
    @ResponseBody
    public ResponseEntity<String> deletePortfolio(@PathVariable String dbName,
                                                  @PathVariable int portfolioId) {
        String dbUrl = "jdbc:postgresql://localhost:5432/" + dbName;
        try (Connection conn = DriverManager.getConnection(dbUrl, pgUser, pgPassword);
             Statement stmt = conn.createStatement()) {

            stmt.executeUpdate("DELETE FROM portfolio WHERE id=" + portfolioId);
            return ResponseEntity.ok("✅ Портфолиото е изтрито успешно!");
        } catch (SQLException e) {
            return ResponseEntity.badRequest().body("Грешка: " + e.getMessage());
        }
    }
}
