﻿using Dapper;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Data.SqlClient;

namespace API_front.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class UsersController : ControllerBase
    {
        private readonly string _connectionString = "Server=LAPTOP-TQ7JM6QV\\MSSQLSERVER01;Database=Dbfinal;User Id=sa;Password=12345678;TrustServerCertificate=true";

        [HttpPost("login")]
        public IActionResult Login([FromBody] Users user)
        {
            if (user == null || string.IsNullOrWhiteSpace(user.username) || string.IsNullOrWhiteSpace(user.cedula))
            {
                return BadRequest("Invalid user data.");
            }

            using (var connection = new SqlConnection(_connectionString))
            {
                var sql = "SELECT * FROM estudiantes WHERE username = @Username AND cedula = @Cedula";
                var result = connection.QuerySingleOrDefault<Users>(sql, new { user.username, user.cedula });

                return result != null ? Ok("Login successful.") : Unauthorized("Invalid credentials.");
            }
        }

        [HttpPost("register")]
        public IActionResult Register([FromBody] Users user)
        {
            if (user == null || string.IsNullOrWhiteSpace(user.username) || string.IsNullOrWhiteSpace(user.cedula))
            {
                return BadRequest("Invalid user data.");
            }

            using (var connection = new SqlConnection(_connectionString))
            {
                var sql = "INSERT INTO estudiantes (username, cedula) VALUES (@Username, @Cedula)";
                var rowsAffected = connection.Execute(sql, new { user.username, user.cedula });

                return rowsAffected > 0 ? Ok("User registered successfully.") : StatusCode(500, "An error occurred while registering the user.");
            }
        }

        [HttpDelete("delete/{id}")]
        public IActionResult Delete(int id)
        {
            using (var connection = new SqlConnection(_connectionString))
            {
                var sql = "DELETE FROM estudiantes WHERE id = @Id";
                var rowsAffected = connection.Execute(sql, new { Id = id });

                return rowsAffected > 0 ? Ok("User deleted successfully.") : NotFound("User not found.");
            }
        }

        [HttpPut("update/{id}")]
        public IActionResult Update(int id, [FromBody] Users user)
        {
            if (user == null || string.IsNullOrWhiteSpace(user.username) || string.IsNullOrWhiteSpace(user.cedula))
            {
                return BadRequest("Invalid user data.");
            }

            using (var connection = new SqlConnection(_connectionString))
            {
                var sql = "UPDATE estudiantes SET username = @Username, cedula = @Cedula WHERE id = @Id";
                var rowsAffected = connection.Execute(sql, new { Id = id, user.username, user.cedula });

                return rowsAffected > 0 ? Ok("User updated successfully.") : NotFound("User not found.");
            }
        }

        [HttpGet("getUsers")]
        public IActionResult GetUsers()
        {
            using (var connection = new SqlConnection(_connectionString))
            {
                var sql = "SELECT * FROM estudiantes";
                var users = connection.Query<Users>(sql).ToList();

                return users.Any() ? Ok(users) : NotFound("No users found.");
            }
        }

        [HttpGet("getUserById/{id}")]
        public IActionResult GetUserById(int id)
        {
            using (var connection = new SqlConnection(_connectionString))
            {
                var sql = "SELECT * FROM estudiantes WHERE id = @Id";
                var user = connection.QuerySingleOrDefault<Users>(sql, new { Id = id });

                return user != null ? Ok(user) : NotFound($"User with ID {id} not found.");
            }
        }
    }
}