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
import SecondDummy from './Pages/secondDummy';
import RecruiterDashboard from './Pages/recruiterDashboard';
import Suggestion from './Pages/Suggestion';

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
        <Route path="/secondDummy" element={<SecondDummy />} />
        <Route path="/recruitDash" element={<RecruiterDashboard />} />
        <Route path="/suggestion" element={<Suggestion />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App;

{
  /* <div className='absolute w-[905px] h-[905px] -mt-[500px] ml-[1100px] bg-[rgba(151,151,151,0.7)] rounded-full z-10 '>

<Spline className='items-end w-20 h-20 -ml-[30%] mt-[30%]' scene="https://prod.spline.design/9KpvIenVCsNv9ycN/scene.splinecode" />
</div> */
}