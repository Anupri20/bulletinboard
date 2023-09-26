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
    public class CommentsController : ControllerBase
    {
        private readonly IConfiguration _config;
        public CommentsController(IConfiguration config)
        {
            _config = config;
        }
        [HttpGet]
        public async Task<ActionResult<List<Comment>>> GetAllComments()
        {
            using var connection = new SqlConnection(_config.GetConnectionString("DefaultConnection"));
            IEnumerable<Comment> comments = await SelectAllComments(connection);
            return Ok(comments);
        }
        [HttpGet("{pid}")]
        public async Task<ActionResult<List<Comment>>> GetComments(int pid)
        {
            using var connection = new SqlConnection(_config.GetConnectionString("DefaultConnection"));
            var comment = await connection.QueryAsync<Comment>("select * from comment where pid = @Pid", new { Pid = pid });
            return Ok(comment);
        }
        [HttpPost]
        public async Task<ActionResult<List<Comment>>> CreateComment(Comment[] comments)
        {
            using var connection = new SqlConnection(_config.GetConnectionString("DefaultConnection"));
            foreach (var c in comments)
            {
                await connection.ExecuteAsync("insert into comment (cid,cdetails,timestamp,uid,pid) values (@Cid,@cdetails,GETDATE(),@Uid,@Pid)", c);
            }
            return Ok(await SelectAllComments(connection));
        }
        [HttpPut]
        public async Task<ActionResult<List<Comment>>> UpdateComment(Comment[] comments)
        {
            using var connection = new SqlConnection(_config.GetConnectionString("DefaultConnection"));
            foreach (var c in comments)
            {
                await connection.ExecuteAsync("update comment set cdetails=@cdetails,timestamp=GETDATE() where uid=@Uid and pid=@Pid and cid=@Cid", c);
            }
            return Ok(await SelectAllComments(connection));
        }
        [HttpDelete]
        public async Task<ActionResult<List<Comment>>> DeleteComments(MComment[] comment)
        {
            using var connection = new SqlConnection(_config.GetConnectionString("DefaultConnect" +
                "" +
                "ion"));
            foreach (var c in comment)
           {
                await connection.ExecuteAsync($"delete from comment where cid={c.Cid} and pid={c.Pid} and uid={c.Uid}");
            }
           return Ok(await SelectAllComments(connection));
        }
        private static async Task<IEnumerable<Comment>> SelectAllComments(SqlConnection connection)
        {
            return await connection.QueryAsync<Comment>("select * from comment");
        }
    }
}
