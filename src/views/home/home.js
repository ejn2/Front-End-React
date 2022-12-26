import { Component } from "react";

import './home.css';

export default class Home extends Component {

    constructor() {
        super();

        this.state = {
            content: [],
            startDate: null,
            endDate: null,
            fullName: null
        }
    }

    request(path="") {
        fetch(`http://localhost:8080/api/v1${path}`)
            .then( async (res) => {
                const { content } = await res.json();

                this.setState({content});
            });
    }

    handleSubmit = (event) => {
        event.preventDefault();

        if(this.state.startDate && this.state.endDate && this.state.fullName){
            this.request(`/transferencia/filter?start_date=${this.state.startDate+":00"}&end_date=${this.state.endDate+":00"}&nome_operador=${this.state.fullName}`);
            this.render();

        }else if(this.state.startDate && this.state.endDate) {
            this.request(`/transferencia/filter?start_date=${this.state.startDate+":00"}&end_date=${this.state.endDate+":00"}`);
            this.render();

        }else if(this.state.fullName) {
            const table = document.getElementById("show-table");

            fetch(`http://localhost:8080/api/v1/transferencia/${this.state.fullName}`)
                 .then( async (res) => {

                    const data = await res.json();

                    table.innerHTML="<th>Data</th><th>Valor</th><th>Tipo</th><th>Nome operador transacionado</th>";
                    table.innerHTML+=`<td>${data.dataTransferencia}</td> <td>R$ ${parseFloat(data.valor)}</td> <td>${data.tipo}</td> <td>${data.nomeOperadorTransacao}</td>`;
                    
                 });
        }
        
        else{
            this.render();
        }

    }

    handleChange = (event) => {
        event.preventDefault();
        this.setState({
            [event.target.name] : event.target.value
        })
    }

    componentDidMount() {
        this.request("/transferencia");
    }

    render() {
        const { content } = this.state;

        return(
            <div className="container">

                <div className="content-home">

                    <div className="filter">

                        <form onSubmit={this.handleSubmit}>

                            <div className="input-div">
                                <label htmlFor="start-date">Data de início</label>
                                <br/>
                                <input type="datetime-local" id="start-date" onChange={this.handleChange} name="startDate" />
                            </div>

                            <div className="input-div">
                                <label htmlFor="end-date">Data de fim</label>
                                <br/>
                                <input type="datetime-local" id="end-date" onChange={this.handleChange} name="endDate" />
                            </div>

                            <div className="input-div">
                                <label htmlFor="name">Nome operador transacionado</label>
                                <br/>
                                <input type="text" placeholder="Nome do operador" id="name" onChange={this.handleChange} name="fullName"/>
                            </div>
                            
                            <div className="btn">
                                <button type="submit">Pesquisar</button>
                            </div>

                        </form>

                    </div>

                    <div className="show">

                        <table className="show-table" id="show-table">
                            <th>Data</th><th>Valor</th><th>Tipo</th><th>Nome operador transacionado</th>
                            {
                                content.map((data, index) => (
                                <tr className="listagem" key={index}>
                                        <td>{data.dataTransferencia}</td>
                                        <td>R$ {parseFloat(data.valor).toFixed(2)}</td>
                                        <td>{data.tipo}</td>
                                        <td>{data.nomeOperadorTransacao}</td>

                                </tr>
                                ))
                            }
                        </table>

                        <br/>
                        <div className="paginator">Paginator!</div>

                    </div>
                    
                    <br/>

                </div>

            </div>
        );
    }

}