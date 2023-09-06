using System.ComponentModel.DataAnnotations.Schema;

namespace E_Commerce.Models
{
    public class Product
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public decimal Price { get; set; }
        public string Description { get; set; }
        public int CategoryId { get; set; }
        public string CategoryName { get; set; }
        public string ImageName { get; set; }
        public string ImageUrl { get; set; }
        [NotMapped] public IFormFile Image { get; set; }
        public Category Category { get; set; }
        public int Quantity { get; set; }

        public ICollection<Comment> Comments { get; set; }
    }
}
