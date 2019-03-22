import React, {Component} from 'react';

import CalendarYear from './CalendarYear/CalendarYear';

import './CalendarViewer.css';


class CalendarViewer extends Component {

    render() {

        return (
            <div className="calendar-viewer">
                <CalendarYear />
            </div>
        );
    }

}


export default CalendarViewer;
