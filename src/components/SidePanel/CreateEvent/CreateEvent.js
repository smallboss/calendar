import React, {Component} from 'react';
import {connect} from 'react-redux';
import {Select, Checkbox, Calendar, Button, Icon} from 'antd';

import ActionTypes from '../../redux/constants/actionTypes';

import './SidePanel.css';

const Option = Select.Option;
const CheckboxGroup = Checkbox.Group;

class SidePanel extends Component {
    state = {
        viewTypesList: ['day', 'week', 'month', 'year'],
        eventTypeList: ['birthdays', 'reminders', 'meeting', 'public holidays', 'others'],
    };

    onChangeCheckedEventList( checkedList ) {
        console.log('checkedList', checkedList);
        this.props.changeCheckedEventTypeList( checkedList );
    }

    onDayChange(value, mode) {
        console.log(value, mode);
    }


    render() {

        const { currViewType, checkedEventTypeList } = this.props;

        console.log('this.props', this.props);

        return (
            <div className="side-panel">

                <Button type="primary" icon="plus" size="large">Add Event</Button>

                <br/>

                <Select defaultValue={this.state.viewTypesList[currViewType]} onChange={(value) => this.props.setCurrViewType(value)}>
                    {
                        this.state.viewTypesList.map((el, index) => (<Option key={index} value={index}>{el}</Option>))
                    }
                </Select>

                <br/>

                <div style={{ width: 300, border: '1px solid #d9d9d9', borderRadius: 4 }}>
                    <Calendar fullscreen={false} onPanelChange={this.onDayChange.bind(this)} />
                </div>

                <br/>

                <CheckboxGroup options={this.state.eventTypeList} className="wrap-event-types" value={checkedEventTypeList} onChange={this.onChangeCheckedEventList.bind(this)} />

            </div>
        );
    }

}

const mapStateToProps = state => {
    return {
        currViewType: state.root.currViewType,
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
        }
    }
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(SidePanel);
