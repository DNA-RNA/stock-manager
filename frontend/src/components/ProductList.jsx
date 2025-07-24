import { useEffect, useState } from 'react';
import { getAllProducts, deleteProductByName, updateProduct } from '../services/ProductService';
import Modal from 'react-modal';
import { toast } from 'react-toastify';

function ProductList() {
  const [products, setProducts] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [editForm, setEditForm] = useState({ name: '', price: '', stock: '' });
  const loadProducts = async () => {
    const res = await getAllProducts();
    setProducts(res.data);
  };

  const handleDelete = async (name) => {
    try {
    const res = await deleteProductByName(name);
    toast.success(res.data); 
    loadProducts();
  } catch (err) {
    toast.error(err.response?.data || "Silme işlemi başarısız.");
  }
    loadProducts();
  };
  const openEditModal = (product) => {
    setSelectedProduct(product);
    setEditForm({ name: product.name, price: product.price, stock: product.stock });
    setIsModalOpen(true);
  };
   const closeModal = () => {
    setIsModalOpen(false);
    setSelectedProduct(null);
  };

  const handleEditChange = (e) => {
    const { name, value } = e.target;
    setEditForm(prev => ({ ...prev, [name]: value }));
  };

  const handleUpdate = async () => {
    try {
      await updateProduct(selectedProduct.id, {
        ...editForm,
        price: parseFloat(editForm.price),
        stock: parseInt(editForm.stock)
      });
      toast.success("Ürün güncellendi");
      closeModal();
      loadProducts();
    } catch (err) {
      toast.error(err.response?.data || "Ürün güncellenemedi.");
    }
  };


  useEffect(() => {
    loadProducts();
  }, []);

  return (
    <>
      <h3>Ürün Listesi</h3>
      {products.length === 0 ? (
        <p>Henüz hiç ürün eklenmedi! Lütfen ürün ekleyiniz</p>
      ) : (
        <ul>
          {products.map(p => (
            <li key={p.id}>
              {p.name} - {p.price}₺ - {p.stock} adet
              <br />
              <button onClick={() => handleDelete(p.id)}>Sil</button>
              <button onClick={() => openEditModal(p)}>Düzenle</button>
            </li>
          ))}
        </ul>
      )}

      <Modal isOpen={isModalOpen} onRequestClose={closeModal} contentLabel="Ürünü Düzenle">
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
       <h2>Ürünü Düzenle</h2>
        <button onClick={closeModal}>Kapat</button>
        </div>
       <div><span style={{color:'red'}}>Ürün İsmini Değiştiremezsiniz!</span></div>
        <form onSubmit={(e) => { e.preventDefault(); handleUpdate(); }}>
          <input
            name="name"
            value={editForm.name}
            readOnly
          />
          <input
            name="price"
            type="number"
            value={editForm.price}
            onChange={handleEditChange}
            placeholder="Fiyat"
          />
          <input
            name="stock"
            type="number"
            value={editForm.stock}
            onChange={handleEditChange}
            placeholder="Stok"
          />
          <button type="submit">Kaydet</button>
          <button type="button" onClick={closeModal}>İptal</button>
        </form>
      </Modal>
    </>
  );
}

export default ProductList;
