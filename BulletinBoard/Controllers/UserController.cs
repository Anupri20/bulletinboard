using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Dapper;
using System.Data.SqlClient;
using System.Data;
using Database;

namespace BulletinBoard.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class UserController : ControllerBase
    {
        private readonly IConfiguration _config;
        public UserController(IConfiguration config)
        {
            _config = config;
        }
      
        [HttpGet]
        public async Task<ActionResult<List<User>>> GetAllUsers()
        {
            using var connection = new SqlConnection(_config.GetConnectionString("DefaultConnection"));
            IEnumerable<User> users = await SelectAllUsers(connection);
            return Ok(users);
        } 
        [HttpGet("{uid}")]
        public async Task<ActionResult<User>> GetUser(int uid)
        {
            using var connection = new SqlConnection(_config.GetConnectionString("DefaultConnection"));
            var user = await connection.QueryFirstAsync<User>("select * from usr where uid=@Id", new { Id = uid });
            return Ok(user);
        }

        [HttpPost]
        public async Task<ActionResult<List<User>>>CreateUser(User user)
        {
            using var connection = new SqlConnection(_config.GetConnectionString("DefaultConnection"));
            await connection.ExecuteAsync("insert into usr (uid,name,email,phone,password) values (@Id,@Name,@email,@phone,@password)", user);
            return Ok(await SelectAllUsers(connection));
        }
        [HttpPut]
        public async Task<ActionResult<List<User>>> UpdateUser(User user)
        {
            using var connection = new SqlConnection(_config.GetConnectionString("DefaultConnection"));
            await connection.ExecuteAsync("update usr set id=@Id,name=@Name,email=@email,phone=@phone,password=@password", user);
            return Ok(await SelectAllUsers(connection));
        }
        [HttpDelete("{uid}")]
        public async Task<ActionResult<List<User>>> DeleteUser(int uid)
        {
            using var connection = new SqlConnection(_config.GetConnectionString("DefaultConnection"));
            await connection.ExecuteAsync("delete from usr where uid=@Id ", new { Id = uid });
            return Ok(await SelectAllUsers(connection));
        }  
        private static async Task<IEnumerable<User>>SelectAllUsers(SqlConnection connection)
        {
            return await connection.QueryAsync<User>("select * from usr");
        }
    }
}
