import { EducationItem, WorkExperienceItem, SkillItem, ProjectItem } from "./types";

export const profileData = {
  name: "Muhammad Luthfi Akhdan",
  title: "Professional Web Developer",
  subTitle: "SMK Wikrama Bogor Graduate | Specializing in Laravel, Vue, & MySQL Systems",
  bio: "Halo! Saya Muhammad Luthfi Akhdan, seorang Programmer profesional asal Cigombong, Bogor. Sebagai lulusan Rekayasa Perangkat Lunak dari SMK Wikrama Bogor (2018), saya mendedikasikan karir saya untuk membangun arsitektur backend yang kokoh, API yang aman, serta web interface yang estetik dan interaktif. Saya memiliki pengalaman mendalam di PT. Inet Global Indo, PT. Total Solusi Teknologi, dan Clozette Indonesia dalam mengembangkan solusi web berskala enterprise.",
  birthInfo: "Bogor, 3 Mei 2000",
  address: "Cigombong, Kab. Bogor, Jawa Barat",
  phone: "+(62) 896-3835-0223",
  email: "luthfiakhdan.info@gmail.com",
  socials: {
    instagram: "https://instagram.com/lutfihacozz",
    linkedin: "https://www.linkedin.com/in/muhammad-luthfi-akhdan-956b67162/",
    github: "https://github.com/LuthfiAkhdan",
    username: {
      instagram: "@lutfihacozz",
      linkedin: "Muhammad Luthfi Akhdan",
      github: "LuthfiAkhdan"
    }
  }
};

export const educationData: EducationItem[] = [
  {
    year: "2015 - 2018",
    school: "SMK Wikrama Bogor (Vocational High School)",
    major: "Software Engineering (Rekayasa Perangkat Lunak)",
    details: "Mempelajari dasar-dasar pemrograman, struktur data, algoritma, basis data (SQL), dan pengembangan aplikasi web & mobile. Terlatih dalam budaya kerja profesional disiplin tinggi khas Wikrama."
  },
  {
    year: "2012 - 2015",
    school: "SMP Negeri 1 Cigombong (Junior High School)",
    details: "Aktif dalam kegiatan teknologi informasi sekolah dan dasar-dasar komputer."
  },
  {
    year: "2006 - 2012",
    school: "SD Negeri 02 Cigombong (Elementary School)",
    details: "Pendidikan dasar formal pertama di daerah Cigombong, Bogor."
  }
];

export const experienceData: WorkExperienceItem[] = [
  {
    period: "Des 2023 - Mei 2025",
    company: "Clozette Indonesia",
    role: "Backend Developer",
    type: "Staff Outsourcing from PT. Karisma Zona Kreatifku (KAZOKKU)",
    details: [
      "Mengembangkan, mengoptimalkan, dan memelihara modul backend berkinerja tinggi untuk platform Clozette.",
      "Mendesain arsitektur database MySQL yang efisien dan mengoptimalkan query SQL untuk mempercepat respons sistem.",
      "Membuat dan mengelola RESTful API yang aman untuk integrasi layanan pihak ketiga dan frontend dengan TypeScript.",
      "Membangun RESTful API yang aman untuk integrasi layanan pihak ketiga dan frontend.",
      "Berkolaborasi erat dengan tim produk dan engineer lainnya untuk merilis fitur-fitur baru secara rutin."
    ],
    techStack: ["Laravel", "TypeScript", "Vue.js", "Tailwind CSS", "MySQL", "Prisma", "Laragon", "Git"]
  },
  {
    period: "Mei 2022 - Jul 2023",
    company: "PT. Total Solusi Teknologi",
    role: "Senior Web Developer",
    type: "Staff Contract",
    details: [
      "Memimpin pengembangan beberapa aplikasi web enterprise, memastikan performa dan kualitas kode yang optimal.",
      "Mengintegrasikan UI/UX modern menggunakan Vue.js dan Tailwind CSS dengan backend yang solid.",
      "Membangun dashboard administrasi yang interaktif dan responsif untuk manajemen konten dan data.",
      "Mengurangi waktu loading halaman web secara signifikan melalui optimasi aset dan teknik caching."
    ],
    techStack: ["Laravel", "CodeIgniter", "React.Js", "Vue.js", "Tailwind CSS", "MySQL", "Laragon", "Git"]
  },
  {
    period: "Sep 2018 - Feb 2021",
    company: "PT. Inet Global Indo",
    role: "Full Stack Developer",
    type: "Staff Contract",
    details: [
      "Membangun website perusahaan, portal klien, dan sistem administrasi dari awal menggunakan Laravel dan CodeIgniter.",
      "Membangun aplikasi android native berbasis Java dengan Android Studio untuk kebutuhan internal dan klien.",
      "Mengelola server hosting, deployment aplikasi web melalui cPanel, dan integrasi transfer file aman dengan FileZilla.",
      "Melakukan pemeliharaan server berkala, backup basis data, dan konfigurasi DNS.",
      "Menyediakan dukungan teknis tingkat lanjut untuk aplikasi internal dan klien korporat."
    ],
    techStack: ["Laravel", "CodeIgniter", "MySQL", "cPanel", "FileZilla", "Apache", "Nginx", "Android Studio"]
  },
  {
    period: "2017",
    company: "PT. Bramanty Adhikari Tibra Syandana",
    role: "Junior Programmer",
    type: "Internship (3 Months)",
    details: [
      "Mengikuti program magang selama 3 bulan, berfokus pada pengenalan lingkungan pengembangan tim.",
      "Membantu senior programmer dalam menulis kueri SQL dasar dan melakukan pengujian fungsional aplikasi (bug hunting).",
      "Mempelajari standar kualitas kode industri dan pengembangan web modern berbasis PHP.",
      "Menggunakan SharePoint untuk manajemen konten dan kolaborasi tim."
    ],
    techStack: ["PHP", "HTML5", "CSS3", "MySQL", "Sublime Text", "SharePoint"]
  }
];

export const skillsData: SkillItem[] = [
  { name: "PHP & Laravel", score: 80, color: "from-purple-500 to-indigo-600" },
  { name: "Nuxt & Vue JS", score: 75, color: "from-emerald-400 to-teal-600" },
  { name: "Next & React JS", score: 65, color: "from-yellow-400 to-amber-500" },
  { name: "HTML5 & Semantic Markup", score: 80, color: "from-orange-500 to-red-500" },
  { name: "Bootstrap & Tailwind CSS", score: 75, color: "from-cyan-400 to-blue-500" },
  { name: "MySQL Database & Optimization", score: 55, color: "from-purple-500 to-pink-500" },
  { name: "Android Java", score: 50, color: "from-green-500 to-amber-500" },
  { name: "Microsoft Office", score: 45, color: "from-sky-500 to-emerald-500" }
];

export const additionalSkillsData: SkillItem[] = [
  { name: "English Language (Professional)", score: 85, color: "from-rose-500 to-red-500" },
  { name: "Japanese Language (Conversational)", score: 50, color: "from-amber-400 to-orange-500" },
  { name: "Technical & Story Writing", score: 80, color: "from-purple-500 to-pink-500" },
  { name: "3D Animation (Blender / Asset)", score: 40, color: "from-indigo-400 to-violet-600" }
];

export const toolsData = {
  editors: [
    { name: "Visual Studio Code", desc: "Editor utama untuk JavaScript, Vue, & Backend", icon: "Code" },
    { name: "Sublime Text 3", desc: "Editor super cepat untuk koding cepat & edit file teks", icon: "FileCode" }
  ],
  serversAndDBs: [
    { name: "Laragon", desc: "Lingkungan server lokal andalan untuk PHP & Laravel", icon: "Server" },
    { name: "XAMPP & PHPMyAdmin", desc: "Peralatan server Apache lokal & administrasi MySQL", icon: "Database" },
    { name: "MS SQL Server Management Studio", desc: "Manajemen basis data relasional enterprise", icon: "ShieldAlert" }
  ],
  android: [
    { name: "Android Studio", desc: "IDE pengembangan aplikasi mobile Android native berbasis Java", icon: "Smartphone" }
  ],
  testing: [
    { name: "Postman", desc: "Alat pengujian RESTful API & dokumentasi endpoint", icon: "Send" }
  ],
  hosting: [
    { name: "cPanel & WHM", desc: "Panel kontrol hosting web untuk manajemen file & domain", icon: "Globe" },
    { name: "FileZilla FTP Client", desc: "Protokol transfer berkas aman antara lokal dan server", icon: "FileUp" }
  ]
};

export const projectsData: ProjectItem[] = [
  {
    title: "Clozette Rewards",
    image: "/assets/clozette-reward.png",
    linked: "https://clozetterewards.com",
    description: "Clozette Rewards merupakan sebuah dashboard administrasi berbasis web yang digunakan untuk mengelola konten dan program promosi pada platform rewards berbasis affiliate, di mana pengguna akan memperoleh reward atau cashback setelah melakukan pembelian melalui tautan atau promo yang tersedia di platform.",
    category: "Backend Development",
    techStack: ["PHP", "MySQL", "Prisma", "REST APIs", "Vue.js", "Typescript", "Redis"],
    features: [
      "Optimasi query database sehingga meningkatkan kecepatan load API sebesar 35%",
      "Integrasi sistem otentikasi aman JWT dengan pembatasan request (rate-limiting)",
      "Comprehensive Admin Dashboard untuk mengelola seluruh konten",
      "Export dan Import data dalam format CSV untuk efisiensi manajemen data",
      "Role-based Administrative Workflow yang membantu operasional"
    ]
  },
  {
    title: "Clozette Timesheet - Internal",
    image: "/assets/clozette-timesheet.png",
    linked: "#",
    description: "Clozette Timesheet merupakan Employee Management System berbasis web yang digunakan untuk mencatat aktivitas kerja harian melalui timesheet. Sistem ini mendukung alur persetujuan oleh atasan, sehingga data timesheet yang telah disetujui dapat digunakan sebagai dasar perhitungan pembayaran.",
    category: "Backend Development",
    techStack: ["PHP", "MySQL", "Prisma", "REST APIs", "Vue.js", "Typescript", "Redis"],
    features: [
      "Optimasi query database sehingga meningkatkan kecepatan load API sebesar 35%",
      "Integrasi sistem otentikasi aman JWT dengan pembatasan request (rate-limiting)",
      "Comprehensive Admin Dashboard untuk mengelola seluruh konten",
      "Export dan Import data dalam format CSV untuk efisiensi manajemen data",
      "Role-based Administrative Workflow yang membantu operasional"
    ]
  },
  {
    title: "Indonesian Heart Rhythm Society (InaHRS) 2023",
    image: "/assets/inahrs-2023.png",
    linked: "https://inahrs.or.id",
    description: "InaHRS (Indonesian Heart Rhythm Society) merupakan platform web resmi organisasi profesi yang menyediakan informasi mengenai penyakit irama jantung, edukasi kesehatan, kegiatan ilmiah, serta layanan keanggotaan.",
    category: "Full Stack Development",
    techStack: ["Laravel", "Vue.js", "Tailwind CSS", "MySQL", "Axios", "REST APIs"],
    features: [
      "Optimasi query database sehingga meningkatkan kecepatan load API sebesar 35%",
      "Integrasi sistem otentikasi aman OAuth dengan pembatasan request (rate-limiting)",
      "Tampilan interaktif dan responsif penuh dengan mode visualisasi data kustom",
      "Comprehensive Admin Dashboard untuk mengelola seluruh konten",
      "Registrasi course dilengkapi integrasi pembayaran menggunakan Xendit",
      "Sistem invoice otomatis berformat PDF yang langsung dikirim ke email pengguna"
    ]
  },
  {
    title: "Perki Jaya DKI Jakarta",
    image: "/assets/perkijaya.png",
    linked: "https://perkijaya.com/home",
    description: "PERKI JAYA merupakan platform web berbasis edukasi kesehatan yang dikembangkan untuk menyediakan informasi medis dan edukasi bagi masyarakat. Website ini menghadirkan konten kesehatan yang mudah diakses melalui antarmuka yang sederhana, responsif, dan terstruktur.",
    category: "Full Stack Development",
    techStack: ["Laravel", "Vue.js", "Tailwind CSS", "MySQL", "Axios", "REST APIs"],
    features: [
      "Optimasi query database sehingga meningkatkan kecepatan load API sebesar 35%",
      "Integrasi sistem otentikasi aman OAuth dengan pembatasan request (rate-limiting)",
      "Tampilan interaktif dan responsif penuh dengan mode visualisasi data kustom",
      "Comprehensive Admin Dashboard untuk mengelola seluruh konten",
      "Registrasi course dilengkapi integrasi pembayaran menggunakan Xendit",
      "Sistem invoice otomatis berformat PDF yang langsung dikirim ke email pengguna"
    ]
  },
  {
    title: "Bioplastic Feedstock Alliance (BFA)",
    image: "/assets/bfa.png",
    linked: "https://bioplasticfeedstockalliance.org",
    description: "Bioplastic Feedstock Alliance (BFA) merupakan website organisasi internasional yang berfokus pada edukasi dan publikasi mengenai pengembangan bioplastik berkelanjutan. Platform ini menyediakan artikel, laporan penelitian, dan metodologi.",
    category: "Full Stack Development",
    techStack: ["Laravel", "Vue.js", "Tailwind CSS", "MySQL", "Axios", "REST APIs"],
    features: [
      "Optimasi query database sehingga meningkatkan kecepatan load API sebesar 35%",
      "Integrasi sistem otentikasi aman OAuth dengan pembatasan request (rate-limiting)",
      "Tampilan interaktif dan responsif penuh dengan mode visualisasi data kustom",
      "Comprehensive Admin Dashboard untuk mengelola seluruh konten",
      "Menyediakan resource yang dapat diunduh dalam format PDF",
    ]
  },
  {
    title: "FASTLab Klinik & Laboratorium",
    image: "/assets/fastlab.jpg",
    linked: "https://apkpure.com/id/fastlab/com.inet.mobilepcr.id",
    description: "FASTLab merupakan aplikasi mobile layanan kesehatan yang dirancang untuk memudahkan pengguna mengakses berbagai layanan medis secara digital. Aplikasi ini menyediakan fitur informasi hasil PCR dan Antigen, layanan vaksinasi, pencarian lokasi Fast-Point.",
    category: "Mobile App Development",
    techStack: ["Android Java", "Android Studio", "SQLite", "MySQL", "Firebase Cloud Messaging"],
    features: [
      "Penyimpanan lokal SQLite berkecepatan tinggi untuk menyimpan artikel secara offline",
      "Notifikasi menggunakan Firebase Cloud Messaging untuk pemberitahuan hasil PCR dan Antigen",
      "Konsumsi API eksternal yang dioptimalkan untuk meminimalkan penggunaan kuota internet",
      "Responsive mobile UI/UX yang intuitif dan mudah digunakan",
    ]
  },
  {
    title: "Employee Management System (EMS) - Internal",
    image: "/assets/mcs.png",
    linked: "#",
    description: "Employee Management System (EMS) merupakan aplikasi mobile internal yang dikembangkan untuk mendukung operasional dan administrasi karyawan dalam satu platform. Aplikasi ini menyediakan fitur absensi, pengajuan cuti, timesheet, dan manajemen tugas.",
    category: "Mobile App Development",
    techStack: ["Android Java", "Android Studio", "SQLite", "MySQL", "Google Maps", "Firebase Cloud Messaging"],
    features: [
      "Penyimpanan lokal SQLite berkecepatan tinggi untuk menyimpan artikel secara offline",
      "Notifikasi menggunakan Firebase Cloud Messaging untuk pemberitahuan hasil PCR dan Antigen",
      "Konsumsi API eksternal yang dioptimalkan untuk meminimalkan penggunaan kuota internet",
      "Responsive mobile UI/UX yang intuitif dan mudah digunakan",
    ]
  }
];
