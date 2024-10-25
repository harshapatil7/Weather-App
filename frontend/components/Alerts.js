const Alerts = ({ alertMessages }) => {
    return (
        <div>
            {alertMessages.length > 0 ? (
                <ul style={{ color: 'red' }}>
                    {alertMessages.map((message, index) => (
                        <li key={index}>{message}</li>
                    ))}
                </ul>
            ) : (
                <p>No alerts at this time.</p>
            )}
        </div>
    );
};

export default Alerts;
