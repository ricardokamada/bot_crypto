import React, { useState } from 'react';
import useWebSocket from 'react-use-websocket';
import Menu from '../../components/Menu/Menu';
import LineChart from './LineChart';
import MiniTicker from './MiniTicker/MiniTicker';


function Dashboard() {

    const [miniTickerState, setminiTickerState] = useState({});

    const { lastJsonMessage } = useWebSocket(process.env.REACT_APP_WS_URL, {

        onOpen: () => console.log(`Connected to app WS Server`),
        onMessage: () => {
            if (lastJsonMessage) {
                if (lastJsonMessage.miniTicker) setminiTickerState(lastJsonMessage.miniTicker);
            }
        },
        queryParams: {},
        onError: (err) => console.error(err),
        shouldReconnect: (CloseEvent) => true,
        reconnectInterval: 3000
    })

    return (
        <React.Fragment>
            <Menu />
            <main className='content'>
                <div className='d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center py-4'>
                    <div className='d-block mb-4 mb-md-0'>
                        <h1 className='h4'>Dashboard</h1>
                    </div>

                </div>
                <LineChart />
                <MiniTicker data={miniTickerState} />

            </main>

        </React.Fragment>)

}

export default Dashboard;