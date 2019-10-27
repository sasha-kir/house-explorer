import React from "react";
import './HistoryPage.sass';

import emptyState from '../../images/NoGPS.png';

const HistoryPage = () => {
    const history = null;

    const contentSwitcher = () => {
        if (history === null) {
            return (
                <div className="empty-history-wrapper">
                    <img alt="map pin" src={emptyState} />
                    <div className="empty-history-text heading">Nothing in history yet</div>
                    <div className="empty-history-text">
                        Use the bookmark icon on the "About this house" card to add it to history
                    </div>
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