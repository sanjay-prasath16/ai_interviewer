import { BrowserRouter, Routes, Route } from "react-router-dom";
import Interview from "./Pages/interview_dashboard";
import NonTechnical from './Pages/non_technical'

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Interview />} />
        <Route path="/nonTechnical" element={<NonTechnical />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App