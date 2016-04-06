import React from 'react'

const SequenceComponent = ({
    changeSequence
}) => (
    <div className="ui form">
        <div className="field">
            <label>Sequence</label>
            <textarea
                id="sequence"
                onChange={ changeSequence }
                autoCorrect="false"
                spellCheck="false"
            />
        </div>
    </div>
)

export default SequenceComponent