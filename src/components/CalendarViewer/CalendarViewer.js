import React, {Component} from 'react';

import CalendarYear from './CalendarYear/CalendarYear';
import CalendarMonth from './CalendarMonth/CalendarMonth';
import CalendarWeek from './CalendarWeek/CalendarWeek';
import CalendarDay from './CalendarDay/CalendarDay';

import ActionTypes from "../../redux/constants/actionTypes";
import {connect} from "react-redux";

import './CalendarViewer.css';

class CalendarViewer extends Component {

    render() {

        const { currViewType } = this.props;

        const getCurrCalendar = (currViewType) => {
            switch( currViewType ) {
                case 3: return <CalendarYear />;
                case 2: return <CalendarMonth />;
                case 1: return <CalendarWeek />;
                case 0: return <CalendarDay />;
                default: return <CalendarDay />;
            }
        };

        return (
            <div className="calendar-viewer">
                { getCurrCalendar( currViewType ) }
            </div>
        );
    }
}


const mapStateToProps = state => {
    return {
        currViewType: state.root.currViewType,
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
    }
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(CalendarViewer);
