import { Box } from "@chakra-ui/react";





interface SideBarProps {
  children: React.ReactNode;
}
export default function SideBar( {children} : SideBarProps) {

  return (
    <>
    <Box bg="gray.100">
      {children}
    </Box>
    </>
  );
}