/*import java.sql.DriverManager;
import java.sql.SQLException;

public class Main {
    public static void main(String[] args) {
        String url = "jdbc:sqlite:my.db";

        try {
            // Load the SQLite JDBC driver
            Class.forName("org.sqlite.JDBC");

            try (var conn = DriverManager.getConnection(url)) {
                if (conn != null) {
                    var meta = conn.getMetaData();
                    System.out.println("The driver name is " + meta.getDriverName());
                    System.out.println("A new database has been created.");
                }
            }
        } catch (SQLException | ClassNotFoundException e) {
            System.err.println(e.getMessage());
        }
    }
}
*/
import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.SQLException;
import java.sql.Statement;

public class Main {
    public static void main(String[] args) {
        String url = "jdbc:sqlite:C:/Users/Maya/Desktop/heamimont/internship_heamimont/backend/my.db";


        try {
            // Load the driver
            Class.forName("org.sqlite.JDBC");

            try (Connection conn = DriverManager.getConnection(url)) {
                if (conn != null) {
                    var meta = conn.getMetaData();
                    System.out.println("The driver name is " + meta.getDriverName());

                    // Create a table
                    String sqlCreate = """
                        CREATE TABLE IF NOT EXISTS users (
                            id INTEGER PRIMARY KEY AUTOINCREMENT,
                            name TEXT NOT NULL,
                            email TEXT UNIQUE NOT NULL
                        );
                        """;

                    try (Statement stmt = conn.createStatement()) {
                        stmt.execute(sqlCreate);
                        System.out.println("Table 'users' is ready.");
                    }

                    // Insert data
                    String sqlInsert = """
                        INSERT INTO users(name, email)
                        VALUES('Alice', 'alice@example.com'),
                              ('Bob', 'bob@example.com');
                        """;
                    try (Statement stmt = conn.createStatement()) {
                        stmt.executeUpdate(sqlInsert);
                        System.out.println("Sample data inserted.");
                    }
                }
            }
        } catch (SQLException | ClassNotFoundException e) {
            System.err.println(e.getMessage());
        }
    }
}
