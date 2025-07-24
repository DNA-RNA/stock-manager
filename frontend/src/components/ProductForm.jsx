import { useState } from 'react';
import { addProduct } from '../services/ProductService';
import { toast } from 'react-toastify';

function ProductForm({ onProductAdded }) {
  const [form, setForm] = useState({ name: '', price: '', stock: '' });

  const handleChange = e => {
   
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async e => {
    e.preventDefault();
    try {
      await addProduct({ ...form, price: parseFloat(form.price), stock: parseInt(form.stock) });
      onProductAdded();
      toast.success("Ürün başarıyla eklendi!");
      setForm({ name: '', price: '', stock: '' });
    } catch (err) {
      toast.error(err.response?.data || "Ürün eklenemedi!");
    }
  };

  return (
    <>
 <form onSubmit={handleSubmit}>
      <input name="name" value={form.name} onChange={handleChange} placeholder="Ürün adı" required />
      <input name="price" type="number" value={form.price} onChange={handleChange} placeholder="Fiyat" required />
      <input name="stock" type="number" value={form.stock} onChange={handleChange} placeholder="Stok" required />
      <button type="submit">Ekle</button>
    </form>
    </>
   
  );
}

export default ProductForm;
