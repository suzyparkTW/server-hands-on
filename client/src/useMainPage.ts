import { trpc } from "./utils/trpc";

const useMainPage = () => {
  const missionList = trpc.mission.list.useQuery().data?.list;

  return {
    missionList,
  };
};

export default useMainPage;
