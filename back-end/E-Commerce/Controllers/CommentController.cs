using E_Commerce.Models;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace E_Commerce.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class CommentController : ControllerBase
    {
        private readonly ProductDbContext _context;
        private readonly Users _users;
        public CommentController(ProductDbContext appDbContext, Users users)
        {
            _context = appDbContext;
            _users = users;
        }

        [HttpPost("AddComment")]
        public IActionResult AddComment(Comment comment)
        {
            if (comment == null)
            {
                return BadRequest("Comment object is null");
            }

            
            var product = _context.Products.FirstOrDefault(p => p.Id == comment.ProductId);

            
            if (product == null)
            {
                return NotFound("Product does not exist with the given ProductId");
            }
            var cco = new List<Comment>();
            var commebt = new Comment { CommentText = comment.CommentText, ProductId = comment.ProductId, UserId = comment.UserId, FirstName= _users.FirstName,LastName= _users.LastName };
            cco.Add(commebt);
            product.Comments = cco;

            _context.SaveChanges();

            return Ok(comment);
        }

        [HttpGet("GetAllComments")]
        
        public ActionResult<IEnumerable<Comment>> GetAllComments()
        {
            return _context.Comments.ToList();
        }

    }
}

