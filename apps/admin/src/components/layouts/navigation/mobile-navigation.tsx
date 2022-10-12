import Drawer from "@components/ui/drawer";
import DrawerWrapper from "@components/ui/drawer-wrapper";
import { useUI } from "@contexts/ui.context";

const MobileNavigation: React.FC = ({ children }) => {
  const { displaySidebar, closeSidebar } = useUI();

  return (
    <Drawer open={displaySidebar} onClose={closeSidebar} variant="left">
      <DrawerWrapper onClose={closeSidebar}>
        <div className="flex flex-col space-y pt-2 pl-2 w-full">{children}</div>
      </DrawerWrapper>
    </Drawer>
  );
};
export default MobileNavigation;
