import './Dashboard.css';

function Dashboard () {
    return (
        <section className="page dashboard-page">
            <div className='dashboard-shell'>
                <div className='dashboard-header'>
                    <h1>Dashboard</h1>
                    <p>Overview of your profile and activity.</p>
                </div>
                <div className='dashboard-grid'>
                    <div className='profile-pic card'>
                        <h2>Profile</h2>
                        <p>Some user smth (not done)</p>
                    </div>

                    <div className='profile-stats card'>
                        <h2>Stats</h2>
                        <div className="stats-row">
                            <span>Scans today</span>
                            <strong>..</strong>
                        </div>
                        <div className="stats-row">
                            <span>Safe items</span>
                            <strong>..</strong>
                        </div>
                        <div className="stats-row">
                            <span>Warnings</span>
                            <strong>..</strong>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}

export default Dashboard;