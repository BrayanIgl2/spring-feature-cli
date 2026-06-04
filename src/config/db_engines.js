export const db_engines = {
    mysql: {
        driver: "com.mysql.cj.jdbc.Driver",
        dialect: "MySQL8Dialect",
        jdbcUrl: "jdbc:mysql://localhost:3306/"
    },
    postgresql: {
        driver: "org.postgresql.Driver",
        dialect: "PostgreSQLDialect",
        jdbcUrl: "jdbc:postgresql://localhost:5432/"
    },
    h2: {
        driver: "org.h2.Driver",
        dialect: "H2Dialect",
        jdbcUrl: "jdbc:h2:mem:"
    }
}