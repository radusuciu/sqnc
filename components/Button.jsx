import React from 'react'
import classNames from 'classnames'

const Button = ({
    label,
    onClick,
    active
}) => {
    const classes = classNames('ui', 'toggle', 'button', active ? 'active' : '')
    return <button onClick={ onClick } className={ classes }>{ label }</button>
}

export default Button