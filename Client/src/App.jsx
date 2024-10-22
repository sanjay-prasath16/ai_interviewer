import { BrowserRouter, Routes, Route } from "react-router-dom";
import CandidateList from './Pages/applicantsPool'
import Interview from "./Pages/interview_dashboard";
import NonTechnical from './Pages/non_technical'

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<CandidateList />} />
        <Route path="/aiInterview" element={<Interview />} />
        <Route path="/nonTechnical" element={<NonTechnical />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App;