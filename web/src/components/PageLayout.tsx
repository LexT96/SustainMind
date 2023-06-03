import { Container } from "@mui/material"
import { MainNavbar } from "./Navbars/MainNavbar"

export const PageLayout = ({children}: any) => {
    return <div>
        <MainNavbar />
        <Container className="mt-24">
            {children}
        </Container>
    </div>
}