import { ReactNode, useCallback, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { ChevronRightIcon } from "src/assets/icons/ChevronRightIcon";
import RoundButton from "src/components/roundButton";
import { useGetPresignedUrl } from "src/hooks/challenge/useGetPresignedUrl";
import { useGetInvitationCode } from "src/hooks/invitation/useGetInvitationCode";
import { useGetRevivalTicketCount } from "src/hooks/stamp/useGetRevivalTicketCount";
import { useGetStampChart } from "src/hooks/stamp/useGetStampChart";
import { usePutStampImage } from "src/hooks/stamp/usePutStampImage";
import useModal from "src/hooks/useModal";
import theme from "src/lib/theme";
import { CertificateImageUploadDialog, ForgiveDialog, InviteCodeCopyDialog, RevivalSuccessDialog, RevivalTicketDialog } from "./dialog";
import * as Styled from "./index.style";
import StampGrid from "./stamp-grid";
import Toast from "./toast";

function ChallengeStamp() {
  const navigate = useNavigate();
  const param = useParams();

  const revivalTicketDialog = useModal();
  const forgiveDialog = useModal();
  const revivalSuccessDialog = useModal();
  const inviteCodeDialog = useModal();
  const certificateImageUploadDialog = useModal();

  const [toastText, setToastText] = useState<ReactNode>("");

  const challengeId = parseInt(param.id ?? "0");

  const { presignedUrlData } = useGetPresignedUrl();
  const { revivalCount } = useGetRevivalTicketCount();
  const { stampChartData, refetch, isLoading, isSuccess } = useGetStampChart({ challengeId });
  const { invitationCode } = useGetInvitationCode();

  const { putStampImage } = usePutStampImage({
    id: challengeId,
    url: presignedUrlData?.url ?? "",
    refetch,
    onSuccessImageUpload: certificateImageUploadDialog.openModal,
  });

  const duration = parseInt(stampChartData?.duration ?? "0");

  useEffect(() => {
    if (!param.id) {
      navigate(-1);
    }
  }, []);

  useEffect(() => {
    if (toastText) {
      setTimeout(() => {
        setToastText("");
      }, 5000);
    }
  }, [toastText]);

  const handleClickRevivalTicket = useCallback(() => {
    if (!stampChartData?.submissions.some((stamp) => stamp.status === "FAILURE")) {
      setToastText(
        <>
          아직 챌린지 인증 실패한 날이 없어요!
          <br />
          추후에 사용해주세요
        </>
      );
    } else if ((revivalCount?.revivalTicketNum ?? 0) === 0) {
      setToastText(
        <>
          아직 보유한 티켓이 없어요!
          <br />
          친구 초대하고 부활 티켓을 얻으세요.
        </>
      );
    } else {
      revivalTicketDialog.openModal();
    }
  }, [stampChartData, revivalCount]);

  const handleImageChange = (e: any) => {
    const file = e.target.files?.[0];

    if (file && presignedUrlData?.url) {
      putStampImage({ imageFile: file });
    }
  };

  const handleClickCertificate = () => {
    const imageInput = document.getElementById("certificateImageInput");

    imageInput?.click();
    imageInput?.addEventListener("change", (e) => handleImageChange(e));
  };

  const copyInviteCode = () => {
    if (invitationCode?.code) {
      navigator.clipboard.writeText(invitationCode.code).then(() => {
        inviteCodeDialog.closeModal();
      });
    }
  };

  return (
    <>
      {!isLoading && isSuccess && (
        <>
          <Styled.Container>
            <Styled.TopContainer>
              <Styled.HeaderContainer>
                <Styled.LeftButton onClick={() => navigate(-1)}>
                  <img alt="back" src="/images/header/back.svg" width={32} height={32} />
                </Styled.LeftButton>
                <Styled.RightButton onClick={forgiveDialog.openModal}>포기하기</Styled.RightButton>
              </Styled.HeaderContainer>

              <Styled.TopContents>
                <Styled.Title>{stampChartData?.title}</Styled.Title>
                <Styled.TagContainer>
                  <Styled.Tag>{stampChartData?.times}</Styled.Tag>
                  <Styled.Tag>{stampChartData?.duration}</Styled.Tag>
                  <Styled.Tag>{stampChartData?.method}</Styled.Tag>
                </Styled.TagContainer>

                <Styled.ProgressContainer>
                  <Styled.ProgressBar>
                    <Styled.CurrentProgress percent={((stampChartData?.currentDayCnt ?? 1) / (duration === 0 ? 1 : duration)) * 100} />
                  </Styled.ProgressBar>

                  <Styled.ProgressTextBox>
                    <p className="highlight">{stampChartData?.currentDayCnt}일째 진행중</p>
                    <p>총 {duration}일</p>
                  </Styled.ProgressTextBox>
                </Styled.ProgressContainer>
              </Styled.TopContents>
            </Styled.TopContainer>

            <Styled.ContentsContainer>
              <Styled.BannerContainer onClick={inviteCodeDialog.openModal}>
                <div className="top-box">
                  <Styled.BannerTitle>친구 초대하기</Styled.BannerTitle>
                  <ChevronRightIcon />
                </div>
                <Styled.BannerDescription>
                  실패한 회차에 대한 <span style={{ color: theme.color.blue }}>부활권</span>을 얻을 수 있어요!
                </Styled.BannerDescription>
              </Styled.BannerContainer>
              <Styled.StampContainer>
                {stampChartData && (
                  <StampGrid
                    stampSubmissions={stampChartData.submissions}
                    duration={duration}
                    currentDayCnt={stampChartData.currentDayCnt}
                    handleClickRevivalTicket={handleClickRevivalTicket}
                  />
                )}
              </Styled.StampContainer>
              <Styled.BannerContainer onClick={handleClickRevivalTicket}>
                <div className="top-box">
                  <div style={{ display: "flex", gap: "0.8rem", alignItems: "center" }}>
                    <Styled.BannerTitle>부활티켓 사용하기</Styled.BannerTitle>
                    <Styled.BannerDescription style={{ margin: 0 }}>
                      <span className="highlight">{revivalCount?.revivalTicketNum ?? 0}장</span> 보유중
                    </Styled.BannerDescription>
                  </div>
                  <ChevronRightIcon />
                </div>
                <Styled.BannerDescription>부활티켓을 사용해서 실패한 회차를 복구해보세요!</Styled.BannerDescription>
              </Styled.BannerContainer>
            </Styled.ContentsContainer>
          </Styled.Container>

          <Styled.CTAContainer>
            <RoundButton onClick={handleClickCertificate} style={{ pointerEvents: "auto" }}>
              오늘의 챌린지 인증하기
            </RoundButton>
            <input id="certificateImageInput" type="file" accept="image/*" style={{ display: "none" }} />
          </Styled.CTAContainer>
        </>
      )}

      {revivalTicketDialog.isOpenModal && (
        <RevivalTicketDialog
          id={challengeId}
          closeModal={revivalTicketDialog.closeModal}
          modalRef={revivalTicketDialog.modalRef}
          onSuccessRevival={revivalSuccessDialog.openModal}
        />
      )}
      {forgiveDialog.isOpenModal && (
        <ForgiveDialog id={challengeId} closeModal={forgiveDialog.closeModal} modalRef={forgiveDialog.modalRef} />
      )}
      {revivalSuccessDialog.isOpenModal && (
        <RevivalSuccessDialog closeModal={revivalSuccessDialog.closeModal} modalRef={revivalSuccessDialog.modalRef} />
      )}
      {inviteCodeDialog.isOpenModal && (
        <InviteCodeCopyDialog
          closeModal={inviteCodeDialog.closeModal}
          modalRef={inviteCodeDialog.modalRef}
          copyInviteCode={copyInviteCode}
        />
      )}
      {certificateImageUploadDialog.isOpenModal && (
        <CertificateImageUploadDialog
          closeModal={certificateImageUploadDialog.closeModal}
          modalRef={certificateImageUploadDialog.modalRef}
        />
      )}

      {toastText && <Toast isVisible={Boolean(toastText)} text={toastText} />}
    </>
  );
}

export default ChallengeStamp;
