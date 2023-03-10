import { Link } from "react-router-dom";

import { Dropdown, Col, Avatar, Divider, Row } from "antd";
import { Calendar, Game, People } from "react-iconly";
import { useHistory } from "react-router-dom";
import avatarImg from "../../../assets/images/memoji/memoji-1.png";
import { useEffect } from "react";
import { useState } from "react";

export default function HeaderUser() {
  const { push } = useHistory();
  const [account, setAccount] = useState({});
  const handleLogout = () => {
    window.localStorage.clear();
    push("/login");
  };
  useEffect(() => {
    let account = JSON.parse(window.localStorage.getItem("data"));
    setAccount(account);
  });
  const menu = (
    <div
      className="hp-border-radius hp-border-1 hp-border-color-black-40 hp-bg-black-0 hp-bg-dark-100 hp-border-color-dark-80 hp-p-24 hp-mt-12"
      style={{ width: 260 }}
    >
      {/* <span className="hp-d-block h5 hp-text-color-black-100 hp-text-color-dark-0 hp-mb-8">
        Profile Settings
      </span> */}

      {/* <Link
        to="/"
        className="hp-p1-body hp-text-color-primary-1 hp-text-color-dark-primary-2 hp-hover-text-color-primary-2"
      >
        View Profile
      </Link> */}

      {/* <Divider className="hp-mt-16 hp-mb-6" /> */}

      {/* <Row>
        <Col span={24}>
          <Link
            to="/"
            className="hp-d-flex-center hp-p1-body hp-py-8 hp-px-10 hp-d-block hp-transition hp-hover-bg-primary-4 hp-hover-bg-dark-80 hp-border-radius"
            style={{ marginLeft: -10, marginRight: -10 }}
          >
            <People set="curved" size={16} />

            <span className="hp-ml-8">Explore Creators</span>
          </Link>
        </Col>

        <Col span={24}>
          <Link
            to="/"
            className="hp-d-flex-center hp-p1-body hp-py-8 hp-px-10 hp-d-block hp-transition hp-hover-bg-primary-4 hp-hover-bg-dark-80 hp-border-radius"
            style={{ marginTop: -7, marginLeft: -10, marginRight: -10 }}
          >
            <Calendar set="curved" size={16} />

            <span className="hp-ml-8">Calendar Application</span>
          </Link>
        </Col>

        <Col span={24}>
          <Link
            to="/"
            className="hp-d-flex-center hp-p1-body hp-py-8 hp-px-10 hp-d-block hp-transition hp-hover-bg-primary-4 hp-hover-bg-dark-80 hp-border-radius"
            style={{ marginTop: -7, marginLeft: -10, marginRight: -10 }}
          >
            <Game set="curved" size={16} />

            <span className="hp-ml-8">Help Desk</span>
          </Link>
        </Col>
      </Row> */}

      {/* <Divider className="hp-mb-16 hp-mt-6" /> */}

      <div
        onClick={handleLogout}
        style={{
          cursor: "pointer",
        }}
      >
        Logout
      </div>
    </div>
  );

  return (
    <Col>
      <Dropdown overlay={menu} placement="bottomLeft">
        <div style={{ display: "flex", alignItems: "center" }}>
          <span style={{ marginRight: 20 }}>
          <b>  {account?.role} | {account?.username}</b>
          
          </span>{" "}
          <Avatar
            src={account?.foto !== null ? account?.foto : avatarImg}
            size={60}
            style={{border:"0.3px solid black"}}
            className="hp-cursor-pointer"
          />
        </div>
      </Dropdown>
    </Col>
  );
}
