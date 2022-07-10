/**
 * This is the only screen of the project.
 */

import React, {useContext} from 'react';
import {AuthContext} from "../contexts/auth.context";
import DeviceQr from "../components/device-qr.component";
import SelectStation from "../components/select-station.component";
import QrScanner from "../components/qr-scanner.component";
import {StationContext} from "../contexts/station.context";
import LoginLoading from "../components/login-loading.component";

const HomeScreen = () => {
    const { isAuthenticated, loading } = useContext(AuthContext)

    const { stationId } = useContext(StationContext)

    // if loading, show loading screen
    if (loading) return <LoginLoading />

    // if not logged in, show that device id is invalid
    // and not registered in the server
    if (!isAuthenticated) return <DeviceQr />

    // if there is no station id select,
    // prompt user to select one
    if (!stationId) return <SelectStation />

    // show camera page
    return <QrScanner />
}

export default HomeScreen
