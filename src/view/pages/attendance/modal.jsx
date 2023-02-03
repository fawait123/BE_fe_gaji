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

export default function ModalAttendance({
  form,
  onCancel,
  onOk,
  loading,
  record,
  visible,
  state,
}) {
  const [dataEmployee, setDataEmployee] = useState([]);
  const dataKehadiran = [
    {
      id: 1,
      nama: "Hadir",
    },
    {
      id: 2,
      nama: "Sakit",
    },
    {
      id: 3,
      nama: "Ijin",
    },
    {
      id: 4,
      nama: "Alpha",
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
        title={`${record ? "Edit" : "Tambah"} Data Absensi`}
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
            height: "calc(100vh - 420px)",
            overflowY: "scroll",
            overflowX: "hidden",
          }}
        >
          <Form form={form} layout="vertical">
            <Row gutter={[20, 20]}>
              <Col span={11}>
                <Form.Item
                  name="karyawan_id"
                  label="Nama Karyawan"
                  rules={[
                    {
                      required: true,
                      message: "Nama karyawan harus diisi",
                    },
                  ]}
                >
                  <Select placeholder="Pilih nama karyawan" allowClear>
                    {dataEmployee.map((el) => {
                      return (
                        <Select.Option value={el.id} key={el.id}>
                          {el.nama}
                        </Select.Option>
                      );
                    })}
                  </Select>
                </Form.Item>
              </Col>
              <Col span={12}>
                <Form.Item
                  name="tgl_absen"
                  label="Tanggal Absensi"
                  rules={[
                    {
                      required: true,
                      message: "Tanggal Absensi harus diisi",
                    },
                  ]}
                >
                  <DatePicker
                    getPopupContainer={(parent) => parent.parentNode}
                    style={{ width: "100%" }}
                    format="DD-MM-YYYY"
                  />
                </Form.Item>
              </Col>

              <Col span={11}>
                <Form.Item
                  name="jam_masuk"
                  label="Jam Masuk"
                  rules={[
                    {
                      required: true,
                      message: "Jam Masuk harus diisi",
                    },
                  ]}
                >
                  <TimePicker style={{ width: "100%" }} />
                </Form.Item>
              </Col>

              <Col span={12}>
                <Form.Item
                  name="jam_pulang"
                  label="Jam Keluar"
                  rules={[
                    {
                      required: true,
                      message: "Jam Keluar harus diisi",
                    },
                  ]}
                >
                  <TimePicker style={{ width: "100%" }} />
                </Form.Item>
              </Col>

              <Col span={23}>
                <Form.Item
                  name="status_kehadiran"
                  label="Status Kehadiran"
                  rules={[
                    {
                      required: true,
                      message: "Status Kehadiran harus diisi",
                    },
                  ]}
                >
                  <Select placeholder="Pilih status kehadiran">
                    {dataKehadiran.map((el) => {
                      return (
                        <Select.Option key={el.id} value={el.nama}>
                          {el.nama}
                        </Select.Option>
                      );
                    })}
                  </Select>
                </Form.Item>
              </Col>
              <Col span={23}>
                <Form.Item name="keterangan" label="Keterangan Absensi">
                  <Input.TextArea
                    rows={3}
                    placeholder="Keterangan status kehadiran karyawan"
                  />
                </Form.Item>
              </Col>
            </Row>
          </Form>
        </div>
      </Modal>
    </>
  );
}
