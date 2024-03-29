import React from 'react';
import PropTypes from 'prop-types';
import ArrowBackIosIcon from '@material-ui/icons/ArrowBackIos';
import ArrowForwardIosIcon from '@material-ui/icons/ArrowForwardIos';

import Toolbar from './Toolbar';
import GnomeThumbnail from './GnomeThumbnail';
import GnomeDialog from './GnomeDialog';
import '../styles/components/ContentPanel.scss';

class ContentPanel extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            selectedGnome: -1,
            currentPage: 0,
            currentFilter: {
                filter: '',
                value: ''
            },
            currentSort: ''
        };
    }

    selectGnomeByIndex(gnomesSlice = 0, index = 0) {
        this.setState({ selectedGnome: gnomesSlice + index });
    }

    closeDialog = () => {
        this.setState({ selectedGnome: -1 });
    }

    getPages(totalPages = 1, currentPage = 0) {
        if (totalPages > 5) {
            if (currentPage < 3) {
                return [1, 2, 3, 4, 5, '...', totalPages];
            }
    
            if (currentPage >= totalPages - 3) {
                return [1, '...', totalPages - 4, totalPages - 3, totalPages - 2, totalPages - 1, totalPages];
            }
    
            return [1, '...', currentPage, currentPage + 1, currentPage + 2, '...', totalPages];
        } else {
            const result = [];

            for(let index = 0; index < totalPages; index++) {
                result.push(index+1);
            }

            return result;
        }
    }

    applySort(attribute = '', itemA, itemB) {
        return itemA[attribute] > itemB[attribute] ? 1 : -1;
    }

    applyFilter({ filter, value } = {}, list = []) {
        return list.filter(item => {
            return String(item[filter]).toLocaleLowerCase().includes(String(value).toLocaleLowerCase());
        });
    }

    render() {
        const { selectedGnome, currentPage, currentFilter, currentSort } = this.state;
        const { data } = this.props;
        let gnomes = [ ...data ];
        currentFilter.filter && currentFilter.value && (gnomes = this.applyFilter(currentFilter, gnomes));
        currentSort && (gnomes = gnomes.sort(this.applySort.bind(this, currentSort)));

        const isMultipleOf30 = gnomes.length % 30 === 0;
        const totalPages = isMultipleOf30 ? (gnomes.length/30) : parseInt((gnomes.length/30) + 1);
        const gnomesSlice = currentPage*30;
        const slicedList = gnomes.slice(gnomesSlice, gnomesSlice + 30);

        return (
            <div className="content-panel-container">
                <Toolbar
                    currentFilter={currentFilter}
                    currentSort={currentSort}
                    onFilter={filter => this.setState({
                        currentFilter: { ...currentFilter, ...filter },
                        currentPage: 0
                    })}
                    onSort={attribute => this.setState({ currentSort: attribute })}
                />
                <div className="content-panel-thumbnail-list">
                    {
                        slicedList.map((gnome, index) => (
                            <GnomeThumbnail
                                key={`gnome-${index}`}
                                gnome={gnome}
                                index={index}
                                onSelected={this.selectGnomeByIndex.bind(this, gnomesSlice)}
                            />
                        ))
                    }
                </div>
                <div className="content-panel-pagination-container">
                    <p className="pagination-amount-indicator">Showing { slicedList.length } of { gnomes.length }</p>
                    <ArrowBackIosIcon
                        onClick={() => (
                            currentPage > 0 && this.setState({ currentPage: currentPage - 1 })
                        )}
                        className={`content-pagination-prev ${currentPage <= 0 ? 'pagination-disabled' : ''}`}
                    />
                    {
                        this.getPages(totalPages, currentPage).map((item, index) => (
                            <p
                                key={`page-item-${index}`}
                                onClick={() => (
                                    typeof item === 'number' && this.setState({ currentPage: item - 1 })
                                )}
                                className={
                                    `page-item
                                        ${currentPage + 1 === item ? 'current-page' : ''}
                                        ${typeof item === 'number' ? 'page-selectable' : ''}
                                    `
                                }
                            >{ item }</p>
                        ))
                    }
                    <ArrowForwardIosIcon
                        onClick={() => (
                            currentPage < totalPages - 1 && this.setState({ currentPage: currentPage + 1 })
                        )}
                        className={`
                            content-pagination-next
                            ${currentPage >= totalPages - 1 ? 'pagination-disabled' : ''}
                        `}
                    />
                </div>
                { selectedGnome >= 0 ?
                        <GnomeDialog
                            show={selectedGnome >= 0}
                            gnome={gnomes[selectedGnome < 0 ? 0 : selectedGnome]}
                            onClose={this.closeDialog}
                        />
                    :
                        <></>
                }
            </div>
        );
    }
}

ContentPanel.propTypes = {
    data: PropTypes.arrayOf(PropTypes.object).isRequired
};

export default ContentPanel;