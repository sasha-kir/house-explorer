import React, { Component } from "react";
import './HistoryPage.sass';

import emptyState from '../../images/NoGPS.png';

import HistoryTable from '../history-table/HistoryTable';


class HistoryPage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            loading: true,
            history: 0,
            activePage: 1
        }
    }

    async componentDidMount() {
        const token = localStorage.getItem("userToken");
        try {
            let response = await fetch("http://localhost:5000/history", {
                method: "POST",
                headers: {'Content-Type': 'application/json'},
                body: JSON.stringify({ token })
            });
            if (response.status === 200) {
                let data = await response.json();
                this.setState({ history: data.history, loading: false });
            } else {
                console.log("error fetching history from server");
                this.setState({ loading: false });
            }
        } catch (TypeError) {
            console.log("error fetching history from server");
            this.setState({ loading: false });
        }
    }

    deleteEntry = async (index) => {
        let { history } = this.state;
        let houseToDelete = history.splice(index, 1);
        try {
            let response = await fetch("http://localhost:5000/delete_house", {
            method: "POST",
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({
                token: localStorage.getItem("userToken"),
                houseCoords: houseToDelete[0].houseCoords
            })
            });
            if (response.status === 200) {
                this.setState({ history });
            } else {
                console.log("server error while deleting house")
            }
        } catch (TypeError) {
            console.log("server error while deleting house")
        }
    }

    handlePageChange = (e, {activePage}) => {
        this.setState({ activePage} );
    }

    contentSwitcher = () => {
        if (this.state.history === null || !this.state.history.length) {
            return (
                <div className="empty-history-wrapper">
                    <img alt="map pin" src={emptyState} />
                    <div className="empty-history-text heading">Nothing in history yet</div>
                    <div className="empty-history-text">
                        Use the bookmark icon on the "About this house" card to add house to history
                    </div>
                </div>
            )
        } else {
            return (
                <div className="history-table-wrapper">
                    <HistoryTable 
                        activePage={this.state.activePage}
                        history={this.state.history} 
                        handlePageChange={this.handlePageChange}
                        deleteEntry={this.deleteEntry}    
                    />
                </div>
            )
        }
    }

    render() {
        if (this.state.loading) return null;
        return (
            <div className="history-main-div">
                {this.contentSwitcher()}
            </div>
        );
    }
}

export default HistoryPage;