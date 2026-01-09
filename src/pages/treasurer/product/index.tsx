import React, {useState} from "react";
import Head from "@/layout/head";
import Content from "@/layout/content";
import {Block, BlockBetween, BlockHead, BlockHeadContent, BlockTitle, Button, Icon} from "@/components";
import {useYearContext} from "@/common/hooks/useYearContext";
import Partial from "./partial";

const Product = () => {
    const year = useYearContext()
    const [sm, updateSm] = useState(false)
    const [modal, setModal] = useState(false)
    const [loading, setLoading] = useState(false)
    const [loadData, setLoadData] = useState(true)
    const [products, setProducts] = useState([])
    const [product, setProduct] = useState({})
    return (
        <React.Fragment>
            <Head title="Item Pembayaran"/>
            <Content page="component">
                <Block size="lg">
                    <BlockHead>
                        <BlockBetween>
                            <BlockHeadContent>
                                <BlockTitle tag="h5">Item Pembayaran</BlockTitle>
                                <p>
                                    Item pembayaran tahun ajaran {year?.name}
                                </p>
                            </BlockHeadContent>
                            <BlockHeadContent>
                                <div className="toggle-wrap nk-block-tools-toggle">
                                    <Button
                                        className={`btn-icon btn-trigger toggle-expand me-n1 ${sm ? "active" : ""}`}
                                        onClick={() => updateSm(!sm)}
                                    >
                                        <Icon name="menu-alt-r"/>
                                    </Button>
                                    <div className="toggle-expand-content" style={{display: sm ? "block" : "none"}}>
                                        <ul className="nk-block-tools g-3">
                                            <li>
                                                <Button color="primary" size="sm" outline className="btn-white"
                                                        onClick={() => setModal(true)}>
                                                    <Icon name="plus"/>
                                                    <span>TAMBAH</span>
                                                </Button>
                                            </li>
                                        </ul>
                                    </div>
                                </div>
                            </BlockHeadContent>
                        </BlockBetween>
                    </BlockHead>
                </Block>
                <Partial modal={modal} setModal={setModal} product={product} setProduct={setProduct} setLoadData={setLoadData}/>
            </Content>

        </React.Fragment>
    )
}

export default Product;