import { Component } from "react";
import './bar.css';


export default class Bar extends Component {

    render() {
        return (
            <nav className="bar">
                <div className="justify">

                    <div className="logo">

                        <h1>
                            <i className="material-icons icons">account_balance</i>
                            Banco
                        </h1>

                    </div>

                </div>

            </nav>
        );
    }

}