import React from "react";
import Head from "@/layout/head";
import Content from "@/layout/content";
import {Block, Icon} from "@/components";
import {Badge, Button, Card} from "reactstrap";
import {Link} from "react-router-dom";

const Payment = () => {
    const invoices = [
        {id: 1,  merchantRef: '#INV12394',status: 'UNPAID', amount: 3150000}
    ]
    return (
        <React.Fragment>
            <Head title="Tagihan"></Head>
            <Content>
                <Block>
                    <Card className="card-stretch">
                        <div className="card-inner-group">
                            <div className="card-inner">
                                <div className="card-title-group">
                                    <div className="card-title">
                                        <h5 className="title">Semua Tagihan</h5>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="card-inner p-0">
                            <table className="table table-orders">
                                <thead className="tb-odr-head">
                                <tr className="tb-odr-item">
                                    <th className="tb-odr-info">
                                        <span className="tb-odr-id">Nomor</span>
                                        <span className="tb-odr-date d-none d-md-inline-block">Keterangan</span>
                                    </th>
                                    <th className="tb-odr-amount">
                                        <span className="tb-odr-total">Jumlah</span>
                                        <span className="tb-odr-status d-none d-md-inline-block">Status</span>
                                    </th>
                                    <th className="tb-odr-action">&nbsp;</th>
                                </tr>
                                </thead>
                                <tbody className="tb-odr-body">
                                {invoices.length > 0
                                    ? invoices.map((invoice) => {
                                        return (
                                            <tr className="tb-odr-item" key={invoice.id}>
                                                <td className="tb-odr-info">
                                                    <span className="tb-odr-id">
                                                        <Link to={`/pembayaran/${invoice.id}/lihat`}>
                                                            {invoice.merchantRef}
                                                        </Link>
                                                    </span>
                                                    <span className="tb-odr-date">Tagihan PMB Yayasan Darul Hikmah Menganti</span>
                                                </td>
                                                <td className="tb-odr-amount">
                                                    <span className="tb-odr-total">
                                                        <span className="amount">${invoice.amount}</span>
                                                    </span>
                                                    <span className="tb-odr-status">
                                                        <Badge
                                                            color={
                                                            invoice.status === "PAID"
                                                                ? "success"
                                                                : invoice.status === "Pending"
                                                                    ? "warning" : "danger"
                                                        }
                                                            className="badge-dot"
                                                        >
                                                            {invoice.status}
                                                        </Badge>
                                                    </span>
                                                </td>
                                                <td className="tb-odr-action">
                                                    <div className="tb-odr-btns d-none d-sm-inline">
                                                        <Link to={`/pembayaran/${invoice.id}/cetak`} target="_blank">
                                                            <Button color="primary" size="sm" className="btn-icon btn-white btn-dim">
                                                                <Icon name="printer-fill"></Icon>
                                                            </Button>
                                                        </Link>
                                                        <Link to={`/pembayaran/${invoice.id}/lihat`}>
                                                            <Button color="primary" size="sm" className="btn btn-dim">
                                                                Lihat
                                                            </Button>
                                                        </Link>
                                                    </div>
                                                    <Link to={`/pembayaran/${invoice.id}/lihat`}>
                                                        <Button className="btn-pd-auto d-sm-none">
                                                            <Icon name="chevron-right"></Icon>
                                                        </Button>
                                                    </Link>
                                                </td>
                                            </tr>
                                        )
                                    }) : null }
                                </tbody>
                            </table>
                        </div>
                    </Card>
                </Block>
            </Content>
        </React.Fragment>
    )
}

export default Payment