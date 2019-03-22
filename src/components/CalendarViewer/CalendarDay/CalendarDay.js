import React, {Component} from 'react';

import {Calendar, Badge} from 'antd';

import './CalendarYear.css';
import ActionTypes from "../../../redux/constants/actionTypes";
import {connect} from "react-redux";


class CalendarViewer extends Component {

    getListData(value) {

        const { eventTypeList, eventList } = this.props;

        let listData = {};

        eventTypeList.forEach( eventType => listData[eventType] = 0);

        eventList.forEach( event => {
            if ( event.date.start.month() === value.month() ) {
                const currEventType = eventTypeList[ event.selectedEventType ];
                if ( listData[ currEventType ] === undefined )  {
                    listData[ currEventType ] = 0;
                }

                listData[ currEventType ]++;
            }
        });

        return listData;
    }

    dateListRender(value) {

        const listData = this.getListData(value);

        let eventCount = 0;
        const renderData = [];

        for( let eventLine in listData ) {
            eventCount += listData[ eventLine ];
            renderData.push({
                eventType: eventLine,
                eventCount: listData[ eventLine ]
            });
        }

        if ( eventCount ) {
            return (
                <div className="events">
                    {
                        renderData.map((item, index) => {
                            if ( item.eventCount ) {
                                return (
                                    <div key={index} className="row-year-event">
                                        <Badge count={item.eventCount} showZero
                                               style={{backgroundColor: '#52c41a'}}/> <span className="event-type-year">{item.eventType}</span>
                                    </div>
                                )
                            }
                        })
                    }
                </div>
            )
        }
    }

    render() {

        return (
            <div className="calendar-viewer">
                <Calendar mode="year" monthCellRender={this.dateListRender.bind(this)}/>
            </div>
        );
    }

}

const mapStateToProps = state => {
    return {
        eventTypeList: state.root.eventTypeList,
        eventList: state.root.eventList,
    }
};

const mapDispatchToProps = dispatch => {
    return {
        setCurrViewType: ( newCurrViewType ) => {
            dispatch({type: ActionTypes.SET_CURR_VIEW_TYPE, payload: newCurrViewType});
        },
        changeCheckedEventTypeList: ( checkedEventTypeList ) => {
            dispatch({type: ActionTypes.CHANGE_CHECKED_EVENT_TYPE_LIST, payload: checkedEventTypeList});
        },

        openCreateEvent: () => {
            dispatch({type: ActionTypes.OPEN_CREATE_EVENT});
        },
        cancelCreateEvent: () => {
            dispatch({type: ActionTypes.CANCEL_CREATE_EVENT});
        },

        addEvent: (eventData) => {
            console.log('eventData', eventData);
            dispatch({type: ActionTypes.ADD_EVENT, payload: eventData});
        },
    }
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(CalendarViewer);
