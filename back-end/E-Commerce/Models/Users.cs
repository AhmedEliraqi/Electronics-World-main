using System.ComponentModel.DataAnnotations;

namespace E_Commerce.Models
{
    public class Users
    {
        [Key]
        public int Id { get; set; }
        public string FirstName { get; set; }
        public string LastName { get; set; }
        public string UserName { get; set; }
        public string Password { get; set; }
        public string Email { get; set; }
        public string Token { get; set; }
        public string Role { get; set; }

        public ICollection<Comment> Comments { get; set; }
    }
}
