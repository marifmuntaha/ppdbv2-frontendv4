import React, {useEffect, useState} from "react";
import {Button, Modal, ModalBody, ModalHeader, Spinner} from "reactstrap";
import {Controller, useForm} from "react-hook-form";
import {Icon, Row} from "@/components";
import {store as storePeriod, update as updatePeriod} from "@/common/api/institution/period";
import type {InstitutionPeriodFormType, InstitutionPeriodType} from "@/types";
import {useYearContext} from "@/common/hooks/useYearContext";
import {useParams} from "react-router-dom";
import moment from "moment/moment";
import DatePicker, {registerLocale} from "react-datepicker";
import {id} from "date-fns/locale"

registerLocale('id', id)

interface PartialProps {
    modal: boolean;
    setModal: (modal: boolean) => void;
    period: InstitutionPeriodType
    setPeriod: (period: InstitutionPeriodType) => void;
    setLoadData: (loadData: boolean) => void;
}

const Partial = ({modal, setModal, period, setPeriod, setLoadData}: PartialProps) => {
    const [loading, setLoading] = useState(false);
    const year = useYearContext()
    const {id} = useParams();
    const {
        control,
        reset,
        handleSubmit,
        register,
        formState: {errors},
        setValue
    } = useForm<InstitutionPeriodFormType>();

    const onSubmit = (value: InstitutionPeriodFormType) => {
        const formData: InstitutionPeriodType = {
            id: value.id,
            yearId: year?.id,
            institutionId: id,
            name: value.name,
            description: value.description,
            start: moment(value.start).format('YYYY-MM-DD'),
            end: moment(value.end).format('YYYY-MM-DD'),
        }
        if (period.id === undefined) onStore(formData)
        else onUpdate(formData);
    }
    const onStore = async (formData: InstitutionPeriodType) => {
        setLoading(true);
        await storePeriod(formData).then((resp) => {
            if (resp) {
                toggle()
                setLoadData(true)
            } else {
                return
            }
        }).finally(() => setLoading(false));
    }
    const onUpdate = async (formData: InstitutionPeriodType) => {
        setLoading(true)
        await updatePeriod(formData).then((resp) => {
            if (resp) {
                toggle()
                setLoadData(true)
            } else {
                return
            }
        }).finally(() => setLoading(false));
    }
    const handleReset = () => {
        setPeriod({
            id: undefined,
            yearId: undefined,
            institutionId: undefined,
            name: '',
            description: '',
            start: '',
            end: '',
        });
        reset();
    }
    const toggle = () => {
        setModal(false);
        handleReset();
    };
    useEffect(() => {
        setValue('id', period.id);
        setValue('yearId', period.yearId);
        setValue('institutionId', period.institutionId);
        setValue('name', period.name);
        setValue('description', period.description);
        setValue('start', period.start !== '' ? moment(period.start).toDate() : new Date())
        setValue('end', period.end !== '' ? moment(period.end).toDate() : new Date())
    }, [period, setValue]);

    return (
        <Modal isOpen={modal} toggle={toggle}>
            <ModalHeader toggle={toggle} close={
                <button className="close" onClick={toggle}>
                    <Icon name="cross"/>
                </button>
            }>
                {period.id === undefined ? 'TAMBAH' : 'UBAH'}
            </ModalHeader>
            <ModalBody>
                <form className="is-alter" onSubmit={handleSubmit(onSubmit)}>
                    <Row className="gy-0">
                        <div className="form-group">
                            <label className="form-label" htmlFor="name">Nama Periode</label>
                            <div className="form-control-wrap">
                                <input
                                    type="text"
                                    className="form-control"
                                    id="name"
                                    placeholder="Ex. Gelombang 1"
                                    {...register("name", {required: 'Kolom tidak boleh kosong'})}
                                />
                                {errors.name && <span className="invalid">{errors.name.message}</span>}
                            </div>
                        </div>
                        <div className="form-group">
                            <label className="form-label" htmlFor="description">Diskripsi</label>
                            <div className="form-control-wrap">
                            <textarea
                                className="form-control"
                                id="description"
                                placeholder="Ex. Periode Gelombang 1"
                                {...register("description", {required: false})}
                            />
                            </div>
                        </div>
                        <div className="form-group col-md-6">
                            <label className="form-label" htmlFor="start">Tanggal Mulai</label>
                            <div className="form-control-wrap">
                                <Controller
                                    control={control}
                                    name="start"
                                    rules={{required: 'Kolom tidak boleh Kosong'}}
                                    render={({field}) => (
                                        <React.Fragment>
                                            <DatePicker
                                                locale="id"
                                                selected={field.value}
                                                onChange={(e) => {
                                                    field.onChange(e)
                                                }}
                                                dateFormat={"dd/MM/yyyy"}
                                                className="form-control date-picker"
                                            />
                                            <input type="hidden" className="form-control" id="start"/>
                                            {errors.start && <span className="invalid">{errors.start.message}</span>}
                                        </React.Fragment>
                                    )}
                                />
                            </div>
                        </div>
                        <div className="form-group col-md-6">
                            <label className="form-label" htmlFor="end">Tanggal Selesai</label>
                            <div className="form-control-wrap">
                                <Controller
                                    control={control}
                                    name="end"
                                    rules={{required: 'Kolom tidak boleh Kosong'}}
                                    render={({field}) => (
                                        <React.Fragment>
                                            <DatePicker
                                                locale="id"
                                                selected={field.value}
                                                onChange={(e) => {
                                                    field.onChange(e)
                                                }}
                                                dateFormat={"dd/MM/yyyy"}
                                                className="form-control date-picker"
                                            />
                                            <input type="hidden" className="form-control" id="end"/>
                                            {errors.end && <span className="invalid">{errors.end.message}</span>}
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
