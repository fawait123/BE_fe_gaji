import { Button, Col, Divider, Image, List, Row, Spin, Typography } from "antd";
import Card from "antd/lib/card/Card";
import React from "react";
import { useEffect } from "react";
import BreadCrumbs from "../../../layout/components/content/breadcrumbs";
import PageTitle from "../../../layout/components/content/page-title";
import query from "../../../utils/query";
import httpRequest from "@/utils/axios";
import { useState } from "react";
import moment from "moment/moment";

const endpoint = "api/karyawan/detail";

const Detail = () => {
  const [antLoading, setAntLoading] = useState(true);
  const [karyawan, setKaryawan] = useState([]);
  const getData = async (id) => {
    setAntLoading(true);
    await httpRequest({
      url: `${endpoint}`,
      method: "get",
      params: {
        id: id,
      },
    })
      .then((response) => {
        console.log(response?.data?.data);
        setKaryawan(response?.data?.data);
      })
      .finally(() => {
        setAntLoading(false);
      });
  };
  useEffect(() => {
    let id = query("id");
    getData(id);
  }, []);
  const data = [
    {
      ...karyawan,
    },
  ];
  return (
    <>
      <Row gutter={[32, 32]}>
        <Col span={24}>
          <Row gutter={[32, 32]}>
            <BreadCrumbs
              breadCrumbParent="Pages"
              breadCrumbActive="Detail Data Karyawan"
            />
          </Row>
        </Col>

        <PageTitle pageTitle="Detail Data Karyawan" />
        <Card style={{ marginTop: 20, width: "100%", padding: 10 }}>
          {antLoading ? (
            <div style={{ display: "flex", justifyContent: "center" }}>
              <Spin />
            </div>
          ) : (
            <>
              <Row justify="center">
                <Col span={12}>
                  <Image
                    style={{ width: "100%", borderRadius: 10 }}
                    src={
                      karyawan.foto ||
                      "https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png"
                    }
                  />
                </Col>
              </Row>
              <Divider orientation="left">Data Identitas Karyawan</Divider>
              <List
                bordered
                dataSource={data}
                renderItem={(item) => (
                  <List.Item>
                    <div style={{ display: "flex" }}>
                      <div style={{ marginRight: 25 }}>
                        <p>NO SK</p>
                        <p>Nama Karyawan</p>
                        <p>Jenis Kelamin</p>
                        <p>Tanggal Lahir / Umur</p>
                        <p>Jabatan</p>
                        <p>NO HP</p>
                        <p>Bank / NO Rekening</p>
                        <p>Tanggal Masuk Kerja / Lama Bekerja</p>
                        <p>Alamat Lengkap</p>
                      </div>
                      <div>
                        <p>: {item.no_sk}</p>
                        <p>: {item.nama}</p>
                        <p>: {item.jenis_kelamin}</p>
                        <p>
                          : {moment(item.tgl_lahir).format("DD MMMM yyyy")} /{" "}
                          {moment(new Date()).diff(item?.tgl_lahir, "year")}{" "}
                          Tahun
                        </p>
                        <p>: {item?.jabatan?.nama}</p>
                        <p>: {item?.no_hp}</p>
                        <p>
                          : {item?.nama_bank} / {item?.no_rek}
                        </p>
                        <p>
                          :{" "}
                          {moment(item?.tgl_masuk_kerja).format("DD MMMM yyyy")}{" "}
                          /{" "}
                          {moment(new Date()).diff(
                            item?.tgl_masuk_kerja,
                            "year"
                          )}{" "}
                          Tahun
                        </p>
                        <p>: {item?.alamat}</p>
                      </div>
                    </div>
                  </List.Item>
                )}
              />

              <Divider orientation="left">Data Keluarga Karyawan</Divider>
              <List
                bordered
                dataSource={data}
                renderItem={(item) =>
                  item.keluargas.map((el) => {
                    return (
                      <List.Item>
                        <div style={{ display: "flex" }}>
                          <div style={{ marginRight: 95 }}>
                            <p>Nama Keluarga</p>
                            <p>Tanggal Lahir</p>
                            <p>Jenis Anggota Keluarga</p>
                            <p>Umur</p>
                          </div>
                          <div>
                            <p>: {el?.nama}</p>
                            <p>
                              : {moment(el?.tgl_lahir).format("DD MMMM yyyy")}
                            </p>
                            <p>: {el?.jenis}</p>
                            <p>
                              : {moment(new Date()).diff(el?.tgl_lahir, "year")}{" "}
                              Tahun
                            </p>
                          </div>
                        </div>
                      </List.Item>
                    );
                  })
                }
              />
            </>
          )}
        </Card>
      </Row>
    </>
  );
};

export default Detail;
