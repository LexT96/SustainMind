import { Box } from "@mui/material";
import { PageLayout } from "../components/PageLayout"
import { SupplierCard } from "../components/Suppliers/SupplierCard";
import { SuppliersTable } from "../components/Suppliers/SuppliersTable";

const mockSuppliers = [
    {
      id: 1,
      name: "SupplierName",
      image: "https://picsum.photos/300",
      numberOfProductionSites: 3,
      score: 3.5,
      location: "Bangladesh, India",
      description:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Morbi sit amet nisi tincidunt, interdum tellus a, dignissim diam. Mauris luctus consequat erat nec rhoncus. Suspendisse consequat, purus in faucibus porttitor, odio sem viverra nisi, non hendrerit tellus augue at dui. Nam at finibus justo, sed condimentum nisi. Suspendisse gravida aliquam leo, in tempor nibh pulvinar in. Suspendisse iaculis massa eu diam tincidunt varius eget eu mi. Curabitur pretium ante id ante pellentesque, a convallis mi tempor. ",
    },
    {
      id: 1,
      name: "SupplierName",
      image: "https://picsum.photos/300",
      numberOfProductionSites: 3,
      score: 3.5,
      location: "Bangladesh, India",
      description:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Morbi sit amet nisi tincidunt, interdum tellus a, dignissim diam. Mauris luctus consequat erat nec rhoncus. Suspendisse consequat, purus in faucibus porttitor, odio sem viverra nisi, non hendrerit tellus augue at dui. Nam at finibus justo, sed condimentum nisi. Suspendisse gravida aliquam leo, in tempor nibh pulvinar in. Suspendisse iaculis massa eu diam tincidunt varius eget eu mi. Curabitur pretium ante id ante pellentesque, a convallis mi tempor. ",
    },
    {
      id: 1,
      name: "SupplierName",
      image: "https://picsum.photos/300",
      numberOfProductionSites: 3,
      score: 3.5,
      location: "Bangladesh, India",
      description:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Morbi sit amet nisi tincidunt, interdum tellus a, dignissim diam. Mauris luctus consequat erat nec rhoncus. Suspendisse consequat, purus in faucibus porttitor, odio sem viverra nisi, non hendrerit tellus augue at dui. Nam at finibus justo, sed condimentum nisi. Suspendisse gravida aliquam leo, in tempor nibh pulvinar in. Suspendisse iaculis massa eu diam tincidunt varius eget eu mi. Curabitur pretium ante id ante pellentesque, a convallis mi tempor. ",
    }
  ];

export const SuppliersPage = () => {
    return (
      <PageLayout>
        <SuppliersTable suppliers={mockSuppliers} />
      </PageLayout>
    );
}