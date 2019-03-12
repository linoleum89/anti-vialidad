import React from 'react';

const DataContext = React.createContext({
    sector: 0,
    sectors: [],
    reports: [],
    allowNotifications: false,
    handleNotifications: () => {},
    handleSector: () => {},
    getData: () => {}
});

export default DataContext;