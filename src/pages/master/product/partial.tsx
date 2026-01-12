import React, {useEffect, useState} from "react";
import {Button, Modal, ModalBody, ModalHeader, Spinner} from "reactstrap";
import {Controller, useForm, useWatch} from "react-hook-form";
import {Icon, Row, RSelect} from "@/components";
import {store as storeProduct, update as updateProduct} from "@/common/api/master/product";
import {get as getProgram} from "@/common/api/institution/program";
import {get as getBoarding} from "@/common/api/master/boarding";
import type {OptionsType, ProductFormType, ProductType} from "@/types";
import {GENDER_OPTIONS} from "@/common/constants";
import {useYearContext} from "@/common/hooks/useYearContext";
import {useInstitutionContext} from "@/common/hooks/useInstitutionContext";
import {numberFormat} from "@/helpers";

interface PartialProps {
    modal: boolean;
    setModal: (modal: boolean) => void;
    product: ProductType
    setProduct: (product: ProductType) => void;
    setLoadData: (loadData: boolean) => void;
}

const Partial = ({modal, setModal, product, setProduct, setLoadData}: PartialProps) => {
    const year = useYearContext()
    const institution = useInstitutionContext()
    const [loading, setLoading] = useState(false);
    const [programOptions, setProgramOptions] = useState<OptionsType[]>()
    const [boardingOptions, setBoardingOptions] = useState<OptionsType[]>()
    const {control, reset, handleSubmit, register, formState: {errors}, setValue} = useForm<ProductFormType>();
    const genderOptions: OptionsType[] = [
        {value: 0, label: 'Semua'},
        ...GENDER_OPTIONS
    ]
    const onSubmit = (values: ProductFormType) => {
        const formData: ProductType = {
            id: product?.id,
            yearId: year?.id,
            institutionId: institution?.id,
            name: values.name,
            surname: values.surname,
            price: String(values.price).replace(/[^0-9]/g, ''),
            gender: values.gender ? JSON.stringify(values.gender) : '',
            program: values.program ? JSON.stringify(values.program) : '',
            boarding: values.boarding ? JSON.stringify(values.boarding) : '',
        }
        if (product?.id === undefined) onStore(formData)
        else onUpdate(formData);
    }
    const onStore = async (value: ProductType) => {
        setLoading(true);
        await storeProduct(value).then((resp) => {
            if (resp.status === 'success') {
                toggle()
                setLoadData(true)
            }
        }).finally(() => setLoading(false));
    }
    const onUpdate = async (value: ProductType) => {
        setLoading(true)
        await updateProduct(value).then((resp) => {
            if (resp.status === 'success') {
                toggle()
                setLoadData(true)
            }
        }).finally(() => setLoading(false));
    }
    const handleReset = () => {
        setProduct({
            id: undefined,
            name: '',
            surname: '',
            price: '',
            gender: '',
            program: '',
            boarding: '',
        });
        reset();
    }
    const toggle = () => {
        setModal(false);
        handleReset();
    };
    const price = useWatch({control, name: 'price'})

    useEffect(() => {
        setValue('id', product.id);
        setValue('name', product.name);
        setValue('surname', product.surname)
        setValue('price', numberFormat(product.price))
        setValue('gender', product.gender && JSON.parse(product.gender))
        setValue('program', product.program && JSON.parse(product.program))
        setValue('boarding', product.boarding && JSON.parse(product.boarding))
    }, [product, setValue]);

    useEffect(() => {
        getProgram<OptionsType>({yearId: year?.id, institutionId: institution?.id, type: 'select'})
            .then((resp) => {
                if (resp.length > 0) {
                    setProgramOptions([{value: 0, label: 'Semua'}, ...resp]);
                }
            })
        getBoarding<OptionsType>({type: 'select'}).then((resp) => {
            if (resp.length > 0) {
                setBoardingOptions([{value: 0, label: 'Semua'}, ...resp]);
            }
        })
    }, []);

    return (
        <Modal isOpen={modal} toggle={toggle}>
            <ModalHeader toggle={toggle} close={
                <button className="close" onClick={toggle}>
                    <Icon name="cross"/>
                </button>
            }>
                {product?.id === undefined ? 'TAMBAH' : 'UBAH'}
            </ModalHeader>
            <ModalBody>
                <form className="is-alter" onSubmit={handleSubmit(onSubmit)}>
                    <Row className="gy-0">
                        <div className="form-group col-md-6">
                            <label className="form-label" htmlFor="name">Nama Item</label>
                            <div className="form-control-wrap">
                                <input
                                    type="text"
                                    className="form-control"
                                    id="name"
                                    placeholder="Ex. Seragam Madrasah"
                                    {...register("name", {required: true})}
                                />
                                {errors.name && <span className="invalid">Kolom tidak boleh kosong</span>}
                            </div>
                        </div>
                        <div className="form-group col-md-6">
                            <label className="form-label" htmlFor="surname">Alias</label>
                            <div className="form-control-wrap">
                                <input
                                    type="text"
                                    className="form-control"
                                    id="surname"
                                    placeholder="Ex. SRGM"
                                    {...register("surname", {required: true})}
                                />
                                {errors.surname && <span className="invalid">Kolom tidak boleh kosong</span>}
                            </div>
                        </div>
                        <div className="form-group">
                            <label className="form-label" htmlFor="price">Harga</label>
                            <div className="form-control-wrap">
                                <input
                                    type="text"
                                    className="form-control"
                                    id="price"
                                    placeholder="Ex. 1.000.000"
                                    value={numberFormat(price)}
                                    {...register("price", {required: true})}
                                />
                                {errors.price && <span className="invalid">Kolom tidak boleh kosong</span>}
                            </div>
                        </div>
                        <div className="form-group">
                            <label className="form-label" htmlFor="gender">Jenis Kelamin</label>
                            <div className="form-control-wrap">
                                <Controller
                                    control={control}
                                    name="gender"
                                    rules={{required: false}}
                                    render={({field: {value, onChange}}) => (
                                        <React.Fragment>
                                            <RSelect
                                                options={genderOptions}
                                                value={value}
                                                onChange={(selectedOption) => onChange(selectedOption)}
                                                placeholder="Pilih Kelamin"
                                                isMulti={true}
                                            />
                                        </React.Fragment>
                                    )}
                                />
                            </div>
                        </div>
                        <div className="form-group">
                            <label className="form-label" htmlFor="program">Program Madrasah</label>
                            <div className="form-control-wrap">
                                <Controller
                                    control={control}
                                    name="program"
                                    rules={{required: false}}
                                    render={({field: {value, onChange}}) => (
                                        <React.Fragment>
                                            <RSelect
                                                options={programOptions}
                                                value={value}
                                                onChange={(selectedOption) => onChange(selectedOption)}
                                                placeholder="Pilih Aktif"
                                                isMulti={true}
                                            />
                                        </React.Fragment>
                                    )}
                                />
                            </div>
                        </div>
                        <div className="form-group">
                            <label className="form-label" htmlFor="boarding">Program Boarding</label>
                            <div className="form-control-wrap">
                                <Controller
                                    control={control}
                                    name="boarding"
                                    rules={{required: false}}
                                    render={({field: {value, onChange}}) => (
                                        <React.Fragment>
                                            <RSelect
                                                options={boardingOptions}
                                                value={value}
                                                onChange={(selectedOption) => onChange(selectedOption)}
                                                placeholder="Pilih Aktif"
                                                isMulti={true}
                                            />
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
