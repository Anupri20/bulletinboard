using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Dapper;
using System.Data.SqlClient;
using System.Data;
using Database;
using System.Security.Cryptography;
using System.Collections.Generic;
using Microsoft.Extensions.Hosting;

namespace BulletinBoard.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class PostController : ControllerBase
    {

        private readonly IConfiguration _config;
        public PostController(IConfiguration config)
        {
            _config = config;
        }
        [HttpGet]
        public async Task<ActionResult<List<Post>>> GetAllPosts()
        {
            using var connection = new SqlConnection(_config.GetConnectionString("DefaultConnection"));
            IEnumerable<Post> posts = await SelectAllPosts(connection);
            return Ok(posts);
        }
        [HttpGet("{category}")]
        public async Task<ActionResult<List<Post>>> GetPosts(string category)
        {
            using var connection = new SqlConnection(_config.GetConnectionString("DefaultConnection"));
            var post = await connection.QueryAsync<Post>("select * from post where category = @Category", new { Category = category });
            return Ok(post);
        }
        [HttpGet("{pid}")]
        public async Task<ActionResult<List<Post>>> GetSinglePost(int pid)
        {
            using var connection = new SqlConnection(_config.GetConnectionString("DefaultConnection"));
            var posts = await connection.QueryAsync<Post>($"select * from post where pid=@Pid", new {Pid=pid});
            return Ok(posts);
        }
        [HttpGet("/categories")]
        public async Task<ActionResult<List<Post>>> GetCategories()
        {
            using var connection = new SqlConnection(_config.GetConnectionString("DefaultConnection"));
            var post = await connection.QueryAsync<Post>("select distinct category from post");
            return Ok(post);
        }

        [HttpPost]
        public async Task<ActionResult<List<Post>>> CreatePosts(Post[] posts)
        {
            using var connection = new SqlConnection(_config.GetConnectionString("DefaultConnection"));
            foreach (var i in posts)
            {
              await connection.ExecuteAsync("insert into post (pid,title,details,category,timestamp,uid) values (@Pid,@title,@details,@Category,GETDATE(),@uid)",i);
              //return Ok(await SelectAllPosts(connection));
            } 
            //await connection.ExecuteAsync("insert into post (pid,title,details,category,timestamp,uid) values (@Pid,@title,@details,@Category,@timestamp,@uid)", post);
            return Ok(await SelectAllPosts(connection));
        }
        [HttpPut]
        public async Task<ActionResult<List<Post>>> UpdatePost(Post[] post)
        {
            using var connection = new SqlConnection(_config.GetConnectionString("DefaultConnection"));
            foreach (var i in post)
            {
                await connection.ExecuteAsync("update post set pid=@Pid,title=@title,details=@details,category=@Category,timestamp=GETDATE(),uid=@uid where uid=@uid and pid=@pid", i);
            }
            return Ok(await SelectAllPosts(connection));
        }
        [HttpDelete]
        public async Task<ActionResult<List<Post>>> DeletePost(Mpost[] posts)
        {
            using var connection = new SqlConnection(_config.GetConnectionString("DefaultConnection"));
            foreach (var post in posts)
            {
                await connection.ExecuteAsync($"delete from post where pid={post.Pid} and uid = {post.uid} ");
            }
            return Ok(await SelectAllPosts(connection));
        }
       
        private static async Task<IEnumerable<Post>> SelectAllPosts(SqlConnection connection)
        {
            return await connection.QueryAsync<Post>("select * from post");
        }

    }
}
