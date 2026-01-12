import React from "react";
import Head from "@/layout/head";
import Content from "@/layout/content";
import {PreviewCard, Row, Col} from "@/components";
import {useAuthContext} from "@/common/hooks/useAuthContext";
import {getRoleName} from "@/helpers";
import {Card} from "reactstrap";

const Administrator = () => {
    const {user} = useAuthContext()

    return (
        <React.Fragment>
            <Head title="Dashboard" />
            <Content>
                <Row className="gy-4">
                    <Col md={12}>
                        <PreviewCard>
                            <h6>Selamat Datang, {user?.name}</h6>
                            <span className="text-muted ff-italic">anda login sebagai {getRoleName(user?.role)}</span>
                        </PreviewCard>
                    </Col>
                    <Col md={6}>
                        <Row className="gy-4">
                            <Col md={6}>
                                <Card className="card-bordered border-success">
                                    <div className="nk-ecwg nk-ecwg6">
                                        <div className="card-inner">
                                            <div className="card-title-group">
                                                <div className="card-title">
                                                    <h6 className="title">RAUDHATUL ATFAL</h6>
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
                                <Card className="card-bordered border-success">
                                    <div className="nk-ecwg nk-ecwg6">
                                        <div className="card-inner">
                                            <div className="card-title-group">
                                                <div className="card-title">
                                                    <h6 className="title">MADRASAH IBTIDAIYAH</h6>
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
                                <Card className="card-bordered border-success">
                                    <div className="nk-ecwg nk-ecwg6">
                                        <div className="card-inner">
                                            <div className="card-title-group">
                                                <div className="card-title">
                                                    <h6 className="title">MADRASAH TSANAWIYAH</h6>
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
                                <Card className="card-bordered border-success">
                                    <div className="nk-ecwg nk-ecwg6">
                                        <div className="card-inner">
                                            <div className="card-title-group">
                                                <div className="card-title">
                                                    <h6 className="title">MADRASAH ALIYAH</h6>
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
                        </Row>
                    </Col>
                    <Col md={6}>
                        <Row className="gy-4">
                            <Col md={6}>
                                <Card className="card-bordered border-warning">
                                    <div className="nk-ecwg nk-ecwg6">
                                        <div className="card-inner">
                                            <div className="card-title-group">
                                                <div className="card-title">
                                                    <h6 className="title">TOTAL SANTRI</h6>
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
                                <Card className="card-bordered border-warning">
                                    <div className="nk-ecwg nk-ecwg6">
                                        <div className="card-inner">
                                            <div className="card-title-group">
                                                <div className="card-title">
                                                    <h6 className="title">SANTRI TAHFIDZ</h6>
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
                                <Card className="card-bordered border-warning">
                                    <div className="nk-ecwg nk-ecwg6">
                                        <div className="card-inner">
                                            <div className="card-title-group">
                                                <div className="card-title">
                                                    <h6 className="title">SANTRI KITAB</h6>
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
                                <Card className="card-bordered border-warning">
                                    <div className="nk-ecwg nk-ecwg6">
                                        <div className="card-inner">
                                            <div className="card-title-group">
                                                <div className="card-title">
                                                    <h6 className="title">SANTRI BOCIL</h6>
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
                        </Row>
                    </Col>
                </Row>
            </Content>
        </React.Fragment>
    )
}

export default Administrator