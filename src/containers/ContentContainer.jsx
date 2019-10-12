import React from 'react';
import PropTypes from 'prop-types';

import SidePanel from '../components/SidePanel';
import '../styles/containers/ContentContainer.scss';

class ContentContainer extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            selectedCity: 'All'
        };
    }

    changeCity = (newCity = 'All') => {
        const { data } = this.props;

        (newCity in data || newCity === 'All') && this.setState({ selectedCity: newCity });
    }

    render() {
        const { selectedCity } = this.state;
        const { data } = this.props;

        return (
            <div className="content-container">
                <SidePanel
                    cities={[ 'All', ...Object.keys(data) ]}
                    selectedCity={selectedCity}
                    onChangeCity={this.changeCity}
                />
            </div>
        );
    }
}

ContentContainer.propTypes = {
    data: PropTypes.object.isRequired
};

export default ContentContainer;