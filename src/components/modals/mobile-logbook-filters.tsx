import styled from "styled-components";

import * as Styles from "@/utils/styles";

import { MobileMenuModal } from "./mobile-menu-modal";

// ========================================================================================= //
// [ STYLED COMPONENTS ] =================================================================== //
// ========================================================================================= //

const Container = styled.section`
	border: red solid 1px;
`;

// ========================================================================================= //
// [ EXPORTED COMPONENT ] ================================================================== //
// ========================================================================================= //

export const MobileLogbookFilters = () => {
	return (
		<MobileMenuModal page="Logbooks">

		</MobileMenuModal>
	)
}
