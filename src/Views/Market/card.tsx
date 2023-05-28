import React from 'react';
import { Card, Space, Col } from 'antd';
import { IMarket } from "../../interfaces/IMarket"

const MarketCard = ({ data }) => {
    return (
        < Col span={4} >
            <Card title={data?.title} bordered={false}>
                <p>code: {data?.code}</p>
                <p>price: {data?.price}</p>
                <p>is tradable: {data?.tradable ? "True" : "False"}</p>
            </Card>
        </Col >
    )
};

export default MarketCard;
