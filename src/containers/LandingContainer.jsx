import React from 'react';
import axios from 'axios';

import UINotifications from '../components/uiNotifications';
import { apiRoute, errorTypes } from '../constants';

export default class LandingContainer extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            data: {},
            filters: [],
            showError: false,
            errorMessage: ''
        };
    }

    async getAndSaveData() {
        this.closeError();

        try {
            const result = await axios.get(apiRoute);
        } catch(error) {
           this.displayError(errorTypes.REQUESTING_DATA_ERROR.message, error);
        }
    }

    displayError(message = 'Something went wrong', error) {
        console.error(message, error);
        this.setState({ showError: true, errorMessage: message });
    }

    closeError = () => {
        this.setState({ showError: false, errorMessage: '' });
    }

    componentDidMount() {
        this.getAndSaveData().catch(error => {
            this.displayError(errorTypes.REQUESTING_DATA_ERROR.message, error);
        });
    }

    render() {
        const { data, showError, errorMessage } = this.state;

        return (
            <>
                <div>Hello there!</div>
                { showError ?
                        <UINotifications message={errorMessage} onClose={this.closeError}/>
                    :
                        <></>
                }
            </>
        );
    }
}