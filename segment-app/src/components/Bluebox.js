import React from 'react';
import { Tag, Button } from 'antd';

const BlueBox = ({ selectedSchemas, onRemoveSchema }) => {
  return (
    <div className="blue-box">
      <h3>Selected Schemas:</h3>
      {selectedSchemas.map((schema, index) => (
        <Tag
          key={index}
          color="blue"
          closable
          onClose={() => onRemoveSchema(index)}
        >
          {Object.values(schema)[0]}
        </Tag>
      ))}
    </div>
  );
};

export default BlueBox;
