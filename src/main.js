import React from 'react'
import ReactDOM from 'react-dom'
import { createStore } from 'redux'
import Header  from './components/Header.jsx'
import SequenceComponent from './components/Sequence.jsx'
import Button from './components/Button.jsx'
import Sequence from './models/Sequence.js'
import * as ActionType from './actionTypes.js'

module.hot.accept();

const initialState = {
    sequence: '',
    reverse: false,
    complement: false,
    translate: false,
    processed: new Sequence()
}

const sequenceApp = (state = initialState, action) => {
    switch (action.type) {
        case ActionType.CHANGE_SEQUENCE:
            state.processed.sequence = action.sequence;
            return { ...state, sequence: action.sequence }
        case ActionType.TOGGLE_REVERSE:
            state.processed.reverse()
            return { ...state, reverse: !state.reverse }
        case ActionType.TOGGLE_COMPLEMENT:
            state.processed.complement()
            return { ...state, complement: !state.complement }
        case ActionType.TOGGLE_TRANSLATE:
            state.processed.translate()
            return { ...state, translate: !state.translate }
        default:
            return state
    }

    return state
}

const store = createStore(sequenceApp)

const SequenceApp = ({
    changeSequence,
    toggleComplement,
    toggleReverse,
    toggleTranslate
}) => (
    <div className="ui container">
        <Header />
        <SequenceComponent
            changeSequence={ changeSequence }
        />

        <Button label="Complement" onClick={ toggleComplement } active={ store.getState().complement } />
        <Button label="Reverse" onClick={ toggleReverse } active={ store.getState().reverse } />
        <Button label="Translate" onClick={ toggleTranslate } active={ store.getState().translate } />

        <div className="field">
            <div className="sequence">{ store.getState().processed.sequence }</div>
        </div>
    </div>
)

const render = () => {
    ReactDOM.render(
        <SequenceApp 
            changeSequence={(event) =>
                store.dispatch({
                    type: ActionType.CHANGE_SEQUENCE,
                    sequence: event.target.value
                })
            }
            toggleReverse={() =>
                store.dispatch({ type: ActionType.TOGGLE_REVERSE })
            }
            toggleComplement={() => 
                store.dispatch({ type: ActionType.TOGGLE_COMPLEMENT })
            }
            toggleTranslate={() =>
                store.dispatch({ type: ActionType.TOGGLE_TRANSLATE })
            }
        />,
        document.getElementById('container')
    )
}

store.subscribe(render)
render()