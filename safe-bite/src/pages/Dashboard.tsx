import './Dashboard.css';
import { useAuth } from "../AuthContext";

function Dashboard () {
    const { user } = useAuth();

    return (
        <section className="page dashboard-page">
            <div className='dashboard-shell'>
                <div className='dashboard-header'>
                    <h1>Dashboard</h1>
                    <p>
                        {user
                            ? `Signed in as ${user.name ?? user.email}`
                            : "Loading your profile..."}
                    </p>
                </div>
                <div className='dashboard-grid'>
                    <div className='profile-pic card'>
                        <h2>Profile</h2>
                        <p>{user ? user.email : ""}</p>
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