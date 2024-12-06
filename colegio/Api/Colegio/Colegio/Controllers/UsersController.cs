using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Data.SqlClient;
using Dapper;
using API_front;

namespace colegio.Controllers
{
  [Route("api/[controller]")]
  [ApiController]
  public class ValuesController : ControllerBase
  {
    private readonly string _connectionString = "Server=DESKTOP-P8BDAI4;Database=Bdfinal;User Id=sa;Password=12345678;TrustServerCertificate=true";

    // Registrar usuario
    [HttpPost("register")]
    public IActionResult Register([FromBody] Users user)
    {
      if (user == null)
      {
        return BadRequest("Invalid user data.");
      }

      using (var connection = new SqlConnection(_connectionString))
      {
        var sql = "INSERT INTO estudiantes (username, cedula, codigo) VALUES (@username, @cedula, @codigo)";
        var rowsAffected = connection.Execute(sql, new { user.Username, user.Cedula, user.Codigo });

        return rowsAffected > 0 ? Ok("User registered successfully.") : StatusCode(500, "An error occurred while registering the user.");
      }
    }

    // Eliminar usuario
    [HttpDelete("delete/{id}")]
    public IActionResult DeleteUserById(int id)
    {
      using (var connection = new SqlConnection(_connectionString))
      {
        var sql = "DELETE FROM estudiantes WHERE id = @Id";
        var result = connection.Execute(sql, new { Id = id });

        return result > 0 ? Ok("Estudiante eliminado") : NotFound("Estudiante no encontrado");
      }
    }

    // Actualizar usuario
    [HttpPut("update/{id}")]
    public IActionResult Update(int id, [FromBody] Users user)
    {
      if (user == null || string.IsNullOrWhiteSpace(user.Username) || string.IsNullOrWhiteSpace(user.Cedula))
      {
        return BadRequest("Invalid user data.");
      }

      using (var connection = new SqlConnection(_connectionString))
      {
        var sql = "UPDATE estudiantes SET username = @Username, cedula = @Cedula WHERE id = @Id";
        var rowsAffected = connection.Execute(sql, new { Id = id, user.Username, user.Cedula });

        // Retorna un mensaje dependiendo de si se actualizó correctamente o no
        return rowsAffected > 0 ? Ok("User updated successfully.") : NotFound("User not found.");
      }
    }


    // Obtener todos los usuarios
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

    // Obtener usuario por código
    [HttpGet("getUserById/{codigo}")]
    public IActionResult GetUserById(string codigo)
    {
      using (var connection = new SqlConnection(_connectionString))
      {
        var sql = "SELECT * FROM estudiantes WHERE codigo = @Codigo";
        var users = connection.Query<Users>(sql, new { Codigo = codigo }).ToList();

        if (users.Count == 0)
        {
          return NotFound($"No se encontraron estudiantes con el código {codigo}.");
        }
        if (users.Count == 1)
        {
          return Ok(users.First()); // Devuelve un objeto si solo hay un resultado.
        }

        return Ok(users); // Devuelve una lista si hay varios resultados.
      }
    }
    // Obtener todos los usuarios
    [HttpGet("getUsersbyName")]
    public IActionResult GetUsersbyName(string nombre)
    {
      using (var connection = new SqlConnection(_connectionString))
      {
        var sql = "SELECT * FROM estudiantes where username LIKE @Nombre + '%'";
        var users = connection.Query<Users>(sql, new {Nombre = nombre}).ToList();

        return users.Any() ? Ok(users) : NotFound("No users found.");
      }
    }
  }
}
