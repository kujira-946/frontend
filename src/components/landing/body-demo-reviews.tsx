import styled from "styled-components";

import * as Styles from "@/utils/styles";
import * as Types from "@/utils/types";
import { ThemeProps } from "@/components/layout";

// ========================================================================================= //
// [ STYLED COMPONENTS ] =================================================================== //
// ========================================================================================= //

const Container = styled.section`
  ${Styles.preventUserInteraction};
  display: flex;
  gap: ${Styles.pxAsRem.eight};
  height: ${Styles.pxAsRem.threeHundred};

  @media (max-width: ${Styles.breakpoints.landingBodyReviews}px) {
    flex-direction: column;
    height: auto;
  }
`;

const Review = styled.article`
  flex: 1;
  background-color: ${(props: ThemeProps) => props.theme.backgroundOne};
  border: ${(props: ThemeProps) => props.theme.backgroundFour} solid 1px;
  border-radius: ${Styles.pxAsRem.eight};
  overflow: hidden;
`;

const ReviewHeader = styled.header`
  display: flex;
  justify-content: space-between;
  gap: ${Styles.pxAsRem.twelve};
  border-bottom: ${(props: ThemeProps) => props.theme.backgroundFour} solid 1px;
  padding: ${Styles.pxAsRem.twelve};
`;

const ReviewHeaderText = styled.section`
  display: flex;
  flex-direction: column;
`;

type ReviewTitleProps = {
  category: Types.Category;
};

const ReviewTitle = styled.h5<ReviewTitleProps>`
  margin: 0;
  color: ${(props: ThemeProps & ReviewTitleProps) => {
    if (props.category === "need") return props.theme.need;
    else if (props.category === "planned") return props.theme.planned;
    else return props.theme.impulse;
  }};
  font-size: ${Styles.pxAsRem.sixteen};
  font-weight: ${Styles.fontWeights.bold};
`;

const ReviewCaption = styled.span`
  margin: 0;
  color: ${(props: ThemeProps) => props.theme.backgroundTen};
  font-size: ${Styles.pxAsRem.fourteen};
  font-weight: ${Styles.fontWeights.regular};
`;

const ReviewCaptionCost = styled.span`
  margin: 0;
  color: ${(props: ThemeProps) => props.theme.primaryMain};
  font-size: ${Styles.pxAsRem.fourteen};
  font-weight: ${Styles.fontWeights.bold};
`;

const ReviewCount = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: ${Styles.pxAsRem.forty};
  height: ${Styles.pxAsRem.forty};
  color: ${(props: ThemeProps) => props.theme.text};
  border: ${(props: ThemeProps) => props.theme.backgroundThree} solid 1px;
  border-radius: ${Styles.pxAsRem.six};
  font-size: ${Styles.pxAsRem.sixteen};
  font-weight: ${Styles.fontWeights.bold};
`;

const Purchases = styled.section`
  display: flex;
  flex-direction: column;
  gap: ${Styles.pxAsRem.four};
  padding: ${Styles.pxAsRem.twelve};
`;

const PurchaseCell = styled.article`
  display: flex;
  gap: ${Styles.pxAsRem.eight};
  padding: ${Styles.pxAsRem.six} ${Styles.pxAsRem.eight};
  background-color: ${(props: ThemeProps) => props.theme.backgroundTwo};
  border-radius: ${Styles.pxAsRem.six};
`;

const PurchaseCellText = styled.span`
  flex: 1;
  padding: ${Styles.pxAsRem.four} ${Styles.pxAsRem.six};
  color: ${(props: ThemeProps) => props.theme.text};
`;

// ========================================================================================= //
// [ EXPORTED COMPONENT ] ================================================================== //
// ========================================================================================= //

type Purchase = {
  description: string;
  cost: string;
};

type ReviewData = {
  category: Types.Category;
  title: string;
  caption: string;
  captionCost: string;
  count: number;
  purchase: Purchase;
};

const reviews: ReviewData[] = [
  {
    category: "need",
    title: "Need",
    caption: "You've spent ",
    captionCost: "$103.13",
    count: 1,
    purchase: { description: "Air Purifier", cost: "$103.13" },
  },
  {
    category: "planned",
    title: "Planned",
    caption: "You've spent ",
    captionCost: "$22.13",
    count: 1,
    purchase: { description: "Uber", cost: "$22.13" },
  },
  {
    category: "impulse",
    title: "Impulse",
    caption: "You've spent ",
    captionCost: "$80.00",
    count: 1,
    purchase: { description: "Gura Nendoroid", cost: "$80.00" },
  },
];

export const BodyDemoReviews = () => {
  return (
    <Container>
      {reviews.map((review: ReviewData, index: number) => {
        return (
          <Review key={`landing-body-demo-reviews-${review.title}-${index}`}>
            <ReviewHeader>
              <ReviewHeaderText>
                <ReviewTitle category={review.category}>
                  {review.title}
                </ReviewTitle>
                <ReviewCaption>
                  {review.caption}{" "}
                  <ReviewCaptionCost>{review.captionCost}</ReviewCaptionCost>.
                </ReviewCaption>
              </ReviewHeaderText>

              <ReviewCount>{review.count}</ReviewCount>
            </ReviewHeader>

            <Purchases>
              <PurchaseCell>
                <PurchaseCellText>
                  {review.purchase.description}
                </PurchaseCellText>
                <PurchaseCellText>{review.purchase.cost}</PurchaseCellText>
              </PurchaseCell>
            </Purchases>
          </Review>
        );
      })}
    </Container>
  );
};
