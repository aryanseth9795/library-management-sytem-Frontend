import React from "react";
import "./sidebar.css";
import logo from "../../assets/IIIT.png";
import { Link } from "react-router-dom";
import { TreeView } from "@mui/x-tree-view/TreeView";
import { TreeItem } from "@mui/x-tree-view/TreeItem";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import PostAddIcon from "@mui/icons-material/PostAdd";
import AddIcon from "@mui/icons-material/Add";
import ImportExportIcon from "@mui/icons-material/ImportExport";
import DashboardIcon from "@mui/icons-material/Dashboard";
import PeopleIcon from "@mui/icons-material/People";


const Sidebar = () => {
  return (
    <div className="sidebar">
      <div>
      <Link to="/">
        <img src={logo} alt="IIIT" />
      </Link>
      </div>
      <div>
      <Link to="/admin/dashboard">
        <p>
          <DashboardIcon /> Dashboard
        </p>
      </Link>
      <Link to="/admin/users">
        <p>
          <PeopleIcon /> Users
        </p>
      </Link>
      <Link>
        <TreeView
          defaultCollapseIcon={<ExpandMoreIcon />}
          defaultExpandIcon={<ImportExportIcon />}
        >
          <TreeItem nodeId="1" label="Books">
            <Link to="/admin/books">
              <TreeItem nodeId="2" label="All" icon={<PostAddIcon />} />
            </Link>

            <Link to="/admin/books/new">
              <TreeItem nodeId="3" label="Create" icon={<AddIcon />} />
            </Link>
          </TreeItem>
        </TreeView>
      </Link>
      <Link>
        <TreeView
          defaultCollapseIcon={<ExpandMoreIcon />}
          defaultExpandIcon={<ImportExportIcon />}
        >
          <TreeItem nodeId="1" label="Borrow">
            <Link to="/admin/requestList">
              <TreeItem nodeId="2" label="Borrow Request" icon={<AddIcon />} />
            </Link>

            <Link to="/admin/returnList">
              <TreeItem nodeId="3" label="Return Request" icon={<AddIcon />} />
            </Link>
            <Link to="/admin/borrowList">
              <TreeItem nodeId="2" label="Borrowed List" icon={<PostAddIcon />} />
            </Link>
          </TreeItem>
        </TreeView>
      </Link>
      </div>
     
    </div>
  );
};

export default Sidebar;
