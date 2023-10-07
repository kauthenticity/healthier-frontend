import { RefObject } from "react";
import Dialog from "src/components/dialog";
import theme from "src/lib/theme";

interface IRevivalSuccessDialog {
  modalRef: RefObject<HTMLDivElement>;
  closeModal: () => void;
}

function RevivalSuccessDialog({ modalRef, closeModal }: IRevivalSuccessDialog) {
  return (
    <Dialog
      ref={modalRef}
      buttonType="one"
      title={
        <>
          부활 티켓 적용이
          <br />
          완료되었어요!
        </>
      }
      imageUrl="/images/challenge/revival-ticket.png"
      singleButtonText={<span style={{ color: theme.color.grey_100 }}>챌린지로 돌아가기</span>}
      onClickConfirm={closeModal}
    />
  );
}

export default RevivalSuccessDialog;
