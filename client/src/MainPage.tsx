import "./MainPage.css";
import useMainPage from "./useMainPage";

const MainPage = () => {
  const { missionList } = useMainPage();

  return <div className="wrapper">{JSON.stringify(missionList)}</div>;
};

export default MainPage;
