import React, {Component} from 'react';

import {Calendar, Badge} from 'antd';

import ActionTypes from "../../../redux/constants/actionTypes";
import {connect} from "react-redux";

import * as Utils from '../../../utils/utils';

import './CalendarMonth.css';
import moment from "moment/moment";

class CalendarMonth extends Component {

    getListData(value) {
        const { eventList, checkedEventTypeList } = this.props;

        let listData = [];

        eventList.forEach( eventItem => {
            const momentTime = new moment(eventItem.date, 'x');
            const isAllowEventType = checkedEventTypeList.indexOf( eventItem.selectedEventType ) > -1;

            if ( momentTime.month() === value.month() &&
                 momentTime.date()  === value.date()  && isAllowEventType )
            {
                const isExpired = (momentTime < Date.now()) ? 'error' : 'success';
                listData.push({ ...eventItem, isExpired });
            }
        });

        return Utils.sortArrayByKey(listData, 'date');
    }

    dateListRender(value) {
        const listData = this.getListData(value);
        return (
            <div className="events">
                {
                    listData.map( (eventItem, index) => (
                        <div key={index}>
                            <Badge status={eventItem.isExpired} text={eventItem.eventTitle} />
                        </div>
                    ))
                }
            </div>
        );
    }


    render() {

        const { selectedDate, changeTypeView } = this.props;
        const selectedTime = new moment(selectedDate, 'x');

        return (
            <div className="calendar-viewer">
                <div className="list-header-day">{ `${selectedTime.format('YYYY MMMM')}` }</div>
                <Calendar value={selectedTime} mode="month" dateCellRender={this.dateListRender.bind(this)} onSelect={changeTypeView}/>
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
                currViewType: 1,
                selectedDate: selectedDate
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
)(CalendarMonth);
