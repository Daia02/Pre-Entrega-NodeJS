// index.js

// -------------------------
// Funciones para consumir API FakeStore
// -------------------------

async function GetProductos() {
    try {
      const response = await fetch('https://fakestoreapi.com/products');
      const data = await response.json();
      return { status: true, data };
    } catch (error) {
      return { status: false, message: error.message };
    }
  }
  
  async function GetProductosid(id) {
    try {
      const response = await fetch(`https://fakestoreapi.com/products/${id}`);
      if (!response.ok) throw new Error(`Producto con ID ${id} no encontrado.`);
      const data = await response.json();
      return { status: true, data };
    } catch (error) {
      return { status: false, message: error.message };
    }
  }
  
  async function PostProducto(producto) {
    try {
      const response = await fetch('https://fakestoreapi.com/products', {
        method: 'POST',
        body: JSON.stringify(producto),
        headers: { 'Content-Type': 'application/json' }
      });
      const data = await response.json();
      return { status: true, data };
    } catch (error) {
      return { status: false, message: error.message };
    }
  }
  
  async function DeleteProducto(id) {
    try {
      const response = await fetch(`https://fakestoreapi.com/products/${id}`, {
        method: 'DELETE'
      });
      const data = await response.json();
      return { status: true, data };
    } catch (error) {
      return { status: false, message: error.message };
    }
  }
  
  // -------------------------
  // Procesamiento de comandos
  // -------------------------
  
  async function main() {
    const input = process.argv.slice(2);
    const inputFormateado = input.flatMap(arg => arg.includes('/') ? arg.split('/') : arg);
  
    if (inputFormateado.length >= 1) inputFormateado[0] = inputFormateado[0].toLowerCase();
    if (inputFormateado.length >= 2) inputFormateado[1] = inputFormateado[1].toLowerCase();
  
    const query = `${inputFormateado[0] || ''} ${inputFormateado[1] || ''}`.trim();
  
    switch (query) {
      case 'get products':
        if (inputFormateado.length === 2) {
          console.log('Listando todos los productos...');
          const result = await GetProductos();
          if (result.status) console.log(result.data);
          else console.error('Error:', result.message);
        } else if (inputFormateado.length === 3) {
          console.log(`Listando producto con ID: ${inputFormateado[2]}...`);
          const result = await GetProductosid(inputFormateado[2]);
          if (result.status) console.log(result.data);
          else console.error('Error:', result.message);
        } else {
          console.log('Uso correcto:');
          console.log('npm run start GET products');
          console.log('npm run start GET products/<productId>');
        }
        break;
  
      case 'post products':
        if (inputFormateado.length === 5) {
          const [ , , title, price, category ] = inputFormateado;
          const nuevoProducto = { title, price: parseFloat(price), category };
          console.log('Creando producto...');
          const result = await PostProducto(nuevoProducto);
          if (result.status) console.log('Producto creado:', result.data);
          else console.error('Error:', result.message);
        } else {
          console.log('Uso correcto:');
          console.log('npm run start POST products <title> <price> <category>');
        }
        break;
  
      case 'delete products':
        if (inputFormateado.length === 3) {
          console.log(`Eliminando producto con ID: ${inputFormateado[2]}...`);
          const result = await DeleteProducto(inputFormateado[2]);
          if (result.status) console.log('Producto eliminado:', result.data);
          else console.error('Error:', result.message);
        } else {
          console.log('Uso correcto:');
          console.log('npm run start DELETE products/<productId>');
        }
        break;
  
      default:
        console.log('Comando no reconocido. Opciones disponibles:');
        console.log('GET products');
        console.log('GET products/<productId>');
        console.log('POST products <title> <price> <category>');
        console.log('DELETE products/<productId>');
    }
  }
  
  main();
  