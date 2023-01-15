import react from "react";
import Breadcrumb from "react-bootstrap/Breadcrumb";

interface CrumbProps {
  activeSync: string;
  navigateHome: () => void;
}

function Crumb({ activeSync, navigateHome }: CrumbProps) {
  return (
    <Breadcrumb>
      <Breadcrumb.Item onClick={navigateHome} active={activeSync === ""}>
        All Syncs
      </Breadcrumb.Item>
      {activeSync !== "" && (
        <Breadcrumb.Item active={true}>{activeSync}</Breadcrumb.Item>
      )}
    </Breadcrumb>
  );
}

export default Crumb;
