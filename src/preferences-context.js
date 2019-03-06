import React from 'react';

const PreferencesContext = React.createContext({
    sector: 0,
    allowNotifications: false,
    handleNotifications: () => {},
    handleSector: () => {}
});

export default PreferencesContext;