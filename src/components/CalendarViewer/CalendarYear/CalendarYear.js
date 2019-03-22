import React, {Component} from 'react';

import {Calendar, Badge} from 'antd';

import './CalendarYear.css';
import ActionTypes from "../../../redux/constants/actionTypes";
import {connect} from "react-redux";
import moment from "moment/moment";


class CalendarYear extends Component {

    getListData(value) {

        const { eventTypeList, eventList, checkedEventTypeList } = this.props;

        let listData = {};

        eventTypeList.forEach( eventType => listData[eventType] = 0);

        eventList.forEach( eventItem => {
            const momentTime = new moment(eventItem.date, 'x');
            const isAllowEventType = checkedEventTypeList.indexOf( eventItem.selectedEventType ) > -1;

            if ( momentTime.month() === value.month() && isAllowEventType ) {
                const currEventType = eventTypeList[ eventItem.selectedEventType ];
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
                            let eventTypeDataRender = null;

                            if ( item.eventCount ) {
                                eventTypeDataRender = (
                                    <div key={index} className="row-year-event">
                                        <Badge count={item.eventCount} showZero
                                               style={{backgroundColor: '#52c41a'}}/> <span className="event-type-year">{item.eventType}</span>
                                    </div>
                                )
                            }

                            return eventTypeDataRender;
                        })
                    }
                </div>
            )
        }
    }


    render() {

        const { selectedDate, changeTypeView } = this.props;
        const selectedTime = new moment(selectedDate, 'x');

        return (
            <div className="calendar-viewer">
                <div className="list-header-day">{ selectedTime.year() }</div>
                <Calendar value={selectedTime} mode="year" monthCellRender={this.dateListRender.bind(this)} onSelect={changeTypeView}/>
            </div>
        );
    }

}

const mapStateToProps = state => {
    return {
        eventTypeList: state.root.eventTypeList,
        eventList: state.root.eventList,
        selectedDate: state.root.selectedDate,
        checkedEventTypeList: state.root.checkedEventTypeList,
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
        changeTypeView: ( selectedDate ) => {
            const payload = {
                currViewType: 2,
                selectedDate
            };
            dispatch({type: ActionTypes.CHANGE_TYPE_VIEW, payload: payload});
        },

        openCreateEvent: () => {
            dispatch({type: ActionTypes.OPEN_CREATE_EVENT});
        },
        cancelCreateEvent: () => {
            dispatch({type: ActionTypes.CANCEL_CREATE_EVENT});
        },

        addEvent: (eventData) => {
            dispatch({type: ActionTypes.ADD_EVENT, payload: eventData});
        },
    }
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(CalendarYear);
