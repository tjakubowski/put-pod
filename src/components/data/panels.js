export const nihilistSubstitutionPanels = [
  {
    header: 'Klucz jawny',
    content: ['Tekst jawny jest wymagany i powinien zawierać znaki, które zawiera alfabet. Jeśli wystepują w nim znaki, których nie zawiera alfabet, są one pomijane.'],
  },
  {
    header: 'Alfabet',
    content: ['Aflabet jest wymagany. Musi on zawierać unikatowe znaki, które składają się na macierz N x N. Dla każego znaku przypisywana jest jego pozycja w macierzy.'],
  },
  {
    header: 'Klucz',
    content: ['Klucz jest wymagany. Musi składać się ze znaków występujących w alfabecie. Do każdego znaku klucza przypisywana jest pozycja z alfabetu.'],
  },
  {
    header: 'Szyfrowanie',
    content: [
      'Każdy znak tekstu jawnego jest przepisywany do tabeli, która zawiera tyle samo kolumn ile znaków zawiera klucz. Każdy przepisany znak z tekstu jawnego otrzymuje wartość wyliczana na podstawie sumy pozycji znaku w alfabecie i pozycji znaku klucza w danej kolumnie.',
      'Jeżeli wartość jest większa od 100, od wartości jest odejmowana liczba 100.',
      'Dla macierzy większych niż 5x5 zastosowano kodowanie 3 cyfrowe, co jest rozszerzeniem metody szyfrowania Nihilistów.',
    ],
  },
];

export const shrinkingGeneratorPanels = [
  {
    header: 'LFSR',
    content: [
      'LFSR (Linear Feedback Shift Register) - rejestr przesuwający, którego bit wejściowy jest funkcją liniową jego poprzedniego stanu.',
      'Do zapisu funkcji bitu wejściowego używamy wielomian, którego najwyższy stopień równy jest N-1, gdzie N to długość rejestru.',
    ],
  },
  {
    header: 'Generator obcinający',
    content: [
      'Generator ten składa się z dwóch rejestrów LFSR. Wyjście rejestru LFSR-A jest nazywane wyjściem danych, a wyjście rejestru LFSR-S warunkuje czy wyjście LFSR-A zostanie zapisane do wyniku działania generatora.',
      'Jeżeli wyjście rejestru LFSR-S jest równe 1, do wyjścia generatora jest zapisywany bit wyjściowy rejestru LFSR-A. W przeciwnym wypadku, wartości wyjściowe obu rejestrów są pomijane i generator jest taktowany ponownie.',
    ],
  },
];

export const streamCipherPanels = [
  {
    header: 'Szyfr strumieniowy',
    content: [
      'Algorytm symetryczny szyfrujący oddzielnie każdy bit wiadomości.',
      'Składa się z generatora strumienia bitowego oraz operacji, która wykonywana jest na wygenerowanych bitach i bitach wiadomości.',
    ],
  },
];

export const fipsTestsPanels = [
  {
    header: 'Test pojedynczych bitów',
    content: [
      'Test pojedynczych bitów jest zaliczony jeżeli liczba bitów 1 znajduje się w przedziale (9725; 10275).',
    ],
  },
  {
    header: 'Test serii',
    content: [
      'Seria w danym ciągu to maksymalny podciąg następujących po sobie zer lub jedynek.',
      'Ciąg bitów zostaje podzielony na serie o długości 1, 2, 3, 4, 5 oraz na serię o długości dłuższej lub równej 6. Jeżeli liczba każdej z serii bitów 1 lub 0 mieści się w określonym przedziale, test zostaje zaliczony.',
      'Test musi zakończyć się pozytywnie zarówno dla serii zer jak i jedynek w ciągu bitów.',
      'Długość serii - 1, przedział (2315; 2685)',
      'Długość serii - 2, przedział (1114; 1386)',
      'Długość serii - 3, przedział (527; 723)',
      'Długość serii - 4, przedział (240; 384)',
      'Długość serii - 5, przedział (103; 209)',
      'Długość serii - 6+, przedział (103; 209)',
    ],
  },
  {
    header: 'Test długiej serii',
    content: [
      'Seria w danym ciągu to maksymalny podciąg następujących po sobie zer lub jedynek.',
      'Jeżeli w ciągu bitów nie występuje seria o długości równej lub większej niż 26, test zostaje zaliczony.',
    ],
  },
  {
    header: 'Test pokerowy',
    content: [
      'Ciąg bitów zostaje podzielony na 4 bitowe grupy co skutkuje otrzymaniem 5000 segmentów bitów.',
      'Należy policzyć liczbę wystąpień każdej z możliwych 16 - 4 bitowych wartości.',
      'Wykorzystując wzór 16/5000 * X - 5000, gdzie X to suma kwadratów liczby wystąpień 4 bitowych wartości, obliczany jest wynik końcowy.',
      'Jeżeli wynik końcowy znajduje się w przedziale (2,16; 46,17) to test uznany jest za zaliczony.',
    ],
  },
];
