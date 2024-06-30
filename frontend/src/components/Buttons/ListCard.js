import React, { useState } from 'react';
import { Card, Pagination, Row, Col } from 'antd';
import { logoImageDefault } from '../../config/imageDefault';

const { Meta } = Card;

export const ListCard = ({ cardData }) => {
  const [currentPage, setCurrentPage] = useState(1);
  // Kiểm tra nếu cardData không tồn tại hoặc không phải là một mảng thì trả về một phần tử rỗng
  if (!cardData || !Array.isArray(cardData)) {
    return <p>No data available</p>;
  }

  const pageSize = 10;

  const currentData = cardData.slice((currentPage - 1) * pageSize, currentPage * pageSize);
  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  
  return (
    <div>
      <Row gutter={[16, 16]}>
        {currentData.map((card, index) => (
          <Col span={6} key={index}>
            <Card
              hoverable
              cover={<img alt="example" src={card.imageUrl ? card.imageUrl : logoImageDefault}
              height={300}
              style={{ objectFit: 'cover'}}
              />}
            >
              <Meta 
                title={card.name} 
                description={card.description.length > 20 ? `${card.description.substring(0, 20)}...` : card.description}
              />
            </Card>
          </Col>
        ))}
      </Row>
      <Pagination
        current={currentPage}
        pageSize={pageSize}
        total={cardData.length}
        onChange={handlePageChange}
        style={{ marginTop: '16px', textAlign: 'center' }}
      />
    </div>
  );
};
