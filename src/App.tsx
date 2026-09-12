import { Routes, Route } from 'react-router-dom';
import LandingPage from './components/landing/LandingPage';
import AnalysisForm from './components/form/AnalysisForm';
import AnalysisLoader from './components/loader/AnalysisLoader';
import ResultsDashboard from './components/results/ResultsDashboard';
import HistoryPanel from './components/history/HistoryPanel';
import StatisticsPanel from './components/stats/StatisticsPanel';

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<LandingPage />} />
      <Route path="/analyze" element={<AnalysisForm />} />
      <Route path="/loading" element={<AnalysisLoader />} />
      <Route path="/results/:id" element={<ResultsDashboard />} />
      <Route path="/history" element={<HistoryPanel />} />
      <Route path="/stats" element={<StatisticsPanel />} />
    </Routes>
  );
}
