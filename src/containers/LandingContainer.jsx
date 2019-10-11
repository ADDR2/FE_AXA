import React from 'react';

export default class LandingContainer extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            data: {},
            filters: []
        };
    }

    componentDidMount() {
        //Request data
    }

    render() {
        const { data } = this.state;

        return (
            <div>Hello there!</div>
        );
    }
}