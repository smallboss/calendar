import React, {Component} from 'react';
import moment from 'moment';

import {List, Typography, Icon} from 'antd';

import * as Utils from '../../../utils/utils';

import './CalendarDay.css';
import ActionTypes from "../../../redux/constants/actionTypes";
import {connect} from "react-redux";



class CalendarDay extends Component {

    state = {
        selectedDate: new moment(),
    };

    getListData() {
        const { eventList, selectedDate, checkedEventTypeList } = this.props;
        const selectedTime = new moment(selectedDate, 'x');

        let listData = [];

        eventList.forEach( eventItem => {
            const momentTime = new moment(eventItem.date, 'x');

            const isAllowEventType = checkedEventTypeList.indexOf( eventItem.selectedEventType ) > -1;

            if ( momentTime.year()  === selectedTime.year()  &&
                 momentTime.month() === selectedTime.month() &&
                 momentTime.date()  === selectedTime.date()  && isAllowEventType)
            {

                const isExpired = (momentTime < Date.now()) ? 'danger' : 'success';
                listData.push({ ...eventItem, isExpired });
            }
        });

        return Utils.sortArrayByKey(listData, 'date');
    }



    render() {

        const { selectedDate, deleteEvent, toEditEvent } = this.props;
        const selectedTime = new moment(selectedDate, 'x');

        const listData = this.getListData();

        const getlistItemRender = (eventItem) => {
            const momentTime = new moment(eventItem.date, 'x');

            if ( eventItem.date < Date.now() )
                return (
                    <List.Item>
                        <Typography.Text delete>[{momentTime.format('HH:mm')}]</Typography.Text>
                        { eventItem.eventTitle }
                        <span className="wrap-event-rules">
                            <Icon type="edit" onClick={() => toEditEvent(eventItem.id)} />
                            <Icon type="close-circle" style={{ marginLeft: 10 }} onClick={() => deleteEvent(eventItem.id)} />
                        </span>
                    </List.Item>
                );
            else
                return (
                    <List.Item>
                        <Typography.Text mark>[{momentTime.format('HH:mm')}]</Typography.Text>
                        { eventItem.eventTitle }
                        <span className="wrap-event-rules">
                            <Icon type="edit" onClick={() => toEditEvent(eventItem.id)} />
                            <Icon type="close-circle" style={{ marginLeft: 10 }} onClick={() => deleteEvent(eventItem.id)} />
                        </span>
                    </List.Item>
                )
        };

        return (
            <div className="wrap-list-day">
                <List
                    header={<div className="list-header-day">{ selectedTime.format('D dddd') }</div>}
                    bordered
                    dataSource={listData}
                    renderItem={eventItem => getlistItemRender(eventItem)}
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
)(CalendarDay);
