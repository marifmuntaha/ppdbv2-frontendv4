import type {OptionsType} from "@/types";

export const GENDER_OPTIONS: OptionsType[] = [
    {value: 'L', label: 'Laki-laki'},
    {value: 'P', label: 'Perempuan'}
]

export const PARENT_STATUS: OptionsType[] = [
    {value: '1', label: 'Masih Hidup'},
    {value: '2', label: 'Sudah Meninggal'},
    {value: '3', label: 'Tidak Diketahui'},
]

export const GUARD_STATUS: OptionsType[] = [
    {value: '1', label: 'Sama dengan Ayah Kandung'},
    {value: '2', label: 'Sama dengan Ibu Kandung'},
    {value: '3', label: 'Lainnya'},
]

export const PARENT_STUDY_OPTIONS: OptionsType[] = [
    {value: '1', label: 'SD/Sederajat'},
    {value: '2', label: 'SMP/Sederajat'},
    {value: '3', label: 'SMA/Sederajat'},
    {value: '4', label: 'D1'},
    {value: '5', label: 'D2'},
    {value: '6', label: 'D3'},
    {value: '7', label: 'D4/S1'},
    {value: '8', label: 'S2'},
    {value: '9', label: 'S3'},
    {value: '10', label: 'Tidak Bersekolah'},
]

export const PARENT_JOB_OPTIONS: OptionsType[] = [
    {value: '1', label:'Tidak Bekerja'},
    {value: '2', label:'Pensiunan'},
    {value: '3', label:'PNS'},
    {value: '4', label:'TNI/Polisi'},
    {value: '5', label:'Guru/Dosen'},
    {value: '6', label:'Pegawai Swasta'},
    {value: '7', label:'Wiraswasta'},
    {value: '8', label:'Pengacara/Jaksa/Hakim/Notaris'},
    {value: '9', label:'Seniman/Pelukis/Artis/Sejenis'},
    {value: '10', label:'Dokter/Bidan/Perawat'},
    {value: '11', label:'Pilot/Pramugara'},
    {value: '12', label:'Pedagang'},
    {value: '13', label:'Petani/Peternak'},
    {value: '14', label:'Nelayan'},
    {value: '15', label:'Buruh (Tani/Pabrik/Bangunan)'},
    {value: '16', label:'Sopir/Masinis/Kondektur'},
    {value: '17', label:'Politikus'},
    {value: '18', label:'Lainnya'},
]

export const LEVEL_ACHIEVEMENT_OPTIONS: OptionsType[] = [
    {value: '1', label: 'Internasional'},
    {value: '2', label: 'Nasional'},
    {value: '3', label: 'Provinsi'},
    {value: '4', label: 'Kabupaten'},
]

export const CHAMP_ACHIEVEMENT_OPTIONS: OptionsType[] = [
    {value: '1', label: '1'},
    {value: '2', label: '2'},
    {value: '3', label: '3'},
    {value: '4', label: 'Harapan 1'},
    {value: '4', label: 'Harapan 2'},
    {value: '4', label: 'Harapan 3'},
]

export const TYPE_ACHIEVEMENT_OPTIONS: OptionsType[] = [
    {value: '1', label: 'Individu'},
    {value: '2', label: 'Kelompok'},
]