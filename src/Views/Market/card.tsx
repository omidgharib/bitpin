import React from 'react';
import { Card, Space, Col } from 'antd';

const MarketCard = ({ data }) => {
    return (
        <Col span={4} className='market-card'>
            <Card title={data?.title} bordered={false}>
                <p>code: {data?.code}</p>
                <p>price: {data?.price}</p>
                <p>is tradable: {data?.tradable ? "True" : "False"}</p>
            </Card>
        </Col>
    )
};

export default MarketCard;