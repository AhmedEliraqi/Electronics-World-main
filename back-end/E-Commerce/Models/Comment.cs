using System.ComponentModel.DataAnnotations.Schema;

namespace E_Commerce.Models
{
    public class Comment
    {
        public int Id { get; set; }       
        public Product Product { get; set; }
        [ForeignKey("Product")]
        public int ProductId { get; set; }
        public Users User { get; set; }
        [ForeignKey("User")]
        public int UserId { get; set; }
        public string CommentText { get; set; }
        public string FirstName { get; set; }
        public string LastName { get; set; }

    }

    
}
