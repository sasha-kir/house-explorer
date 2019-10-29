import React from "react";
import './HistoryPage.sass';

import { Icon, Menu, Button, Popup, Table } from "semantic-ui-react";

import emptyState from '../../images/NoGPS.png';

const HistoryPage = () => {
    const history = 0;

    const contentSwitcher = () => {
        if (history === null) {
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
                        <Table.Row>
                            <Table.Cell>
                            <Icon name="calendar outline" /> 23/10/2019
                            </Table.Cell>
                            <Table.Cell>Москва, Нагатинский бульвар, 6</Table.Cell>
                            <Table.Cell>1992</Table.Cell>
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
                        <Table.Row>
                            <Table.Cell>
                            <Icon name="calendar outline" /> 24/10/2019
                            </Table.Cell>
                            <Table.Cell>Нагатинский бульвар, 6</Table.Cell>
                            <Table.Cell>1992</Table.Cell>
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
                        <Table.Row>
                            <Table.Cell>
                            <Icon name="calendar outline" /> 25/10/2019
                            </Table.Cell>
                            <Table.Cell>Нагатинский бульвар, 6</Table.Cell>
                            <Table.Cell>1992</Table.Cell>
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

    return (
        <div className="history-main-div">
            {contentSwitcher()}
        </div>
    )
}

export default HistoryPage;