import { BrowserRouter, Routes, Route } from "react-router-dom";
import ApplicantPool from './Pages/applicantsPool'
import AiInterview from "./Pages/aiInterview";
import NonTechnical from './Pages/non_technical';
import ApplicantResult from './Pages/applicantResult';
import Dummy from './Pages/dummy';
import UserDashboard from './Pages/userDashboard';
import Technical from './Pages/technical';
import CourseSummary from "./Pages/courseSummary";
import AfterSelection from "./Pages/afterSelection";
import TechnicalPracticeSimulation from "./Pages/technicalPracticeSimulation";
import NonTechnicalPracticeSimulation from "./Pages/nonTechnicalPracticeSimulation";
import CandidateProfile from './Pages/candidateProfile';

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/applicantPool" element={<ApplicantPool />} />
        <Route path="/aiInterview" element={<AiInterview />} />
        <Route path="/non_technical" element={<NonTechnical />} />
        <Route path='/dummy' element={<Dummy />} />
        <Route path="/applicantResult" element={<ApplicantResult />} />
        <Route path="/userDashboard" element={<UserDashboard />} />
        <Route path="/technical" element={<Technical />} />
        <Route path="/afterSelection" element={<AfterSelection />} />
        <Route path="/technicalPracticeSimulation" element={<TechnicalPracticeSimulation />} />
        <Route path="/nonTechnicalPracticeSimulation" element={<NonTechnicalPracticeSimulation /> } />
        <Route path="/courseSummary" element={<CourseSummary />} />
        <Route path="/" element={<CandidateProfile />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App;