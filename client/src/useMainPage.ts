import React, { KeyboardEvent, useState } from "react";
import { trpc } from "./utils/trpc";

const useMainPage = () => {
  const [missionId, setMissionId] = useState('')
  const handleMissionIdChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setMissionId(e.target.value)
  }

  const [mission, setMission] = useState();
  const query = trpc.mission.byId.useQuery({ missionId }, {
    enabled: false
  })
  
  const handleInputKeyDown = async (e: KeyboardEvent<HTMLInputElement>) => {
    if (missionId == "") return;
    if (e.key != 'Enter') return;

    const response = await query.refetch();
    setMission(response.data?.[0]);
  }

  return {
    mission,
    handleMissionIdChange,
    handleInputKeyDown
  };
};

export default useMainPage;
