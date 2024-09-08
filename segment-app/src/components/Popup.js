// import React, { useState } from 'react';

// function Popup({ setSelectedSchemas, availableSchemas, closePopup }) {
//   const [segmentName, setSegmentName] = useState('');
//   const [selectedSchema, setSelectedSchema] = useState('');

//   const handleAddSchema = () => {
//     if (selectedSchema) {
//       setSelectedSchemas(prev => [
//         ...prev,
//         { value: selectedSchema, label: availableSchemas.find(s => s.value === selectedSchema).label },
//       ]);
//       setSelectedSchema('');
//     }
//   };

//   const handleSave = () => {
//     closePopup(segmentName);
//   };

//   return (
//     <div className="popup">
//       <h2>Save Segment</h2>
//       <input
//         type="text"
//         placeholder="Segment Name"
//         value={segmentName}
//         onChange={(e) => setSegmentName(e.target.value)}
//       />
//       <select
//         value={selectedSchema}
//         onChange={(e) => setSelectedSchema(e.target.value)}
//       >
//         <option value="">Add schema to segment</option>
//         {availableSchemas.map(schema => (
//           <option key={schema.value} value={schema.value}>
//             {schema.label}
//           </option>
//         ))}
//       </select>
//       <button onClick={handleAddSchema}>+ Add new schema</button>
//       <button onClick={handleSave}>Save Segment</button>
//     </div>
//   );
// }

// export default Popup;
import React, { useState } from 'react';

const availableSchemas = [
  { label: 'First Name', value: 'first_name' },
  { label: 'Last Name', value: 'last_name' },
  { label: 'Gender', value: 'gender' },
  { label: 'Age', value: 'age' },
  { label: 'Account Name', value: 'account_name' },
  { label: 'City', value: 'city' },
  { label: 'State', value: 'state' },
];

function Popup({ setSelectedSchemas, closePopup }) {
  const [segmentName, setSegmentName] = useState('');
  const [selectedSchema, setSelectedSchema] = useState('');
  const [schemas, setSchemas] = useState(availableSchemas);

  const handleAddSchema = () => {
    if (selectedSchema) {
      const newSchema = schemas.find(schema => schema.value === selectedSchema);
      setSelectedSchemas(prevSchemas => [...prevSchemas, { [newSchema.value]: newSchema.label }]);
      setSchemas(prevSchemas => prevSchemas.filter(schema => schema.value !== selectedSchema));
      setSelectedSchema('');
    }
  };

  const handleSaveSegment = () => {
    closePopup(segmentName);
  };

  return (
    <div className="popup">
      <input
        type="text"
        placeholder="Enter segment name"
        value={segmentName}
        onChange={(e) => setSegmentName(e.target.value)}
      />
      <select
        value={selectedSchema}
        onChange={(e) => setSelectedSchema(e.target.value)}
      >
        <option value="">Add schema to segment</option>
        {schemas.map(schema => (
          <option key={schema.value} value={schema.value}>
            {schema.label}
          </option>
        ))}
      </select>
      <button onClick={handleAddSchema}>+ Add new schema</button>
      <button onClick={handleSaveSegment}>Save Segment</button>
    </div>
  );
}

export default Popup;
