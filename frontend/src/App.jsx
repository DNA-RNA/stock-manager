import ProductForm from './components/ProductForm';
import ProductList from './components/ProductList';
import { useState } from 'react';

function App() {
  const [refresh, setRefresh] = useState(false);

  const handleRefresh = () => setRefresh(!refresh);

  return (
    <>
      <h1>Ürün Stok Yönetimi</h1>
      <ProductForm onProductAdded={handleRefresh} />
      <ProductList key={refresh} />
    </>
  );
}

export default App;
