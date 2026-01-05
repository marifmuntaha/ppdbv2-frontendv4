import React from "react";
import Head from "@/layout/head";
import Content from "@/layout/content";
import {Block, BlockBetween, BlockDes, BlockHead, BlockHeadContent, BlockTitle, Icon} from "@/components";
import moment from "moment/moment";
import {Link} from "react-router-dom";
import {Button} from "reactstrap";
import LogoDark from "@/images/logo-dark.png"
import {formatIDR} from "@/helpers";

const Detail = () => {
    const payment = {
        id: 2,
        ref: '#2342424',
        created_at: new Date(),
        user: {
            name: 'Achmad Wikramawardhana',
            address: 'Perum Mutiara Hati 2 Blok C No 7 Ngabul',
            phone: '082229366506'
        },
        item: [
            {id: 1, name: 'Seragam', alias: 'SRG', price: 875000, discount: 25000, amount: 850000}
        ],
        adminfee: 4500,
        subtotal: 850000,
        grandAmount: 854500
    }
    return (
        <React.Fragment>
            <Head title="Detail Tagihan"/>
            {payment && (
                <Content>
                    <BlockHead>
                        <BlockBetween className="g-3">
                            <BlockHeadContent>
                                <BlockTitle>
                                    Tagihan <strong className="text-primary small">{payment.ref}</strong>
                                </BlockTitle>
                                <BlockDes className="text-soft">
                                    <ul className="list-inline">
                                        <li>
                                            Dibuat Tanggal: <span className="text-base">{moment(payment.created_at).format('D MMM YYYY')}</span>
                                        </li>
                                    </ul>
                                </BlockDes>
                            </BlockHeadContent>
                            <BlockHeadContent>
                                <Link to={`/pembayaran`}>
                                    <Button color="light" outline className="bg-white d-none d-sm-inline-flex">
                                        <Icon name="arrow-left"></Icon>
                                        <span>Back</span>
                                    </Button>
                                </Link>
                                <Link to={`/invoice-list`}>
                                    <Button color="light" outline className="btn-icon bg-white d-inline-flex d-sm-none">
                                        <Icon name="arrow-left"></Icon>
                                    </Button>
                                </Link>
                            </BlockHeadContent>
                        </BlockBetween>
                    </BlockHead>
                    <Block>
                        <div className="invoice">
                            <div className="invoice-action">
                                <Link to={`/pembayaran/${payment.id}/cetak`} target="_blank">
                                    <Button size="lg" color="primary" outline className="btn-icon btn-white btn-dim">
                                        <Icon name="printer-fill"></Icon>
                                    </Button>
                                </Link>
                            </div>
                            <div className="invoice-wrap">
                                <div className="invoice-brand text-center">
                                    <img src={LogoDark} alt="" />
                                </div>
                                <div className="invoice-head">
                                    <div className="invoice-contact">
                                        <span className="overline-title">Ditagihkan Ke</span>
                                        <div className="invoice-contact-info">
                                            <h4 className="title">{payment.user.name}</h4>
                                            <ul className="list-plain">
                                                <li>
                                                    <Icon name="map-pin-fill"></Icon>
                                                    <span>{payment.user.address}</span>
                                                </li>
                                                <li>
                                                    <Icon name="call-fill"></Icon>
                                                    <span>{payment.user.phone}</span>
                                                </li>
                                            </ul>
                                        </div>
                                    </div>
                                    <div className="invoice-desc">
                                        <h3 className="title">Tagihan</h3>
                                        <ul className="list-plain">
                                            <li className="invoice-id">
                                                <span>Nomor Tagihan</span>:<span>{payment.ref}</span>
                                            </li>
                                            <li className="invoice-date">
                                                <span>Tanggal</span>:<span>{moment(payment.created_at).format('D MMM YYYY')}</span>
                                            </li>
                                        </ul>
                                    </div>
                                </div>
                                <div className="invoice-bills">
                                    <div className="table-responsive">
                                        <table className="table table-striped">
                                            <thead>
                                            <tr>
                                                <th className="w-150px">Item ID</th>
                                                <th className="w-60">Diskripsi</th>
                                                <th>Harga</th>
                                                <th>Qty</th>
                                                <th>Potongan</th>
                                                <th>Total</th>
                                            </tr>
                                            </thead>
                                            <tbody>
                                            {payment.item.map((item) => (
                                                <tr>
                                                    <td>{item.alias}</td>
                                                    <td>{item.name} </td>
                                                    <td>{formatIDR(item.price)}</td>
                                                    <td>1</td>
                                                    <td>{formatIDR(item.discount)}</td>
                                                    <td>{formatIDR(item.amount)}</td>
                                                </tr>
                                            ))}
                                            </tbody>
                                            <tfoot>
                                            <tr>
                                                <td colSpan={2}></td>
                                                <td colSpan={3}>Subtotal</td>
                                                <td>{formatIDR(payment.subtotal)}</td>
                                            </tr>
                                            <tr>
                                                <td colSpan={2}></td>
                                                <td colSpan={3}>Biaya Admin</td>
                                                <td>{formatIDR(payment.adminfee)}</td>
                                            </tr>
                                            <tr>
                                                <td colSpan={2}></td>
                                                <td colSpan={3}>Total Tagihan</td>
                                                <td>{formatIDR(payment.grandAmount)}</td>
                                            </tr>
                                            </tfoot>
                                        </table>
                                        <div className="nk-notes ff-italic fs-12px text-soft">
                                            Faktur dibuat di komputer dan sah tanpa tanda tangan dan stempel.
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </Block>
                </Content>
            )}
        </React.Fragment>
    )
}

export default Detail