import React from 'react';
import PropTypes from 'prop-types';
import ArrowBackIosIcon from '@material-ui/icons/ArrowBackIos';
import ArrowForwardIosIcon from '@material-ui/icons/ArrowForwardIos';

import '../styles/components/SidePanel.scss';

class SidePanel extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            collapsed: false
        };
    }

    changeCollapseState(collapsed = false) {
        this.setState({
            collapsed: !collapsed
        });
    }

    render() {
        const { cities, selectedCity, onChangeCity } = this.props;
        const { collapsed } = this.state;

        return (
            <div className={`side-panel-container ${collapsed ? '' : 'side-panel-full-width'}`}>
                <div className="side-panel-header">                    
                    { collapsed ?
                            <ArrowForwardIosIcon
                                onClick={() => this.changeCollapseState(collapsed)}
                                className="side-panel-icon"
                            />
                        :
                            <>
                                <p className="side-panel-header-title">Cities</p>
                                <ArrowBackIosIcon
                                    onClick={() => this.changeCollapseState(collapsed)}
                                    className="side-panel-icon"
                                />
                            </>
                    }
                </div>
                <div className="side-panel-content">
                    {
                        (collapsed ? [] : cities).map((city, index) => (
                            <div
                                className={`side-panel-option ${selectedCity === city ? 'selected-option' : ''}`}
                                key={`side-panel-city-${index}`}
                                onClick={() => onChangeCity(city)}
                            >
                                <p className="side-panel-city-name">{ city }</p>
                            </div>
                        ))
                    }
                </div>
            </div>
        );
    }
}

SidePanel.propTypes = {
    cities: PropTypes.arrayOf(PropTypes.string).isRequired,
    selectedCity: PropTypes.string.isRequired
};

export default SidePanel;