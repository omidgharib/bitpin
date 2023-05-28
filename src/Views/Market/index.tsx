
import { useEffect, useState, useRef } from 'react';
import { Card, Col, Row } from 'antd';
import { useSelector, useDispatch } from "react-redux";
import { addMarkets } from "../../redux/actions/addMarkets";
import { IMarket } from "../../interfaces/IMarket";
import { map, assign, find } from "lodash";
import MarketCard from "./card";
import axios from "axios";

const version = "v1";
const API_URL = `https://api.bitpin.org/${version}/`;

axios.defaults.baseURL = API_URL;
axios.defaults.timeout = 6000;
axios.defaults.headers.common.Accept = "application/json";
axios.defaults.headers.common["Content-Type"] = "application/json";

let ws;
const Markets = () => {
    const marketsData = useSelector((state: IMarket[]) => { return state });
    const dispatch = useDispatch();

    const [markets, setMarkets] = useState(marketsData);

    useEffect(() => {
        loadMarkets();

        ws = new WebSocket(`wss://ws.bitpin.org`);
        ws.onopen = () => {
            ws.addEventListener('message', function (event) {
                const data = JSON.parse(event.data)
                console.log("message data", data)
                const newDataMarkets = map(markets, function (item) {
                    return assign(item, find(data, { market_id: item.id }));
                });
                dispatch(addMarkets(newDataMarkets));
            });
        };

        if (ws.readyState === 1) {
            ws.send(JSON.stringify({
                "method": "sub_to_price_info"
            }));
        }

        return () => {
            ws.close()
        }
    }, []);

    useEffect(() => {
        setMarkets(marketsData);
    }, [marketsData]);

    const loadMarkets = () => {
        axios.get('/mkt/markets/')
            .then((response) => {
                // handle success
                dispatch(addMarkets(response?.data?.results));
            })
            .catch((error) => {
                // handle error
                console.log(error);
            })
            .finally(() => {
                // always executed
            });
    }

    return (
        <>
            <Row gutter={16}>
                {

                    markets?.length > 0 ?
                        markets.map((item, index) => {
                            return <MarketCard data={item} key={index} />
                        })
                        : null
                }
            </Row>
        </>
    );
}

export default Markets;
