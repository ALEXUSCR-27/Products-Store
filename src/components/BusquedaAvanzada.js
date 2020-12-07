import React,{Component} from 'react';
import {Modal,Button} from 'react-bootstrap';
import axios from 'axios';
import Detalles from './Detalles.js';
class BusquedaAvanzada extends Component {
	constructor(props){
		super(props);
		this.state = {
			servidor:'LI',
			NumeroFacturaI:'',
			NumeroFacturaF:'',
			NombreCliente:'',
			FechaI:'',
     		FechaF:'',
     		FechaFacturacion:'',
     		TotalLinea:'',
     		show:false,
			resultados:[],
			detalles:[]
		}
			this.handleSubmit = this.handleSubmit.bind(this);
			this.handleDetalles = this.handleDetalles.bind(this);
			this.handleChange = this.handleChange.bind(this);
			this.handleShow = this.handleShow.bind(this);
			this.handleHide = this.handleHide.bind(this);
	}
	handleShow=(event,lista)=> {
		Detalles.idFactura=lista[0];
		Detalles.servidor=this.state.servidor;
		console.log(this.state);
		this.handleDetalles(event);
	}
	handleHide=()=>{this.setState({show:false});}
	handleChange=(e)=>{
		this.setState({
			[e.target.name]:e.target.value
		})
	}
	handleSubmit=(event)=>{
		event.preventDefault();
		console.log(this.state);
		axios.post("http://localhost:9000/facturas/buscar",this.state)
			.then( response => {
				const resultado = response.data;
				this.setState({resultados:resultado})
				console.log(resultado);

			})
		.catch(error =>console.log(console.error));
	}
	handleDetalles=(event)=>{
		event.preventDefault();
		axios.post("http://localhost:9000/facturas/detalle",Detalles)
			.then( response => {
				const resultado = response.data;
				this.setState({detalles:resultado,show:true});
				console.log(resultado);
			})
		.catch(error =>console.log(console.error));
	}
	render() {
		return (
			<div>
				<Modal scrollable={true} animation={true} centered size="lg" show={this.state.show} onHide={this.handleHide}>

					<Modal.Header className="Modal.Header">
						<Modal.Title>Detalles Consulta Factura</Modal.Title>
					</Modal.Header>
					<Modal.Body>
						<div className="container-lg width=100">
							<table className="table table-hover text-center">
								<thead>
									<tr className="table-dark text-dark">
										<td>Nombre del Producto</td>
										<td>Precio Unitario</td>
										<td>Cantidad</td>
										<td>Total</td>
									</tr>
								</thead>
								<tbody>
									{
									this.state.detalles.map((detalles)=>(
									<tr>
										<td>{detalles.NombreProducto}</td>
										<td>{detalles.PrecioUnitario}</td>
										<td>{detalles.Cantidad}</td>
										<td>{detalles.TotalLinea}</td>
									</tr>
									))
								}
								</tbody>
							</table>
						</div>
					</Modal.Body>
					<Modal.Footer>
						<Button variant="secondary" onClick={this.handleHide}>Close</Button>
					</Modal.Footer>
				</Modal>
				<h1 className="card text-white bg-dark col-md-12">
					<h6 className="col-md-12 text-center">Tienda online de productos de excelente calidad</h6>
					<h6 className="col-md-12 text-center">BusquedaAvanzada</h6>
					<div className="card-header">Product Store</div>
							<nav className="navbar navbar-expand-lg navbar-dark bg-dark col-md-12">
							  <a className="navbar-brand" href="/moduloVendedor">Usuario Vendedor</a>
							  <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarColor02" aria-controls="navbarColor02" aria-expanded="false" aria-label="Toggle navigation">
							    <span className="navbar-toggler-icon"></span>
							  </button>
							   <form className="form-inline">
							  		<div className="form-group">
							  			<label style={{'fontSize':'17px'}} htmlFor="Sucursal">Sucursal:</label>
										<select value={this.state.Sucursal} onChange={this.handleChange} className="form-control bg-dark text-white" style={{border:0,'fontSize':'17px'}} name="servidor" id="Sucursal">
									      <option value="LI">Limón</option>
									      <option value="CA">Cartago</option>
								    	</select>
								    </div>
							  	</form>
							</nav>
				</h1>
				<form onSubmit={this.handleSubmit} className="col-md-12">
					<legend className="text-center">Consulta de facturas</legend>
					<div className="row">
						<div className="form-group col-md-3">
							  <label>Nombre del Cliente:</label>
							  <input type="text" value={this.state.NombreCliente} onChange={this.handleChange} className="form-control col-md-10" name="NombreCliente"/>
						</div>
						<div className="form-group col-md-2">
						  <label>Número de factura Inicio:</label>
						  <input type="number" value={this.state.NumeroFacturaI} onChange={this.handleChange} className="form-control col-md-5" name="NumeroFacturaI"/>
						</div>
						<div className="form-group col-md-2">
						  <label>Número de factura Fin:</label>
						  <input type="number" value={this.state.NumeroFacturaF} onChange={this.handleChange} className="form-control col-md-5" name="NumeroFacturaF"/>
						</div>
						<div className="col-md-6">
								<label>Rango de fechas</label>
								<div className="input-group input-daterange ">
									<div className="form-group">
										<label className="col-form-label col-form-label-sm" htmlFor="fecha1">De:</label>
								    	<input type="date" name="FechaI" onChange={this.handleChange} value={this.state.FechaI} className="form-control col-md-12" id="fecha1"/>
								    </div>
								    <div className="form-group offset-1">
										<label htmlFor="fecha2">Hasta:</label>
									    <input type="date" onChange={this.handleChange} value={this.state.FechaF} name="FechaF" className="form-control col-md-12" id="fecha2"/>
								    </div>
									</div>
						</div>
						<div className=" col-md-2">
							<Button type="submit" className="btn btn-secondary btn-block">Realizar Consulta</Button>
						</div>
					</div>
				</form>
				<table className="table table-striped table-bordered text-center">
					    <thead>
					    	<tr className="table-dark text-dark">
						     <td>Nombre del Cliente</td>
						     <td>Número de Factura</td>
							 <td>Fecha</td>
							 <td>Total</td>
							</tr>
						</thead>
						<tbody>
						{
							this.state.resultados.map((resultados)=>(
							<tr onClick={(e)=>this.handleShow(e,[resultados.idFactura])}>
								<td>{resultados.NombreCliente}</td>
								<td>{resultados.idFactura}</td>
								<td>{resultados.FechaFacturacion}</td>
								<td>{resultados.Total}</td>	
							</tr>
							))
						}
						</tbody>
					</table>


			</div>
		);
	}
}

export default BusquedaAvanzada;