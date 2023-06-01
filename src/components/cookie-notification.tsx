import Link from "next/link";
import styled from "styled-components";
import Cookies from "js-cookie";
import { useRouter } from "next/router";

import * as Globals from "@/components";
import * as Icons from "@/components/icons";
import * as Constants from "@/utils/constants";
import * as Functions from "@/utils/functions";
import * as Styles from "@/utils/styles";
import { ThemeProps } from "@/components/layout";
import { ClientRoutes } from "@/utils/constants";

// ========================================================================================= //
// [ STYLED COMPONENTS ] =================================================================== //
// ========================================================================================= //

const Container = styled.section`
  position: fixed;
  bottom: ${Styles.pxAsRem.twenty};
  left: 50%;
  transform: translateX(-50%);
  z-index: ${Styles.zIndexes.notification};
  width: 100%;
  max-width: ${Styles.widths.desktop}px;

  ${Styles.setMediaPaddings()};
`;

const Body = styled.div`
  display: flex;
  align-items: center;
  gap: ${Styles.pxAsRem.twenty};
  padding: ${Styles.pxAsRem.twelve} ${Styles.pxAsRem.twentyFour};
  background-color: ${(props: ThemeProps) => props.theme.backgroundOne};
  border: ${(props: ThemeProps) => props.theme.backgroundFour} solid 1px;
  border-radius: ${Styles.pxAsRem.eight};

  ${(props: ThemeProps) => props.theme.shadowOne};

  @media (max-width: 620px) {
    flex-direction: column;
  }
`;

const Icon = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`;

const Text = styled.p`
  margin: 0;
  color: ${(props: ThemeProps) => props.theme.text};
  font-size: ${Styles.pxAsRem.fourteen};
  font-weight: ${Styles.fontWeights.bold};
`;

const CookiePolicyLink = styled(Link)`
  ${Styles.clearLink};
  color: ${(props: ThemeProps) => props.theme.primaryMain};

  @media (hover: hover) {
    :hover {
      color: ${(props: ThemeProps) => props.theme.primaryDark};
    }
  }
`;

const Buttons = styled.div`
  display: flex;
  flex-shrink: 0;
  align-items: flex-start;
  gap: ${Styles.pxAsRem.twenty};

  @media (max-width: 620px) {
    width: 100%;
    gap: ${Styles.pxAsRem.eight};
  }

  @media (max-width: ${Styles.widths.mobile}px) {
    flex-direction: column;
  }
`;

// ========================================================================================= //
// [ EXPORTED COMPONENT ] ================================================================== //
// ========================================================================================= //

export const CookieNotification = () => {
  const router = useRouter();

  const { theme, cookieNotification } = Functions.useSignalsStore().ui;

  function acceptCookies(): void {
    Cookies.set(Constants.cookiePolicyAcceptance, "accepted");
    cookieNotification.value = false;
  }

  function denyCookies(): void {
    Cookies.set(Constants.cookiePolicyAcceptance, "denied");
    Cookies.remove(Constants.userId);
    Cookies.remove(Constants.token);
    cookieNotification.value = false;
    router.push(ClientRoutes.LANDING);
  }

  return (
    <Container>
      <Body>
        {theme.value && (
          <Icon>
            <Icons.Cookies
              width={20}
              height={20}
              fill={Styles.background[theme.value].ten}
            />
          </Icon>
        )}
        <Text>
          This app uses cookies and similar technologies to improve your
          experience. By clicking “Allow Cookies”, you agree to the details
          outlined in our{" "}
          <CookiePolicyLink href={ClientRoutes.COOKIE} target="_blank">
            Cookie Policy
          </CookiePolicyLink>
          .
        </Text>
        <Buttons>
          <Globals.Button
            type="button"
            onClick={acceptCookies}
            size="large"
            borderRadius="six"
            primary
          >
            Accept
          </Globals.Button>

          <Globals.Button
            type="button"
            onClick={denyCookies}
            size="large"
            borderRadius="six"
            outlined
          >
            Deny
          </Globals.Button>
        </Buttons>
      </Body>
    </Container>
  );
};
