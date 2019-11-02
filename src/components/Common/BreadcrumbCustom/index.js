import React, { Component } from 'react';

class BreadcrumbCustom extends Component {
    render() {
        return (
            <header style={styles.headerTitles}>
                <b>{this.props.title}</b>
            </header>
        )
    }
}

const styles = {
    headerTitles: {
        color: '#4D3D25',
        height: '36px',
        fontSize: '24px',
        marginBottom: '24px'
    }
}

export default BreadcrumbCustom;
