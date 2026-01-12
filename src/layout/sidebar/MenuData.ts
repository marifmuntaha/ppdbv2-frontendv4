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
            }
        ],
    },
    {
        icon: "users",
        text: "Data Pengguna",
        link: "/data-pengguna",
    }
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
        subMenu: [
            {text: 'Data Pribadi', link: '/pendaftaran/data-pribadi'},
            {text: 'Data Orangtua', link: '/pendaftaran/data-orangtua'},
            {text: 'Data Tempat Tinggal', link: '/pendaftaran/data-tempat-tinggal'},
            {text: 'Program Pilihan', link: '/pendaftaran/program-pilihan'},
            {text: 'Data Sekolah Asal', link: '/pendaftaran/data-sekolah-asal'},
            {text: 'Data Prestasi', link: '/pendaftaran/data-prestasi'},
            {text: 'Unggah Berkas', link: '/pendaftaran/unggah-berkas'},
        ]
    },
    {
        icon: "cc-alt",
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

const menuTreasurer = [
    {
        icon: "monitor",
        text: "Beranda",
        link: "/dashboard",
    },
    {
        icon: "archive",
        text: "Master Data",
        subMenu: [
            {
                text: "Item Pembayaran",
                link: "/master-data/item-pembayaran",
            },
            {
                text: "Item Potongan",
                link: "/master-data/item-potongan",
            }
        ],
    },
    {
        icon: "users",
        text: "Data Pendaftar",
        link: "/data-pendaftar"
    },
    {
        icon: "file-docs",
        text: "Data Tagihan",
        link: "/data-tagihan",

    },
    {
        icon: "cc-alt",
        text: "Data Pembayaran",
        link: "/data-pembayaran",
    },
    {
        icon: "file-text",
        text: "Laporan",
        subMenu: [
            {
                text: "Laporan Tagihan",
                link: "/laporan/tagihan"
            },
            {
                text: "Laporan Pembayaran",
                link: "/laporan/pembayaran"
            }
        ]
    },
    {
        icon: "setting",
        text: "Pengaturan",
        link: "/pengaturan"
    }
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

export {menuDefault, menuAdmin, menuTreasurer, menuStudent} ;
