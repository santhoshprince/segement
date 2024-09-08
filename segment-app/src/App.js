import React, { useState } from 'react';
import { Button, Drawer, Form, Input, Select, message } from 'antd';
import BlueBox from './components/Bluebox';
import './App.css'; // Import the CSS file

const { Option } = Select;

const availableSchemas = [
  { label: 'First Name', value: 'first_name' },
  { label: 'Last Name', value: 'last_name' },
  { label: 'Gender', value: 'gender' },
  { label: 'Age', value: 'age' },
  { label: 'Account Name', value: 'account_name' },
  { label: 'City', value: 'city' },
  { label: 'State', value: 'state' },
];

function App() {
  const [selectedSchemas, setSelectedSchemas] = useState([]);
  const [drawerVisible, setDrawerVisible] = useState(false);
  const [segmentName, setSegmentName] = useState('');
  const [schemaOptions, setSchemaOptions] = useState(availableSchemas);
  const [newSchema, setNewSchema] = useState('');

  const handleAddSchema = () => {
    if (newSchema) {
      const schemaToAdd = schemaOptions.find(schema => schema.value === newSchema);
      if (schemaToAdd) {
        setSelectedSchemas(prev => [...prev, { [schemaToAdd.value]: schemaToAdd.label }]);
        setSchemaOptions(prev => prev.filter(schema => schema.value !== newSchema));
        setNewSchema('');
      }
    }
  };

  const handleSaveSegment = () => {
    const payload = {
      segment_name: segmentName,
      schema: selectedSchemas,
    };

    fetch('https://webhook.site/d0a187e1-5e6c-4e37-9c70-47250f380023', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      mode: 'no-cors',
      body: JSON.stringify(payload),
    })
      .then(() => {
        message.success('Segment saved successfully!');
        setSelectedSchemas([]);
        setDrawerVisible(false);
      })
      .catch(error => {
        console.error('Error:', error);
        message.error('Failed to save segment. Please try again.');
      });
  };

  const handleRemoveSchema = (index) => {
    setSelectedSchemas(prevSchemas => prevSchemas.filter((_, i) => i !== index));
  };

  return (
    <div className="app-container">
      <div className='app-content'>
      <Button type="primary" onClick={() => setDrawerVisible(true)}>Save Segment</Button>
      <Drawer
        title="Save Segment"
        placement="right"
        closable={true}
        onClose={() => setDrawerVisible(false)}
        visible={drawerVisible}
        width={400}
      >
        <Form layout="vertical">
          <Form.Item label="Segment Name">
            <Input
              value={segmentName}
              onChange={(e) => setSegmentName(e.target.value)}
              placeholder="Enter segment name"
            />
          </Form.Item>
          <Form.Item label="Add Schema to Segment">
            <Select
              value={newSchema}
              onChange={(value) => setNewSchema(value)}
              placeholder="Select a schema"
            >
              {schemaOptions.map(schema => (
                <Option key={schema.value} value={schema.value}>
                  {schema.label}
                </Option>
              ))}
            </Select>
            <Button type="link" onClick={handleAddSchema}>+ Add new schema</Button>
          </Form.Item>
          <Form.Item>
            <Button type="primary" onClick={handleSaveSegment}>Save Segment</Button>
          </Form.Item>
        </Form>
      </Drawer>
      <BlueBox selectedSchemas={selectedSchemas} onRemoveSchema={handleRemoveSchema} />
      </div>
    </div>
  );
}

export default App;
