import { Injectable } from '@angular/core';
import { Lessons } from '../dto/lessons';
import { Grades } from '../dto/grades';
import { PaymentMethods } from '../dto/payment-methods';

@Injectable({
  providedIn: 'root'
})
export class SharedService {

  private companyKey: string = 'selectedCompany';

  private companyId: string | null = null;

  private seasonKey: string = 'selectedSeason';

  private seasonId: string | null = null;

  studentID: number;

  constructor() { }

  getCompanyId(): string | null {
    return this.companyId || localStorage.getItem(this.companyKey);
  }

  setCompanyId(companyId: string) {
    this.companyId = companyId;
    localStorage.setItem(this.companyKey, companyId);
  }

  getSeasonId(): string | null {
    return this.seasonId || localStorage.getItem(this.seasonKey);
  }

  setSeasonId(seasonId: string) {
    this.seasonId = seasonId;
    localStorage.setItem(this.seasonKey, seasonId);
  }

  setStudentID(studentIDValue: number) {
    this.studentID = studentIDValue;
  }

  lessons: Lessons[] = [
    {
        "lessonId": 0,
        "lesson": "Matematik",
        "lessonType": 0,
        "bookType": 1,
        "selected": false
    },
    {
        "lessonId": 1,
        "lesson": "Geometri",
        "lessonType": 0,
        "bookType": 1,
        "selected": false
    },
    {
        "lessonId": 2,
        "lesson": "Fizik",
        "lessonType": 0,
        "bookType": 1,
        "selected": false
    },
    {
        "lessonId": 3,
        "lesson": "Kimya",
        "lessonType": 0,
        "bookType": 1,
        "selected": false
    },
    {
        "lessonId": 4,
        "lesson": "Biyoloji",
        "lessonType": 0,
        "bookType": 1,
        "selected": false
    },
    {
        "lessonId": 5,
        "lesson": "Türkçe",
        "lessonType": 0,
        "bookType": 1,
        "selected": false
    },
    {
        "lessonId": 6,
        "lesson": "Edebiyat",
        "lessonType": 0,
        "bookType": 1,
        "selected": false
    },
    {
        "lessonId": 7,
        "lesson": "Tarih",
        "lessonType": 0,
        "bookType": 1,
        "selected": false
    },
    {
        "lessonId": 8,
        "lesson": "Coğrafya",
        "lessonType": 0,
        "bookType": 1,
        "selected": false
    },
    {
        "lessonId": 9,
        "lesson": "Fen",
        "lessonType": 0,
        "bookType": 1,
        "selected": false
    },
    {
        "lessonId": 10,
        "lesson": "AYT - Matemetik",
        "lessonType": 1,
        "bookType": 0,
        "selected": false
    },
    {
        "lessonId": 11,
        "lesson": "TYT - Matematik",
        "lessonType": 1,
        "bookType": 0,
        "selected": false
    }
  ];

  grades: Grades[] = [
    {
        "gradeId": 0,
        "grade": "4",
        "gradeType": 0
    },
    {
        "gradeId": 1,
        "grade": "5",
        "gradeType": 0
    },
    {
        "gradeId": 2,
        "grade": "6",
        "gradeType": 1
    },
    {
        "gradeId": 3,
        "grade": "7",
        "gradeType": 1
    },
    {
        "gradeId": 4,
        "grade": "8",
        "gradeType": 0
    },
    {
        "gradeId": 5,
        "grade": "9",
        "gradeType": 1
    },
    {
        "gradeId": 6,
        "grade": "10",
        "gradeType": 1
    },
    {
        "gradeId": 7,
        "grade": "11",
        "gradeType": 1
    },
    {
        "gradeId": 8,
        "grade": "12",
        "gradeType": 0
    },
    {
        "gradeId": 9,
        "grade": "Mezun",
        "gradeType": 0
    },
    {
        "gradeId": 10,
        "grade": "TYT",
        "gradeType": 2
    },
    {
        "gradeId": 11,
        "grade": "AYT",
        "gradeType": 2
    },
    {
        "gradeId": 12,
        "grade": "LGS",
        "gradeType": 2
    }
  ];

  paymentMethods: PaymentMethods[] = [
    {
        "paymentMethodId": 0,
        "paymentMethod": "Nakit"
    },
    {
        "paymentMethodId": 1,
        "paymentMethod": "EFT-Havale"
    }
    ]

  foyLessons: any[] = [
    {
        "id": 0,
        "name": "Matemetik - 1"
    },
    {
        "id": 1,
        "name": "Matemetik - 2"
    },
    {
        "id": 2,
        "name": "Matemetik - 3"
    },
    {
        "id": 3,
        "name": "Geometri - 1"
    },
    {
        "id": 4,
        "name": "Geometri - 2"
    },
    {
        "id": 5,
        "name": "Fizik - 1"
    },
    {
        "id": 6,
        "name": "Fizik - 2"
    },
    {
        "id": 7,
        "name": "Fizik - 3"
    },
    {
        "id": 8,
        "name": "Kimya - 1"
    },
    {
        "id": 9,
        "name": "Kimya - 2"
    },
    {
        "id": 10,
        "name": "Kimya - 3"
    },
    {
        "id": 11,
        "name": "Biyoloji - 1"
    },
    {
        "id": 12,
        "name": "Biyoloji - 2"
    },
    {
        "id": 13,
        "name": "Biyoloji - 3"
    },
    {
        "id": 14,
        "name": "Türkçe"
    },
    {
        "id": 15,
        "name": "Edebiyat - 1"
    },
    {
        "id": 16,
        "name": "Edebiyat - 2"
    },
    {
        "id": 17,
        "name": "Tarih - 1"
    },
    {
        "id": 18,
        "name": "Tarih - 2"
    },
    {
        "id": 19,
        "name": "Coğrafya - 1"
    },
    {
        "id": 20,
        "name": "Coğrafya - 2"
    },
  ]

  foySubjects: any[] = [
    {
        "foyId": 0,
        "kod": "MAT-01",
        "ders": "SAYI KÜMELERİ",
        "seans": 5
    },
    {
        "foyId": 0,
        "kod": "MAT-02",
        "ders": "1.DERECEDEN BİR BİLİNMEYENLİ DENKLEMLER",
        "seans": 1
    },
    {
        "foyId": 0,
        "kod": "MAT-03",
        "ders": "SAYI BASAMAKLARI",
        "seans": 2
    },
    {
        "foyId": 0,
        "kod": "MAT-04",
        "ders": "BÖLME VE BÖLÜNEBİLME",
        "seans": 2
    },
    {
        "foyId": 0,
        "kod": "MAT-05",
        "ders": "ASAL ÇARPANLARA AYIRMA",
        "seans": 1
    },
    {
        "foyId": 0,
        "kod": "MAT-06",
        "ders": "EBOB - EKOK",
        "seans": 2
    },
    {
        "foyId": 0,
        "kod": "MAT-07",
        "ders": "PERİYOT PROBLEMLERİ",
        "seans": 1
    },
    {
        "foyId": 0,
        "kod": "MAT-08",
        "ders": "1.DERECEDEN BİR BİLİNMEYENLİ EŞİTSZİLİKLER",
        "seans": 2
    },
    {
        "foyId": 0,
        "kod": "MAT-09",
        "ders": "MUTLAK DEĞER",
        "seans": 3
    },
    {
        "foyId": 0,
        "kod": "MAT-10",
        "ders": "1.DERECEDEN İKİ BİLİNMEYENLİ DENKLEM VE EŞİTSİZLİKLER",
        "seans": 2
    },
    {
        "foyId": 0,
        "kod": "MAT-11",
        "ders": "ÜSLÜ İFADELER",
        "seans": 3
    },
    {
        "foyId": 0,
        "kod": "MAT-12",
        "ders": "KÖKLÜ İFADELER",
        "seans": 3
    },
    {
        "foyId": 0,
        "kod": "MAT-13",
        "ders": "ORAN - ORANTI",
        "seans": 2
    },
    {
        "foyId": 0,
        "kod": "MAT-14",
        "ders": "SAYI - KESİR PROBLEMLERİ",
        "seans": 2
    },
    {
        "foyId": 0,
        "kod": "MAT-15",
        "ders": "YAŞ PROBLEMLERİ",
        "seans": 1
    },
    {
        "foyId": 0,
        "kod": "MAT-16",
        "ders": "İŞÇİ PROBLEMLERİ",
        "seans": 1
    },
    {
        "foyId": 0,
        "kod": "MAT-17",
        "ders": "HIZ PROBLEMLERİ",
        "seans": 2
    },
    {
        "foyId": 0,
        "kod": "MAT-18",
        "ders": "YÜZDE PROBLEMLERİ",
        "seans": 1
    },
    {
        "foyId": 0,
        "kod": "MAT-19",
        "ders": "KAR ZARAR PROBLEMLERİ",
        "seans": 1
    },
    {
        "foyId": 0,
        "kod": "MAT-20",
        "ders": "KARIŞIM PROBLEMLERİ",
        "seans": 1
    },
    {
        "foyId": 0,
        "kod": "MAT-21",
        "ders": "RUTİN OLMAYAN PROBLEMLER",
        "seans": 1
    },
    {
        "foyId": 0,
        "kod": "MAT-22",
        "ders": "MANTIK",
        "seans": 3
    },
    {
        "foyId": 0,
        "kod": "MAT-23",
        "ders": "KÜMELER",
        "seans": 4
    },
    {
        "foyId": 0,
        "kod": "MAT-24",
        "ders": "VERİ",
        "seans": 2
    },
    {
        "foyId": 1,
        "kod": "MAT-25",
        "ders": "FONKSİYONLAR",
        "seans": 8
      },
      {
        "foyId": 1,
        "kod": "MAT-26",
        "ders": "POLİNOMLAR",
        "seans": 3
      },
      {
        "foyId": 1,
        "kod": "MAT-27",
        "ders": "ÇARPANLARA AYIRMA",
        "seans": 2
      },
      {
        "foyId": 1,
        "kod": "MAT-28",
        "ders": "İKİNCİ DERECEDEN DENKLEMLER",
        "seans": 3
      },
      {
        "foyId": 1,
        "kod": "MAT-29",
        "ders": "PARABOL ",
        "seans": 4
      },
      {
        "foyId": 1,
        "kod": "MAT-30",
        "ders": "EŞİTSİZLİK VE EŞİTSİZLİK SİSTEMLERİ",
        "seans": 3
      },
      {
        "foyId": 1,
        "kod": "MAT-31",
        "ders": "PERMÜTASYON",
        "seans": 3
      },
      {
        "foyId": 1,
        "kod": "MAT-32",
        "ders": "KOMBİNASYON",
        "seans": 2
      },
      {
        "foyId": 1,
        "kod": "MAT-33",
        "ders": "BİNOM AÇILIMI",
        "seans": 1
      },
      {
        "foyId": 1,
        "kod": "MAT-34",
        "ders": "OLASILIK",
        "seans": 3
      },
      {
        "foyId": 1,
        "kod": "MAT-35",
        "ders": "GENEL TEKRAR",
        "seans": 1
      },
      {
        "foyId": 2,
        "kod": "MAT-36",
        "ders": "LOGARİTMA",
        "seans": 5
      },
      {
        "foyId": 2,
        "kod": "MAT-37",
        "ders": "DİZİLER",
        "seans": 3
      },
      {
        "foyId": 2,
        "kod": "MAT-38",
        "ders": "TÜREV",
        "seans": 11
      },
      {
        "foyId": 2,
        "kod": "MAT-39",
        "ders": "İNTEGRAL ",
        "seans": 8
      },
      {
        "foyId": 3,
        "kod": "GEO-01",
        "ders": "DOĞRUDA AÇILAR",
        "seans": 1
      },
      {
        "foyId": 3,
        "kod": "GEO-02",
        "ders": "ÜÇGENDE AÇILAR",
        "seans": 2
      },
      {
        "foyId": 3,
        "kod": "GEO-03",
        "ders": "DİK ÜÇGEN",
        "seans": 3
      },
      {
        "foyId": 3,
        "kod": "GEO-04",
        "ders": "İKİZKENAR ÜÇGEN",
        "seans": 1
      },
      {
        "foyId": 3,
        "kod": "GEO-05",
        "ders": "EŞKENAR ÜÇGEN",
        "seans": 1
      },
      {
        "foyId": 3,
        "kod": "GEO-06",
        "ders": "ÜÇGENDE ALAN",
        "seans": 2
      },
      {
        "foyId": 3,
        "kod": "GEO-07",
        "ders": "ÜÇGENDE AÇIORTAY",
        "seans": 1
      },
      {
        "foyId": 3,
        "kod": "GEO-08",
        "ders": "ÜÇGENDE KENAR ORTAY",
        "seans": 1
      },
      {
        "foyId": 3,
        "kod": "GEO-09",
        "ders": "AÇI- KENAR BAĞINTILARI",
        "seans": 1
      },
      {
        "foyId": 3,
        "kod": "GEO-10",
        "ders": "ÜÇGENDE BENZERLİK",
        "seans": 2
      },
      {
        "foyId": 3,
        "kod": "GEO-11",
        "ders": "ÇOKGENLER",
        "seans": 1
      },
      {
        "foyId": 3,
        "kod": "GEO-12",
        "ders": "DÖRTGENLER",
        "seans": 1
      },
      {
        "foyId": 3,
        "kod": "GEO-13",
        "ders": "YAMUK",
        "seans": 3
      },
      {
        "foyId": 3,
        "kod": "GEO-14",
        "ders": "PARALELKENAR",
        "seans": 2
      },
      {
        "foyId": 3,
        "kod": "GEO-15",
        "ders": "DİKDÖRTGEN",
        "seans": 2
      },
      {
        "foyId": 3,
        "kod": "GEO-16",
        "ders": "EŞKENAR DÖRTGEN",
        "seans": 1
      },
      {
        "foyId": 3,
        "kod": "GEO-17",
        "ders": "KARE",
        "seans": 2
      },
      {
        "foyId": 3,
        "kod": "GEO-18",
        "ders": "ÇEMBERDE AÇI",
        "seans": 2
      },
      {
        "foyId": 3,
        "kod": "GEO-19",
        "ders": "ÇEMBERDE UZUNLUK",
        "seans": 2
      },
      {
        "foyId": 3,
        "kod": "GEO-20",
        "ders": "DAİREDE ALAN",
        "seans": 2
      },
      {
        "foyId": 3,
        "kod": "GEO-21",
        "ders": "DİK PRİZMALAR",
        "seans": 1
      },
      {
        "foyId": 3,
        "kod": "GEO-22",
        "ders": "DİK PRİZMALAR VE DİK PİRAMİTLER",
        "seans": 1
      },
      {
        "foyId": 3,
        "kod": "GEO-23",
        "ders": "DİK DAİRESEL SİLİNDİR",
        "seans": 1
      },
      {
        "foyId": 3,
        "kod": "GEO-24",
        "ders": "DİK DAİRESEL KONİ VE KÜRE",
        "seans": 1
      },
      {
        "foyId": 3,
        "kod": "GEO-25",
        "ders": "NOKTANIN ANALİTİK İNCELEMESİ",
        "seans": 1
      },
      {
        "foyId": 3,
        "kod": "GEO-26",
        "ders": "DOĞRUNUN ANALİTİK İNCELEMESİ",
        "seans": 3
      },
      {
        "foyId": 3,
        "kod": "GEO-27",
        "ders": "TRİGONOMETRİ",
        "seans": 6
      },
      {
        "foyId": 4,
        "kod": "GEO-28",
        "ders": "TRİGONOMETRİ 2",
        "seans": 6
      },
      {
        "foyId": 4,
        "kod": "GEO-29",
        "ders": "DÖNÜŞÜMLER",
        "seans": 3
      },
      {
        "foyId": 4,
        "kod": "GEO-30",
        "ders": "ÇEMBERİN ANALİTİK İNCELENMESİ",
        "seans": 2
      },
      {
        "foyId": 4,
        "kod": "GEO-31",
        "ders": "GENEL TEKRAR",
        "seans": 1
      },
      {
        "foyId": 5,
        "kod": "FİZ-01",
        "ders": "FİZİK BİLİMİNE GİRİŞ",
        "seans": 2
      },
      {
        "foyId": 5,
        "kod": "FİZ-02",
        "ders": "MADDE VE ÖZELLİKLERİ",
        "seans": 2
      },
      {
        "foyId": 5,
        "kod": "FİZ-03",
        "ders": "KUVVET VE HAREKET",
        "seans": 2
      },
      {
        "foyId": 5,
        "kod": "FİZ-04",
        "ders": "ENERJİ",
        "seans": 2
      },
      {
        "foyId": 5,
        "kod": "FİZ-05",
        "ders": "ISI - SICAKLIK",
        "seans": 2
      },
      {
        "foyId": 5,
        "kod": "FİZ-06",
        "ders": "ELEKTROSTATİK",
        "seans": 2
      },
      {
        "foyId": 5,
        "kod": "FİZ-07",
        "ders": "ELEKTRİK VE MANYETİZMA",
        "seans": 4
      },
      {
        "foyId": 5,
        "kod": "FİZ-08",
        "ders": "BASINÇ",
        "seans": 2
      },
      {
        "foyId": 5,
        "kod": "FİZ-09",
        "ders": "KALDIRMA KUVVETİ",
        "seans": 2
      },
      {
        "foyId": 5,
        "kod": "FİZ-10",
        "ders": "DALGALAR",
        "seans": 1
      },
      {
        "foyId": 5,
        "kod": "FİZ-11",
        "ders": "YAY DALGALARI",
        "seans": 1
      },
      {
        "foyId": 5,
        "kod": "FİZ-12",
        "ders": "SU DALGALARI",
        "seans": 1
      },
      {
        "foyId": 5,
        "kod": "FİZ-13",
        "ders": "SES VE DEPREM DALGALASI",
        "seans": 1
      },
      {
        "foyId": 5,
        "kod": "FİZ-14",
        "ders": "AYDINLANMA VE GÖLGE OLAYLARI",
        "seans": 1
      },
      {
        "foyId": 5,
        "kod": "FİZ-15",
        "ders": "DÜZLEM AYNA",
        "seans": 1
      },
      {
        "foyId": 5,
        "kod": "FİZ-16",
        "ders": "KÜRESEL AYNALAR",
        "seans": 1
      },
      {
        "foyId": 5,
        "kod": "FİZ-17",
        "ders": "KIRILMA",
        "seans": 2
      },
      {
        "foyId": 5,
        "kod": "FİZ-18",
        "ders": "MERCEKLER",
        "seans": 1
      },
      {
        "foyId": 5,
        "kod": "FİZ-19",
        "ders": "PRİZMALAR VE RENKLER",
        "seans": 1
      },
      {
        "foyId": 6,
        "kod": "FİZ-20",
        "ders": "VEKTÖRLER",
        "seans": 2
      },
      {
        "foyId": 6,
        "kod": "FİZ-21",
        "ders": "BAĞIL HAREKET",
        "seans": 2
      },
      {
        "foyId": 6,
        "kod": "FİZ-22",
        "ders": "NEWTON HAREKET YASALARI",
        "seans": 2
      },
      {
        "foyId": 6,
        "kod": "FİZ-23",
        "ders": "BİR BOYUTTA SABİT İVMELİ HAREKET",
        "seans": 1
      },
      {
        "foyId": 6,
        "kod": "FİZ-24",
        "ders": "İKİ BOYUTTA HAREKET",
        "seans": 2
      },
      {
        "foyId": 6,
        "kod": "FİZ-25",
        "ders": "ENERJİ VE HAREKET",
        "seans": 2
      },
      {
        "foyId": 6,
        "kod": "FİZ-26",
        "ders": "İTME VE ÇİZGİSEL MOMENTUM",
        "seans": 2
      },
      {
        "foyId": 6,
        "kod": "FİZ-27",
        "ders": "TORK",
        "seans": 1
      },
      {
        "foyId": 6,
        "kod": "FİZ-28",
        "ders": "DENGE VE DENGE ŞARTLARI",
        "seans": 1
      },
      {
        "foyId": 6,
        "kod": "FİZ-29",
        "ders": "KÜTLE VE AĞIRLIK MERKEZİ",
        "seans": 1
      },
      {
        "foyId": 6,
        "kod": "FİZ-30",
        "ders": "BASİT MAKİNELER",
        "seans": 2
      },
      {
        "foyId": 6,
        "kod": "FİZ-31",
        "ders": "ELEKTRİKSEL KUVVET VE ELEKTRİK ALANI",
        "seans": 1
      },
      {
        "foyId": 6,
        "kod": "FİZ-32",
        "ders": "ELEKTRİKSEL POTANSİYEL",
        "seans": 1
      },
      {
        "foyId": 6,
        "kod": "FİZ-33",
        "ders": "MANYETİZMA",
        "seans": 1
      },
      {
        "foyId": 6,
        "kod": "FİZ-34",
        "ders": "MANTEYİK KUVVET",
        "seans": 1
      },
      {
        "foyId": 6,
        "kod": "FİZ-35",
        "ders": "ELEKTROMANYETİK İNDÜKLENME",
        "seans": 1
      },
      {
        "foyId": 6,
        "kod": "FİZ-36",
        "ders": "ALTERNATİF AKIM",
        "seans": 1
      },
      {
        "foyId": 6,
        "kod": "FİZ-37",
        "ders": "TRANSFORMATÖRLER",
        "seans": 1
      },
      {
        "foyId": 7,
        "kod": "FİZ-38",
        "ders": "ÇEMBERSEL HAREKET",
        "seans": 2
      },
      {
        "foyId": 7,
        "kod": "FİZ-39",
        "ders": "DÖNEREK ÖTELEME HAREKETİ",
        "seans": 1
      },
      {
        "foyId": 7,
        "kod": "FİZ-40",
        "ders": "AÇISAL MOMENTUM",
        "seans": 1
      },
      {
        "foyId": 7,
        "kod": "FİZ-41",
        "ders": "KÜTLE ÇEKİM KUVVETİ",
        "seans": 1
      },
      {
        "foyId": 7,
        "kod": "FİZ-42",
        "ders": "KELPLER YASALARI",
        "seans": 1
      },
      {
        "foyId": 7,
        "kod": "FİZ-43",
        "ders": "BASİT HARMONİK HAREKET",
        "seans": 2
      },
      {
        "foyId": 7,
        "kod": "FİZ-44",
        "ders": "DALGA MEKANİĞİ",
        "seans": 2
      },
      {
        "foyId": 7,
        "kod": "FİZ-45",
        "ders": "ELEKTROMANYETİK DALGALAR",
        "seans": 1
      },
      {
        "foyId": 7,
        "kod": "FİZ-46",
        "ders": "ATOM FİZİĞİNE GİRİŞ",
        "seans": 3
      },
      {
        "foyId": 7,
        "kod": "FİZ-47",
        "ders": "BÜYÜK PATLAMA VE EVRENİN OLUŞUMU",
        "seans": 1
      },
      {
        "foyId": 7,
        "kod": "FİZ-48",
        "ders": "RADYOAKTİVE",
        "seans": 1
      },
      {
        "foyId": 7,
        "kod": "FİZ-49",
        "ders": "ÖZEL GÖRELİK",
        "seans": 1
      },
      {
        "foyId": 7,
        "kod": "FİZ-50",
        "ders": "KUANTUM FİZİĞİNE GİRİŞ",
        "seans": 1
      },
      {
        "foyId": 7,
        "kod": "FİZ-51",
        "ders": "FOTOELEKTRİK OLAY",
        "seans": 2
      },
      {
        "foyId": 7,
        "kod": "FİZ-52",
        "ders": "COMPTON OLAYI DE BROGKLE DALGA BOYU",
        "seans": 2
      },
      {
        "foyId": 7,
        "kod": "FİZ-53",
        "ders": "MODERN FİZİĞİN TEKNOLOJİDEKİ UYGULAMALARI",
        "seans": 2
      },
      {
        "foyId": 7,
        "kod": "FİZ-54",
        "ders": "DENEME",
        "seans": 1
      },
      {
        "foyId": 8,
        "kod": "KİM-01",
        "ders": "KİMYA BİLİMİ",
        "seans": 3
      },
      {
        "foyId": 8,
        "kod": "KİM-02",
        "ders": "ATOM VE PERİYODİK SİSTEM",
        "seans": 5
      },
      {
        "foyId": 8,
        "kod": "KİM-03",
        "ders": "KİMYASAL TÜRLER ARASI ETKİLEŞİMLER",
        "seans": 6
      },
      {
        "foyId": 8,
        "kod": "KİM-04",
        "ders": "MADDENİN HALLERİ",
        "seans": 3
      },
      {
        "foyId": 8,
        "kod": "KİM-05",
        "ders": "DOĞA VE KİMYA",
        "seans": 1
      },
      {
        "foyId": 8,
        "kod": "KİM-06",
        "ders": "KİMYANIN TEMEL KANUNLARI VE KİMYASAL HESAPLAMALAR",
        "seans": 6
      },
      {
        "foyId": 8,
        "kod": "KİM-07",
        "ders": "KARIŞIMLAR",
        "seans": 4
      },
      {
        "foyId": 8,
        "kod": "KİM-08",
        "ders": "ASİT BAZLAR TUZLAR",
        "seans": 4
      },
      {
        "foyId": 8,
        "kod": "KİM-09",
        "ders": "KİMYA HER YERDE",
        "seans": 3
      },
      {
        "foyId": 9,
        "kod": "KİM-10",
        "ders": "MODERN ATOM TEORİSİ",
        "seans": 6
      },
      {
        "foyId": 9,
        "kod": "KİM-11",
        "ders": "GAZLAR",
        "seans": 4
      },
      {
        "foyId": 9,
        "kod": "KİM-12",
        "ders": "SIVI ÇÖZELTİLER VE ÇÖZÜNÜRLÜK",
        "seans": 4
      },
      {
        "foyId": 9,
        "kod": "KİM-13",
        "ders": "KİMYASAL TEPKİMELERDE ENERJİ",
        "seans": 2
      },
      {
        "foyId": 9,
        "kod": "KİM-14",
        "ders": "KİMYASAL TEPKİMELERDE HIZ",
        "seans": 3
      },
      {
        "foyId": 9,
        "kod": "KİM-15",
        "ders": "KİMYASAL TEPKİMELERDE DENGE",
        "seans": 8
      },
      {
        "foyId": 10,
        "kod": "KİM-16",
        "ders": "KİMYA VE ELEKTRİK",
        "seans": 6
      },
      {
        "foyId": 10,
        "kod": "KİM-17",
        "ders": "KARBON KİMYASINA GİRİŞ ",
        "seans": 2
      },
      {
        "foyId": 10,
        "kod": "KİM-18",
        "ders": "ORGANİK BİLEŞİKLER",
        "seans": 10
      },
      {
        "foyId": 10,
        "kod": "KİM-19",
        "ders": "ENERJİ KAYNAKLARI VE BİLİMSEL GELİŞMELER",
        "seans": 1
      },
      {
        "foyId": 11,
        "kod": "BİY-01",
        "ders": "YAŞAM BİLİMİ BİYOLOJİ",
        "seans": 4
      },
      {
        "foyId": 11,
        "kod": "BİY-02",
        "ders": "HÜCRE",
        "seans": 4
      },
      {
        "foyId": 11,
        "kod": "BİY-03",
        "ders": "CANLILAR DÜNYASI",
        "seans": 5
      },
      {
        "foyId": 11,
        "kod": "BİY-04",
        "ders": "HÜCRE BÖLÜNMELERİ",
        "seans": 4
      },
      {
        "foyId": 11,
        "kod": "BİY-05",
        "ders": "KALITIM GENEL İLKELERİ",
        "seans": 5
      },
      {
        "foyId": 11,
        "kod": "BİY-06",
        "ders": "EKOSİSTEM EKOLOJİ VE GÜNCEK ÇEVRE SORUNLARI",
        "seans": 5
      },
      {
        "foyId": 12,
        "kod": "BİY-07",
        "ders": "SİNİR SİSTEMİ",
        "seans": 3
      },
      {
        "foyId": 12,
        "kod": "BİY-08",
        "ders": "ENDOKRİN SİSTEMİ",
        "seans": 2
      },
      {
        "foyId": 12,
        "kod": "BİY-09",
        "ders": "DUYU ORGANLARI",
        "seans": 2
      },
      {
        "foyId": 12,
        "kod": "BİY-10",
        "ders": "DESTEK VE HAREKET SİSTEMİ",
        "seans": 3
      },
      {
        "foyId": 12,
        "kod": "BİY-11",
        "ders": "SİNDİRİM SİSTEMİ",
        "seans": 3
      },
      {
        "foyId": 12,
        "kod": "BİY-12",
        "ders": "DOLAŞIM SİSTEMİ",
        "seans": 4
      },
      {
        "foyId": 12,
        "kod": "BİY-13",
        "ders": "SOLUNUM SİSTEMİ",
        "seans": 2
      },
      {
        "foyId": 12,
        "kod": "BİY-14",
        "ders": "ÜRİNER SİSTEMİ",
        "seans": 2
      },
      {
        "foyId": 12,
        "kod": "BİY-15",
        "ders": "ÜREME SİSTEMİ",
        "seans": 2
      },
      {
        "foyId": 12,
        "kod": "BİY-16",
        "ders": "KOMÜNİTE VE POPÜLASYON EKOLOJİSİ",
        "seans": 4
      },
      {
        "foyId": 13,
        "kod": "BİY-17",
        "ders": "GENDEN PROTEİNE ",
        "seans": 3
      },
      {
        "foyId": 13,
        "kod": "BİY-18",
        "ders": "CANLILARDA ENERJİ DÖNÜŞÜMLERİ",
        "seans": 5
      },
      {
        "foyId": 13,
        "kod": "BİY-19",
        "ders": "BİTKİ BİYOLOJİSİ",
        "seans": 2
      },
      {
        "foyId": 13,
        "kod": "BİY-20",
        "ders": "BİTKİLERİN BİYOLOJİK YAPISI",
        "seans": 8
      },
      {
        "foyId": 13,
        "kod": "BİY-21",
        "ders": "CANLILAR VE ÇEVRE",
        "seans": 1
      },
      {
        "foyId": 14,
        "kod": "TÜR-01",
        "ders": "SÖZCÜK ANLAMI",
        "seans": 2
      },
      {
        "foyId": 14,
        "kod": "TÜR-02",
        "ders": "DEYİMLER VE ATASÖZLERİ",
        "seans": 1
      },
      {
        "foyId": 14,
        "kod": "TÜR-03",
        "ders": "CÜMLE ANLAMI VE YORUMU",
        "seans": 3
      },
      {
        "foyId": 14,
        "kod": "TÜR-04",
        "ders": "PARAGRAF YAPISI",
        "seans": 2
      },
      {
        "foyId": 14,
        "kod": "TÜR-05",
        "ders": "PARAGRAFTA KONU ANA DÜŞÜNCE",
        "seans": 1
      },
      {
        "foyId": 14,
        "kod": "TÜR-06",
        "ders": "PARAGRAFTA YARDIMCI DÜŞÜNCELER",
        "seans": 1
      },
      {
        "foyId": 14,
        "kod": "TÜR-07",
        "ders": "PRAGRAF ANLATIM TEKNİKLERİ",
        "seans": 1
      },
      {
        "foyId": 14,
        "kod": "TÜR-08",
        "ders": "PARAGRAF DÜŞÜNCEYİ GELİŞTİRME YOLLARI",
        "seans": 1
      },
      {
        "foyId": 14,
        "kod": "TÜR-09",
        "ders": "İSİMLER",
        "seans": 3
      },
      {
        "foyId": 14,
        "kod": "TÜR-10",
        "ders": "SIFATLAR",
        "seans": 2
      },
      {
        "foyId": 14,
        "kod": "TÜR-11",
        "ders": "ZAMİRLER",
        "seans": 2
      },
      {
        "foyId": 14,
        "kod": "TÜR-12",
        "ders": "ZARFLAR",
        "seans": 2
      },
      {
        "foyId": 14,
        "kod": "TÜR-13",
        "ders": "EDATLAR",
        "seans": 1
      },
      {
        "foyId": 14,
        "kod": "TÜR-14",
        "ders": "BAĞLAÇ VE ÜNLEMLER",
        "seans": 1
      },
      {
        "foyId": 14,
        "kod": "TÜR-15",
        "ders": "FİİLLER",
        "seans": 3
      },
      {
        "foyId": 14,
        "kod": "TÜR-16",
        "ders": "EYLEMSİLER",
        "seans": 2
      },
      {
        "foyId": 14,
        "kod": "TÜR-17",
        "ders": "ŞEKİL BİLGİSİ",
        "seans": 4
      },
      {
        "foyId": 14,
        "kod": "TÜR-18",
        "ders": "CÜMLENİN ÖĞELERİ",
        "seans": 4
      },
      {
        "foyId": 14,
        "kod": "TÜR-19",
        "ders": "FİİLERDE ÇATI",
        "seans": 3
      },
      {
        "foyId": 14,
        "kod": "TÜR-20",
        "ders": "CÜMLE ÇEŞİTLERİ",
        "seans": 4
      },
      {
        "foyId": 14,
        "kod": "TÜR-21",
        "ders": "ANLATIM BOZUKLUKLARI",
        "seans": 4
      },
      {
        "foyId": 14,
        "kod": "TÜR-22",
        "ders": "DİLLERİN SINIFLANDIRILMASI",
        "seans": 1
      },
      {
        "foyId": 14,
        "kod": "TÜR-23",
        "ders": "SES OLAYLARI",
        "seans": 2
      },
      {
        "foyId": 14,
        "kod": "TÜR-24",
        "ders": "YAZIM KURALLARI",
        "seans": 5
      },
      {
        "foyId": 14,
        "kod": "TÜR-25",
        "ders": "NOKTALAMA İŞARETLERİ",
        "seans": 3
      },
      {
        "foyId": 15,
        "kod": "EDE-01",
        "ders": "GİRİŞ",
        "seans": 3
      },
      {
        "foyId": 15,
        "kod": "EDE-02",
        "ders": "HİKAYE",
        "seans": 3
      },
      {
        "foyId": 15,
        "kod": "EDE-03",
        "ders": "ŞİİR",
        "seans": 16
      },
      {
        "foyId": 15,
        "kod": "EDE-04",
        "ders": "MASAL/FABL",
        "seans": 1
      },
      {
        "foyId": 15,
        "kod": "EDE-05",
        "ders": "DESTAN EFSANE",
        "seans": 1
      },
      {
        "foyId": 15,
        "kod": "EDE-06",
        "ders": "ROMAN",
        "seans": 7
      },
      {
        "foyId": 15,
        "kod": "EDE-07",
        "ders": "TİYATRO",
        "seans": 3
      },
      {
        "foyId": 15,
        "kod": "EDE-08",
        "ders": "NESİR",
        "seans": 4
      },
      {
        "foyId": 16,
        "kod": "EDE-09",
        "ders": "GİRİŞ",
        "seans": 1
      },
      {
        "foyId": 16,
        "kod": "EDE-10",
        "ders": "HİKAYE",
        "seans": 2
      },
      {
        "foyId": 16,
        "kod": "EDE-11",
        "ders": "ŞİİR",
        "seans": 6
      },
      {
        "foyId": 16,
        "kod": "EDE-12",
        "ders": "ROMAN",
        "seans": 6
      },
      {
        "foyId": 16,
        "kod": "EDE-13",
        "ders": "TİYATRO",
        "seans": 1
      },
      {
        "foyId": 16,
        "kod": "EDE-14",
        "ders": "GENEL TEKRAR",
        "seans": 1
      },
      {
        "foyId": 16,
        "kod": "EDE-15",
        "ders": "ÖĞRETİCİ METİNLER",
        "seans": 1
      },
      {
        "foyId": 16,
        "kod": "EDE-16",
        "ders": "SÖZLÜ ANLATIM TÜRLERİ",
        "seans": 1
      },
      {
        "foyId": 17,
        "kod": "TAR-01",
        "ders": "TARİH VE ZAMAN",
        "seans": 1
      },
      {
        "foyId": 17,
        "kod": "TAR-02",
        "ders": "İNSANLIĞIN İLK DÖNEMLERİ",
        "seans": 3
      },
      {
        "foyId": 17,
        "kod": "TAR-03",
        "ders": "ORTA ÇAĞDA DÜNYA",
        "seans": 2
      },
      {
        "foyId": 17,
        "kod": "TAR-04",
        "ders": "İLK VE ORTA ÇAĞLARDA TÜRK DÜNYASI",
        "seans": 3
      },
      {
        "foyId": 17,
        "kod": "TAR-05",
        "ders": "İSLAM MEDENİYETİNİN DOĞUŞU",
        "seans": 2
      },
      {
        "foyId": 17,
        "kod": "TAR-06",
        "ders": "TÜRKLERİN İSLAMİYETİ KABULÜ VE TÜRK İSLAM DEVLETLERİ",
        "seans": 2
      },
      {
        "foyId": 17,
        "kod": "TAR-07",
        "ders": "YERLEŞME VE DEVLETLEŞME SÜRECİNDE TÜRKİYE SELÇUKLUSU",
        "seans": 1
      },
      {
        "foyId": 17,
        "kod": "TAR-08",
        "ders": "BEYLİKTEN DEVLETE OSMANLI SİYASETİ",
        "seans": 2
      },
      {
        "foyId": 17,
        "kod": "TAR-09",
        "ders": "DEVLETLEŞME SÜRECİNDE SAVAŞÇILAR VE ASKERLER",
        "seans": 1
      },
      {
        "foyId": 17,
        "kod": "TAR-10",
        "ders": "BEYLİKTEN DEVLETE OSMANLI MEDENİYETİ",
        "seans": 1
      },
      {
        "foyId": 17,
        "kod": "TAR-11",
        "ders": "DÜNYA GÜCÜ OSMANLI",
        "seans": 1
      },
      {
        "foyId": 17,
        "kod": "TAR-12",
        "ders": "DÜNYA GÜCÜ OSMANLI DEVLETİ",
        "seans": 2
      },
      {
        "foyId": 17,
        "kod": "TAR-13",
        "ders": "SULTAN VE OSMANLI MERKEZ TEŞKİLATI",
        "seans": 1
      },
      {
        "foyId": 17,
        "kod": "TAR-14",
        "ders": "KLASİK ÇAĞDA OSMANLI TOPLUM DÜZENİ",
        "seans": 1
      },
      {
        "foyId": 17,
        "kod": "TAR-15",
        "ders": "DEĞİŞEN DÜNYA DENGELERİ KARŞISINDA OSMANLI SİYASETİ",
        "seans": 3
      },
      {
        "foyId": 17,
        "kod": "TAR-16",
        "ders": "DEĞİŞİM ÇAĞINDA AVRUPA VE OSMANLI",
        "seans": 3
      },
      {
        "foyId": 17,
        "kod": "TAR-17",
        "ders": "ULUSLARARASI İLİŞKİLERDE DENGE STRATEJİSİ",
        "seans": 3
      },
      {
        "foyId": 17,
        "kod": "TAR-18",
        "ders": "DEVRİMLER ÇAĞINDA DEĞİŞEN DEVLET TOPLUM İLİŞKİSİ",
        "seans": 5
      },
      {
        "foyId": 17,
        "kod": "TAR-19",
        "ders": "SERMAYE VE EMEK",
        "seans": 1
      },
      {
        "foyId": 17,
        "kod": "TAR-20",
        "ders": "19. VE 20 YÜZYILDA DEĞİŞEN GÜNDELİK HAYAT",
        "seans": 1
      },
      {
        "foyId": 18,
        "kod": "TAR-21",
        "ders": "20.YÜZYIL BAŞLARINDA OSMANLI DEVLETİ VE DÜNYA",
        "seans": 4
      },
      {
        "foyId": 18,
        "kod": "TAR-22",
        "ders": "MİLLİ MÜCADELE",
        "seans": 8
      },
      {
        "foyId": 18,
        "kod": "TAR-23",
        "ders": "ATATÜRKÇÜLÜK VE TÜRK İNKILABI",
        "seans": 3
      },
      {
        "foyId": 18,
        "kod": "TAR-24",
        "ders": "İKİ SAVAŞ ARASINDAKİ DÖNEMDE TÜRKİYE VE DÜNYA",
        "seans": 3
      },
      {
        "foyId": 18,
        "kod": "TAR-25",
        "ders": "2.DÜNYA SAVAŞI SÜRECİNDE TÜRKİYE VE DÜNYA",
        "seans": 2
      },
      {
        "foyId": 18,
        "kod": "TAR-26",
        "ders": "2.DÜNYA SAVAŞI SONRASINDA TÜRKİYE VE DÜNYA",
        "seans": 1
      },
      {
        "foyId": 18,
        "kod": "TAR-27",
        "ders": "TOPLUMSAL DEVRİM ÇAĞINDA TÜRKİYE VE DÜNYA",
        "seans": 3
      },
      {
        "foyId": 18,
        "kod": "TAR-28",
        "ders": "21.YÜZYIL EŞİĞİNDE TÜRKİYE VE DÜNYA",
        "seans": 3
      },
      {
        "foyId": 18,
        "kod": "TAR-29",
        "ders": "İKİ KÜRESEL SAVAŞ SIRASINDA DÜNYA",
        "seans": 3
      },
      {
        "foyId": 18,
        "kod": "TAR-30",
        "ders": "İKİNCİ DÜNYA SAVAŞI",
        "seans": 2
      },
      {
        "foyId": 18,
        "kod": "TAR-31",
        "ders": "SOĞUK SAVAŞ DÖNEMİ",
        "seans": 3
      },
      {
        "foyId": 18,
        "kod": "TAR-32",
        "ders": "YUMUŞAMA DÖNEMİ VE SONRASI",
        "seans": 3
      },
      {
        "foyId": 18,
        "kod": "TAR-33",
        "ders": "KÜRESELLEŞEN DÜNYA",
        "seans": 5
      },
      {
        "foyId": 19,
        "kod": "COĞ-01",
        "ders": "HARİTA BİLGİSİ",
        "seans": 2
      },
      {
        "foyId": 19,
        "kod": "COĞ-02",
        "ders": "İNSAN-DOĞA ETKİLEŞİMİ COĞRAFYA",
        "seans": 2
      },
      {
        "foyId": 19,
        "kod": "COĞ-03",
        "ders": "DÜNYA'NIN ŞEKLİ VE SONUÇLARI",
        "seans": 1
      },
      {
        "foyId": 19,
        "kod": "COĞ-04",
        "ders": "DÜNYA'NIN HAREKETLERİ",
        "seans": 3
      },
      {
        "foyId": 19,
        "kod": "COĞ-05",
        "ders": "COĞRAFİ KONUM ",
        "seans": 2
      },
      {
        "foyId": 19,
        "kod": "COĞ-06",
        "ders": "HARİTA BİLGİSİ",
        "seans": 2
      },
      {
        "foyId": 19,
        "kod": "COĞ-07",
        "ders": "YER ŞEKİLLERİNİN GÖSTERİLME YÖNTEMLERİ",
        "seans": 2
      },
      {
        "foyId": 19,
        "kod": "COĞ-08",
        "ders": "İKLİM BİLGİSİ (SICAKLIK)",
        "seans": 3
      },
      {
        "foyId": 19,
        "kod": "COĞ-09",
        "ders": "BASINÇ VE RÜZGARLAR",
        "seans": 3
      },
      {
        "foyId": 19,
        "kod": "COĞ-10",
        "ders": "NEM VE YAĞIŞLAR",
        "seans": 1
      },
      {
        "foyId": 19,
        "kod": "COĞ-11",
        "ders": "İKLİM TİPLERİ VE BİTKİ ÖRTÜSÜ",
        "seans": 3
      },
      {
        "foyId": 19,
        "kod": "COĞ-12",
        "ders": "TÜRKİYE'NİN İKLİM VE BİTKİ ÖRTÜSÜ",
        "seans": 2
      },
      {
        "foyId": 19,
        "kod": "COĞ-13",
        "ders": "İÇ KUVVETLER",
        "seans": 2
      },
      {
        "foyId": 19,
        "kod": "COĞ-14",
        "ders": "DIŞ KUVVETLER",
        "seans": 5
      },
      {
        "foyId": 19,
        "kod": "COĞ-15",
        "ders": "TÜRKİYE'NİN YER ŞEKİLLERİ",
        "seans": 2
      },
      {
        "foyId": 19,
        "kod": "COĞ-16",
        "ders": "SU KAYNAKLARI VE TÜRKİYE'NİN SU VARLIĞI",
        "seans": 2
      },
      {
        "foyId": 19,
        "kod": "COĞ-17",
        "ders": "DOĞAL AFETLER VE TÜRKİYE İÇİN RİSKLERİ",
        "seans": 2
      },
      {
        "foyId": 19,
        "kod": "COĞ-18",
        "ders": "İNSAN VE ÇEVRE",
        "seans": 1
      },
      {
        "foyId": 19,
        "kod": "COĞ-19",
        "ders": "NUFÜS",
        "seans": 1
      },
      {
        "foyId": 19,
        "kod": "COĞ-20",
        "ders": "TÜRKİYE'DE NUFÜS",
        "seans": 1
      },
      {
        "foyId": 19,
        "kod": "COĞ-21",
        "ders": "GÖÇ",
        "seans": 1
      },
      {
        "foyId": 19,
        "kod": "COĞ-22",
        "ders": "TÜRKİYE'DE GÖÇ",
        "seans": 1
      },
      {
        "foyId": 19,
        "kod": "COĞ-23",
        "ders": "YERLEŞME VE TÜRKİYE'DE YERLEŞME",
        "seans": 1
      },
      {
        "foyId": 19,
        "kod": "COĞ-24",
        "ders": "EKONOMİK FAALİYETLERİN SINIFLANDIRILMASI",
        "seans": 1
      },
      {
        "foyId": 19,
        "kod": "COĞ-25",
        "ders": "DÜNYAYI BİRBİRİNE BAĞLAYAN AĞLAR",
        "seans": 1
      },
      {
        "foyId": 19,
        "kod": "COĞ-26",
        "ders": "KÜRESEL ORTAM BÖLGELER VE ÜLKELER",
        "seans": 2
      },
      {
        "foyId": 20,
        "kod": "COĞ-27",
        "ders": "EKOSİSTEMİN ÖZELLİKLERİ VE İŞLEYİŞİ",
        "seans": 4
      },
      {
        "foyId": 20,
        "kod": "COĞ-28",
        "ders": "NUFÜS POLİTİKALARI",
        "seans": 1
      },
      {
        "foyId": 20,
        "kod": "COĞ-29",
        "ders": "YERLEŞMENİN ÖZELLİKLERİ",
        "seans": 2
      },
      {
        "foyId": 20,
        "kod": "COĞ-30",
        "ders": "EKONOMİK FAALİYETLER VE DOĞAL KAYNAKLAR",
        "seans": 2
      },
      {
        "foyId": 20,
        "kod": "COĞ-31",
        "ders": "TÜRKİYE'DE EKONOMİ",
        "seans": 9
      },
      {
        "foyId": 20,
        "kod": "COĞ-32",
        "ders": "KÜLTÜR BÖLGELERİ",
        "seans": 2
      },
      {
        "foyId": 20,
        "kod": "COĞ-33",
        "ders": "KÜRESELLEŞEN DÜNYA",
        "seans": 6
      },
      {
        "foyId": 20,
        "kod": "COĞ-34",
        "ders": "ÇEVRE VE TOPLUM",
        "seans": 4
      },
      {
        "foyId": 20,
        "kod": "COĞ-35",
        "ders": "EKSTREM DOĞA OLAYLARI",
        "seans": 1
      },
      {
        "foyId": 20,
        "kod": "COĞ-36",
        "ders": "KÜRESEL İKLİM DEĞİŞİMİ",
        "seans": 1
      },
      {
        "foyId": 20,
        "kod": "COĞ-37",
        "ders": "GEÇMİŞTEN GELECEĞE ŞEHİR VE EKONOMİ",
        "seans": 1
      },
      {
        "foyId": 20,
        "kod": "COĞ-38",
        "ders": "TÜRKİYE 'NİN İŞLEVSEL BÖLGELERİ VE KALKINMA PROJELERİ",
        "seans": 1
      },
      {
        "foyId": 20,
        "kod": "COĞ-39",
        "ders": "HİZMET SEKTÖRÜNÜN EKONOMİDEKİ YERİ",
        "seans": 2
      },
      {
        "foyId": 20,
        "kod": "COĞ-40",
        "ders": "KÜRESEL TİCARET",
        "seans": 2
      },
      {
        "foyId": 20,
        "kod": "COĞ-41",
        "ders": "TÜRKİYE TURİZMİ",
        "seans": 1
      },
      {
        "foyId": 20,
        "kod": "COĞ-42",
        "ders": "KÜRESEL ORTAM BÖLGELER VE ÜLKELER",
        "seans": 3
      },
      {
        "foyId": 20,
        "kod": "COĞ-43",
        "ders": "ÇEVRE VE TOPLUM",
        "seans": 1
      }
  ]
}