import styled from "styled-components";

import * as Styles from "@/utils/styles";
import * as Types from "@/utils/types";
import { ThemeProps } from "@/components/layout";

// ========================================================================================= //
// [ STYLED COMPONENTS ] =================================================================== //
// ========================================================================================= //

const Container = styled.section`
  width: 100%;
  max-width: ${Styles.widths.desktop}px;
  margin: 0 auto ${Styles.pxAsRem.forty};
  color: ${(props: ThemeProps) => props.theme.text};
  font-size: ${Styles.pxAsRem.sixteen};
  font-weight: ${Styles.fontWeights.regular};

  ${Styles.setMediaPaddings()};
`;

const Text = styled.p`
  margin: 0 0 ${Styles.pxAsRem.twenty};
  font-size: inherit;
  font-weight: inherit;
`;

const Statements = styled.ol`
  list-style: decimal;
`;

const Statement = styled.li`
  margin: 0 0 ${Styles.pxAsRem.twenty} ${Styles.pxAsRem.thirtyFour};
`;

const StatementMainText = styled.p`
  margin-bottom: ${Styles.pxAsRem.four};
  font-size: ${Styles.pxAsRem.eighteen};
  font-weight: ${Styles.fontWeights.semiBold};
`;

const SupportingTexts = styled.ol`
  list-style: disc;
`;

const SupportingText = styled.li`
  margin: 0 0 ${Styles.pxAsRem.eight} ${Styles.pxAsRem.forty};
`;

// ========================================================================================= //
// [ EXPORTED COMPONENT ] ================================================================== //
// ========================================================================================= //

type Props = {
  documentBody: Types.LegalDocumentBody;
};

export const LegalBody = (props: Props) => {
  function generateSupportingTexts(supportingTexts: string[]): JSX.Element {
    return (
      <SupportingTexts>
        {supportingTexts.map((supportingTexts: string, index: number) => {
          return (
            <SupportingText
              key={`legal-page-document-body-supportingTexts-${supportingTexts}-${index}`}
            >
              {supportingTexts}
            </SupportingText>
          );
        })}
      </SupportingTexts>
    );
  }

  return (
    <Container>
      <Text>{props.documentBody.initial}</Text>

      <Statements>
        {props.documentBody.statements.map(
          (statement: Types.LegalDocumentStatement, index: number) => {
            return (
              <Statement
                key={`legal-page-document-body-${statement.main}-${index}`}
              >
                <StatementMainText>{statement.main}</StatementMainText>

                {statement.supportingTexts &&
                  generateSupportingTexts(statement.supportingTexts)}
              </Statement>
            );
          }
        )}
      </Statements>
    </Container>
  );
};
