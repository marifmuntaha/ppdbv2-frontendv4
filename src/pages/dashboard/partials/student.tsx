import React, {useEffect, useState} from "react";
import Head from "@/layout/head";
import Content from "@/layout/content";
import {PreviewCard, Row, Col} from "@/components";
import {useAuthContext} from "@/common/hooks/useAuthContext";
import {getRoleName} from "@/helpers";
import {Card, CardBody, CardHeader, CardText} from "reactstrap";
import {studentStatus} from "@/common/api/dashboard";
import type {
    DashboardStudentType,
} from "@/types";

const Student = () => {
    const {user} = useAuthContext()
    const [student, setStudent] = useState<DashboardStudentType>()

    useEffect(() => {
        studentStatus({userId: user?.id}).then((resp) => {
            if (resp) setStudent(resp)
        })
    }, [])

    return (
        <React.Fragment>
            <Head title="Dashboard"/>
            <Content>
                <Row className={"gy-3"}>
                    <Col md={12}>
                        <PreviewCard>
                            <h5>Selamat Datang, {user?.name}</h5>
                            <span className="text-muted">Anda masuk sebagai {getRoleName(user?.role)}</span>
                        </PreviewCard>
                    </Col>
                    <Col md={12}>
                        <Card className="card-bordered">
                            <CardHeader className="text-bg-warning fw-bold">Informasi</CardHeader>
                            <CardBody className="card-inner">
                                <CardText>
                                    Aplikasi Penerimaan Siswa Baru Yayasan Darul Hikmah Menganti mempermudah proses
                                    pendaftaran siswa baru secara online. Dengan fitur yang sederhana, aplikasi ini
                                    memungkinkan calon siswa dan orang tua untuk mendaftar, mengunggah dokumen, serta
                                    mendapatkan informasi terkait persyaratan dan jadwal tes dengan mudah dan efisien.
                                </CardText>
                            </CardBody>
                        </Card>
                    </Col>
                    <Col md={6}>
                        <PreviewCard>
                            <div className="card-inner">
                                <div className="timeline">
                                    <h6 className="timeline-head">Status Pendaftaran</h6>
                                    <ul className="timeline-list">
                                        <li className="timeline-item">
                                            <div className={`timeline-status ${student?.personal ? 'bg-success is-outline' : 'bg-danger'} me-2`}></div>
                                            <div className="timeline-data">
                                                <h6 className="timeline-title">Input Data Pribadi</h6>
                                                <div className="timeline-des">
                                                    <p className="text-muted ff-italic">
                                                        Terakhir diperbarui : {student?.personal ? student.personal.updated_at : '-'}
                                                    </p>
                                                </div>
                                            </div>
                                        </li>
                                        <li className="timeline-item">
                                            <div className={`timeline-status ${student?.parent ? 'bg-success is-outline' : 'bg-danger'} me-2`}></div>
                                            <div className="timeline-data">
                                                <h6 className="timeline-title">Input Data Orangtua/Wali</h6>
                                                <div className="timeline-des">
                                                    <p className="text-muted ff-italic">
                                                        Terakhir diperbarui : {student?.parent ? student.parent.updated_at : '-'}
                                                    </p>
                                                </div>
                                            </div>
                                        </li>
                                        <li className="timeline-item">
                                            <div className={`timeline-status ${student?.address ? 'bg-success is-outline' : 'bg-danger'} me-2`}></div>
                                            <div className="timeline-data">
                                                <h6 className="timeline-title">Input Data Tempat Tinggal</h6>
                                                <div className="timeline-des">
                                                    <p className="text-muted ff-italic">
                                                        Terakhir diperbarui : {student?.address?.updated_at ? student?.address.updated_at : '-'}
                                                    </p>
                                                </div>
                                            </div>
                                        </li>
                                        <li className="timeline-item">
                                            <div className={`timeline-status ${student?.program ? 'bg-success is-outline' : 'bg-danger'} me-2`}></div>
                                            <div className="timeline-data">
                                                <h6 className="timeline-title">Input Program Pilihan</h6>
                                                <div className="timeline-des">
                                                    <p className="text-muted ff-italic">
                                                        Terakhir diperbarui : {student?.program?.updated_at ? student?.program.updated_at : '-'}
                                                    </p>
                                                </div>
                                            </div>
                                        </li>
                                        <li className="timeline-item">
                                            <div className={`timeline-status ${student?.origin ? 'bg-success is-outline' : 'bg-danger'} me-2`}></div>
                                            <div className="timeline-data">
                                                <h6 className="timeline-title">Input Sekolah Asal</h6>
                                                <div className="timeline-des">
                                                    <p className="text-muted ff-italic">
                                                        Terakhir diperbarui : {student?.origin?.updated_at ? student?.origin.updated_at : '-'}
                                                    </p>
                                                </div>
                                            </div>
                                        </li>
                                        <li className="timeline-item">
                                            <div className={`timeline-status ${student?.files ? 'bg-success is-outline' : 'bg-danger'} me-2`}></div>
                                            <div className="timeline-data">
                                                <h6 className="timeline-title">Unggah Berkas</h6>
                                                <div className="timeline-des">
                                                    <p className="text-muted ff-italic">
                                                        Terakhir diperbarui : {student?.files?.updated_at ? student?.files.updated_at : '-'}
                                                    </p>
                                                </div>
                                            </div>
                                        </li>
                                    </ul>
                                </div>
                            </div>
                        </PreviewCard>
                    </Col>
                    <Col md={6}>
                        <Row className="gy-3">
                            <Col md={6}>
                                <Card className="card-bordered border-success">
                                    <div className="nk-ecwg nk-ecwg6">
                                        <div className="card-inner">
                                            <div className="card-title-group">
                                                <div className="card-title">
                                                    <h6 className="title">TOTAL PENDAFTAR</h6>
                                                </div>
                                            </div>
                                            <div className="data">
                                                <div className="data-group">
                                                    <div className="amount">175 Peserta</div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </Card>
                            </Col>
                            <Col md={6}>
                                <Card className="card-bordered border-danger">
                                    <div className="nk-ecwg nk-ecwg6">
                                        <div className="card-inner">
                                            <div className="card-title-group">
                                                <div className="card-title">
                                                    <h6 className="title">TAGIHAN</h6>
                                                </div>
                                            </div>
                                            <div className="data">
                                                <div className="data-group">
                                                    <div className="amount">Rp. 3.400.000</div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </Card>
                            </Col>
                            <Col md={12}>
                                <Card className="card-bordered">
                                    <CardHeader className="text-bg-info fw-bold">Pengumuman</CardHeader>
                                    <CardBody className="card-inner">
                                        <CardText>
                                            Aplikasi Penerimaan Siswa Baru Yayasan Darul Hikmah Menganti mempermudah proses
                                            pendaftaran siswa baru secara online. Dengan fitur yang sederhana, aplikasi ini
                                            memungkinkan calon siswa dan orang tua untuk mendaftar, mengunggah dokumen, serta
                                            mendapatkan informasi terkait persyaratan dan jadwal tes dengan mudah dan efisien.
                                        </CardText>
                                    </CardBody>
                                </Card>
                            </Col>
                        </Row>
                    </Col>
                </Row>
            </Content>
        </React.Fragment>
    )
}

export default Student