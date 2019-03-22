import React, {Component} from 'react';

import {List, Card, Typography, Icon} from 'antd';

import * as Utils from '../../../utils/utils';

import './CalendarWeek.css';
import ActionTypes from "../../../redux/constants/actionTypes";
import {connect} from "react-redux";
import moment from "moment/moment";


class CalendarWeek extends Component {

    getListData() {
        const { eventList, selectedDate, checkedEventTypeList } = this.props;
        const selectedTime = new moment(selectedDate, 'x');

        const weekDays = [];
        for ( let i=0; i < 7; i++ ) {
            weekDays.push({
                date: new moment().startOf('isoWeek').add(i, 'days'),
                eventList: []
            });
        }

        eventList.forEach( eventItem => {
            const momentTime = new moment(eventItem.date, 'x');
            const isAllowEventType = checkedEventTypeList.indexOf( eventItem.selectedEventType ) > -1;

            if (momentTime.year()  === selectedTime.year()  &&
                momentTime.month() === selectedTime.month() && isAllowEventType)
            {
                weekDays.forEach( day => {
                    if ( momentTime.day() === day.date.day() ){
                        const isExpired = (eventItem.date < Date.now()) ? 'error' : 'success';
                        day.eventList.push({ ...eventItem, isExpired });
                    }
                });
            }
        });

        weekDays.forEach( day => {
            day.eventList = Utils.sortArrayByKey(day.eventList, 'date');
        });

        return weekDays;
    }



    render() {
        const { selectedDate, deleteEvent, toEditEvent } = this.props;
        const selectedTime = new moment(selectedDate, 'x');

        const listData = this.getListData();

        const getlistItemRender = (eventItem) => {
            const momentTime = new moment(eventItem.date, 'x');

            if ( eventItem.date < Date.now() )
                return (
                    <p key={eventItem.id}>
                        <Typography.Text delete>[{momentTime.format('HH:mm')}]</Typography.Text>
                        { eventItem.eventTitle }
                        <span className="wrap-event-rules">
                            <Icon type="edit" onClick={() => toEditEvent(eventItem.id)} />
                            <Icon type="close-circle" style={{ marginLeft: 10 }} onClick={() => deleteEvent(eventItem.id)} />
                        </span>
                    </p>
                );
            else
                return (
                    <p key={eventItem.id}>
                        <Typography.Text mark>[{momentTime.format('HH:mm')}]</Typography.Text>
                        { eventItem.eventTitle }
                        <span className="wrap-event-rules">
                            <Icon type="edit" onClick={() => toEditEvent(eventItem.id)} />
                            <Icon type="close-circle" style={{ marginLeft: 10 }} onClick={() => deleteEvent(eventItem.id)} />
                        </span>
                    </p>
                );
        };

        return (
            <div className="wrap-list-day wrap-list-week">
                <div className="list-header-day">{ selectedTime.week() + ' Week' }</div>
                <List
                    grid={{ column: 3 }}
                    dataSource={listData}
                    renderItem={ day => (
                        <List.Item>
                            <Card title={new moment(day.date, 'x').format('DD dddd')}>
                                {
                                    day.eventList.map( (eventItem) => getlistItemRender(eventItem) )
                                }
                            </Card>
                        </List.Item>
                    )}
                />
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

        openCreateEvent: () => {
            dispatch({type: ActionTypes.OPEN_CREATE_EVENT});
        },
        cancelCreateEvent: () => {
            dispatch({type: ActionTypes.CANCEL_CREATE_EVENT});
        },

        addEvent: (eventData) => {
            dispatch({type: ActionTypes.ADD_EVENT, payload: eventData});
        },
        deleteEvent: (eventId) => {
            dispatch({type: ActionTypes.DELETE_EVENT, payload: eventId});
        },
        toEditEvent: (eventId) => {
            dispatch({type: ActionTypes.TO_EDIT_EVENT, payload: eventId});
        },

    }
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(CalendarWeek);
