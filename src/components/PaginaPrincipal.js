import React,{Component} from 'react';
import {Button,Modal} from 'react-bootstrap';
import {toast} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css'
import axios from 'axios';
import CarritoLogo from'../img/carrito-de-compras.png';
toast.configure();
class PaginaPrincipal extends Component {
	constructor(props){
		super(props);
		this.state = {
			FiltroProducto:'',
			FiltroCategoria:'',
			NombreUsuario:'',
			Contrasenia:'',
			servidor:'LI',
			Cantidad:'',
			Precio:'',
			NombreCliente:'',
			Total:0,
			idProducto:'',
			show1:false,
			show2:false,
			show3:false,
			resultados:[],
			Carrito:[]
		}
		this.handleShow1 = this.handleShow1.bind(this);
		this.handleHide1 = this.handleHide1.bind(this);
		this.handleShow2 = this.handleShow2.bind(this);
		this.handleHide2 = this.handleHide2.bind(this);
		this.handleShow3 = this.handleShow3.bind(this);
		this.handleHide3 = this.handleHide3.bind(this);
		this.handleSubmit = this.handleSubmit.bind(this);
		this.handleSubmit2= this.handleSubmit2.bind(this);
		this.handleChange = this.handleChange.bind(this);
		this.handlePurchase = this.handlePurchase.bind(this);
		this.handleVenta = this.handleVenta.bind(this);
		this.handleResetFilters = this.handleResetFilters.bind(this);
	}

	handleShow1=()=> {this.setState({show1:true});}
	handleHide1=()=>{this.setState({show1:false});}
	handleShow2=()=> {this.setState({show2:true});}
	handleHide2=()=>{this.setState({show2:false});}
	handleShow3=()=> {this.setState({show3:true});
		var total = 0;
		var x = 0;
		for (x in this.state.Carrito) {
			total+=(this.state.Carrito[x].Precio*this.state.Carrito[x].Cantidad)
		}
		this.setState({Total:total})
		console.log(this.state);
	}
	handleResetFilters=(event)=> {
		this.setState({
			NombreCliente:'',
			Total:'',
		})
	}
	handleHide3=()=>{this.setState({show3:false});}

	handleVenta=(event)=> {
		if (this.state.NombreCliente!=''){
		event.preventDefault();
		console.log(this.state);
		toast("Procesando compra");
		axios.post("http://localhost:9000/venta",this.state)
			.then( response => {
				const resultado = response.data;
				this.handleHide3();
				toast("La compra se ha realizado con exito!!")
				console.log(resultado);
				this.handleResetFilters(event);
			})
		.catch(error =>console.log(console.error));
		console.log(this.state)
		}
		else {
			toast("Error para realizar la compra.... Ingrese su nombre completo en el campo respectivo!!")
		}
	}

	handleSubmit=(event)=>{
		event.preventDefault();
		console.log(this.state);
		axios.post("http://localhost:9000/productos/buscar",this.state)
			.then( response => {
				const resultado = response.data;
				this.setState({resultados:resultado})
				console.log(resultado);
			})
		.catch(error =>console.log(console.error));
	}
	handleSubmit2=(event)=>{
		event.preventDefault();
		console.log(this.state);
		axios.post("http://localhost:9000/productos/ver",this.state)
			.then( response => {
				const resultado = response.data;
				this.setState({resultados:resultado})
				console.log(resultado);
			})
		.catch(error =>console.log(console.error));
	}

	handleChange=(e)=>{
		this.setState({
			[e.target.name]:e.target.value
		})
	}

	handlePurchase=()=>{}
	handleCorporativo=()=>{}

	handleVendedor=(event)=>{
		event.preventDefault();
		axios.post("http://localhost:9000/usuario",this.state)
			.then( response => {
				const resultado = response.data;
				console.log(resultado);
				if (resultado.[0].EstadoSesion!=1){
					toast("Error en el inicio de sesion.\nEl nombre de usuario o la contraseña es incorrecta... Intente de nuevo")
				}
				else{
					this.props.history.push('/moduloVendedor')
				}
			})
		.catch(error =>console.log(console.error));
	}

	render() {
		return(
			<div>
				<Modal centerd="true" size="md" show={this.state.show1} animation={true} onHide={this.handleHide1}>
					<Modal.Header className="Modal.Header bg-dark text-white">
						<Modal.Title>Ingrese su nombre de usuario y contraseña</Modal.Title>
					</Modal.Header>
					<Modal.Body>
						<div className="container-lg width=100">
							<div className="row">
								<form onSubmit={this.handleVendedor} className="col-md-12">
									<div className="form-group">
										<legend>Usuario</legend>
										<input type="text" value={this.state.NombreUsuario} onChange={this.handleChange}  className="form-control" id="NombreUsuario" name="NombreUsuario"/>
									</div>
									<div className="form-group">
										<legend>Contraseña</legend>
										<input type="password" value={this.state.Contrasenia} onChange={this.handleChange} className="form-control" id="Contraseña" name="Contrasenia"/>
									</div>
									<div>
										<button type="submit" className="btn btn-outline-primary offset-5" style={{'font-size':'17px'}}>Login</button>
									</div>
								</form>
							</div>
						</div>
					</Modal.Body>
					<Modal.Footer className="bg-dark">
						<button type="button" onClick={this.handleHide1} className="btn btn-primary bg-dark" style={{border:0}}>Cerrar</button>
					</Modal.Footer>
				</Modal>
				<Modal centerd="true" size="md" show={this.state.show2} animation={true} onHide={this.handleHide2}>
					<Modal.Header className="Modal.Header bg-dark text-white">
						<Modal.Title>Ingrese su nombre de usuario y contraseña</Modal.Title>
					</Modal.Header>
					<Modal.Body>
						<div className="container-lg width=100">
							<div className="row">
								<form onSubmit={this.handleCorporativo} className="col-md-12">
									<div className="form-group">
										<legend>Usuario</legend>
										<input type="text" value={this.state.NombreUsuario} onChange={this.handleChange}  className="form-control" id="NombreUsuario" name="NombreUsuario"/>
									</div>
									<div className="form-group">
										<legend>Contraseña</legend>
										<input type="password" value={this.state.Contrasenia} onChange={this.handleChange} className="form-control" id="Contraseña" name="Contrasenia"/>
									</div>
									<div>
										<button type="submit" className="btn btn-outline-primary offset-5" style={{'font-size':'17px'}}>Login</button>
									</div>
								</form>
							</div>
						</div>
					</Modal.Body>
					<Modal.Footer className="bg-dark">
						<button type="button" onClick={this.handleHide2} className="btn btn-primary bg-dark" style={{border:0}}>Cancelar</button>

					</Modal.Footer>
				</Modal>
				<Modal centerd="true" size="lg" show={this.state.show3} animation={true} onHide={this.handleHide3}>
					<Modal.Header className="Modal.Header bg-dark text-white">
						<Modal.Title>Lista de productos en el carrito</Modal.Title>
					</Modal.Header>
					<Modal.Body>
						<div className="container-lg width=100">
							<div className="row">
								<form onSubmit={this.handlePurchase} className="col-md-12">
									<div className="form-group">
										<legend>Nombre Cliente</legend>
										<input type="text" value={this.state.NombreCliente} onChange={this.handleChange}  className="form-control" id="NombreCliente" name="NombreCliente"/>
									</div>
									<table className="table table-hover text-center">
									    <thead>
									    	<tr className="table-dark text-dark">
										      <td>Nombre del Producto</td>
											  <td>Precio</td>
											  <td>Cantidad seleccionada</td>
											  </tr>
										</thead>
										<tbody>
											{
											this.state.Carrito.map((Carrito)=>(
											<tr>
												<td>{Carrito.NombreProducto}</td>
												<td>{Carrito.Precio+"₡"}</td>
												<td>{Carrito.Cantidad}</td>
											</tr>
											))
										}
										</tbody>
									</table>
								</form>
							</div>
						</div>
					</Modal.Body>
					<Modal.Footer className="bg-dark">
						<label className="text-white">Total</label>
						<input type="text" value={this.state.Total} name="Total"></input>
						<button type="button" onClick={this.handleHide3} className="btn btn-primary bg-dark" style={{border:0}}>Cerrar</button>
						<button type="button" onClick={this.handleVenta} className="btn btn-danger bg-dark">Comprar</button>
					</Modal.Footer>
				</Modal>
				<h1 className="card text-white bg-dark col-md-12">
				<h6 className="col-md-12 text-center">Tienda online de productos de excelente calidad</h6>
					<div className="card-header">Product Store</div>
						<nav className="navbar navbar-expand-lg navbar-dark bg-dark col-md-12">
							<div className="col-md-2">
						 		<button type="button" onClick={this.handleShow1} className="btn btn-primary bg-dark" style={{border:0,'font-size':'15px'}}>Usuario Vendedor</button>
						 	</div>
							<div className="col-md-2">
								<button type="button" onClick={this.handleShow2} className="btn btn-primary bg-dark" style={{border:0,'font-size':'15px'}}>Usuario Corporativo</button>
							</div>
							<form onSubmit={this.handleSubmit} className="form-inline">
						  		<div className="form-group offset-2">
						  			<label style={{'font-size':'17px'}} for="Sucursal">Sucursal:</label>
									  <select value={this.state.servidor} onChange={this.handleChange} className="form-control bg-dark text-white" style={{border:0,'font-size':'17px'}} name="servidor" id="Sucursal">
								      <option value="LI">Limón</option>
								      <option value="CA">Cartago</option>
							    	</select>
							    </div>
						  	</form>
						  	<h1 className="display-4 offset-6">
								<Button onClick={this.handleShow3} className="btn btn-dark btn-fluid" alt="logoCarrito" style={{border:0,'font-size':'5px'}}>
									<img className="img" alt="logoCarrito" src= {CarritoLogo}/>
								</Button>
							</h1>
						</nav>
				</h1>
				<form onSubmit={this.handleSubmit} className="col-md-12">
					<div className="row">
						<div className="form-group col-md-4">
						  <legend>Busqueda por Nombre</legend>
						  <input type="text" onChange={this.handleChange} value={this.state.FiltroProducto} className="form-control col-md-8" name="FiltroProducto" id="BusquedaNombre"/>
						</div>
						<div className="form-group col-md-4">
						  <legend>Busqueda por Categoría</legend>
						  <input type="text" onChange={this.handleChange} value={this.state.FiltroCategoria}  className="form-control col-md-8" name="FiltroCategoria" id="BusquedaCategoria"/>
						</div>
						<div className=" col-md-2">
							<br/>
							<br/>
							<Button type="submit" className="btn btn-secondary btn-block">Realizar Consulta</Button>
						</div>
					</div>
				</form>
				<form onSubmit={this.handleSubmit2} className="col-md-12">
					<div className="row">
						<div className="col-md-2">
							<Button type="submit" className="btn btn-secondary btn-block">Ver Productos en Inventario</Button>
							<br/>						
						</div>
					</div>
				</form>
					<table className="table table-hover text-center">
					    <thead>
					    	<tr className="table-dark text-dark">
					    	  <td>Agregar al carrito</td>
						      <td>Nombre del Producto</td>
							  <td>Precio</td>
							  <td>Cantidad en Inventario</td>
							  <td>Seleccionar Cantidad</td>
							  </tr>
						</thead>
						<tbody>
							{
							this.state.resultados.map((resultados)=>(
							<tr>
								<td><input onChange={(e)=>{
									if (e.target.checked) {
										if (document.getElementById(resultados.NombreProducto).value!=0){
											this.state.Carrito.push({"NombreProducto":resultados.NombreProducto,"Cantidad":document.getElementById(resultados.NombreProducto).value,"Precio":resultados.Precio,"idProducto":resultados.idProducto});
										}
									}
									else {
										
										
									}
									console.log(this.state.Carrito);
								}} type="checkbox"></input></td>
								<td>{resultados.NombreProducto}</td>
								<td>{resultados.Precio+"₡"}</td>
								<td>{resultados.Cantidad}</td>
								<td><input type="number" className="form-control form-control-sm col-md-2 offset-5" min="0" max={resultados.Cantidad} id={resultados.NombreProducto}></input></td>
							</tr>
							))
						}
						</tbody>
					</table>
					<form className="col-md-12">
						<div className="row">
							<div className="col-md-2 offset-10">
								<br/>
								<Button onClick={this.handleShow3} className="btn btn-danger">Realizar Compra</Button>
							</div>
						</div>
					</form>
			</div>
		)
	}
};
export default PaginaPrincipal;