using System;
using System.Collections.Generic;
using System.Linq;
using Api.Models;

namespace Api.Services;

public class ProductService
{
    private readonly List<Product> _products = new();

    public IEnumerable<Product> GetAll()
    {
        return _products;
    }

    public Product? GetById(Guid id)
    {
        return _products.FirstOrDefault(p => p.Id == id);
    }

    public bool IsProductNameExists(string name)
    {
        return _products.Any(p => p.Name.Equals(name, StringComparison.OrdinalIgnoreCase));
    }

    public Product Add(Product newProduct)
    {
        newProduct.Id = Guid.NewGuid();
        _products.Add(newProduct);
        return newProduct;
    }

    public bool Update(Guid id, Product updated)
    {
        var productModel = _products.FirstOrDefault(p => p.Id == id);
        if (productModel is null)
            return false;

        if (!string.Equals(productModel.Name, updated.Name, StringComparison.OrdinalIgnoreCase))
            return false;

        productModel.Price = updated.Price;
        productModel.Stock = updated.Stock;
        return true;
    }

    public bool DeleteById(Guid id)
    {
        var existing = _products.FirstOrDefault(p => p.Id == id);
        if (existing is null)
            return false;

        _products.Remove(existing);
        return true;
    }
    public bool DeleteByName(string name)
    {
        var existing = _products.FirstOrDefault(p => p.Name.Equals(name, StringComparison.OrdinalIgnoreCase));
        if (existing is null)
            return false;

        _products.Remove(existing);
        return true;
    }
}
