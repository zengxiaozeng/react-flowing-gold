import React from 'react'
import './style.css'

class Loading extends React.Component {
    render() {
        const { className = '', style = {} } = this.props
        return (
            <div id="my-loading" className={className} style={style}>
                <div className="loader"></div>
                <div className="shadow"></div>
            </div>
        )
    }
}

export default Loading 