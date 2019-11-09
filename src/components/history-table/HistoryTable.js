import React from 'react';
import { Icon, Button, Popup, Table, Pagination } from "semantic-ui-react";

import './HistoryTable.sass';

const HistoryTable = ({ activePage, history, handlePageChange, deleteEntry }) => {

    const constructTableRows = () => {
        let pageStart = history.length - (1 + 5 * (activePage -1));
        let pageEnd = history.length - 5 * activePage;
        if (pageEnd < 0) pageEnd = 0;

        let tableBody = [];
        let mapBaseUrl = "https://yandex.ru/maps/";
        for (let i = pageStart; i >= pageEnd; i--) {
            let mapLink = `${mapBaseUrl}?pt=${history[i].houseCoords}&z=17&l=map`;
            tableBody.push(
                <Table.Row key={i}>
                    <Table.Cell className="desktop-only">
                        <Icon name="calendar outline" />
                        { new Date(Date.parse(history[i].date)).toLocaleDateString("en-GB") }
                    </Table.Cell>
                    <Table.Cell textAlign="left">{history[i].houseInfo.address}</Table.Cell>
                    <Table.Cell className="desktop-only">{history[i].houseInfo.yearBuilt}</Table.Cell>
                    <Table.Cell>
                        <a href={mapLink} target="_blank" rel="noopener noreferrer">
                            <Popup
                                trigger={<Button circular basic color='blue' icon="map marker alternate" />}
                                content='Show on map'
                                size='small'
                                position='top center'
                            />
                        </a>
                    </Table.Cell>
                    <Table.Cell>
                        <Popup
                            trigger={<Icon link onClick={() => deleteEntry(i)} size="large" name="trash alternate outline" />}
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

    return(
        <Table selectable unstackable textAlign="center">
            <Table.Header>
                <Table.Row>
                    <Table.HeaderCell className="desktop-only">date added</Table.HeaderCell>
                    <Table.HeaderCell textAlign="left">address</Table.HeaderCell>
                    <Table.HeaderCell className="desktop-only">year built</Table.HeaderCell>
                    <Table.HeaderCell />
                    <Table.HeaderCell />
                </Table.Row>
            </Table.Header>

            <Table.Body>
                {constructTableRows()}
            </Table.Body>

            <Table.Footer>
                <Table.HeaderCell colSpan="5">
                    <Pagination
                        defaultActivePage={1}
                        totalPages={Math.ceil(history.length / 5)}
                        onPageChange={handlePageChange}
                        firstItem={null}
                        lastItem={null}
                        prevItem={{ content: <Icon name='chevron left' />, icon: true }}
                        nextItem={{ content: <Icon name='chevron right' />, icon: true }}
                    />
                </Table.HeaderCell>
            </Table.Footer>
        </Table>

    );
};

export default HistoryTable;