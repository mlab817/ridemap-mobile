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
import {ModeContext, modes} from "../contexts/mode.context";
import SelectModes from "../components/select-modes.component";
import FaceDetect from "../components/face-detect.component";
import Kiosk from "../components/kiosk.component";
import PassengerCounter from "../components/passenger-counter.component";

const HomeScreen = () => {
    const { isAuthenticated, loading } = useContext(AuthContext)

    const { stationId } = useContext(StationContext)

    const { currentMode } = useContext(ModeContext)

    // if loading, show loading screen
    if (loading) return <LoginLoading />

    // if not logged in, show that device id is invalid
    // and not registered in the server
    if (!isAuthenticated) return <DeviceQr />

    // if there is no station id select,
    // prompt user to select one
    if (!stationId) return <SelectStation />

    if (!currentMode) return <SelectModes />

    if (currentMode === modes.QR_SCANNER) return <QrScanner />

    if (currentMode === modes.FACE_DETECTOR) return <FaceDetect />

    if (currentMode === modes.KIOSK) return <Kiosk />

    if (currentMode === modes.COUNTER) return <PassengerCounter />

    // show camera page
    return <QrScanner />
}

export default HomeScreen
