import React, {Component} from 'react';
import moment from 'moment';
import {connect} from 'react-redux';
import {Select, Checkbox, Calendar, Button} from 'antd';

import ActionTypes from '../../redux/constants/actionTypes';

import CreateEvent from './CreateEvent/CreateEvent';

import './SidePanel.css';

const Option = Select.Option;
const CheckboxGroup = Checkbox.Group;

class SidePanel extends Component {
    state = {
        viewTypesList: ['day', 'week', 'month', 'year'],
    };

    onChangeCheckedEventList( checkedList ) {
        const checkedListId = [];

        this.props.eventTypeList.forEach( (eventType, index) => {
            const isChecked = checkedList.indexOf( eventType );
            if ( isChecked > -1 ) checkedListId.push( index );
        });
        
        this.props.changeCheckedEventTypeList( checkedListId );
    }

    onDayChange(value, mode) {
    }

    onSaveEvent(eventData) {
        this.props.saveEvent(eventData);
    }


    render() {
        const { eventTypeList, currViewType, checkedEventTypeList, isCreateOpen, openCreateEvent, cancelCreateEvent, changeTypeView, selectedDate, editEvent } = this.props;

        const checkedEventTypeNames = [];
        checkedEventTypeList.forEach( idEventType => checkedEventTypeNames.push( eventTypeList[idEventType] ) );

        return (
            <div className="side-panel">

                <Button type="primary" icon="plus" size="large" onClick={openCreateEvent}>Add Event</Button>
                <CreateEvent
                    date={new moment(selectedDate, 'x')}
                    eventTypeList={eventTypeList}
                    isOpen={isCreateOpen}
                    editEvent={editEvent}
                    onCreate={(eventData) => this.onSaveEvent(eventData)}
                    onCancel={cancelCreateEvent}
                />

                <br/>

                <Select value={this.state.viewTypesList[currViewType]} onChange={(value) => this.props.setCurrViewType(value)}>
                    {
                        this.state.viewTypesList.map((el, index) => (<Option key={index} value={index}>{el}</Option>))
                    }
                </Select>

                <br/>

                <div style={{ width: 300, border: '1px solid #d9d9d9', borderRadius: 4 }}>
                    <Calendar fullscreen={false} onPanelChange={this.onDayChange.bind(this)} onSelect={changeTypeView} />
                </div>

                <br/>

                <CheckboxGroup options={eventTypeList} className="wrap-event-types" value={checkedEventTypeNames} onChange={this.onChangeCheckedEventList.bind(this)} />

            </div>
        );
    }

}

const mapStateToProps = state => {
    return {
        eventTypeList: state.root.eventTypeList,
        currViewType: state.root.currViewType,
        checkedEventTypeList: state.root.checkedEventTypeList,
        isCreateOpen: state.root.isCreateOpen,
        selectedDate: state.root.selectedDate,
        editEventId: state.root.editEventId,
        editEvent: state.root.eventList.filter( eventItem => eventItem.id === state.root.editEventId )[0],
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
            const payload = { selectedDate };
            dispatch({type: ActionTypes.CHANGE_TYPE_VIEW, payload: payload});
        },

        openCreateEvent: () => {
            dispatch({type: ActionTypes.OPEN_CREATE_EVENT});
        },
        cancelCreateEvent: () => {
            dispatch({type: ActionTypes.CANCEL_CREATE_EVENT});
        },

        saveEvent: (eventData) => {
            dispatch({type: ActionTypes.SAVE_EVENT, payload: eventData});
        },
    }
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(SidePanel);
