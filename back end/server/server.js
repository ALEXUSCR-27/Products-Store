var ServerConfig = require('./serverConfig');
var express = require('express');
const bodyParser = require('body-parser');
const cors = require ('cors');
const Categoria = require ('./Categoria');
const Producto = require ('./Producto');
const Venta = require ('./Venta');
const Factura = require ('./Factura');
const Usuario = require ('./Usuario');
const Corporativo = require ('./Coorporativo');


var app = express();

app.use(bodyParser.json());
app.use(express.json());
app.use(cors());


app.post('/categorias/ver', Categoria.verCategorias);
app.post('/categorias/agregar', Categoria.agregarCategoria);
app.post('/categorias/actualizar', Categoria.actualizarCategoria);
app.post('/categorias/borrar', Categoria.borrarCategoria);


app.post('/productos/buscar', Producto.buscarProducto);
app.post('/productos/ver', Producto.verProductos);
app.post('/productos/agregar', Producto.agregarProducto);
app.post('/productos/actualizar', Producto.actualizarProducto);
app.post('/productos/borrar', Producto.borrarProducto);


app.post('/venta', Venta.realizarVenta);


app.post('/facturas/buscar', Factura.buscarFactura);
app.post('/facturas/detalle', Factura.getDetalle);


app.post('/usuario', Usuario.iniciarSesion);

app.post('/corporativo/productos', Corporativo.verProductosCategorias);
app.post('/corporativo/facturadoSucursal', Corporativo.verFacturadoSucursal);
app.post('/corporativo/facturadoTotal', Corporativo.verFacturadoTotal);


var server = app.listen(9000, function (req, res) {
    console.log('[MENSAJE]:[El servidor se esta ejecutando en el puerto 9000]');
});