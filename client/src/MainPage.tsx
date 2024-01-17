import "./MainPage.css";
import useMainPage from "./useMainPage";

const MainPage = () => {
  const { mission, handleMissionIdChange, handleInputKeyDown } = useMainPage();

  return (
    <div className="wrapper">
      <input autoFocus onChange={handleMissionIdChange} onKeyDown={handleInputKeyDown}/>
      <pre id='json'>{JSON.stringify(mission, undefined, 4)}</pre>
    </div>
  );
};

export default MainPage;
