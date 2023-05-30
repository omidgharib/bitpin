
import { useEffect, useState, useRef } from 'react';
import { Card, Col, Row, Pagination } from 'antd';
import { useSelector, useDispatch } from "react-redux";
import { map, assign, find } from "lodash";
import { addMarkets } from "../../redux/actions/addMarkets";
import { IMarket } from "../../interfaces/IMarket";
import { getMarkets } from "../../services/api";
import MarketCard from "./card";

let ws;
const Markets = () => {
    const marketsData = useSelector((state: IMarket[]) => { return state });
    const dispatch = useDispatch();

    const [markets, setMarkets] = useState(marketsData);
    // const [itemOffset, setItemOffset] = useState(0);
    const [itemsPerPage, setItemsPerPage] = useState(10);
    const [currentPage, setCurrentPage] = useState(1);

    const itemOffset = (currentPage * itemsPerPage) % markets.length;
    console.log(
        `User requested page number ${currentPage}, which is offset ${itemOffset}`
    );
    const endOffset = itemOffset + itemsPerPage;
    console.log(`Loading items from ${itemOffset} to ${endOffset}`);
    const currentItems = markets.slice(itemOffset, endOffset);
    // const pageCount = Math.ceil(markets.length / itemsPerPage);

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
            ws.close();
        }
    }, []);

    useEffect(() => {
        setMarkets(marketsData);
    }, [marketsData]);

    useEffect(() => {

    }, [itemOffset]);

    const handlePageClick = (page, perPage) => {
        console.log(page, "event", perPage);
        // const newOffset = (page * perPage) % markets.length;
        // console.log(
        //     `User requested page number ${page}, which is offset ${newOffset}`
        // );
        // setItemOffset(newOffset);
        setCurrentPage(page);
        setItemsPerPage(perPage);
    };

    const loadMarkets = async () => {
        const response = await getMarkets();
        dispatch(addMarkets(response?.results));
    }

    return (
        <>
            <div className='market-page'>
                <Row gutter={16} justify={"start"} >
                    {

                        currentItems?.length > 0 ?
                            currentItems.map((item, index) => {
                                return <MarketCard data={item} key={index} />
                            })
                            : null
                    }
                </Row>
                <Pagination
                    onChange={handlePageClick}
                    current={currentPage}
                    defaultCurrent={1}
                    total={markets.length}
                />;
            </div>
        </>
    );
}

export default Markets;