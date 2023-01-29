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
import React from "react";

export default function ModalComponent({
  form,
  onCancel,
  onOk,
  loading,
  record,
  visible,
  state,
}) {
  return (
    <>
      <Modal
        title={`${record ? "Edit" : "Tambah"} Data Komponen`}
        visible={visible}
        style={{
          marginTop: "-10px",
        }}
        confirmLoading={loading}
        onCancel={onCancel}
        onOk={onOk}
      >
        <div
          style={{
            height: "calc(100vh - 800px)",
            overflowY: "scroll",
            overflowX: "hidden",
          }}
        >
          <Form form={form} layout="vertical">
            <Row gutter={[20, 20]}>
              <Col span={12}>
                <Form.Item
                  name="nama"
                  label="Nama Komponen"
                  rules={[
                    {
                      required: true,
                      message: "Nama Komponen harus diisi",
                    },
                  ]}
                >
                  <Input placeholder="Gaji Pokok" />
                </Form.Item>
              </Col>
              <Col span={12}>
                <Form.Item
                  name="tipe"
                  rules={[
                    {
                      required: true,
                      message: "Tipe jabatan harus diisi",
                    },
                  ]}
                  label="Tipe Komponen"
                >
                  <Select placeholder="Pilih tipe komponen">
                    <Select.Option value="Penambahan">Penambahan</Select.Option>
                    <Select.Option value="Pengurangan">
                      Pengurangan
                    </Select.Option>
                  </Select>
                </Form.Item>
              </Col>
            </Row>
          </Form>
        </div>
      </Modal>
    </>
  );
}
