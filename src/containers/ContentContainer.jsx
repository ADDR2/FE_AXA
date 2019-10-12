import React from 'react';
import PropTypes from 'prop-types';

import SidePanel from '../components/SidePanel';
import ContentPanel from '../components/ContentPanel';
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

        newCity in data && this.setState({ selectedCity: newCity });
    }

    render() {
        const { selectedCity } = this.state;
        const { data } = this.props;

        return (
            <div className="content-container">
                <SidePanel
                    cities={Object.keys(data)}
                    selectedCity={selectedCity}
                    onChangeCity={this.changeCity}
                />
                <ContentPanel
                    data={data[selectedCity]}
                />
            </div>
        );
    }
}

ContentContainer.propTypes = {
    data: PropTypes.object.isRequired
};

export default ContentContainer;