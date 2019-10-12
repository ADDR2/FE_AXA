import React from 'react';
import PropTypes from 'prop-types';

import GnomeThumbnail from './GnomeThumbnail';
import GnomeDialog from './GnomeDialog';
import '../styles/components/ContentPanel.scss';

class ContentPanel extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            selectedGnome: -1
        };
    }

    selectGnomeByIndex = (index = 0) => {
        this.setState({ selectedGnome: index });
    }

    closeDialog = () => {
        this.setState({ selectedGnome: -1 });
    }

    render() {
        const { data: gnomes } = this.props;
        const { selectedGnome } = this.state;

        return (
            <div className="content-panel-container">
                <div className="content-panel-thumbnail-list">
                    {
                        gnomes.slice(0, 30).map((gnome, index) => (
                            <GnomeThumbnail
                                key={`gnome-${index}`}
                                gnome={gnome}
                                index={index}
                                onSelected={this.selectGnomeByIndex}
                            />
                        ))
                    }
                </div>
                <div className="content-panel-pagination-container">
                    { gnomes.length / 30 }
                </div>
                <GnomeDialog
                    show={selectedGnome >= 0}
                    gnome={gnomes[selectedGnome < 0 ? 0 : selectedGnome]}
                    onClose={this.closeDialog}
                />
            </div>
        );
    }
}

ContentPanel.propTypes = {
    data: PropTypes.arrayOf(PropTypes.object).isRequired
};

export default ContentPanel;