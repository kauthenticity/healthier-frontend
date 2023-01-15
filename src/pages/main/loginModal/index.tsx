import axios, { AxiosError } from "axios";
import { SET_TOKEN, DELETE_TOKEN } from "src/state/authSlice";
import { useAppDispatch } from "src/state";
import ModalContainer from "src/components/modalContainer";
import { ILoginModal, IKakaoToken } from "src/interfaces/modal";
import { forwardRef } from "react";
import { Container, Title, Contents, NoteImage, BottomButtons, LoginButton, Continue } from "./index.style";
import imageUrl from "src/data/image_url";

declare global {
  interface Window {
    Kakao: any;
  }
}

const Kakao = window.Kakao;

const LoginModal = forwardRef<HTMLDivElement, ILoginModal>(({ closeModal }, ref) => {
  const dispatch = useAppDispatch();

  const kakaoLogin = () => {
    Kakao.Auth.login({
      scope: "account_email",
      success: async function (resToken: IKakaoToken) {
        try {
          const res = await axios.get(`${process.env.REACT_APP_SERVER_URL}/api/oauth/kakao?access_token=${resToken.access_token}`);
          const token = res.headers.authorization.slice(7);
          dispatch(DELETE_TOKEN);
          dispatch(SET_TOKEN(token));
        } catch (err: Error | AxiosError | unknown) {
          console.error(err);
          if (axios.isAxiosError(err) && err.code === "ERR_BAD_REQUEST") {
            alert("이메일 사용 동의가 필요합니다");
          } else {
            alert("내부 서버 오류, 다시 시도해주세요");
          }
        } finally {
          closeModal();
        }
      },
      fail: function (err: Error) {
        console.error(err);
        alert("로그인 에러, 다시 시도해주세요");
      },
    });
  };

  const handleLoginClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    kakaoLogin();
  };

  return (
    <ModalContainer>
      <Container ref={ref}>
        <section className="exit-image" onClick={closeModal}>
          <img alt="exit" src="/images/header/exit.svg" width={32} height={32} />
        </section>
        <Contents>
          <Title>
            로그인을 하면
            <br />
            <span className="highlight">나의 진단 기록장</span>을 이용할 수 있어요
          </Title>
          <NoteImage>
            <img className="image" alt="login" src={imageUrl.login_modal} />
          </NoteImage>
        </Contents>
        <BottomButtons>
          <LoginButton onClick={handleLoginClick}>
            <img className="login-image" alt="kakao_login" src="images/login/kakao.webp" />
            카카오 로그인
          </LoginButton>
          <Continue onClick={closeModal}>괜찮아요, 비회원으로 이용할게요</Continue>
        </BottomButtons>
      </Container>
    </ModalContainer>
  );
});
LoginModal.displayName = "LoginModal";

export default LoginModal;
