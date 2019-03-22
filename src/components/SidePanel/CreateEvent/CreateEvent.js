import React, {Component} from 'react';
import moment from 'moment';
import {Select, Row, Col, Input, DatePicker, TimePicker, Modal} from 'antd';

import './CreateEvent.css';

const Option = Select.Option;
const format = 'HH:mm';

class SidePanel extends Component {
    state = {
        eventTitle: '',
        selectedEventType: 0,
        date: new moment(),
    };

    onChangeDate(date) {
        this.setState({ date: date.startOf('day') });
    }

    onChangeTime(date) {
        const dateAddTime = this.state.date;
        dateAddTime.startOf('day');
        dateAddTime.add(date.hour(), 'hours');
        dateAddTime.add(date.minute(), 'minutes');

        this.setState({ date: dateAddTime });
    }

    onAddEvent() {
        const eventData = {
            ...this.state,
            date: this.state.date.format('x')
        };

        this.props.onCreate( eventData );
        this.setState({
            eventTitle: '',
            selectedEventType: 0,
            date: new moment(),
        })
    }

    componentWillReceiveProps( nextProps ) {
        const { editEvent } = nextProps;

        if ( nextProps.editEvent )  {
            this.setState({
                ...editEvent,
                date: new moment(editEvent.date, 'x')
            });
        }
    }

    onCancel() {
        this.props.onCancel();
        this.setState({
            eventTitle: '',
            selectedEventType: 0,
            date: new moment(),
        })
    }

    render() {

        const { eventTitle, selectedEventType } = this.state;
        const { eventTypeList, isOpen, editEvent } = this.props;


        return (
            <Modal
                title={ editEvent ? `Edit event ${editEvent.eventTitle}` : "Create event" }
                visible={isOpen}
                onOk={this.onAddEvent.bind(this)}
                onCancel={this.onCancel.bind(this)}
                okText="Save event"
                cancelText="Cancel"
            >
                <Row>
                    <Col span={14}>
                        <Input placeholder="Event title" value={eventTitle} onChange={(event) => this.setState({eventTitle: event.target.value})} />
                    </Col>
                    <Col span={9} offset={1}>
                        <Select
                            style={{ width: '100%' }}
                            value={eventTypeList[ selectedEventType ]}
                            onChange={(value) => this.setState({selectedEventType: value})}
                        >
                            {
                                eventTypeList.map((el, index) => (<Option key={index} value={index}>{el}</Option>))
                            }
                        </Select>
                    </Col>
                </Row>

                <Row>
                    <Col span={14}>
                        <DatePicker
                            style={{width: '100%', marginTop: 20}}
                            value={this.state.date}
                            onChange={this.onChangeDate.bind(this)}
                        />
                    </Col>
                    <Col span={9} offset={1}>
                        <TimePicker
                            value={moment(this.state.date, format)}
                            format={format}
                            style={{width: '100%', marginTop: 20}}
                            onChange={this.onChangeTime.bind(this)}
                        />
                    </Col>
                </Row>
            </Modal>
        );
    }

}

export default SidePanel;
