import React, {useEffect, useState} from "react";
import {Button, Modal, ModalBody, ModalHeader, Spinner} from "reactstrap";
import {Controller, useForm} from "react-hook-form";
import {Icon, Row, RSelect} from "@/components";
import {store as storeYear, update as updateYear} from "@/common/api/master/year";
import {get as getProgram} from "@/common/api/institution/program";
import type {OptionsType, YearFormType, YearType} from "@/types";
import {GENDER_OPTIONS} from "@/common/constants";
import {useYearContext} from "@/common/hooks/useYearContext";
import {useInstitutionContext} from "@/common/hooks/useInstitutionContext";

interface PartialProps {
    modal: boolean;
    setModal: (modal: boolean) => void;
    product: YearType
    setProduct: (product: YearType) => void;
    setLoadData: (loadData: boolean) => void;
}

const Partial = ({modal, setModal, product, setProduct, setLoadData}: PartialProps) => {
    const year = useYearContext()
    const institution = useInstitutionContext()
    const [loading, setLoading] = useState(false);
    const [programOptions, setProgramOptions] = useState<OptionsType[]>()
    const activeOptions: OptionsType[] = [
        {value: '1', label: "Ya"},
        {value: '2', label: "Tidak"},
    ]
    const {
        control,
        reset,
        handleSubmit,
        register,
        formState: {errors},
        setValue
    } = useForm<YearFormType>();

    const onSubmit = (value: YearFormType) => {
        const formData: YearType = {
            id: value.id,
            name: value.name,
            description: value.description,
            active: value.active?.value
        }
        if (product.id === undefined) onStore(formData)
        else onUpdate(formData);
    }
    const onStore = async (value: YearType) => {
        setLoading(true);
        await storeYear(value).then(() => {
            toggle()
            setLoadData(true)
        }).finally(() => setLoading(false));
    }
    const onUpdate = async (value: YearType) => {
        setLoading(true)
        await updateYear(value).then(() => {
            toggle()
            setLoadData(true)
        }).finally(() => setLoading(false));
    }
    const handleReset = () => {
        setProduct({
            id: undefined,
            name: '',
            description: '',
            active: undefined
        });
        reset();
    }
    const toggle = () => {
        setModal(false);
        handleReset();
    };
    useEffect(() => {
        setValue('id', product.id);
        setValue('name', product.name);
        setValue('description', product.description);
        setValue('active', activeOptions.find((item) => item.value === product.active));
        getProgram<OptionsType>({yearId: year?.id, institutionId: institution?.id, type: 'select'}).then((resp) => setProgramOptions(resp))
    }, [product, setValue]);

    return (
        <Modal isOpen={modal} toggle={toggle}>
            <ModalHeader toggle={toggle} close={
                <button className="close" onClick={toggle}>
                    <Icon name="cross"/>
                </button>
            }>
                {product.id === undefined ? 'TAMBAH' : 'UBAH'}
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
                                placeholder="Ex. 2024/2025"
                                {...register("name", {required: true})}
                            />
                            {errors.name && <span className="invalid">Kolom tidak boleh kosong</span>}
                        </div>
                    </div>
                    <div className="form-group col-md-6">
                        <label className="form-label" htmlFor="name">Alias</label>
                        <div className="form-control-wrap">
                            <input
                                type="text"
                                className="form-control"
                                id="name"
                                placeholder="Ex. 2024/2025"
                                {...register("name", {required: true})}
                            />
                            {errors.name && <span className="invalid">Kolom tidak boleh kosong</span>}
                        </div>
                    </div>
                    <div className="form-group">
                        <label className="form-label" htmlFor="name">Harga</label>
                        <div className="form-control-wrap">
                            <input
                                type="text"
                                className="form-control"
                                id="name"
                                placeholder="Ex. 2024/2025"
                                {...register("name", {required: true})}
                            />
                            {errors.name && <span className="invalid">Kolom tidak boleh kosong</span>}
                        </div>
                    </div>
                    <div className="form-group">
                        <label className="form-label" htmlFor="active">Jenis Kelamin</label>
                        <div className="form-control-wrap">
                            <Controller
                                control={control}
                                name="gender"
                                rules={{required: "Status tahun tidak boleh kosong"}}
                                render={({field: {value, onChange}}) => (
                                    <React.Fragment>
                                        <RSelect
                                            options={GENDER_OPTIONS}
                                            value={value}
                                            onChange={(selectedOption) => onChange(selectedOption)}
                                            placeholder="Pilih Aktif"
                                            isMulti={true}
                                        />
                                        <input type="hidden" id="active" className="form-control"/>
                                        {errors.active && <span className="invalid">Kolom tidak boleh kosong.</span>}
                                    </React.Fragment>
                                )
                                }/>
                        </div>
                    </div>
                        <div className="form-group">
                            <label className="form-label" htmlFor="active">Program Madrasah</label>
                            <div className="form-control-wrap">
                                <Controller
                                    control={control}
                                    name="program"
                                    rules={{required: "Status tahun tidak boleh kosong"}}
                                    render={({field: {value, onChange}}) => (
                                        <React.Fragment>
                                            <RSelect
                                                options={programOptions}
                                                value={value}
                                                onChange={(selectedOption) => onChange(selectedOption)}
                                                placeholder="Pilih Aktif"
                                                isMulti={true}
                                            />
                                            <input type="hidden" id="active" className="form-control"/>
                                            {errors.active && <span className="invalid">Kolom tidak boleh kosong.</span>}
                                        </React.Fragment>
                                    )
                                    }/>
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
