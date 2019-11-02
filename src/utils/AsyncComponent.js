import React, { Component } from 'react'

export default function asyncComponent (importComp) {
    class AsyncComponent extends Component {
        constructor (props) {
            super(props)

            this.state = {
                component: null
            }
        }

        async componentDidMount () {
            const { default: component } = await importComp()
            this.setState({
                component: component
            })
        }

        render () {
            const Com = this.state.component

            return Com ? <Com {...this.props} /> : null
        }
    }

    return AsyncComponent
}