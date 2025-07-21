import { Suspense, lazy, useEffect } from "react";
import { useThemeContext } from "../context/useThemeContext";
import useViewport from "../hooks/useViewPort";
import Preloader from "../common/Preloader";
import { useAuthContext } from "../context";
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
    <OverallSection>
      <Suspense fallback={<Preloader />}>{children}</Suspense>
    </OverallSection>
  );
};

const OverallSection = ({ children }) => {
  const { user } = useAuthContext();

  if (!user) return <div>Loading...</div>;

  return (
    <section className="h-100 d-flex">
      <Suspense fallback={<div />}>
        <LeftSidebar />
      </Suspense>
      <div
      className={`page-content-tab ${
        user?.isExpanded ? "page-content-tab-extend" : ""
      }`}
      >
      <Suspense fallback={<div />}>
        <Topbar />
      </Suspense>
          <div className="container-fluid" style={{ height: 'calc(100vh - 60px)'}}>{children}</div>
        </div>
    </section>
  );
};

export default VerticalLayout;
