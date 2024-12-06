using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Data.SqlClient;
using Dapper;

namespace colegio.Controllers
{
  [Route("api/[controller]")]
  [ApiController]
  public class ValuesController : ControllerBase
  {
    private readonly string _connectionString = "Server=LuisReyes\\MSSQLSERVER01;Database=dbform;User Id=sa;Password=12345678;TrustServerCertificate=true";

    [HttpPost("register")]
    public IActionResult Register([FromBody] Users user)
    {
      if (user == null)
      {
        return BadRequest("Invalid user data.");
      }

      using (var connection = new SqlConnection(_connectionString))
      {
        var sql = "INSERT INTO Users (username, cedula, codigo) VALUES (@username, @cedula, @codigo)";
        var rowsAffected = connection.Execute(sql, new { user.username, user.cedula, user.codigo });

        if (rowsAffected > 0)
        {
          return Ok("User registered successfully.");
        }
        else
        {
          return StatusCode(500, "An error occurred while registering the user.");
        }
      }

    }
  }
}
