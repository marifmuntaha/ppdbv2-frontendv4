const menuAdmin = [
    {
        icon: "monitor",
        text: "Dashboard",
        link: "/dashboard",
    },
    {
        icon: "archived",
        text: "Master Data",
        subMenu: [
            {
                text: "Tahun Pelajaran",
                link: "/master-data/tahun-pelajaran",
            },
            {
                text: "Program Boarding",
                link: "/master-data/program-boarding",
            },
        ],
    },
    {
        icon: "building",
        text: "Lembaga",
        subMenu: [
            {
                text: "Daftar Lembaga",
                link: "/lembaga/data-lembaga",
            },
            {
                text: "Data Program",
                link: "/lembaga/data-program",
            },
        ],
    },
]

const menuStudent = [
    {
        icon: "monitor",
        text: "Beranda",
        link: "/dashboard",
    },
    {
        icon: "file",
        text: "Pendaftaran",
        link: "/pendaftaran",
    },
    {
        icon: "upload",
        text: "Unggah Berkas",
        link: "/unggah-berkas",
    },
    {
        icon: "checkbox",
        text: "Validasi",
        link: "/validasi-pendaftaran",
    },
    {
        icon: "map-pin",
        text: "Pembayaran",
        link: "/pembayaran",
    },
    {
        icon: "printer",
        text: "Catak Kartu",
        link: "/cetak-kartu",
    },
    {
        icon: "bell",
        text: "Pengumuman",
        link: "/pengumuman",
    },

];

const menuDefault = [
    {
        icon: "monitor",
        text: "Beranda",
        link: "/",
    },
    {
        icon: "file",
        text: "Aturan & Prosedur",
        link: "/aturan-prosedur",
    },
    {
        icon: "calendar",
        text: "Jadwal Pelaksanaan",
        link: "/jadwal-pelaksaaan",
    },
    {
        icon: "map-pin",
        text: "Lokasi Pendaftaran",
        link: "/lokasi-pendaftaran",
    },
    {
        icon: "list-round",
        text: "Alur Pelaksanaan",
        link: "/alur-pelaksanaan",
    },
    {
        icon: "hash",
        text: "Alur Pelaksanaan",
        link: "/daya-tampung",
    },

];

export {menuDefault, menuAdmin, menuStudent} ;
