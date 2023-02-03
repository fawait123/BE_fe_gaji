import {
  Col,
  DatePicker,
  Form,
  Input,
  Modal,
  Radio,
  Row,
  Select,
  TimePicker,
} from "antd";
import React, { useEffect } from "react";
import { useState } from "react";
import httpRequest from "@/utils/axios";

const endpointKaryawan = "api/karyawan";

export default function ModalFamily({
  form,
  onCancel,
  onOk,
  loading,
  record,
  visible,
  state,
}) {
  const [dataEmployee, setDataEmployee] = useState([]);
  const dataJenis = [
    {
      id: 1,
      nama: "Anak",
      display: "Anak",
    },
    {
      id: 2,
      nama: "Istri",
      display: "Istri",
    },
    {
      id: 3,
      nama: "Suami",
      display: "Suami",
    },
  ];
  const getEmployee = async () => {
    // setLoadingAdd(true)
    await httpRequest({
      url: endpointKaryawan,
      method: "get",
      params: {
        page: 1,
        perPage: 100000,
      },
    })
      .then((response) => {
        setDataEmployee(response?.data?.results);
        // setVisible(true)
      })
      .finally(() => {
        // setLoadingAdd(false)
      });
  };
  useEffect(() => {
    getEmployee();
  }, []);
  return (
    <>
      <Modal
        title={`${record ? "Edit" : "Tambah"} Data Keluarga`}
        visible={visible}
        style={{
          marginTop: "-70px",
        }}
        confirmLoading={loading}
        onCancel={onCancel}
        onOk={onOk}
      >
        <div
          style={{
            height: "calc(100vh - 550px)",
            overflowY: "scroll",
            overflowX: "hidden",
          }}
        >
          <Form form={form} layout="vertical">
            <Row gutter={[20, 20]}>
              <Col span={23}>
                <Form.Item
                  name="karyawan_id"
                  label="Nama Karyawan"
                  rules={[
                    {
                      required: true,
                      message: "Nama Karyawan harus diisi",
                    },
                  ]}
                >
                  <Select placeholder="Pilih Karyawan" allowClear>
                    {dataEmployee.map((el, _index) => {
                      return (
                        <Select.Option value={el.id} key={_index}>
                          {el.nama}
                        </Select.Option>
                      );
                    })}
                  </Select>
                </Form.Item>
              </Col>
              <Col span={23}>
                <Form.Item
                  name="nama"
                  label="Nama Anggota Keluarga"
                  rules={[
                    {
                      required: true,
                      message: "Nama Anggota Keluarga harus diisi",
                    },
                  ]}
                >
                  <Input placeholder="Sri Surahmi" />
                </Form.Item>
              </Col>
              <Col span={11}>
                <Form.Item
                  name="jenis"
                  label="Jenis Keluarga"
                  rules={[
                    {
                      required: true,
                      message: "Jenis keluarga harus diisi",
                    },
                  ]}
                >
                  <Select placeholder="Pilih jenis keluarga">
                    {dataJenis.map((el, _index) => {
                      return (
                        <Select.Option key={_index} value={el.nama}>
                          {el.display}
                        </Select.Option>
                      );
                    })}
                  </Select>
                </Form.Item>
              </Col>
              <Col span={12}>
                <Form.Item
                  name="tgl_lahir"
                  rules={[
                    {
                      required: true,
                      message: "Tanggal Lahir tidak boleh kosong",
                    },
                  ]}
                  label="Tanggal Lahir"
                >
                  <DatePicker format={"DD-MM-YYYY"} style={{ width: "100%" }} />
                </Form.Item>
              </Col>
            </Row>
          </Form>
        </div>
      </Modal>
    </>
  );
}
