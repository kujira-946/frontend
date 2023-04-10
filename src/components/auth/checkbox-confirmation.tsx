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
`;

const Icon = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
`;

const Text = styled.div`
  flex: 1;
`;

const Redirect = styled(Link)`
  color: ${(props: ThemeProps) => props.theme.secondaryMain};
  font-weight: ${Styles.fontWeights.semiBold};

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
  const { ui } = Functions.useSignalsStore();

  return (
    <Container>
      {props.checkboxActive.value ? (
        <Icon onClick={() => (props.checkboxActive.value = false)}>
          <Icons.CheckboxActive
            height={20}
            fill={Styles.secondary[ui.theme.value].main}
            addHover
          />
        </Icon>
      ) : (
        <Icon onClick={() => (props.checkboxActive.value = true)}>
          <Icons.CheckboxInactive
            height={20}
            fill={Styles.text[ui.theme.value]}
            addHover
          />
        </Icon>
      )}

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
