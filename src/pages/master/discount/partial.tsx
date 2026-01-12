import React, {useEffect, useState} from "react";
import {Button, Modal, ModalBody, ModalHeader, Spinner} from "reactstrap";
import {Controller, useForm, useWatch} from "react-hook-form";
import {Icon, Row, RSelect} from "@/components";
import {store as storeDiscount, update as updateDiscount} from "@/common/api/master/discount";
import {get as getProduct} from "@/common/api/master/product";
import type {OptionsType, DiscountType} from "@/types";
import {useYearContext} from "@/common/hooks/useYearContext";
import {useInstitutionContext} from "@/common/hooks/useInstitutionContext";
import {numberFormat} from "@/helpers";
import {UNIT_OPTIONS} from "@/common/constants";

interface PartialProps {
    modal: boolean;
    setModal: (modal: boolean) => void;
    discount: DiscountType
    setDiscount: (discount: DiscountType) => void;
    setLoadData: (loadData: boolean) => void;
}

const Partial = ({modal, setModal, discount, setDiscount, setLoadData}: PartialProps) => {
    const year = useYearContext()
    const institution = useInstitutionContext()
    const [loading, setLoading] = useState(false);
    const [productOptions, setProductOptions] = useState<OptionsType[]>()
    const {control, reset, handleSubmit, register, formState: {errors}, setValue} = useForm<DiscountType>();
    const onSubmit = (values: DiscountType) => {
        const formData: DiscountType = {
            id: values.id,
            yearId: year?.id,
            institutionId: institution?.id,
            productId: values.productId,
            name: values.name,
            description: values.description,
            price: String(values.price).replace(/[^0-9]/g, ''),
            unit: values.unit
        }
        if (discount?.id === undefined) onStore(formData)
        else onUpdate(formData);
    }
    const onStore = async (value: DiscountType) => {
        setLoading(true);
        await storeDiscount(value).then((resp) => {
            if (resp.status === 'success') {
                toggle()
                setLoadData(true)
            }
        }).finally(() => setLoading(false));
    }
    const onUpdate = async (value: DiscountType) => {
        setLoading(true)
        await updateDiscount(value).then((resp) => {
            if (resp.status === 'success') {
                toggle()
                setLoadData(true)
            }
        }).finally(() => setLoading(false));
    }
    const handleReset = () => {
        setDiscount({
            id: undefined,
            yearId: 0,
            institutionId: 0,
            productId: 0,
            name: '',
            description: '',
            price: '',
            unit: 0
        });
        reset();
    }
    const toggle = () => {
        setModal(false);
        handleReset();
    };
    const price = useWatch({control, name: 'price'})

    useEffect(() => {
        setValue('id', discount.id);
        setValue('yearId', year?.id);
        setValue('institutionId', institution?.id)
        setValue('productId', discount.productId)
        setValue('name', discount.name);
        setValue('description', discount.description)
        setValue('price', numberFormat(discount.price))
        setValue('unit', discount.unit)
    }, [discount, setValue]);

    useEffect(() => {
        getProduct<OptionsType>({yearId: year?.id, institutionId: institution?.id, type: 'select'})
            .then((resp) => {
                if (resp.length > 0) {
                    setProductOptions(resp);
                }return
            })
    }, []);

    return (
        <Modal isOpen={modal} toggle={toggle}>
            <ModalHeader toggle={toggle} close={
                <button className="close" onClick={toggle}>
                    <Icon name="cross"/>
                </button>
            }>
                {discount?.id === undefined ? 'TAMBAH' : 'UBAH'}
            </ModalHeader>
            <ModalBody>
                <form className="is-alter" onSubmit={handleSubmit(onSubmit)}>
                    <Row className="gy-0">
                        <div className="form-group">
                            <label className="form-label" htmlFor="productId">Item Pembayaran</label>
                            <div className="form-control-wrap">
                                <Controller
                                    control={control}
                                    name="productId"
                                    rules={{required: true}}
                                    render={({field: {value, onChange}}) => (
                                        <React.Fragment>
                                            <RSelect
                                                options={productOptions}
                                                value={productOptions?.find((item) => item.value === value)}
                                                onChange={(val) => onChange(val?.value)}
                                                placeholder="Pilih Item Pembayaran"
                                            />
                                            <input type="hidden" id="productId" className="form-control" />
                                            {errors.productId && <span className="invalid">Kolom tidak boleh kosong</span>}
                                        </React.Fragment>
                                    )}
                                />
                            </div>
                        </div>
                        <div className="form-group col-md-6">
                            <label className="form-label" htmlFor="name">Nama Potongan</label>
                            <div className="form-control-wrap">
                                <input
                                    type="text"
                                    className="form-control"
                                    id="name"
                                    placeholder="Ex. Potongan Gelombang I"
                                    {...register("name", {required: true})}
                                />
                                {errors.name && <span className="invalid">Kolom tidak boleh kosong</span>}
                            </div>
                        </div>
                        <div className="form-group col-md-6">
                            <label className="form-label" htmlFor="description">Diskripsi</label>
                            <div className="form-control-wrap">
                                <textarea
                                    className="form-control"
                                    id="description"
                                    placeholder="Ex. Potongan pendaftar gelombang I"
                                    {...register("description", {required: true})}
                                />
                                {errors.description && <span className="invalid">Kolom tidak boleh kosong</span>}
                            </div>
                        </div>
                        <div className="form-group">
                            <label className="form-label" htmlFor="price">Harga</label>
                            <div className="form-control-wrap">
                                <input
                                    type="text"
                                    className="form-control"
                                    id="price"
                                    placeholder="Ex. 1.000.000/20"
                                    value={numberFormat(price)}
                                    {...register("price", {required: true})}
                                />
                                {errors.price && <span className="invalid">Kolom tidak boleh kosong</span>}
                            </div>
                        </div>
                        <div className="form-group">
                            <label className="form-label" htmlFor="unit">Unit</label>
                            <div className="form-control-wrap">
                                <Controller
                                    control={control}
                                    name="unit"
                                    rules={{required: true}}
                                    render={({field: {value, onChange}}) => (
                                        <React.Fragment>
                                            <RSelect
                                                options={UNIT_OPTIONS}
                                                value={UNIT_OPTIONS.find((item) => item.value === value)}
                                                onChange={(val) => onChange(val?.value)}
                                                placeholder="Pilih Unit"
                                            />
                                            <input type="hidden" id="unit" className="form-control" />
                                            {errors.price && <span className="invalid">Kolom tidak boleh kosong</span>}
                                        </React.Fragment>
                                    )}
                                />
                            </div>
                        </div>
                        <div className="form-group">
                            <Button color="primary" type="submit" size="md">
                                {loading ? <Spinner size="sm"/> : 'SIMPAN'}
                            </Button>
                        </div>
                    </Row>
                </form>
            </ModalBody>
        </Modal>
    )
}

export default Partial;
