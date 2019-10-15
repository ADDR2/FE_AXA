import React from 'react';
import axios from 'axios';
import LinearProgress from '@material-ui/core/LinearProgress';

import UINotifications from '../components/uiNotifications';
import ContentContainer from './ContentContainer';
import { apiRoute, errorTypes } from '../constants';
import '../styles/containers/LandingContainer.scss';

export default class LandingContainer extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            data: {},
            showError: false,
            errorMessage: '',
            requestingData: true
        };
    }

    async getAndSaveData() {
        this.closeError();
        this.setState({ requestingData: true });

        try {
            const { data } = await axios.get(apiRoute);
            this.setState({ data: this.processData(data) });
        } catch(error) {
           this.displayError(errorTypes.REQUESTING_DATA_ERROR.message, error);
        } finally {
            this.setState({ requestingData: false });
        }
    }

    processData(data = {}) {
        let allCities = [];

        for(const cityGnomes of Object.values(data)) {
            allCities = [ ...allCities, ...cityGnomes ];
        }

        return { All: allCities, ...data };
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
        const { data, showError, errorMessage, requestingData } = this.state;

        return (
            <>
                <div className="app-header">
                    <h2 className="app-header-title">Gnomebook</h2>
                </div>
                { requestingData ?
                        <LinearProgress />
                    :
                        (Object.keys(data).length ? <ContentContainer data={data}/> : <></>)
                }
                <UINotifications
                    show={showError}
                    message={errorMessage}
                    onClose={this.closeError}
                />
            </>
        );
    }
}