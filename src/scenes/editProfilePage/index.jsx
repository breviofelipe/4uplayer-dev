import PageSchemaComponent from "components/page/PageSchemaComponent";
import FormEmailConfirmed from "./components/Form";
import { useSelector } from "react-redux";

export default function EditProfilePage () {
    const { emailSended } = useSelector((state) => state.user);

    const topContent = () => {
        
    }
    const mainContent = () => {
        return <FormEmailConfirmed emailSended={emailSended} />
    }
    const lastContent = () => {
        
    }
    return <PageSchemaComponent topContent={topContent()} main={mainContent()} lastContent={lastContent()} />
}