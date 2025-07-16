// import ExpireSessionModal from '@/components/expire-session-modal'

import { Suspense, lazy, useEffect } from "react";
import { useThemeContext } from "../context/useThemeContext";
import { UserProvider, useUserContext } from "../context/userContext";
import useViewport from "../hooks/useViewPort";
import Preloader from "../common/Preloader";
const Topbar = lazy(() => import("./TopNavBar"));
const LeftSidebar = lazy(() => import("./LeftSidebar"));

const VerticalLayout = ({ children }) => {
  const { updateSideNavMode } = useThemeContext();
  const { width } = useViewport();

  useEffect(() => {
    if (!document.body) return;

    const className = "enlarge-menu-all";
    const shouldAddClass = width <= 1024;

    if (shouldAddClass) {
      document.body.classList.add(className);
    } else {
      document.body.classList.remove(className);
    }

    return () => {
      document.body.classList.remove(className);
    };
  }, [width]);

  useEffect(() => {
    if (width < 1324) {
      updateSideNavMode("sm");
    } else if (width >= 1324) {
      updateSideNavMode("default");
    }
  }, [width, updateSideNavMode]);

  return (
    <UserProvider>
      <OverallSection>
        <Suspense fallback={<Preloader />}>{children}</Suspense>
      </OverallSection>
    </UserProvider>
  );
};

const OverallSection = ({ children }) => {
  const { user } = useUserContext();

  if (!user) return <div>Loading...</div>;

  return (
    <>
      <Suspense fallback={<div />}>
        <LeftSidebar />
      </Suspense>
      <Suspense fallback={<div />}>
        <Topbar />
      </Suspense>
      <div className="page-wrapper">
        <div
          className={`page-content-tab ${
            user?.isExpanded ? "page-content-tab-extend" : ""
          }`}
        >
          <div className="container-fluid h-100">{children}</div>
        </div>
      </div>
      {/* {user?.roles?.role_name && user?.roles?.role_name !== 'Vendor' && <ExpireSessionModal />} */}
    </>
  );
};

export default VerticalLayout;
