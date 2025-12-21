import React, {useEffect, useState} from "react";
import {Button, Modal, ModalBody, ModalHeader, Spinner} from "reactstrap";
import {Controller, useForm} from "react-hook-form";
import {Icon, RSelect} from "@/components";
import {store as storeActivity, update as updateActivity} from "@/common/api/institution/activity";
import type {InstitutionActivityFormType, InstitutionActivityType} from "@/types";
import {useYearContext} from "@/common/hooks/useYearContext";
import {useParams} from "react-router-dom";

interface PartialProps {
    modal: boolean;
    setModal: (modal: boolean) => void;
    activity: InstitutionActivityFormType
    setActivity: (activity: InstitutionActivityType) => void;
    setLoadData: (loadData: boolean) => void;
}

const Partial = ({modal, setModal, activity, setActivity, setLoadData}: PartialProps) => {
    const [loading, setLoading] = useState(false);
    const [file, setFile] = useState()
    const year = useYearContext()
    const {id} = useParams();
    const {
        control,
        reset,
        handleSubmit,
        register,
        formState: {errors},
        setValue
    } = useForm<InstitutionActivityFormType>();

    const onSubmit = (value: InstitutionActivityFormType) => {
        const formData: InstitutionActivityType = {
            id: value.id,
            yearId: year?.id,
            institutionId: id,
            capacity: value.capacity,
            brochure: file
        }
        if (activity.id === undefined) onStore(formData)
        else onUpdate(formData);
    }
    const onStore = async (value: InstitutionActivityType) => {
        setLoading(true);
        await storeActivity(value).then(() => {
            toggle()
            setLoadData(true)
        }).finally(() => setLoading(false));
    }
    const onUpdate = async (value: InstitutionActivityType) => {
        setLoading(true)
        await updateActivity(value).then(() => {
            toggle()
            setLoadData(true)
        }).finally(() => setLoading(false));
    }
    const handleReset = () => {
        setActivity({
            id: undefined,
            yearId: undefined,
            institutionId: undefined,
            capacity: '',
            brochure: ''
        });
        reset();
    }
    const toggle = () => {
        setModal(false);
        handleReset();
    };
    useEffect(() => {
        setValue('id', year.id);
        setValue('name', year.name);
        setValue('description', year.description);
        setValue('active', activeOptions.find((item) => item.value === year.active));
    }, [year, setValue]);

    return (
        <Modal isOpen={modal} toggle={toggle}>
            <ModalHeader toggle={toggle} close={
                <button className="close" onClick={toggle}>
                    <Icon name="cross"/>
                </button>
            }>
                {year.id === undefined ? 'TAMBAH' : 'UBAH'}
            </ModalHeader>
            <ModalBody>
                <form className="is-alter" onSubmit={handleSubmit(onSubmit)}>
                    <div className="form-group">
                        <label className="form-label" htmlFor="name">Nama Tahun</label>
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
                        <label className="form-label" htmlFor="description">Diskripsi</label>
                        <div className="form-control-wrap">
                            <textarea
                                className="form-control"
                                id="description"
                                placeholder="Ex. Tahun Pelajaran 2024/2025"
                                {...register("description", {required: false})}
                            />
                        </div>
                    </div>
                    <div className="form-group">
                        <label className="form-label" htmlFor="active">Pilih Aktif</label>
                        <div className="form-control-wrap">
                            <Controller
                                control={control}
                                name="active"
                                rules={{required: "Status tahun tidak boleh kosong"}}
                                render={({field}) => (
                                    <React.Fragment>
                                        <RSelect
                                            options={activeOptions}
                                            value={field.value}
                                            onChange={(selectedOption) => field.onChange(selectedOption)}
                                            placeholder="Pilih Aktif"
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
                </form>
            </ModalBody>
        </Modal>
    )
}

export default Partial;
