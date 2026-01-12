import React from "react";
import Head from "@/layout/head";
import Content from "@/layout/content";
import {Col, PreviewCard, Row} from "@/components";
import {useAuthContext} from "@/common/hooks/useAuthContext";
import {getRoleName} from "@/helpers";
import {Card} from "reactstrap";

const Treasurer = () => {
    const {user} = useAuthContext()
    return (
        <React.Fragment>
            <Head title="Dashboard" />
            <Content>
                <Row className="gy-4">
                    <Col md={12}>
                        <PreviewCard>
                            <h4>Selamat Datang, {user?.name}</h4>
                            <span className="text-muted">anda masuk sebagai {getRoleName(user?.role)}</span>
                        </PreviewCard>
                    </Col>
                    <Col md={12}>
                        <Row className="gy-4">
                            <Col md={3}>
                                <Card className="card-bordered border-info">
                                    <div className="nk-ecwg nk-ecwg6">
                                        <div className="card-inner">
                                            <div className="card-title-group">
                                                <div className="card-title">
                                                    <h6 className="title">JUMLAH PENDAFTAR</h6>
                                                </div>
                                            </div>
                                            <div className="data">
                                                <div className="data-group">
                                                    <div className="amount">174 Pendaftar</div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </Card>
                            </Col>
                            <Col md={3}>
                                <Card className="card-bordered border-success">
                                    <div className="nk-ecwg nk-ecwg6">
                                        <div className="card-inner">
                                            <div className="card-title-group">
                                                <div className="card-title">
                                                    <h6 className="title">PEMBAYARAN LUNAS</h6>
                                                </div>
                                            </div>
                                            <div className="data">
                                                <div className="data-group">
                                                    <div className="amount">Rp. 40.000.000</div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </Card>
                            </Col>
                            <Col md={3}>
                                <Card className="card-bordered border-warning">
                                    <div className="nk-ecwg nk-ecwg6">
                                        <div className="card-inner">
                                            <div className="card-title-group">
                                                <div className="card-title">
                                                    <h6 className="title">TOTAL TAGIHAN</h6>
                                                </div>
                                            </div>
                                            <div className="data">
                                                <div className="data-group">
                                                    <div className="amount">Rp. 80.000.000</div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </Card>
                            </Col>
                            <Col md={3}>
                                <Card className="card-bordered border-danger">
                                    <div className="nk-ecwg nk-ecwg6">
                                        <div className="card-inner">
                                            <div className="card-title-group">
                                                <div className="card-title">
                                                    <h6 className="title">PEMBAYARAN SISA</h6>
                                                </div>
                                            </div>
                                            <div className="data">
                                                <div className="data-group">
                                                    <div className="amount">Rp. 40.000.000</div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </Card>
                            </Col>
                        </Row>
                    </Col>
                </Row>
            </Content>
        </React.Fragment>
    )
}

export default Treasurer