const SessionLog = ({ sessions }) => {
  return (
    <div style={{ padding: "20px" }}>
      <h3 style={{ textAlign: "center", color: "#333" }}>Session Log</h3>
      <table
        style={{
          width: "100%",
          borderCollapse: "collapse",
          textAlign: "left",
        }}
      >
        <thead>
          <tr>
            <th style={tableHeaderStyle}>Session ID</th>
            <th style={tableHeaderStyle}>Start Time</th>
            <th style={tableHeaderStyle}>End Time</th>
          </tr>
        </thead>
        <tbody>
          {sessions.map((session, index) => (
            <tr key={index}>
              <td style={tableCellStyle}>{session.id}</td>
              <td style={tableCellStyle}>
                {new Date(session.startTime).toLocaleTimeString()}
              </td>
              <td style={tableCellStyle}>
                {new Date(session.endTime).toLocaleTimeString()}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

const tableHeaderStyle = {
  backgroundColor: "#f4f4f4",
  padding: "10px",
  border: "1px solid #ddd",
  fontWeight: "bold",
};

const tableCellStyle = {
  padding: "8px",
  border: "1px solid #ddd",
};

export default SessionLog;
