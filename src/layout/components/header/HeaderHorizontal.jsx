import React, { useEffect, useRef, useState } from "react";

import { useSelector } from "react-redux";

import { Layout, Button, Row, Col } from "antd";
import { RiCloseLine, RiMenuFill } from "react-icons/ri";
import { Search } from "react-iconly";

import HeaderSearch from './HeaderSearch';
import HeaderUser from "./HeaderUser";
import HeaderNotifications from "./HeaderNotifications";
import HeaderLanguages from "./HeaderLanguages";
import MenuLogo from "../menu/logo";
import MenuHorizontal from "../menu/item/MenuHorizontal";
import MenuMobile from "../menu/mobile";

const { Header } = Layout;

export default function HeaderHorizontal(props) {
  const { visible, setVisible } = props;

  const [searchHeader, setSearchHeader] = useState(false);
  const [searchActive, setSearchActive] = useState(false);

  // Redux
  const customise = useSelector(state => state.customise)

  // Header Class
  const [headerClass, setHeaderClass] = useState()

  useEffect(() => {
    if (customise.navigationFull) {
      setHeaderClass(" hp-header-full");
    } else if (customise.navigationBg) {
      setHeaderClass(" hp-header-bg");
    } else {
      setHeaderClass("");
    }
  }, [customise])

  // Mobile Sidebar
  const onClose = () => {
    setVisible(false);
  };

  // Focus
  const inputFocusRef = useRef(null);
  const inputFocusProp = {
    ref: inputFocusRef,
  };

  // Search Active
  setTimeout(() => setSearchActive(searchHeader), 100);

  const searchClick = () => {
    setSearchHeader(true)

    setTimeout(() => {
      inputFocusRef.current.focus({
        cursor: 'start',
      });
    }, 200);
  }

  // Mobile Sidebar
  const showDrawer = () => {
    setVisible(true);
    setSearchHeader(false);
  };

  // Children
  const headerChildren = () => {
    return (
      <Row
        className="hp-w-100 hp-position-relative"
        align="middle"
        justify="space-between"
      >
        <Col>
          <MenuLogo />

          <Col className="hp-mobile-sidebar-button">
            <Button
              className="hp-mobile-sidebar-button"
              type="text"
              onClick={showDrawer}
              icon={
                <RiMenuFill
                  size={10}
                  className="remix-icon hp-text-color-black-80"
                />
              }
            />
          </Col>
        </Col>

        {
          !searchHeader && (
            <Col flex="1 0 0" className="hp-mx-24">
              <Row justify="center" className="hp-w-100">
                <Col span={24}>
                  <MenuHorizontal />
                </Col>
              </Row>
            </Col>
          )
        }

        <Col
          flex="1"
          style={{ display: !searchHeader ? 'none' : 'block' }}
          className={`hp-pl-md-0 hp-pr-md-0 hp-pl-32 hp-pr-16 hp-header-search ${searchActive && "hp-header-search-active"}`}
        >
          <HeaderSearch inputFocusProp={inputFocusProp} setSearchHeader={setSearchHeader} />
        </Col>

        <Col>
          <Row align="middle">
            <HeaderLanguages />

            <Col className="hp-d-flex-center hp-mr-4">
              {!searchHeader ? (
                <Button
                  type="text"
                  icon={
                    <Search
                      set="curved"
                      className="hp-text-color-black-60"
                    />
                  }
                  onClick={() => searchClick()}
                />
              ) : (
                <Button
                  type="text"
                  icon={
                    <RiCloseLine
                      size={24}
                      className="hp-text-color-black-60"
                    />
                  }
                  onClick={() => setSearchHeader(false)}
                />
              )}
            </Col>

            <HeaderNotifications />

            <HeaderUser />
          </Row>
        </Col>
      </Row>
    )
  }

  return (
    <Header
      className={'hp-header-horizontal' + headerClass}
    >
      <Row justify="center" className="hp-w-100">
        {
          customise.contentWidth == "full" && (
            <Col span={24}>
              {headerChildren()}
            </Col>
          )
        }

        {
          customise.contentWidth == "boxed" && (
            <Col xxl={20} xl={22} span={24}>
              {headerChildren()}
            </Col>
          )
        }
      </Row>

      <MenuMobile onClose={onClose} visible={visible} />
    </Header>
  );
};