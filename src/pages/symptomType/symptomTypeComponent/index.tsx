import { memo } from "react";
import { ISymptomTypeComponent } from "src/interfaces/component";
import { Container, Title, TypeImage } from "./index.style";
import imageUrl from "src/data/image_url";

const SymptomTypeComponent = ({ selected, title }: ISymptomTypeComponent) => {
  return (
    <Container select={selected}>
      <Title select={selected}>{title}</Title>
      <TypeImage>
        <img alt="icon" src={title === "신체 건강" ? imageUrl.symptom_body : imageUrl.symptom_mental} height={142} />
      </TypeImage>
    </Container>
  );
};

export default memo(SymptomTypeComponent);