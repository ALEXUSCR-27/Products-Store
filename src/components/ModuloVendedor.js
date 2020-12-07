import React,{Component} from 'react';
import {Button,Modal} from 'react-bootstrap';
import axios from 'axios';
import {toast} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css'
toast.configure();
class ModuloVendedor extends Component {
	constructor(props){
		super(props);
		this.state = {
			NombreProducto:'',
			DescripcionProducto:'',
			idCategoria:'',
			idProducto:'',
			Precio:'',
			Cantidad:'',
			NombreCategoria:'',
			DescripcionCategoria:'',
			servidor:'LI',
			resultados:[],
			categorias:[],
			show1:false,
			show2:false
		}
		this.handleChange = this.handleChange.bind(this);
		this.handleSubmit = this.handleSubmit.bind(this);
		this.handleAddProduct = this.handleAddProduct.bind(this);
		this.handleAddCategory = this.handleAddCategory.bind(this);
		this.resetFilters = this.resetFilters.bind(this);
		this.handleProducts = this.handleProducts.bind(this);
		this.handleCategory = this.handleCategory.bind(this);
		this.handleShow1 = this.handleShow1.bind(this);
		this.handleHide1 = this.handleHide1.bind(this);
		this.handleShow2 = this.handleShow2.bind(this);
		this.handleHide2 = this.handleHide2.bind(this);
		this.handleModifyProduct = this.handleModifyProduct.bind(this);
	}

	handleShow1=(e)=> {
		console.log(e);
		this.setState({
			NombreProducto:e[0],
			DescripcionProducto:e[1],
			Precio:e[2],
			Cantidad:e[3],
			idProducto:e[4],
			idCategoria:e[5],
			show1:true});}
	handleHide1=()=>{this.setState({show1:false});}

	handleShow2=(e)=> {
		this.setState({
			NombreCategoria:e.[0],
			DescripcionCategoria:e.[1],
			idCategoria:e.[2],
			show2:true});}
	handleHide2=()=>{this.setState({show2:false});}

	handleProducts=(event)=> {
		event.preventDefault();
		axios.post("http://localhost:9000/productos/ver",this.state)
			.then( response => {
				const resultado = response.data;
				this.setState({
					resultados:resultado,
					
				})
				this.handleCategory(event);
				console.log(resultado);
			})
		.catch(error =>console.log(console.error));
	}
	handleCategory=(event)=> {
		event.preventDefault();
		axios.post("http://localhost:9000/categorias/ver",this.state)
			.then( response => {
				const resultado = response.data;
				this.setState({
					categorias:resultado,
					
				})
					console.log(resultado);
			})
		.catch(error =>console.log(console.error));
	}

	resetFilters=(e)=>{
		e.preventDefault();
		this.setState({
			NombreProducto:'',
			idCategoria:'',
			Precio:'',
			DescripcionProducto:'',
			NombreCategoria:'',
			DescripcionCategoria:''
		})
	}
	handleModifyProduct=(event)=> {
		event.preventDefault();
		console.log(this.state);
		axios.post("http://localhost:9000/productos/actualizar",this.state)
			.then( response => {
				const resultado = response.data;
				console.log(resultado);
				this.handleHide1();
				toast("Los cambios se realizaron con exito");
				this.resetFilters(event);
				this.handleProducts(event);
			})
		.catch(error =>console.log(console.error));
	}
	handleModifyCategory=(event)=> {
		event.preventDefault();
		console.log(event);
		axios.post("http://localhost:9000/categorias/actualizar",this.state)
			.then( response => {
				const resultado = response.data;
				console.log(resultado);
				this.handleHide2();
				toast("Los cambios se realizaron con exito");
				this.resetFilters(event);
				this.handleCategory(event);
			})
		.catch(error =>console.log(console.error));
	}
	handleChange=(e)=>{
		this.setState({
			[e.target.name]:e.target.value
		})
	}
	handleSubmit=(event)=> {
		if (this.state.NombreProducto!='' && this.state.DescripcionProducto!='' && this.state.Precio!='' && this.state.IDCategoria!='') {
			this.handleAddProduct(event)
		}
		if (this.state.NombreCategoria!='' && this.state.DescripcionCategoria!='') {
			this.handleAddCategory(event)
		}
	}
	handleAddProduct=(event)=> {
		console.log(this.state)
		event.preventDefault();
		axios.post("http://localhost:9000/productos/agregar",this.state)
			.then( response => {
				const resultado = response.data;
					toast("Se agregó correctamente el nuevo producto");
				console.log(resultado);
				this.resetFilters(event);
			})
		.catch(error =>console.log(console.error));
	}
	handleAddCategory=(event)=> {
		event.preventDefault();
		axios.post("http://localhost:9000/categorias/agregar",this.state)
			.then( response => {
				const resultado = response.data;
				toast("Se agregó correctamente la nueva categoría");
				console.log(resultado);
				this.resetFilters(event);
			})
		.catch(error =>console.log(console.error));
	}

	render() {
		return(
			<div>


				<Modal centerd size="lg" show={this.state.show1} animation={true} onHide={this.handleHide1}>
					<Modal.Header className="Modal.Header bg-dark text-white">
						<Modal.Title>Editar datos de producto</Modal.Title>
					</Modal.Header>
					<Modal.Body>
						<div className="container-lg width=100">
								<form onSubmit={this.handleModifyProduct} className="col-md-12">
									<div className="row">
										<div className="form-group col-md-6">
											<label>Nombre:</label>
											<input type="text" value={this.state.NombreProducto} onChange={this.handleChange} className="form-control col-md-10" name="NombreProducto"/>
										</div>
										<div className="form-group col-md-6">
										  <label>Descripción:</label>
										  <input type="text" value={this.state.DescripcionProducto} onChange={this.handleChange} className="form-control col-md-10" name="DescripcionProducto"/>
										</div>
									</div>
									<div className="row">
										<div className="form-group col-md-6">
										  <label>Cantidad:</label>
										  <input type="text" value={this.state.Cantidad} onChange={this.handleChange} className="form-control col-md-10" name="Cantidad"/>
										</div>
										<div className="form-group col-md-6">
										  <label>Precio:</label>
										  <input type="number" min="0" value={this.state.Precio} onChange={this.handleChange} className="form-control col-md-10" name="Precio"/>
										  <br/>
										</div>
									</div>
									<div className="row">
										<div className="col-md-3">
											<Button type="submit" className="btn btn-danger btn-block">Realizar Cambios</Button>
										</div>
									</div>
									
								</form>
						</div>
					</Modal.Body>
					<Modal.Footer className="bg-dark">
						<button type="button" onClick={this.handleHide1} className="btn btn-primary bg-dark" style={{border:0}}>Cerrar</button>
					</Modal.Footer>
				</Modal>


				<Modal centerd size="lg" show={this.state.show2} animation={true} onHide={this.handleHide2}>
					<Modal.Header className="Modal.Header bg-dark text-white">
						<Modal.Title>Editar datos de la categoría</Modal.Title>
					</Modal.Header>
					<Modal.Body>
						<div className="container-lg width=100">
								<form onSubmit={this.handleModifyCategory} className="col-md-12">
									<div className="row">
										<div className="form-group col-md-6">
											<label>Nombre:</label>
											<input type="text" value={this.state.NombreCategoria} onChange={this.handleChange} className="form-control col-md-10" name="NombreCategoria"/>
										</div>
										<div className="form-group col-md-6">
										  <label>Descripción:</label>
										  <input type="text" value={this.state.DescripcionCategoria} onChange={this.handleChange} className="form-control col-md-11" name="DescripcionCategoria"/>
										</div>
									</div>
									<div className="row">
										<div className="col-md-3">
											<Button type="submit" className="btn btn-danger btn-block">Realizar Cambios</Button>
										</div>
									</div>
									
								</form>
						</div>
					</Modal.Body>
					<Modal.Footer className="bg-dark">
						<button type="button" onClick={this.handleHide2} className="btn btn-primary bg-dark" style={{border:0}}>Cerrar</button>
					</Modal.Footer>
				</Modal>
				<h1 className="card text-white bg-dark col-md-12">
				<h6 className="col-md-12 text-center">Tienda online de productos de excelente calidad</h6>
				<h6 className="col-md-12 text-center">Perfil de Vendedor</h6>
				<div className="card-header">Product Store</div>
						<nav className="navbar navbar-expand-lg navbar-dark bg-dark col-md-12">
						  <a className="navbar-brand" href="/">Cerrar Sesión</a>
						  <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarColor02" aria-controls="navbarColor02" aria-expanded="false" aria-label="Toggle navigation">
						    <span className="navbar-toggler-icon"></span>
						  </button>
						  <form className="form-inline">
						  		<div className="form-group">
						  			<label style={{'fontSize':'17px'}} htmlFor="Sucursal">Sucursal:</label>
									  <select value={this.state.servidor} onChange={this.handleChange} className="form-control bg-dark text-white" style={{border:0,'fontSize':'17px'}} name="servidor" id="Sucursal">
								      <option value="LI">Limón</option>
								      <option value="CA">Cartago</option>
							    	</select>
							    </div>
						  	</form>
						  	<a className="navbar-brand col-md-2" href="/busquedaAvanzada">Busqueda avanzada</a>
						</nav>
				</h1>
				<form onSubmit={this.handleSubmit} className="col-md-12">
					<legend className="text-center">Agregar Producto</legend>
					<div className="row">
						<div className="form-group col-md-3">
							  <label>Nombre:</label>
							  <input type="text" value={this.state.NombreProducto} onChange={this.handleChange} className="form-control col-md-10" name="NombreProducto"/>
						</div>
						<div className="form-group col-md-3">
						  <label>Descripción:</label>
						  <input type="text" value={this.state.DescripcionProducto} onChange={this.handleChange} className="form-control col-md-10" name="DescripcionProducto"/>
						</div>
						<div className="form-group col-md-3">
						  <label>ID Categoría:</label>
						  <input type="text" value={this.state.idCategoria} onChange={this.handleChange} className="form-control col-md-10" name="idCategoria"/>
						</div>
						<div className="form-group col-md-2">
						  <label>Precio:</label>
						  <input type="number" value={this.state.Precio} onChange={this.handleChange} className="form-control col-md-10" name="Precio"/>
						  <br/>
						</div>
					</div>
					<legend className="text-center">Agregar Categoría</legend>
					<div className="row">
						<div className="form-group col-md-6">
						   <label>Nombre:</label>
							<input type="text" value={this.state.NombreCategoria} onChange={this.handleChange} className="form-control col-md-7" name="NombreCategoria"/>
						</div>
						<div className="form-group col-md-6">
						  <label>Descripción:</label>
						  <input type="text" value={this.state.DescripcionCategoria} onChange={this.handleChange} className="form-control col-md-7" name="DescripcionCategoria"/>
						</div>
					</div>
					<div className="row">
						<div className=" col-md-2">
							<Button type="submit" className="btn btn-secondary btn-block">Realizar Cambios</Button>
							<br/>
						</div>
						<div className=" col-md-2">
							<Button onClick={this.resetFilters} className="btn btn-secondary btn-block">Reset</Button>
							<br/>
						</div>
					</div>
				</form>
				<legend className="text-center">Lista de Productos</legend>
				<form onSubmit={this.handleProducts} className="col-md-12">
					<div className="row">
						<div className="col-md-3">
							<Button type="submit" className="btn btn-secondary btn-block">Ver Productos y Categorías en Inventario</Button>
							<br/>
						</div>
					</div>
				</form>
					
					<table className="table table-striped table-bordered text-center">
					    <thead>
					    	<tr className="table-dark text-dark">
						      <td>Nombre del Producto</td>
							  <td>Descripción</td>
							  <td>Precio</td>
							  <td>Cantidad en Inventario</td>
							</tr>
						</thead>
						<tbody>
						{
							this.state.resultados.map((resultados)=>(
							<tr onClick={()=>this.handleShow1(
									[
										resultados.NombreProducto,
										resultados.Descripcion,
										resultados.Precio,
										resultados.Cantidad,
										resultados.idProducto,
										resultados.idCategoria
									]
								)}>
								<td>{resultados.NombreProducto}</td>
								<td>{resultados.Descripcion}</td>
								<td>{resultados.Precio+"₡"}</td>
								<td>{resultados.Cantidad}</td>								
							</tr>
							))
						}
						</tbody>
					</table>
					<legend className="text-center">Lista de Categorías</legend>
				<table className="table table-striped table-bordered text-center">
					    <thead>
					    	<tr className="table-dark text-dark">
						     <td>Nombre de la Categoría</td>
							  <td>Descripción</td>
							</tr>
						</thead>
						<tbody>
						{
							this.state.categorias.map((categorias)=>(
							<tr onClick={()=>this.handleShow2(
									[
										categorias.NombreCategoria,
										categorias.Descripcion,
										categorias.idCategoria
									]
								)}>
								<td>{categorias.NombreCategoria}</td>
								<td>{categorias.Descripcion}</td>								
							</tr>
							))
						}
						</tbody>
					</table>




			</div>
		);
	}
}
export default ModuloVendedor;