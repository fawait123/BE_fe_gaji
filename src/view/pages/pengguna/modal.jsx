import {
  Col,
  DatePicker,
  Form,
  Image,
  Input,
  Modal,
  Radio,
  Row,
  Select,
  Upload,
} from "antd";
import { Delete, Upload as IconUpload } from "react-iconly";
import React from "react";

export default function ModalEmployee({
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
        title={`${record ? "Edit" : "Tambah"} Data Pengguna`}
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
            height: "calc(100vh - 380px)",
            overflowY: "scroll",
            overflowX: "hidden",
          }}
        >
          <Form form={form} layout="vertical">
            <Row gutter={[20, 20]}>
              <Col span={23}>
                <div
                  style={{
                    position: "relative",
                  }}
                >
                  <Upload.Dragger
                    fileList={state.fileList}
                    showUploadList={false}
                    onChange={(info) => {
                      let fileReader = new FileReader();
                      fileReader.readAsDataURL(info.file.originFileObj);
                      fileReader.onloadend = () => {
                        state.setBaseUrl({
                          FileList: info.fileList,
                          status: true,
                          url: fileReader.result,
                        });
                      };
                    }}
                  >
                    {state.baseUrl.status ? (
                      <>
                        <Image src={state.baseUrl.url} />
                      </>
                    ) : (
                      <>
                        <p className="ant-upload-drag-icon">
                          <IconUpload style={{ width: 50 }} set="curved" />
                        </p>
                        <p className="ant-upload-text">
                          klik atau seret foto pada bidang ini
                        </p>
                        <p className="ant-upload-hint">
                          uploud foto maksimal 10MB/file (png,jpg&jpeg)
                        </p>
                      </>
                    )}
                  </Upload.Dragger>
                  {state.baseUrl.status ? (
                    <div
                      style={{
                        position: "absolute",
                        top: 10,
                        cursor: "pointer",
                        right: 10,
                      }}
                      onClick={() => {
                        state.setBaseUrl({
                          FileList: [],
                          status: false,
                          url: "",
                        });
                      }}
                    >
                      <Delete set="curved" primaryColor="#f50" />
                    </div>
                  ) : null}
                </div>
              </Col>
              {/* <Col span={12}>
                <Form.Item
                  name="nama"
                  label="Nama"
                  rules={[
                    {
                      required: true,
                      message: "Nama tidak boleh kosong",
                    },
                  ]}
                >
                  <Input placeholder="Nama" />
                </Form.Item>
              </Col> */}
              <Col span={23}>
                <Form.Item
                  name="username"
                  label="Username"
                  rules={[
                    {
                      required: true,
                      message: "Username harus diisi",
                    },
                  ]}
                >
                  <Input placeholder="Agus Sudarmana" />
                </Form.Item>
              </Col>
              <Col span={23}>
                <Form.Item
                  name="password"
                  label="Password"
                  rules={
                    record
                      ? []
                      : [
                          {
                            required: true,
                            message: "Password harus diisi",
                          },
                        ]
                  }
                >
                  <Input.Password placeholder="Masukan password" />
                </Form.Item>
              </Col>
              <Col span={13}>
                <Form.Item
                  name="email"
                  label="Email"
                  rules={[
                    {
                      required: true,
                      message: "Email harus diisi",
                    },
                  ]}
                >
                  <Input placeholder="Agussud828@gmail.com" />
                </Form.Item>
              </Col>
              <Col span={10}>
                <Form.Item
                  name="role"
                  label="Role Pengguna"
                  rules={[
                    {
                      required: true,
                      message: "Role harus diisi",
                    },
                  ]}
                >
                  <Select placeholder="Pilih role pengguna">
                    <Select.Option value="admin">Admin</Select.Option>
                    <Select.Option value="staff">Staff Kalurahan</Select.Option>
                    <Select.Option value="lurah">Lurah</Select.Option>
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
