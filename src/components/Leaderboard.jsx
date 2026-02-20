import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useAuth } from '../context/AuthContext.jsx';
import '../css/Community.css';

export default function Leaderboard() {
  const { getLeaderboard } = useAuth();
  const [leaders, setLeaders] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadLeaderboard();
  }, []);

  const loadLeaderboard = async () => {
    try {
      const data = await getLeaderboard();
      setLeaders(data);
    } catch (error) {
      console.error('Failed to load leaderboard:', error);
    } finally {
      setLoading(false);
    }
  };

  const getLevelColor = (level) => {
    switch(level) {
      case 'Hero': return '#ff6b6b';
      case 'Protector': return '#4ecdc4';
      case 'Guardian': return '#45b7d1';
      case 'Contributor': return '#96ceb4';
      default: return '#feca57';
    }
  };

  const getRankIcon = (index) => {
    switch(index) {
      case 0: return '🥇';
      case 1: return '🥈';
      case 2: return '🥉';
      default: return `#${index + 1}`;
    }
  };

  if (loading) return <div className="loading">Loading leaderboard...</div>;

  return (
    <motion.div 
      className="leaderboard-section"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
    >
      <h3>🏆 Community Leaderboard</h3>
      <div className="leaderboard-grid">
        {leaders.map((leader, index) => (
          <motion.div
            key={leader._id}
            className="leader-card"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: index * 0.1, duration: 0.5 }}
            whileHover={{ y: -4, scale: 1.02 }}
          >
            <div className="rank-badge">
              {getRankIcon(index)}
            </div>
            <div className="leader-info">
              <h4>{leader.name}</h4>
              <div 
                className="level-badge"
                style={{ backgroundColor: getLevelColor(leader.reputation.level) }}
              >
                {leader.reputation.level}
              </div>
            </div>
            <div className="reputation-score">
              <span className="score">{leader.reputation.score}</span>
              <span className="score-label">points</span>
            </div>
            <div className="leader-stats">
              <div className="stat">
                <span>📋 {leader.reputation.stats.reportsSubmitted}</span>
              </div>
              <div className="stat">
                <span>👍 {leader.reputation.stats.helpfulVotes}</span>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
}