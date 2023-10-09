import { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import ContentHeader from "src/components/contentHeader";
import RewardCard from "src/components/rewardCard";
import { useGetRewards } from "src/hooks/rewards/useGetRewards";
import theme from "src/lib/theme";
import * as Styled from "./index.style";

function RewardList() {
  const { state } = useLocation();
  const navigate = useNavigate();

  const { rewardsData: midtermRewards, isLoading: isMidtermRewardsLoading } = useGetRewards({ point: 3000 }); // MIDTERM
  const { rewardsData: finalRewards, isLoading: isFinalRewardsLoading } = useGetRewards({ point: 10000 }); // FINAL

  useEffect(() => {
    if (!state) {
      navigate("/challenge/reward");
    }
  }, []);

  const handleClickReward = () => {
    if (state === "all") {
      return;
    }

    navigate("/challenge/reward/reception");
  };

  return (
    <>
      <ContentHeader back={true} exit={false} label="리워드" style={{ backgroundColor: theme.color.grey_900 }} />
      <Styled.Container>
        <Styled.Title>
          {state === "all" ? (
            <>
              챌린지에 도전해
              <br />
              다양한 리워드를 받아보세요
            </>
          ) : state === "midterm" ? (
            <>
              Midterm 리워드를
              <br />
              선택해주세요
            </>
          ) : (
            <>
              Final 리워드를
              <br />
              선택해주세요
            </>
          )}
        </Styled.Title>

        {state !== "final" && (
          <div style={{ marginTop: "3.2rem" }}>
            {state !== "midterm" && <Styled.ListTitle>3000원 리워드 리스트</Styled.ListTitle>}
            <Styled.ListContainer>
              {!isMidtermRewardsLoading &&
                midtermRewards &&
                midtermRewards
                  .filter((item) => item.point === 3000)
                  .map((item) => <RewardCard key={item.rewardId} item={item} onClick={handleClickReward} />)}
            </Styled.ListContainer>
          </div>
        )}

        {state !== "midterm" && (
          <div style={{ marginTop: "5rem" }}>
            {state !== "final" && <Styled.ListTitle>10000원 리워드 리스트</Styled.ListTitle>}
            <Styled.ListContainer>
              {!isFinalRewardsLoading &&
                finalRewards &&
                finalRewards
                  .filter((item) => item.point === 10000)
                  .map((item) => <RewardCard key={item.rewardId} item={item} onClick={handleClickReward} />)}
            </Styled.ListContainer>
          </div>
        )}
      </Styled.Container>
    </>
  );
}

export default RewardList;
