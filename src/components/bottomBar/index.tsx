import theme from "src/lib/theme";
import BottomNumber from "../bottomNumber";
import RoundButton from "../roundButton";
import { IBottomBar } from "src/interfaces/resultPage";
import { useAppSelector } from "src/state";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { BottomContainer, BottomButton } from "./index.style";
import { Diagnosis } from "src/api/diagnosis";

const BottomBar = ({ curIndex, totalCount, openModal, setLoading, isSaved, resultId }: IBottomBar) => {
  const { authenticated, accessToken } = useAppSelector((state) => state.auth);
  const navigate = useNavigate();

  const handleSave = async () => {
    if (authenticated) {
      // 로그인된 경우
      setLoading(true);

      // 저장 api 호출
      await Diagnosis.patchDiagnosis({ diagnosis_id: resultId }, accessToken);

      const timer = setTimeout(() => {
        navigate("/");
        clearTimeout(timer);
      }, 3000);
    } else {
      // 로그인되지 않은 경우
      openModal();
    }
  };

  return (
    <BottomContainer curIndex={curIndex}>
      {curIndex !== totalCount || isSaved ? (
        <BottomNumber curIndex={curIndex} totalCount={totalCount} />
      ) : (
        <BottomButton>
          <section onClick={handleSave}>
            <RoundButton outline="none" backgroundColor={theme.color.blue} color={theme.color.grey_100}>
              나의 진단기록장에 저장하기
            </RoundButton>
          </section>
        </BottomButton>
      )}
    </BottomContainer>
  );
};

export default BottomBar;
