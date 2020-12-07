import React,{Component} from 'react';
import {BrowserRouter,Route} from 'react-router-dom';
import PaginaPrincipal from './components/PaginaPrincipal.js';
import ModuloVendedor from './components/ModuloVendedor.js';
import BusquedaAvanzada from './components/BusquedaAvanzada.js';
class App extends Component {
  render() {
    return(
      <BrowserRouter>
      	<Route exact path="/moduloVendedor" component={ModuloVendedor}/>
        <Route exact path="/" component={PaginaPrincipal}/>
        <Route exact path="/busquedaAvanzada" component={BusquedaAvanzada}/>
       </BrowserRouter>
    );
}
  
}
export default App;
