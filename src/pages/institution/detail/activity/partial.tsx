import {useEffect, useState} from "react";
import {Button, Modal, ModalBody, ModalHeader, Spinner} from "reactstrap";
import {useForm} from "react-hook-form";
import {Icon} from "@/components";
import {store as storeActivity, update as updateActivity} from "@/common/api/institution/activity";
import type {InstitutionActivityFormType, InstitutionActivityType} from "@/types";
import {useYearContext} from "@/common/hooks/useYearContext";
import {useParams} from "react-router-dom";

interface PartialProps {
    modal: boolean;
    setModal: (modal: boolean) => void;
    activity: InstitutionActivityType
    setActivity: (activity: InstitutionActivityType) => void;
    setLoadData: (loadData: boolean) => void;
}

const Partial = ({modal, setModal, activity, setActivity, setLoadData}: PartialProps) => {
    const [loading, setLoading] = useState(false);
    const year = useYearContext()
    const {id} = useParams();
    const {
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
            file: value.file[0]
        }
        if (activity.id === undefined) onStore(formData)
        else onUpdate(formData);
    }
    const onStore = async (formData: InstitutionActivityType) => {
        setLoading(true);
        await storeActivity(formData).then((resp) => {
            if (resp) {
                toggle()
                setLoadData(true)
            } else {
                return
            }
        }).finally(() => setLoading(false));
    }
    const onUpdate = async (formData: InstitutionActivityType) => {
        setLoading(true)
        await updateActivity(formData).then((resp) => {
            if (resp) {
                toggle()
                setLoadData(true)
            } else {
                return
            }
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
        setValue('id', activity.id);
        setValue('yearId', activity.yearId);
        setValue('institutionId', activity.institutionId);
        setValue('capacity', activity.capacity);
    }, [activity, setValue]);

    return (
        <Modal isOpen={modal} toggle={toggle}>
            <ModalHeader toggle={toggle} close={
                <button className="close" onClick={toggle}>
                    <Icon name="cross"/>
                </button>
            }>
                {activity.id === undefined ? 'TAMBAH' : 'UBAH'}
            </ModalHeader>
            <ModalBody>
                <form className="is-alter" onSubmit={handleSubmit(onSubmit)}>
                    <div className="form-group">
                        <label className="form-label" htmlFor="capacity">Kapasitas</label>
                        <div className="form-control-wrap">
                            <div className="input-group">
                                <input
                                    type="text"
                                    className="form-control"
                                    id="capacity"
                                    placeholder="Ex. 180"
                                    {...register("capacity", {required: true})}
                                />
                                <div className="input-group-append">
                                    <span className="input-group-text">Siswa</span>
                                </div>
                            </div>
                            {errors.capacity && <span className="invalid">Kolom tidak boleh kosong</span>}
                        </div>
                    </div>
                    <div className="form-group">
                        <label className="form-label" htmlFor="file">File Brosur</label>
                        <div className="form-control-wrap">
                            <input
                                type="file"
                                id="file"
                                className="form-control"
                                {...register("file", {
                                    required: "Berkas tidak boleh kosong",
                                    validate: {
                                        isPdf: (files) => {
                                            return (
                                                files[0]?.type === "application/pdf" ||
                                                "Hanya file PDF yang diperbolehkan"
                                            );
                                        },
                                        maxSize: (files) => {
                                            const maxSize = 5 * 1024 * 1024; // 5MB
                                            return (
                                                files[0]?.size <= maxSize ||
                                                "Ukuran file harus kurang dari 5MB"
                                            );
                                        },
                                    },
                                })}
                            />
                            {errors.file && <span className="invalid">{String(errors.file.message)}</span>}
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
