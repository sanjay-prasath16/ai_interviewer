import Button from '../Components/linearGradientButton';

const Home = () => {
  return (
    <div className="h-screen bg-black grid grid-cols-3 justify-center">
      <Button innerText={"AI interview Page"} redirectionPage={"/aiInterview"} />
      <Button innerText={"Technical Interview Page"} redirectionPage={"/technical"} />
      <Button innerText={"Non Technical Page"} redirectionPage={"/non_technical"} />
      <Button innerText={"applicant Pool Page"} redirectionPage={"/applicantPool"} />
      <Button innerText={"applicant Result Page"} redirectionPage={"/applicantResult"} />
      <Button innerText={"user Dashboard Page"} redirectionPage={"/userDashboard"} />
      <Button innerText={"after Selection Page"} redirectionPage={"/afterSelection"} />
      <Button innerText={"technical Practice Simulation Page"} redirectionPage={"/technicalPracticeSimulation"} />
      <Button innerText={"Non Technical Practice Simulation Page"} redirectionPage={"/nonTechnicalPracticeSimulation"} />
      <Button innerText={"Non Technical Practice Simulation Page"} redirectionPage={"/nonTechnicalPracticeSimulation"} />
      <Button innerText={"course Summary Page"} redirectionPage={"/courseSummary"} />
      <Button innerText={"candidate Profile Page"} redirectionPage={"/candidateProfile"} />
      <Button innerText={"Recruiter Dashboard Page"} redirectionPage={"/recruitDash"} />
      <Button innerText={"suggestion Page"} redirectionPage={"/suggestion"} />
    </div>
  )
}

export default Home;