import React from 'react';

const Suggestion = () => {
  const suggestions = [
    {
      name: "Brooklyn Simmons",
      department: "Design",
      title: "UI Designer",
      completionDate: "19/11/24",
      postDate: "12/11/24",
      timing: "Low",
    },
    {
      name: "Ralph Edwards",
      department: "Development",
      title: "Front-end",
      completionDate: "19/11/24",
      postDate: "31/11/24",
      timing: "High",
    },
    {
      name: "Cody Fisher",
      department: "Design",
      title: "Motion Designer",
      completionDate: "19/11/24",
      postDate: "5/12/24",
      timing: "High",
    },
  ];

  const headers = [
    "Employee Name",
    "Department",
    "Job Title",
    "Completion Date",
    "Job Post Date",
    "Market Timing",
  ];

  return (
    <div style={{ width: '100%', padding: 32, background: 'linear-gradient(302deg, #5C9AFF 0%, #154DD1 75%), linear-gradient(0deg, rgba(0, 0, 0, 0.10) 0%, rgba(0, 0, 0, 0.10) 100%)', boxShadow: '0px 0px 24px rgba(211, 136, 255, 0.45)', borderRadius: 32, border: '1px #DCFFFF solid', display: 'flex', flexDirection: 'column', gap: 24, }}>
      <h1 style={{ color: 'white', fontSize: 24, fontFamily: 'SF UI Text', fontWeight: '700', }}>
        Suggestions
      </h1>

      {/* Headers */}
      <div style={{ display: 'flex', justifyContent: 'space-between', padding: '8px 16px', }}>
        {headers.map((header, index) => (
          <div key={index} style={{ flex: 1, textAlign: 'center', color: '#A5A5CC', fontSize: 18, fontWeight: '600', }}   >
            {header}
          </div>))
        }
      </div>

      {/* Suggestions */}
      {suggestions.map((item, index) => (
        <div key={index} style={{ display: 'flex', justifyContent: 'space-between', padding: '12px 16px', background: 'rgba(255, 255, 255, 0.20)', boxShadow: '0px 2px 12px rgba(0, 0, 0, 0.25)', borderRadius: 8, backdropFilter: 'blur(16px)', marginBottom: 12, }} >
          <div style={{ flex: 1, color: '#DCFFFF', fontSize: 18, fontWeight: '400', }}   >
            {item.name}
          </div>
          <div style={{ flex: 1, textAlign: 'center', color: 'white', fontSize: 16, fontWeight: '400', }}   >
            {item.department}
          </div>
          <div style={{ flex: 1, textAlign: 'center', color: 'white', fontSize: 16, fontWeight: '400', }}   >
            {item.title}
          </div>
          <div style={{ flex: 1, textAlign: 'center', color: 'white', fontSize: 16, fontWeight: '400', }}   >
            {item.completionDate}
          </div>
          <div style={{ flex: 1, textAlign: 'center', color: 'white', fontSize: 16, fontWeight: '400', }}   >
            {item.postDate}
          </div>
          <div style={{ flex: 1, textAlign: 'center', color: 'white', fontSize: 16, fontWeight: '400', }}   >
            {item.timing}
          </div>
        </div>
      ))}
    </div>
  );
};

export default Suggestion;
