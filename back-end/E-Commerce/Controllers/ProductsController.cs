using E_Commerce.DTO;
using E_Commerce.Models;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace E_Commerce.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ProductsController : ControllerBase
    {
        private readonly ProductDbContext _context;
        private readonly IWebHostEnvironment _environment;

        public ProductsController([FromServices]ProductDbContext context, IWebHostEnvironment environment)
        {
            _context = context;
            _environment = environment;
        }

        [HttpGet("GetAllCategories")]
        public  IActionResult GetCategories()
        {
            var categories =  _context.Categories.ToList();
            return Ok(categories);
        }

        [HttpGet("GetCategory")]
        public async Task<IActionResult> GetCategory(int id )
        {
            var category = await _context.Categories.FirstOrDefaultAsync(c=> c.Id == id);
            if(category == null)
            {
                return NotFound();
            }
            return Ok(category);
        }

        [HttpPost("AddCategory")]
        public async Task<IActionResult> AddCategory(Category model)
        {
            model.Name = new string(model.Name);
            await _context.AddAsync(model);
            await _context.SaveChangesAsync();

            return Ok(model);
        }

        [HttpPost("EditCategory")]
        public async Task<IActionResult> EditCategory(Category edit)
        {
            var category = await _context.Categories.FindAsync(edit.Id);
            if (category == null)
            {
                return NotFound();
            }
            category.Name = edit.Name;
            await _context.SaveChangesAsync();
            return Ok(category);

        }

        [HttpPost("DeleteCategory")]
        public async Task<IActionResult> DeleteCategory(Category edit)
        {
            var category = await _context.Categories.FindAsync(edit.Id);
            if (category == null)
            { return NotFound(); }
             _context.Categories.Remove(category);
            await _context.SaveChangesAsync();
            return Ok(category);
        }


        

        [HttpGet("GetProduct")]
        public async Task<IActionResult> GetProduct(int id)
        {
            var product = await _context.Products.FirstOrDefaultAsync(c => c.Id == id);

            if (product == null)
            {
                return NotFound();
            }

            return Ok(product);
        }

        [HttpGet("GetAllProducts")]
        public IActionResult GetProducts()
        {
            var products = _context.Products
                .Select(p => new ProductDTO
                {
                   Id = p.Id,
                    CategoryId = p.CategoryId,
                    CategoryName = p.CategoryName,
                    Name = p.Name,
                    Description = p.Description,
                    ImageUrl = Url.Content($"~/assets/images/{p.ImageName}"), 
                    Price = p.Price
                    
                })
                .ToList();

            return Ok(products);
        }

        

        [HttpGet("category/{categoryId}")]
        public async Task<ActionResult<IEnumerable<ProductDTO>>> GetProductsByCategory(int categoryId)
        {
            var products = await _context.Products.Select(p => new ProductDTO
            {
                Id = p.Id,
                CategoryId = p.CategoryId,
                CategoryName = p.CategoryName,
                Name = p.Name,
                Description = p.Description,
                ImageUrl = Url.Content($"~/assets/images/{p.ImageName}"),
                Price = p.Price
            }).Where(p => p.CategoryId == categoryId).ToListAsync();

            if (products == null || !products.Any())
                return NotFound();

            return Ok(products);
        }


        [HttpPost("AddProduct")]
        public   ActionResult Add([FromForm]ProductDTO product)
        {
            var fileName = $"{Guid.NewGuid().ToString()}{Path.GetExtension(product.Image.FileName)}";

            var uploadsDirectory = Path.Combine("C:/Users/EL-Huda/Desktop/E-Commerce/website/E-commerce/src/assets/images");
            var filePath = Path.Combine(uploadsDirectory, fileName);

            if (!Directory.Exists(uploadsDirectory))
            {
                Directory.CreateDirectory(uploadsDirectory);
            }

            using (var stream = new FileStream(filePath, FileMode.Create))
            {
                product.Image.CopyTo(stream);
            }

            var model = new Product()
            {
                CategoryId = product.CategoryId,
                Name = product.Name,
                Description = product.Description,
                ImageName = fileName,
                Image = product.Image,
                Price = product.Price,
            };
            _context.Products.Add(model);
            _context.SaveChanges();

            return Ok(product);
        }

        [HttpPost("EditProduct")]
        public async Task<IActionResult> UpdateProduct([FromForm] Product edit)
        {
            var product = await _context.Products.FindAsync(edit.Id);
            if (product == null)
            {
                return NotFound();
            }

            _context.Entry(product).State = EntityState.Modified;
            _context.SaveChanges();

            return Ok(edit);
        }

        [HttpPost("DeleteProduct")]
        public async  Task<IActionResult> DeleteProduct(Product edit)
        {
            var product = await _context.Products.FindAsync(edit.Id);

            if (product == null)
            {
                return NotFound();
            }

            _context.Products.Remove(product);
            await _context.SaveChangesAsync();

            return Ok(product);
        }

    }
}
