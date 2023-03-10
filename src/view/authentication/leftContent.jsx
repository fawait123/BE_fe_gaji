import React from "react";

import { useSelector } from "react-redux";

import { Row, Col } from "antd";

import bg from "@/assets/images/pages/authentication/authentication-bg.svg";
import bgDark from "@/assets/images/pages/authentication/authentication-bg-dark.svg";
import logo from "@/assets/images/logo/logo-vector-blue.svg";
import logoDark from "@/assets/images/logo/logo-vector.svg";
import Logo from "../../assets/images/logo/Logo-sidebar-login.png";

export default function LeftContent() {
  // Redux
  const theme = useSelector((state) => state.customise.theme);

  return (
    <Col
      lg={12}
      span={24}
      className="hp-bg-color-primary-4 hp-bg-color-dark-90 hp-position-relative"
    >
      <Row
    style={{display:"flex",justifyContent:"center",alignItems:"center"}}
      className="hp-image-row hp-h-100 hp-px-sm-8 hp-px-md-16 hp-pb-sm-32 hp-pt-md-96 hp-pt-md-32">
        <Col className="hp-logo-item hp-m-sm-16 hp-m-md-32 hp-m-64">
          <img src={theme == "light" ? Logo : Logo} alt="Logo" width="500" />
        </Col>
                    
        <Col span={24}>
          <Row align="middle" justify="right" className="hp-h-100">
            <Col
              md={20}
              span={24}
              className="hp-bg-item hp-text-center hp-mb-md-32"
            >
            </Col>
          </Row>
        </Col>
      </Row>
    </Col>
  );
}
