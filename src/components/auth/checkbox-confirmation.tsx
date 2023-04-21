import Link from "next/link";
import styled from "styled-components";
import { Signal } from "@preact/signals-react";

import * as Icons from "@/components/icons";
import * as Functions from "@/utils/functions";
import * as Styles from "@/utils/styles";
import { ThemeProps } from "@/components/layout";

// ========================================================================================= //
// [ STYLED COMPONENTS ] =================================================================== //
// ========================================================================================= //

const Container = styled.section`
  display: flex;
  align-items: center;
  gap: ${Styles.pxAsRem.twelve};
  font-size: ${Styles.pxAsRem.fourteen};
  font-weight: ${Styles.fontWeights.medium};
  cursor: pointer;
`;

const Icon = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`;

const Text = styled.div`
  flex: 1;
`;

const Redirect = styled(Link)`
  color: ${(props: ThemeProps) => props.theme.secondaryMain};
  font-weight: ${Styles.fontWeights.semiBold};

  ${Styles.transition};

  @media (hover: hover) {
    :hover {
      color: ${(props: ThemeProps) => props.theme.secondaryDark};
    }
  }
`;

// ========================================================================================= //
// [ EXPORTED COMPONENT ] ================================================================== //
// ========================================================================================= //

type Props = {
  isRegister: boolean;
  checkboxActive: Signal<boolean>;
};

export const CheckboxConfirmation = (props: Props) => {
  const { theme } = Functions.useSignalsStore().ui;

  return (
    <Container
      onClick={() => (props.checkboxActive.value = !props.checkboxActive.value)}
    >
      {theme.value &&
        (props.checkboxActive.value ? (
          <Icon>
            <Icons.CheckboxActive
              height={20}
              fill={Styles.secondary[theme.value].main}
              addHover
            />
          </Icon>
        ) : (
          <Icon>
            <Icons.CheckboxInactive
              height={20}
              fill={Styles.text[theme.value]}
              addHover
            />
          </Icon>
        ))}

      {props.isRegister ? (
        <Text>
          I agree to the{" "}
          <Redirect href="/terms" target="_blank">
            Terms Of Service
          </Redirect>
          ,{" "}
          <Redirect href="/privacy" target="_blank">
            Privacy Policy
          </Redirect>
          , and{" "}
          <Redirect href="/cookie" target="_blank">
            Cookie Policy
          </Redirect>
        </Text>
      ) : (
        <Text>Stay logged in for 30 days on this device.</Text>
      )}
    </Container>
  );
};
