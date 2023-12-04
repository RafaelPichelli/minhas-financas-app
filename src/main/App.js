import React from "react";
import Rotas from "./rotas";
import ProvedorAutenticacao from "./provedorAutenticacao";
import Navbar from "../components/navbar";

import 'bootswatch/dist/flatly/bootstrap.css';
import '../custom.css';
import 'toastr/build/toastr.css'
import 'toastr/build/toastr.min.js'
import 'primereact/resources/themes/bootstrap4-light-blue/theme.css'
import 'primereact/resources/primereact.min.css'
import 'primeicons/primeicons.css'

class App extends React.Component {
  render() {
    return (
      <ProvedorAutenticacao>
        <Navbar />
        <div className="container">
          <Rotas />
        </div>
      </ ProvedorAutenticacao>
    );
  };
};

export default App;
