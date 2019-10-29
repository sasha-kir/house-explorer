import React, { Component } from "react";
import './HistoryPage.sass';

import { Icon, Menu, Button, Popup, Table } from "semantic-ui-react";

import emptyState from '../../images/NoGPS.png';

class HistoryPage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            loading: true,
            history: 0
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

    constructTableRows = () => {
        let { history } = this.state;
        let tableBody = [];
        for (let i = 0; i < history.length; i++) {
            tableBody.push(
                <Table.Row key={i}>
                    <Table.Cell>
                        <Icon name="calendar outline" />
                        { new Date(Date.parse(history[i].date)).toLocaleDateString("en-GB") }
                    </Table.Cell>
                    <Table.Cell>{history[i].houseInfo.address}</Table.Cell>
                    <Table.Cell>{history[i].houseInfo.yearBuilt}</Table.Cell>
                    <Table.Cell>
                        <Popup
                            trigger={<Button circular basic color='blue' icon="map marker alternate" />}
                            content='Show on map'
                            size='small'
                            position='top center'
                        />
                    </Table.Cell>
                    <Table.Cell>
                        <Popup
                            trigger={<Icon link size="large" name="trash alternate outline" />}
                            content='Delete'
                            size='small'
                            position='top center'
                        />
                    </Table.Cell>
                </Table.Row>
            );
        };
        return tableBody;
    }

    contentSwitcher = () => {
        if (this.state.history === null) {
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
                    <Table selectable unstackable textAlign="center">
                        <Table.Header>
                        <Table.Row>
                            <Table.HeaderCell>Date added</Table.HeaderCell>
                            <Table.HeaderCell>Address</Table.HeaderCell>
                            <Table.HeaderCell>Year Built</Table.HeaderCell>
                            <Table.HeaderCell />
                            <Table.HeaderCell />
                        </Table.Row>
                        </Table.Header>

                        <Table.Body>
                            {this.constructTableRows()}
                        </Table.Body>

                        <Table.Footer>
                        <Table.Row>
                            <Table.HeaderCell colSpan="5">
                            <Menu floated="right" pagination>
                                <Menu.Item as="a" icon>
                                <Icon name="chevron left" />
                                </Menu.Item>
                                <Menu.Item as="a">1</Menu.Item>
                                <Menu.Item as="a">2</Menu.Item>
                                <Menu.Item as="a">3</Menu.Item>
                                <Menu.Item as="a">4</Menu.Item>
                                <Menu.Item as="a" icon>
                                <Icon name="chevron right" />
                                </Menu.Item>
                            </Menu>
                            </Table.HeaderCell>
                        </Table.Row>
                        </Table.Footer>
                    </Table>

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