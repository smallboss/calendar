import ActionTypes from '../constants/actionTypes';

const emptyRootState = {
    currViewType: 0,
    eventTypeList: ['birthdays', 'reminders', 'meetings', 'public holidays', 'others'],
    checkedEventTypeList: [0, 1, 2, 3, 4],
    isCreateOpen: false,
    eventList: [],
    editEventId: -1,
    selectedDate: Date.now(),
};

const savedRootState = localStorage.getItem('store') ? JSON.parse( localStorage.getItem('store') ) : emptyRootState;
const rootState = savedRootState;


const root = (state = rootState, action) => {
    const newState = {...state};

    switch (action.type) {
        case ActionTypes.SET_CURR_VIEW_TYPE: {
            newState.currViewType = action.payload;
            return newState;
        }

        case ActionTypes.CHANGE_CHECKED_EVENT_TYPE_LIST: {
            newState.checkedEventTypeList = action.payload;
            return newState;
        }

        case ActionTypes.CHANGE_TYPE_VIEW: {
            newState.currViewType = (action.payload.currViewType !== undefined) ? action.payload.currViewType : 0;
            newState.selectedDate = action.payload.selectedDate;
            return newState;
        }

        case ActionTypes.OPEN_CREATE_EVENT: {
            newState.isCreateOpen = true;
            return newState;
        }

        case ActionTypes.CANCEL_CREATE_EVENT: {
            newState.isCreateOpen = false;
            newState.editEventId = -1;
            return newState;
        }

        case ActionTypes.SAVE_EVENT: {
            if ( !action.payload.id ) {
                action.payload.id = Math.floor( Math.random() * 2000000 );
            }
            else {
                let elemIndex = newState.eventList.map( (eventItem) => eventItem.id ).indexOf(action.payload.id);
                newState.eventList.splice(elemIndex, 1);
            }

            newState.eventList = [ ...newState.eventList, action.payload ];
            newState.isCreateOpen = false;
            newState.editEventId = -1;
            return newState;
        }

        case ActionTypes.DELETE_EVENT: {
            newState.eventList = newState.eventList.filter( eventItem => eventItem.id !== action.payload );
            return newState;
        }

        case ActionTypes.TO_EDIT_EVENT: {
            newState.editEventId = action.payload;
            newState.isCreateOpen = true;
            return newState;
        }

        default: return state
    }
};

export default root