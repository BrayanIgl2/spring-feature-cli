export const dbEngines = {
    mysql: {
        driver: "com.mysql.cj.jdbc.Driver",
        jdbcUrl: "jdbc:mysql://localhost:3306/"
    },
    postgresql: {
        driver: "org.postgresql.Driver",
        jdbcUrl: "jdbc:postgresql://localhost:5432/"
    },
    h2: {
        driver: "org.h2.Driver",
        jdbcUrl: "jdbc:h2:mem:"
    }
}