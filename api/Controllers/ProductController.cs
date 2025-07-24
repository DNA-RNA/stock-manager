using Api.Models;
using Api.Services;
using Microsoft.AspNetCore.Mvc;

namespace Api.Controllers;

[ApiController]
[Route("api/[controller]")]
public class ProductsController : ControllerBase
{
    private readonly ProductService _productService;

    public ProductsController(ProductService productService)
    {
        _productService = productService;
    }

    [HttpGet]
    public IActionResult GetAll()
    {
        return Ok(_productService.GetAll());
    }

    [HttpPost]
    public IActionResult Add(Product newProduct)
    {
        if (_productService.IsPriceOrStockInvalid(newProduct))
        {
            return BadRequest("Fiyat ve stok negatif olamaz.");
        }
        if (_productService.IsProductNameExists(newProduct.Name))
        {
            return BadRequest("Ürün eklenemedi. Ürün ismi benzersiz olmalı.");
        }

        var added = _productService.Add(newProduct);
        return CreatedAtAction(nameof(GetById), new { id = added.Id }, added);
    }

    [HttpGet("{id:guid}")]
    public IActionResult GetById(Guid id)
    {
        var product = _productService.GetById(id);
        if (product is null)
            return NotFound("Belirtilen ID'ye sahip ürün bulunamadı.");

        return Ok(product);
    }

    [HttpPut("{id:guid}")]
    public IActionResult Update(Guid id, Product updated)
    {
        if (_productService.IsPriceOrStockInvalid(updated))
        {
            return BadRequest("Fiyat ve stok negatif olamaz.");
        }
        var success = _productService.Update(id, updated);
        if (!success)
            return BadRequest("Güncelleme başarısız. Ürün bulunamadı ya da isim değiştirilemez!");

        return Ok("Ürün güncellendi!");
    }

    [HttpDelete("name/{name}")]
    public IActionResult DeleteByName(string name)
    {
        var success = _productService.DeleteByName(name);
        if (!success)
            return NotFound("Silinmek istenen ürün bulunamadı!");

         return Ok("Ürün başarıyla silindi.");
    }
    
   
}