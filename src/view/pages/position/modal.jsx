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

export default function ModalPosition({
  form,
  onCancel,
  onOk,
  loading,
  state,
  record,
  visible,
}) {
  return (
    <>
      <Modal
        title={`${record ? "Edit" : "Tambah"} Data ${
          state.type === "jabatan" ? "Jabatan" : "Komponen"
        }`}
        visible={visible}
        confirmLoading={loading}
        onCancel={onCancel}
        onOk={onOk}
      >
        <Form form={form} layout="vertical">
          <Row gutter={[20, 20]}>
            <Col span={12}>
              <Form.Item
                name="nama"
                label={`Nama ${
                  state.type === "jabatan" ? "Jabatan" : "Komponen"
                }`}
                rules={[
                  {
                    required: true,
                    message: `Nama ${
                      state.type === "jabatan" ? "Jabatan" : "Komponen"
                    } harus diisi`,
                  },
                ]}
              >
                <Input
                  placeholder={`Nama ${
                    state.type === "jabatan" ? "Jabatan" : "Komponen"
                  }`}
                />
              </Form.Item>
            </Col>

            <Col span={12}>
              <Form.Item
                name="tipe"
                label="Tpe Jabatan"
                rules={[
                  {
                    required: true,
                    message: "Tipe Jabatan harus diisi",
                  },
                ]}
              >
                {state.type === "jabatan" ? (
                  <Select placeholder="Pilih tipe jabatan">
                    <Select.Option value="Pamong">Pamong</Select.Option>
                    <Select.Option value="Staff">Staff Kelurahan</Select.Option>
                    <Select.Option value="Honorer">Honorer</Select.Option>
                    <Select.Option value="Pensiunan">Pensiunan</Select.Option>
                  </Select>
                ) : (
                  <Select placeholder="Pilih Tipe">
                    <Select.Option value="Penambahan">Penambahan</Select.Option>
                    <Select.Option value="Pengurangan">
                      Pengurangan
                    </Select.Option>
                  </Select>
                )}
              </Form.Item>
            </Col>
          </Row>
        </Form>
      </Modal>
    </>
  );
}
