import Link from "next/link";
import styled from "styled-components";
import { useContext } from "react";
import { Signal } from "@preact/signals-react";

import * as Icons from "@/components/icons";
import * as Colors from "@/utils/colors";
import * as Sizes from "@/utils/sizes";
import { SignalsStoreContext } from "@/pages/_app";
import { ThemeProps } from "@/components/layout";

// ========================================================================================= //
// [ STYLED COMPONENTS ] =================================================================== //
// ========================================================================================= //

const Container = styled.section`
  display: flex;
  align-items: center;
  gap: ${Sizes.pxAsRem.twelve};
  font-size: ${Sizes.pxAsRem.fourteen};
  font-weight: ${Sizes.fontWeights.medium};
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
  font-weight: ${Sizes.fontWeights.semiBold};

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
  const { ui } = useContext(SignalsStoreContext);

  return (
    <Container>
      {props.checkboxActive.value ? (
        <Icon onClick={() => (props.checkboxActive.value = false)}>
          <Icons.CheckboxActive
            height={20}
            fill={Colors.secondary[ui.theme.value].main}
          />
        </Icon>
      ) : (
        <Icon onClick={() => (props.checkboxActive.value = true)}>
          <Icons.CheckboxInactive
            height={20}
            fill={Colors.text[ui.theme.value]}
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
