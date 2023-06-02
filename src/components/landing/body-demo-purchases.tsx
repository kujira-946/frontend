import styled from "styled-components";

import * as Icons from "@/components/icons";
import * as Functions from "@/utils/functions";
import * as Styles from "@/utils/styles";
import * as Types from "@/utils/types";
import { ThemeProps } from "@/components/layout";

// ========================================================================================= //
// [ STYLED COMPONENTS ] =================================================================== //
// ========================================================================================= //

type OverviewDropdownType = "Incoming" | "Recurring";

const Container = styled.section`
  position: relative;
  width: 42.5rem;
  height: 38.448rem;
  overflow-x: auto;

  ${Styles.setMediaPaddings()};

  @media (max-width: ${Styles.breakpoints.landingBodyPurchases}px) {
    display: flex;
    flex-direction: column;
    gap: ${Styles.pxAsRem.eight};
    width: auto;
    height: auto;
  }
`;

const OverviewDropdowns = styled.div`
  @media (max-width: ${Styles.breakpoints.landingBodyPurchases}px) {
    display: flex;
    gap: ${Styles.pxAsRem.eight};
  }

  @media (max-width: 36rem) {
    flex-direction: column-reverse;
  }
`;

type OverviewPurchasesProps = {
  type: OverviewDropdownType;
};

const OverviewPurchases = styled.article<OverviewPurchasesProps>`
  ${Styles.preventUserInteraction};
  position: ${(props) => (props.type === "Incoming" ? "absolute" : "relative")};
  z-index: ${(props) => (props.type === "Incoming" ? "1" : "2")};
  top: ${(props) => (props.type === "Incoming" ? "0rem" : "5.375rem")};
  left: ${(props) => (props.type === "Incoming" ? "10rem" : "0rem")};
  display: flex;
  flex-direction: column;
  gap: ${Styles.pxAsRem.twelve};
  max-width: ${Styles.pxAsRem.fourHundred};
  width: 100%;
  background-color: ${(props: ThemeProps) => props.theme.backgroundOne};
  border: ${(props: ThemeProps) => props.theme.backgroundEight} solid 1px;
  border-radius: ${Styles.pxAsRem.eight};
  overflow: hidden;

  @media (max-width: ${Styles.breakpoints.landingBodyPurchases}px) {
    position: static;
    top: auto;
    left: auto;
    max-width: 100%;
  }

  @media (max-width: 36rem) {
    min-width: 36.25rem;
  }
`;

const OverviewHeader = styled.header`
  ${Styles.transition};
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: ${Styles.pxAsRem.eight} ${Styles.pxAsRem.twelve};
  background-color: ${(props: ThemeProps) => props.theme.backgroundOne};
  border-bottom: ${(props: ThemeProps) => props.theme.backgroundFour} solid 1px;
  cursor: pointer;

  @media (hover: hover) {
    :hover {
      background-color: ${(props: ThemeProps) => props.theme.backgroundTwo};
    }
  }
`;

const OverviewHeaderTitle = styled.h5`
  margin: 0;
  color: ${(props: ThemeProps) => props.theme.text};
  font-size: ${Styles.pxAsRem.fourteen};
  font-weight: ${Styles.fontWeights.semiBold};
`;

const OverviewHeaderTotalSpent = styled.p`
  margin: 0;
  color: ${(props: ThemeProps) => props.theme.text};
  font-size: ${Styles.pxAsRem.fourteen};
  font-weight: ${Styles.fontWeights.bold};
`;

const LogbookPurchases = styled.article`
  ${Styles.preventUserInteraction};
  position: absolute;
  right: 0;
  bottom: 0;
  z-index: 3;
  display: flex;
  flex-direction: column;
  gap: ${Styles.pxAsRem.twelve};
  max-width: 36rem;
  width: 100%;
  background-color: ${(props: ThemeProps) => props.theme.backgroundOne};
  border: ${(props: ThemeProps) => props.theme.backgroundEight} solid 1px;
  border-radius: ${Styles.pxAsRem.eight};
  overflow: hidden;

  @media (max-width: ${Styles.breakpoints.landingBodyPurchases}px) {
    position: static;
    top: auto;
    left: auto;
    max-width: 100%;
    min-width: 36.25rem;
  }
`;

const LogbookHeader = styled.header`
  ${Styles.transition};
  display: flex;
  gap: ${Styles.pxAsRem.forty};
  padding: ${Styles.pxAsRem.twelve};
  border-bottom: ${(props: ThemeProps) => props.theme.backgroundFour} solid 1px;
  cursor: pointer;

  @media (hover: hover) {
    :hover {
      background-color: ${(props: ThemeProps) => props.theme.backgroundTwo};
    }
  }
`;

const LogbookHeaderSection = styled.section`
  display: flex;
  flex: 1;
  flex-direction: column;
  gap: ${Styles.pxAsRem.four};
`;

const LogbookHeaderSectionTitle = styled.h5`
  margin: 0;
  color: ${(props: ThemeProps) => props.theme.backgroundNine};
  font-size: ${Styles.pxAsRem.twelve};
  font-weight: ${Styles.fontWeights.bold};
`;

type LogbookHeaderSectionValueProps = {
  outlined?: true;
  empty?: true;
};

const LogbookHeaderSectionValue = styled.article<LogbookHeaderSectionValueProps>`
  color: ${(props: LogbookHeaderSectionValueProps & ThemeProps) => {
    if (props.empty) return props.theme.backgroundEight;
    else return props.theme.text;
  }};
  padding: ${Styles.pxAsRem.four} ${Styles.pxAsRem.six};
  border: ${(props: LogbookHeaderSectionValueProps & ThemeProps) => {
    if (props.outlined) return `${props.theme.backgroundFour} solid 1px`;
    else return "transparent solid 1px;";
  }};
  border-radius: ${Styles.pxAsRem.six};
`;

const Icon = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`;

const Purchases = styled.section`
  display: flex;
  flex-direction: column;
  gap: ${Styles.pxAsRem.four};
  padding: 0 ${Styles.pxAsRem.twelve};
`;

type PurchaseCellProps = {
  checked: boolean;
};

const PurchaseCell = styled.article<PurchaseCellProps>`
  display: flex;
  align-items: center;
  gap: ${Styles.pxAsRem.eight};
  padding: ${Styles.pxAsRem.six} ${Styles.pxAsRem.eight};
  background-color: ${(props: ThemeProps) => props.theme.backgroundTwo};
  border: ${(props: PurchaseCellProps & ThemeProps) => {
    if (props.checked) return `${props.theme.primaryMain} solid 1px`;
    else return "transparent solid 1px";
  }};
  border-radius: ${Styles.pxAsRem.six};
`;

type PurchaseCellCategoryProps = { category: Types.Category };

const PurchaseCellCategory = styled.button<PurchaseCellCategoryProps>`
  ${Styles.clearButton};
  width: 52px;
  padding: ${Styles.pxAsRem.two} ${Styles.pxAsRem.four};
  color: ${(props: PurchaseCellCategoryProps & ThemeProps) => {
    if (props.category === "monthly") return props.theme.monthly;
    else if (props.category === "need") return props.theme.need;
    else if (props.category === "planned") return props.theme.planned;
    else return props.theme.impulse;
  }};
  background-color: ${(props: ThemeProps) => props.theme.backgroundThree};
  border: ${(props: ThemeProps) => props.theme.backgroundSix} solid 1px;
  border-radius: ${Styles.pxAsRem.four};
  font-size: ${Styles.pxAsRem.ten};
  font-weight: ${Styles.fontWeights.semiBold};
  text-align: center;
`;

const PurchaseCellTexts = styled.div`
  display: flex;
  flex: 1;
  gap: ${Styles.pxAsRem.eight};
`;

const PurchaseCellText = styled.p`
  margin: 0;
  flex: 1;
  color: ${(props: ThemeProps) => props.theme.text};
  background-color: ${(props: ThemeProps) => props.theme.backgroundThree};
  padding: ${Styles.pxAsRem.four} ${Styles.pxAsRem.six};
  border-radius: ${Styles.pxAsRem.four};
  font-size: ${Styles.pxAsRem.fourteen};
  font-weight: ${Styles.fontWeights.regular};
`;

const Buttons = styled.section`
  display: flex;
  flex-direction: column;
  gap: ${Styles.pxAsRem.eight};
  padding: 0rem ${Styles.pxAsRem.twelve} ${Styles.pxAsRem.twelve};
`;

type ButtonProps = { outlined?: true };

const Button = styled.button.attrs(() => ({
  type: "button",
}))<ButtonProps>`
  ${Styles.clearButton};
  padding: ${Styles.pxAsRem.eight} ${Styles.pxAsRem.fourteen};
  color: ${(props: ButtonProps & ThemeProps) => {
    if (props.outlined) return props.theme.backgroundEight;
    else return props.theme.backgroundNine;
  }};
  background-color: ${(props: ButtonProps & ThemeProps) => {
    if (props.outlined) return "transparent";
    else return props.theme.backgroundThree;
  }};
  border: ${(props: ButtonProps & ThemeProps) => {
    if (props.outlined) return `${props.theme.backgroundSix} solid 1px`;
    else return "transparent solid 1px;";
  }};
  border-radius: ${Styles.pxAsRem.six};
`;

// ========================================================================================= //
// [ EXPORTED COMPONENT ] ================================================================== //
// ========================================================================================= //

type OverviewPurchase = {
  description: string;
  cost: string;
};

type OverviewDropdown = {
  type: OverviewDropdownType;
  title: string;
  totalSpent: string;
  purchases: OverviewPurchase[];
};

const overviewDropdowns: OverviewDropdown[] = [
  {
    type: "Incoming",
    title: "Incoming (2)",
    totalSpent: "$213.00",
    purchases: [
      { description: "Anniversary Gift", cost: "$200.00" },
      { description: "Pay Billy back for lunch", cost: "$13.00" },
    ],
  },
  {
    type: "Recurring",
    title: "Recurring (3)",
    totalSpent: "$2,159.99",
    purchases: [
      { description: "Rent", cost: "$2000.00" },
      { description: "Netflix", cost: "$9.99" },
      { description: "Grocery", cost: "$150.00" },
    ],
  },
];

type LogbookPurchase = {
  category: Types.Category;
  description: string;
  cost: string;
} & PurchaseCellProps;

type LogbookDropdown = {
  date: string;
  spent: string;
  purchases: LogbookPurchase[];
};

const logbookDropdowns: LogbookDropdown[] = [
  {
    date: "August 13, 2023",
    spent: "$205.26",
    purchases: [
      {
        checked: false,
        category: "monthly",
        description: "Rent",
        cost: "$2000.00",
      },
      {
        checked: true,
        category: "need",
        description: "Air Purifier",
        cost: "$103.13",
      },
      {
        checked: false,
        category: "planned",
        description: "Uber",
        cost: "$22.13",
      },
      {
        checked: false,
        category: "impulse",
        description: "Gura Nendoroid",
        cost: "$80.00",
      },
    ],
  },
];

export const BodyDemoPurchases = () => {
  const { theme } = Functions.useSignalsStore().ui;

  return (
    <Container>
      <OverviewDropdowns>
        {overviewDropdowns.map(
          (overviewDropdown: OverviewDropdown, index: number) => {
            return (
              <OverviewPurchases
                key={`landing-body-demo-overview-dropdown-${overviewDropdown.title}-${index}`}
                type={overviewDropdown.type}
              >
                <OverviewHeader>
                  <OverviewHeaderTitle>
                    {overviewDropdown.title}
                  </OverviewHeaderTitle>
                  <OverviewHeaderTotalSpent>
                    {overviewDropdown.totalSpent}
                  </OverviewHeaderTotalSpent>
                </OverviewHeader>

                <Purchases>
                  {overviewDropdown.purchases.map(
                    (purchase: OverviewPurchase, index: number) => {
                      return (
                        <PurchaseCell
                          key={`landing-body-demo-overview-purchase-${purchase.description}-${index}`}
                          checked={false}
                        >
                          <PurchaseCellTexts>
                            <PurchaseCellText>
                              {purchase.description}
                            </PurchaseCellText>
                            <PurchaseCellText>{purchase.cost}</PurchaseCellText>
                          </PurchaseCellTexts>
                          {theme.value && (
                            <Icon>
                              <Icons.Close
                                width={14}
                                height={14}
                                fill={Styles.background[theme.value].eight}
                              />
                            </Icon>
                          )}
                        </PurchaseCell>
                      );
                    }
                  )}
                </Purchases>

                <Buttons>
                  <Button outlined>Delete All</Button>
                  <Button>Add</Button>
                </Buttons>
              </OverviewPurchases>
            );
          }
        )}
      </OverviewDropdowns>

      {logbookDropdowns.map(
        (logbookDropdown: LogbookDropdown, index: number) => {
          return (
            <LogbookPurchases
              key={`landing-body-demo-logbook-dropdown-${logbookDropdown.date}-${index}`}
            >
              <LogbookHeader>
                <LogbookHeaderSection>
                  <LogbookHeaderSectionTitle>Date</LogbookHeaderSectionTitle>
                  <LogbookHeaderSectionValue outlined>
                    {logbookDropdown.date}
                  </LogbookHeaderSectionValue>
                </LogbookHeaderSection>

                <LogbookHeaderSection>
                  <LogbookHeaderSectionTitle>Spent</LogbookHeaderSectionTitle>
                  <LogbookHeaderSectionValue>
                    {logbookDropdown.spent}
                  </LogbookHeaderSectionValue>
                </LogbookHeaderSection>

                <LogbookHeaderSection>
                  <LogbookHeaderSectionTitle>Budget</LogbookHeaderSectionTitle>
                  <LogbookHeaderSectionValue outlined empty>
                    Budget
                  </LogbookHeaderSectionValue>
                </LogbookHeaderSection>

                {theme.value && (
                  <Icon>
                    <Icons.Close
                      width={14}
                      height={14}
                      fill={Styles.background[theme.value].eight}
                    />
                  </Icon>
                )}
              </LogbookHeader>

              <Purchases>
                {logbookDropdown.purchases.map(
                  (purchase: LogbookPurchase, index: Number) => {
                    return (
                      <PurchaseCell
                        key={`landing-body-demo-logbook-purchase-${purchase.description}-${index}`}
                        checked={purchase.checked}
                      >
                        {theme.value && (
                          <>
                            <Icon>
                              <Icons.Drag
                                width={14}
                                height={14}
                                fill={Styles.background[theme.value].eight}
                              />
                            </Icon>
                            <Icon>
                              {purchase.checked ? (
                                <Icons.CheckboxActive
                                  width={14}
                                  height={14}
                                  fill={Styles.primary[theme.value].main}
                                />
                              ) : (
                                <Icons.CheckboxInactive
                                  width={14}
                                  height={14}
                                  fill={Styles.background[theme.value].eight}
                                />
                              )}
                            </Icon>
                          </>
                        )}

                        <PurchaseCellCategory category={purchase.category}>
                          {purchase.category.slice(0, 1).toUpperCase() +
                            purchase.category.slice(1)}
                        </PurchaseCellCategory>

                        <PurchaseCellTexts>
                          <PurchaseCellText>
                            {purchase.description}
                          </PurchaseCellText>
                          <PurchaseCellText>{purchase.cost}</PurchaseCellText>
                        </PurchaseCellTexts>

                        {theme.value && (
                          <Icon>
                            <Icons.Close
                              width={14}
                              height={14}
                              fill={Styles.background[theme.value].eight}
                            />
                          </Icon>
                        )}
                      </PurchaseCell>
                    );
                  }
                )}
              </Purchases>

              <Buttons>
                <Button outlined>Delete Selected</Button>
                <Button outlined>Delete All</Button>
                <Button>Add</Button>
              </Buttons>
            </LogbookPurchases>
          );
        }
      )}
    </Container>
  );
};
